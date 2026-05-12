import { describe, it, expect } from 'vitest';
import { processAuditTools } from '../utils/optimizationEngine';

describe('Savings Projection', () => {
  it('calculates yearly savings correctly', () => {
    const tools = [
      {
        tool: 'ChatGPT',
        plan: 'Enterprise',
        seats: 50,
        monthlyCost: 40,
      },
      {
        tool: 'Claude',
        plan: 'Team',
        seats: 25,
        monthlyCost: 30,
      },
    ];

    const result = processAuditTools(tools);

    expect(result.totalMonthlyWaste).toBeGreaterThan(0);

    expect(result.totalYearlySavings).toBe(
      result.totalMonthlyWaste * 12
    );
  });

  it('returns formatted savings values', () => {
    const tools = [
      {
        tool: 'Cursor',
        plan: 'Pro',
        seats: 20,
        monthlyCost: 20,
      },
    ];

    const result = processAuditTools(tools);

    expect(result.formattedTotalMonthlySpend).toContain('$');
    expect(result.formattedTotalYearlySavings).toContain('$');
  });

  it('handles zero tools safely', () => {
    const result = processAuditTools([]);

    expect(result.totalMonthlyWaste).toBe(0);
    expect(result.totalYearlySavings).toBe(0);
  });
});