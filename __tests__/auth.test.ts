import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser, logoutUser } from '@/app/actions/auth';
import * as nextHeaders from 'next/headers';
import * as nextNavigation from 'next/navigation';

const { mockCollection } = vi.hoisted(() => ({
  mockCollection: {
    findOne: vi.fn(),
    insertOne: vi.fn().mockResolvedValue({ insertedId: 'test-id' })
  }
}));

vi.mock('@/lib/db', () => ({
  default: Promise.resolve({
    db: () => ({
      collection: () => mockCollection
    })
  })
}));

vi.mock('@/lib/auth', () => ({
  hashPassword: vi.fn().mockResolvedValue('hashed-password'),
  comparePassword: vi.fn(),
  signJWT: vi.fn().mockResolvedValue('test-token')
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn()
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn()
}));

describe('Auth Actions', () => {
  let mockCookies: any;
  let mockCollection: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    mockCookies = {
      set: vi.fn(),
      delete: vi.fn()
    };
    (nextHeaders.cookies as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCookies);
    
    const dbClient = await import('@/lib/db').then(m => m.default);
    mockCollection = (await dbClient).db().collection('users');
  });

  describe('registerUser', () => {
    it('should return error if missing email or password', async () => {
      const formData = new FormData();
      formData.append('email', '');
      
      const res = await registerUser(formData);
      expect(res).toEqual({ error: 'Email and password are required' });
    });

    it('should return error if user already exists', async () => {
      mockCollection.findOne.mockResolvedValueOnce({ email: 'test@test.com' });
      
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'password123');
      
      const res = await registerUser(formData);
      expect(res).toEqual({ error: 'User already exists' });
    });

    it('should register successfully and redirect', async () => {
      mockCollection.findOne.mockResolvedValueOnce(null);
      
      const formData = new FormData();
      formData.append('email', 'new@test.com');
      formData.append('password', 'password123');
      
      await registerUser(formData);
      
      expect(mockCookies.set).toHaveBeenCalled();
      expect(nextNavigation.redirect).toHaveBeenCalledWith('/dashboard');
    });

    it('should catch database errors gracefully', async () => {
      mockCollection.findOne.mockRejectedValueOnce(new Error('DB connection failed'));
      
      const formData = new FormData();
      formData.append('email', 'new@test.com');
      formData.append('password', 'password123');
      
      const res = await registerUser(formData);
      expect(res).toEqual({ error: 'An unexpected error occurred during registration.' });
    });
  });

  describe('loginUser', () => {
    it('should return error if invalid email', async () => {
      mockCollection.findOne.mockResolvedValueOnce(null);
      
      const formData = new FormData();
      formData.append('email', 'wrong@test.com');
      formData.append('password', 'password123');
      
      const res = await loginUser(formData);
      expect(res).toEqual({ error: 'Invalid email or password' });
    });
  });

  describe('logoutUser', () => {
    it('should delete cookie and redirect', async () => {
      await logoutUser();
      expect(mockCookies.delete).toHaveBeenCalledWith('session');
      expect(nextNavigation.redirect).toHaveBeenCalledWith('/login');
    });
  });
});
