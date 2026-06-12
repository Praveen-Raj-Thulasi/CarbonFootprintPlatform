import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SocialProof } from '@/components/landing/SocialProof';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className}>{children}</div>
      ),
    },
  };
});

test('renders SocialProof with provided stats', () => {
  const stats = [
    { label: 'CO₂ Reduced', value: '12,400', unit: 'Tons' },
    { label: 'Active Users', value: '5,000', unit: '+' },
  ];

  render(<SocialProof stats={stats} />);

  expect(screen.getByText('CO₂ Reduced')).toBeInTheDocument();
  expect(screen.getByText('12,400')).toBeInTheDocument();
  expect(screen.getByText('Tons')).toBeInTheDocument();

  expect(screen.getByText('Active Users')).toBeInTheDocument();
  expect(screen.getByText('5,000')).toBeInTheDocument();
  expect(screen.getByText('+')).toBeInTheDocument();
});
