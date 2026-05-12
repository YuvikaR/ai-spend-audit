import { describe, it, expect } from 'vitest';
import { calculateWaste } from '../utils/optimizationEngine';

describe('calculateWaste', () => {
  it('calculates waste correctly', () => {
    const tool = {
      tool: 'ChatGPT',
      plan: 'Enterprise',
      seats: 50,
      monthlyCost: 40,
    };

    const result = calculateWaste(tool);

    expect(result.totalWaste).toBeGreaterThan(0);
  });

  it('never returns negative waste', () => {
    const tool = {
      tool: 'Cursor',
      plan: 'Pro',
      seats: 5,
      monthlyCost: 20,
    };

    const result = calculateWaste(tool);

    expect(result.totalWaste).toBeGreaterThanOrEqual(0);
  });
});