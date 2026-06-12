import { expect, test, vi } from 'vitest';
import { getPlatformStats } from '@/lib/stats';

// Mock the db module to force the catch block
vi.mock('@/lib/db', () => {
  const p = Promise.reject(new Error('DB Connection Failed'));
  p.catch(() => {});
  return { default: p };
});

test('getPlatformStats returns fallback data on DB failure', async () => {
  const stats = await getPlatformStats();
  
  expect(stats).toEqual([
    { label: "CO₂ Reduced", value: "12,400", unit: "Tons" },
    { label: "Climate Twins", value: "85,000", unit: "+" },
    { label: "Trees Saved", value: "1.2", unit: "M" },
    { label: "Insights Delivered", value: "500", unit: "M+" },
  ]);
});
