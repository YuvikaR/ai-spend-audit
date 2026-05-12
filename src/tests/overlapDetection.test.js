import { describe, it, expect } from "vitest";
import { detectToolOverlaps } from '../utils/optimizationEngine';

describe('Overlap Detection', () => {
  it('detects overlapping AI tools', () => {
    const tools = [
      {
        tool: 'ChatGPT',
        plan: 'Pro',
        seats: 10,
        monthlyCost: 20,
      },
      {
        tool: 'Claude',
        plan: 'Pro',
        seats: 10,
        monthlyCost: 25,
      },
    ];

    const result = detectToolOverlaps(tools);

    expect(result.length).toBeGreaterThan(0);
  });

  it('returns empty array if no overlaps exist', () => {
    const tools = [
      {
        tool: 'Cursor',
        plan: 'Pro',
        seats: 5,
        monthlyCost: 20,
      },
    ];

    const result = detectToolOverlaps(tools);

    expect(result).toEqual([]);
  });
});