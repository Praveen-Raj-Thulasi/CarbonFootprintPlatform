import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { chatWithAI } from '@/app/actions/ai';

// Mock fetch globally
global.fetch = vi.fn();

describe('chatWithAI', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = { ...originalEnv, GROQ_API_KEY: 'test-key' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return fallback message if API key is missing', async () => {
    delete process.env.GROQ_API_KEY;
    const response = await chatWithAI([{ role: 'user', content: 'hello' }]);
    expect(response).toContain('offline mode');
  });

  it('should successfully call Groq API and return response', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        choices: [
          { message: { content: 'This is a test response' } }
        ]
      })
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const response = await chatWithAI([{ role: 'user', content: 'hello' }]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe('This is a test response');
  });

  it('should handle invalid API key error gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: async () => ({
        error: { message: 'invalid_api_key' }
      })
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const response = await chatWithAI([{ role: 'user', content: 'hello' }]);
    expect(response).toContain('invalid');
  });

  it('should handle rate limits gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 429,
      json: async () => ({
        error: { message: 'rate_limit_exceeded' }
      })
    };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const response = await chatWithAI([{ role: 'user', content: 'hello' }]);
    expect(response).toContain('quota has been reached');
  });
});
