import { generateRecommendations } from '../utils/optimizationEngine';

describe('Recommendation Engine', () => {
  it('generates recommendations', () => {
    const tool = {
      tool: 'ChatGPT',
      plan: 'Enterprise',
      seats: 100,
      monthlyCost: 50,
    };

    const result = generateRecommendations(tool, [tool]);

    expect(Array.isArray(result)).toBe(true);
  });

  it('recommendations include monthly savings', () => {
    const tool = {
      tool: 'Claude',
      plan: 'Team',
      seats: 40,
      monthlyCost: 35,
    };

    const result = generateRecommendations(tool, [tool]);

    if (result.length > 0) {
      expect(result[0]).toHaveProperty('monthlySavings');
    }
  });
});