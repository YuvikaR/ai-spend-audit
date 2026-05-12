import { describe, it, expect } from "vitest";
import { processAuditTools } from '../utils/optimizationEngine';

describe('processAuditTools', () => {
  it('processes tools correctly', () => {
    const tools = [
      {
        tool: 'ChatGPT',
        plan: 'Pro',
        seats: 10,
        monthlyCost: 20,
      },
    ];

    const result = processAuditTools(tools);

    expect(result.totalToolCount).toBe(1);
    expect(result.totalMonthlySpend).toBe(200);
    expect(result.processedTools.length).toBe(1);
  });

  it('returns empty result for empty array', () => {
    const result = processAuditTools([]);

    expect(result.totalToolCount).toBe(0);
    expect(result.processedTools).toEqual([]);
  });
});