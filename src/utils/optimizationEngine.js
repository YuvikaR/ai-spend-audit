/**
 * AI Spend Optimization Engine - Enhanced Version
 * Improved calculations, accurate number formatting, and better validation
 * 
 * Enhancements:
 * - Proper currency formatting with commas ($1,250 format)
 * - More accurate waste calculations
 * - Better plan tier pricing models
 * - Improved recommendation accuracy
 * - Enhanced edge case handling
 * - Better risk score calculations
 */

// ============================================
// NUMBER FORMATTING FUNCTIONS
// ============================================

/**
 * Format currency with commas
 * Examples: $1,250, $15,000, $125
 */
function formatCurrency(value) {
  const num = Math.max(0, parseFloat(value) || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format number with commas (no currency)
 * Examples: 1,250, 15,000, 125
 */
function formatNumber(value) {
  const num = Math.max(0, Math.round(parseFloat(value) || 0));
  return num.toLocaleString('en-US');
}

/**
 * Format percentage
 * Examples: 75.5%, 32.0%, 100%
 */
function formatPercent(value, decimals = 1) {
  const num = Math.max(0, Math.min(100, parseFloat(value) || 0));
  return `${num.toFixed(decimals)}%`;
}

/**
 * Safely clamp a value between min and max
 */
function clamp(value, min = 0, max = 1) {
  const num = parseFloat(value) || 0;
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

/**
 * Validate tool object for required fields
 */
function validateTool(tool) {
  if (!tool || typeof tool !== 'object') return false;
  const requiredFields = ['tool', 'plan', 'seats', 'monthlyCost'];
  return requiredFields.every(field => {
    const value = tool[field];
    if (field === 'seats' || field === 'monthlyCost') {
      return typeof value === 'number' && value > 0;
    }
    return value !== undefined && value !== null;
  });
}

/**
 * Get metadata with fallback for unknown tools
 */
function getToolMetadata(toolName) {
  return TOOL_METADATA[toolName] || {
    category: 'general-ai',
    capabilities: ['general'],
    baseUtilizationRange: [0.6, 0.75],
    icon: '🔧',
  };
}

// ============================================
// TOOL CATEGORIZATION & METADATA
// ============================================

export const TOOL_METADATA = {
  ChatGPT: {
    category: 'general-ai',
    capabilities: ['chat', 'writing', 'research', 'coding', 'data'],
    baseUtilizationRange: [0.68, 0.82],
    icon: '🤖',
  },
  Claude: {
    category: 'general-ai',
    capabilities: ['chat', 'writing', 'research', 'coding', 'data', 'analysis'],
    baseUtilizationRange: [0.70, 0.85],
    icon: '🧠',
  },
  Gemini: {
    category: 'general-ai',
    capabilities: ['chat', 'writing', 'research', 'coding'],
    baseUtilizationRange: [0.62, 0.75],
    icon: '✨',
  },
  Cursor: {
    category: 'coding',
    capabilities: ['coding'],
    baseUtilizationRange: [0.75, 0.90],
    icon: '💻',
  },
  'GitHub Copilot': {
    category: 'coding',
    capabilities: ['coding'],
    baseUtilizationRange: [0.72, 0.88],
    icon: '⚡',
  },
};

const PLAN_TIER_LEVELS = {
  Free: 1,
  Pro: 2,
  Team: 3,
  Enterprise: 4,
};

/**
 * Plan pricing multipliers (relative to Pro tier)
 * Used for more accurate downgrade savings calculations
 */
const PLAN_TIER_MULTIPLIERS = {
  Free: 0.0,      // Free
  Pro: 1.0,       // Baseline
  Team: 3.5,      // ~3.5x Pro
  Enterprise: 6.0 // ~6x Pro
};

/**
 * Enterprise scaling factors with more granular data
 */
const ENTERPRISE_UTILIZATION_CURVE = [
  { seats: 1, factor: 1.0 },
  { seats: 5, factor: 0.98 },
  { seats: 10, factor: 0.96 },
  { seats: 15, factor: 0.92 },
  { seats: 25, factor: 0.86 },
  { seats: 50, factor: 0.70 },
  { seats: 100, factor: 0.58 },
  { seats: 250, factor: 0.48 },
  { seats: 500, factor: 0.40 },
  { seats: 1000, factor: 0.35 },
];

// ============================================
// 1. UTILIZATION CALCULATOR
// ============================================

/**
 * Calculate enterprise utilization curve factor based on seat count
 * More granular with logarithmic interpolation
 */
function getEnterpriseScalingFactor(seats) {
  seats = Math.max(1, Math.round(seats));
  
  if (seats <= 1) return 1.0;
  
  // Find the appropriate range
  for (let i = 0; i < ENTERPRISE_UTILIZATION_CURVE.length - 1; i++) {
    const current = ENTERPRISE_UTILIZATION_CURVE[i];
    const next = ENTERPRISE_UTILIZATION_CURVE[i + 1];
    
    if (seats >= current.seats && seats <= next.seats) {
      // Logarithmic interpolation
      const ratio = (Math.log(seats) - Math.log(current.seats)) / 
                   (Math.log(next.seats) - Math.log(current.seats));
      return current.factor + (next.factor - current.factor) * ratio;
    }
  }
  
  // Beyond 1000 seats
  const lastPoint = ENTERPRISE_UTILIZATION_CURVE[ENTERPRISE_UTILIZATION_CURVE.length - 1];
  const diminishRate = 0.98;
  return Math.max(0.25, lastPoint.factor * Math.pow(diminishRate, (seats - 1000) / 100));
}

/**
 * Calculates realistic utilization
 * Returns value between 0.15 and 0.95
 */
export function calculateUtilization(tool) {
  if (!validateTool(tool)) {
    return 0.5;
  }

  const metadata = getToolMetadata(tool.tool);
  
  // Base utilization: weighted toward higher end
  const baseUtilization = 
    (metadata.baseUtilizationRange[0] * 0.35 + 
     metadata.baseUtilizationRange[1] * 0.65);

  // Plan tier adjustment
  const planTier = PLAN_TIER_LEVELS[tool.plan] || 2;
  const planAdjustment = {
    1: 0.98,  // Free
    2: 0.95,  // Pro
    3: 0.85,  // Team
    4: 0.70,  // Enterprise
  }[planTier];

  let utilization = baseUtilization * planAdjustment;

  // Enterprise scaling factor
  const scalingFactor = getEnterpriseScalingFactor(tool.seats);
  utilization *= scalingFactor;

  // Use case specificity
  const useCase = tool.useCase || 'General';
  const useCaseMultiplier = {
    'Coding': 1.08,
    'Writing': 0.88,
    'Research': 0.72,
    'Data': 0.82,
    'General': 1.0,
  }[useCase] || 1.0;

  utilization *= useCaseMultiplier;

  // Final clamp
  return clamp(utilization, 0.15, 0.95);
}

/**
 * Calculate active vs inactive users
 */
export function calculateSeatUtilization(tool) {
  if (!validateTool(tool)) {
    return {
      utilization: 0,
      activeUsers: 0,
      inactiveUsers: tool?.seats || 0,
    };
  }

  const utilization = calculateUtilization(tool);
  const activeUsers = Math.ceil(tool.seats * utilization);
  const inactiveUsers = Math.max(0, tool.seats - activeUsers);

  return {
    utilization: Math.round(utilization * 100),
    activeUsers: Math.max(0, activeUsers),
    inactiveUsers: Math.max(0, inactiveUsers),
  };
}

// ============================================
// 2. DUPLICATE TOOL DETECTION
// ============================================

/**
 * Calculate weighted overlap score
 */
function calculateCapabilityOverlap(caps1, caps2) {
  if (!Array.isArray(caps1) || !Array.isArray(caps2)) return 0;
  
  const capabilityWeights = {
    'coding': 1.0,
    'chat': 0.9,
    'writing': 0.8,
    'analysis': 0.7,
    'data': 0.7,
    'research': 0.6,
    'general': 0.3,
  };

  const shared = caps1.filter(cap => caps2.includes(cap));
  if (shared.length === 0) return 0;

  const sharedWeight = shared.reduce((sum, cap) => 
    sum + (capabilityWeights[cap] || 0.5), 0);
  
  const totalWeight = Math.max(
    caps1.reduce((sum, cap) => sum + (capabilityWeights[cap] || 0.5), 0),
    caps2.reduce((sum, cap) => sum + (capabilityWeights[cap] || 0.5), 0)
  );

  return Math.min(1, sharedWeight / totalWeight);
}

/**
 * Detect overlapping tools with accurate scoring
 */
export function detectToolOverlaps(tools) {
  if (!Array.isArray(tools) || tools.length === 0) return [];

  const validTools = tools.filter(validateTool);
  if (validTools.length < 2) return [];

  const overlaps = [];
  const processedPairs = new Set();

  validTools.forEach((tool1, idx1) => {
    const meta1 = getToolMetadata(tool1.tool);
    
    validTools.forEach((tool2, idx2) => {
      if (idx1 >= idx2) return;
      
      const pairKey = `${idx1}-${idx2}`;
      if (processedPairs.has(pairKey)) return;
      processedPairs.add(pairKey);

      const meta2 = getToolMetadata(tool2.tool);
      const overlapScore = calculateCapabilityOverlap(
        meta1.capabilities,
        meta2.capabilities
      );

      if (overlapScore < 0.3) return;

      const tool1Spend = tool1.monthlyCost * tool1.seats;
      const tool2Spend = tool2.monthlyCost * tool2.seats;
      
      // Conservative: 60% of smaller tool cost
      const potentialWaste = Math.min(tool1Spend, tool2Spend) * 0.6;

      overlaps.push({
        capability: meta1.capabilities.filter(cap => 
          meta2.capabilities.includes(cap)
        ).join(', '),
        tools: [
          { tool: tool1.tool, index: idx1, spend: tool1Spend },
          { tool: tool2.tool, index: idx2, spend: tool2Spend },
        ],
        count: 2,
        overlapScore: Math.round(overlapScore * 100),
        potentialWaste: Math.round(potentialWaste),
      });
    });
  });

  return overlaps.sort((a, b) => b.potentialWaste - a.potentialWaste);
}

/**
 * Get consolidation suggestion
 */
export function getConsolidationSuggestion(overlap) {
  if (!overlap || !overlap.tools || overlap.tools.length < 2) {
    return 'Review tool portfolio for consolidation opportunities';
  }

  const tools = overlap.tools.map(t => t.tool).join(' + ');
  const capability = overlap.capability || 'overlapping capabilities';

  const suggestions = {
    'coding': `Consolidate coding tools (${tools}) into single development platform`,
    'chat': `Merge chat-based AI tools (${tools}) into primary subscription`,
    'writing': `Combine writing capabilities into one platform`,
    'research': `Merge research tools into comprehensive solution`,
    'data': `Consolidate data analysis into unified platform`,
    'analysis': `Combine analysis tools into single platform`,
  };

  for (const [key, suggestion] of Object.entries(suggestions)) {
    if (capability.includes(key)) {
      return suggestion;
    }
  }

  return `Consolidate overlapping tools (${tools}) to reduce redundancy`;
}

// ============================================
// 3. WASTE CALCULATION (IMPROVED & ACCURATE)
// ============================================

/**
 * More accurate waste calculation with realistic plan downgrade scenarios
 */
export function calculateWaste(tool) {
  if (!validateTool(tool)) {
    return {
      inactiveSeatWaste: 0,
      planOverspendWaste: 0,
      apiAlternativeWaste: 0,
      totalWaste: 0,
      wastePercentage: 0,
    };
  }

  const { inactiveUsers } = calculateSeatUtilization(tool);
  const costPerSeat = tool.monthlyCost / Math.max(1, tool.seats);
  const totalCost = tool.monthlyCost * tool.seats;
  const utilization = calculateUtilization(tool);
  const planTier = PLAN_TIER_LEVELS[tool.plan] || 2;

  // === Waste Type 1: Inactive Seat Waste ===
  let inactiveSeatWaste = inactiveUsers * costPerSeat;
  inactiveSeatWaste = Math.max(0, Math.min(inactiveSeatWaste, totalCost * 0.5));

  // === Waste Type 2: Plan Overspend (More Accurate) ===
  let planOverspendWaste = 0;
  
  if (planTier === 2 && utilization > 0.90) {
    // Pro with very high utilization - could upgrade to Team
    planOverspendWaste = 0;
  } else if (planTier === 3 && utilization < 0.45) {
    // Team plan with low utilization - could downgrade to Pro
    const proCost = (costPerSeat * PLAN_TIER_MULTIPLIERS.Pro) * tool.seats;
    planOverspendWaste = totalCost - proCost;
  } else if (planTier === 4) {
    if (utilization < 0.4) {
      // Enterprise to Team downgrade
      const teamCost = (costPerSeat * PLAN_TIER_MULTIPLIERS.Team) * tool.seats;
      planOverspendWaste = totalCost - teamCost;
    } else if (utilization < 0.55) {
      // Enterprise to Team downgrade (partial confidence)
      const teamCost = (costPerSeat * PLAN_TIER_MULTIPLIERS.Team) * tool.seats;
      planOverspendWaste = (totalCost - teamCost) * 0.7;
    }
  }
  
  planOverspendWaste = Math.max(0, Math.min(planOverspendWaste, totalCost * 0.6));

  // === Waste Type 3: API Alternative ===
  let apiAlternativeWaste = 0;
  if (planTier === 4 && tool.seats > 20) {
    // Sophisticated API cost model
    const apiBaseCost = tool.seats * (costPerSeat * 0.3);
    const lowerTierCost = (costPerSeat * PLAN_TIER_MULTIPLIERS.Pro) * tool.seats;
    const hybridCost = apiBaseCost + lowerTierCost;
    apiAlternativeWaste = Math.max(0, totalCost - hybridCost);
  }
  
  apiAlternativeWaste = Math.max(0, Math.min(apiAlternativeWaste, totalCost * 0.7));

  // === Combined Waste (Weighted to prevent double-counting) ===
  const wasteScenarios = [
    inactiveSeatWaste,
    planOverspendWaste,
    apiAlternativeWaste,
  ];
  
  const totalWaste = wasteScenarios[0] + 
    (wasteScenarios[1] * 0.5) +
    (wasteScenarios[2] * 0.4);

  const cappedWaste = Math.min(totalWaste, totalCost * 0.7);
  const wastePercentage = totalCost > 0 ? 
    Math.round((cappedWaste / totalCost) * 100) : 0;

  return {
    inactiveSeatWaste: Math.round(Math.max(0, inactiveSeatWaste)),
    planOverspendWaste: Math.round(Math.max(0, planOverspendWaste)),
    apiAlternativeWaste: Math.round(Math.max(0, apiAlternativeWaste)),
    totalWaste: Math.round(Math.max(0, cappedWaste)),
    wastePercentage: clamp(wastePercentage, 0, 70),
  };
}

// ============================================
// 4. RECOMMENDATIONS (IMPROVED)
// ============================================

/**
 * Generate accurate, actionable recommendations
 */
export function generateRecommendations(tool, allTools = []) {
  if (!validateTool(tool)) return [];

  const recommendations = [];
  const waste = calculateWaste(tool);
  const { utilization, inactiveUsers } = calculateSeatUtilization(tool);
  const utilNum = calculateUtilization(tool);
  const planTier = PLAN_TIER_LEVELS[tool.plan] || 2;
  const totalSpend = tool.monthlyCost * tool.seats;

  // === Recommendation 1: Remove Inactive Seats ===
  if (inactiveUsers > 0 && inactiveUsers >= Math.ceil(tool.seats * 0.15)) {
    const savings = Math.min(
      inactiveUsers * tool.monthlyCost,
      waste.inactiveSeatWaste
    );

    if (savings > 50) {
      recommendations.push({
        type: 'remove-seats',
        title: `Remove ${inactiveUsers} inactive seat${inactiveUsers > 1 ? 's' : ''}`,
        description: `Only ${utilization}% utilization. Reduce from ${tool.seats} to ${tool.seats - inactiveUsers} seats.`,
        monthlySavings: Math.round(savings),
        severity: inactiveUsers > tool.seats * 0.3 ? 'high' : 'medium',
        action: `Reduce from ${tool.seats} to ${tool.seats - inactiveUsers} seats`,
      });
    }
  }

  // === Recommendation 2: Plan Downgrade ===
  if (planTier >= 3 && utilNum < 0.50) {
    const downgradeSavings = Math.round(waste.planOverspendWaste);
    
    if (downgradeSavings > 100) {
      const nextTier = planTier === 4 ? 'Team' : 'Pro';
      recommendations.push({
        type: 'downgrade-plan',
        title: `Downgrade from ${tool.plan} to ${nextTier} plan`,
        description: `Utilization at ${utilization}% suggests ${tool.plan} tier is over-provisioned.`,
        monthlySavings: downgradeSavings,
        severity: downgradeSavings > totalSpend * 0.25 ? 'high' : 'medium',
        action: `Contact support to migrate to ${nextTier} tier`,
      });
    }
  }

  // === Recommendation 3: Tool Consolidation ===
  const overlappingTools = allTools.filter((t) => {
    if (!validateTool(t) || t.tool === tool.tool) return false;
    
    const toolMeta = getToolMetadata(tool.tool);
    const otherMeta = getToolMetadata(t.tool);
    const overlapScore = calculateCapabilityOverlap(
      toolMeta.capabilities,
      otherMeta.capabilities
    );
    
    return overlapScore > 0.35;
  });

  if (overlappingTools.length > 0) {
    const otherSpend = overlappingTools.reduce(
      (sum, t) => sum + (t.monthlyCost * t.seats),
      0
    );
    
    const consolidationSavings = Math.round(otherSpend * 0.6);

    if (consolidationSavings > 100) {
      recommendations.push({
        type: 'consolidate',
        title: `Consolidate with ${overlappingTools[0].tool}`,
        description: `${tool.tool} overlaps with other AI tools. Consolidation could save ${formatCurrency(consolidationSavings)}/month.`,
        monthlySavings: consolidationSavings,
        severity: consolidationSavings > 500 ? 'medium' : 'low',
        action: `Evaluate consolidation roadmap with product teams`,
      });
    }
  }

  // === Recommendation 4: API Alternative ===
  if (planTier === 4 && tool.seats > 20) {
    const apiSavings = Math.round(waste.apiAlternativeWaste);
    
    if (apiSavings > 200) {
      recommendations.push({
        type: 'api-alternative',
        title: `Consider API-based hybrid model`,
        description: `Large team (${tool.seats} seats) could use API access + lower-tier subscriptions.`,
        monthlySavings: apiSavings,
        severity: 'low',
        action: `Schedule technical feasibility review`,
      });
    }
  }

  // === Recommendation 5: Bulk Negotiation ===
  if (tool.seats > 75 && planTier >= 3) {
    const bulkSavings = Math.round(totalSpend * 0.10);
    
    if (bulkSavings > 200) {
      recommendations.push({
        type: 'bulk-negotiation',
        title: `Negotiate enterprise volume discount`,
        description: `At ${tool.seats} seats, you can request 10-20% volume discounts.`,
        monthlySavings: bulkSavings,
        severity: 'low',
        action: `Request custom enterprise pricing quote`,
      });
    }
  }

  return recommendations
    .sort((a, b) => b.monthlySavings - a.monthlySavings)
    .filter(rec => rec.monthlySavings > 20);
}

// ============================================
// 5. RISK & EFFICIENCY SCORING (IMPROVED)
// ============================================

/**
 * Improved risk score with better weighting
 */
export function calculateRiskScore(tool) {
  if (!validateTool(tool)) return 50;

  let score = 0;
  const waste = calculateWaste(tool);
  const { utilization } = calculateSeatUtilization(tool);
  const planTier = PLAN_TIER_LEVELS[tool.plan] || 2;
  const wastePercentage = waste.wastePercentage;
  const utilNum = calculateUtilization(tool);

  // === Waste Factor (40 points) ===
  if (wastePercentage > 60) score += 40;
  else if (wastePercentage > 40) score += 32;
  else if (wastePercentage > 25) score += 24;
  else if (wastePercentage > 15) score += 16;
  else if (wastePercentage > 8) score += 8;
  else score += Math.round((wastePercentage / 8) * 8);

  // === Utilization Factor (35 points) ===
  if (utilization < 20) score += 35;
  else if (utilization < 35) score += 28;
  else if (utilization < 50) score += 20;
  else if (utilization < 65) score += 10;
  else if (utilization < 80) score += 3;

  // === Plan-Seat Mismatch (20 points) ===
  if (planTier === 4) {
    if (tool.seats > 100) score += 18;
    else if (tool.seats > 50) score += 12;
    else if (tool.seats > 20) score += 6;
  } else if (planTier === 3 && tool.seats > 50) {
    score += 8;
  }

  // === Enterprise Overhead (5 points) ===
  if (planTier === 4 && utilNum < 0.50) score += 5;

  return clamp(Math.round(score), 10, 90);
}

/**
 * Efficiency score with distribution boost
 */
export function calculateEfficiencyScore(tool) {
  const riskScore = calculateRiskScore(tool);
  const baseEfficiency = 100 - riskScore;
  
  if (riskScore < 25) {
    return Math.round(baseEfficiency + 3);
  }
  
  return Math.round(baseEfficiency);
}

// ============================================
// 6. BATCH CALCULATIONS
// ============================================

/**
 * Process all tools with improved formatting
 */
export function processAuditTools(tools) {
  if (!Array.isArray(tools)) tools = [];
  const validTools = tools.filter(validateTool);
  
  if (validTools.length === 0) {
    return {
      processedTools: [],
      overlaps: [],
      totalMonthlySpend: 0,
      totalMonthlyWaste: 0,
      totalYearlySavings: 0,
      averageRiskScore: 0,
      averageEfficiencyScore: 100,
      consolidationPotential: 0,
      totalToolCount: 0,
    };
  }

  const processedTools = validTools.map((tool) => {
    const totalSpend = tool.monthlyCost * tool.seats;
    const waste = calculateWaste(tool);
    const seatUtilization = calculateSeatUtilization(tool);
    const recommendations = generateRecommendations(tool, validTools);
    const riskScore = calculateRiskScore(tool);
    const efficiencyScore = calculateEfficiencyScore(tool);

    return {
      ...tool,
      totalSpend: Math.max(0, totalSpend),
      waste,
      seatUtilization,
      recommendations,
      riskScore: clamp(riskScore, 10, 90),
      efficiencyScore: clamp(efficiencyScore, 10, 90),
      estimatedSavings: waste.totalWaste,
      // Formatted values for display
      formattedTotalSpend: formatCurrency(totalSpend),
      formattedWaste: formatCurrency(waste.totalWaste),
      formattedEstimatedSavings: formatCurrency(waste.totalWaste),
    };
  });

  const overlaps = detectToolOverlaps(validTools);

  const totalMonthlySpend = processedTools.reduce(
    (sum, t) => sum + t.totalSpend,
    0
  );
  const totalMonthlyWaste = processedTools.reduce(
    (sum, t) => sum + t.waste.totalWaste,
    0
  );
  const totalYearlySavings = totalMonthlyWaste * 12;

  const averageRiskScore = processedTools.length > 0 ?
    Math.round(processedTools.reduce((sum, t) => sum + t.riskScore, 0) / processedTools.length) :
    0;
  const averageEfficiencyScore = 100 - averageRiskScore;

  let consolidationPotential = 0;
  overlaps.forEach((overlap) => {
    consolidationPotential += overlap.potentialWaste;
  });

  return {
    processedTools,
    overlaps,
    totalMonthlySpend: Math.max(0, totalMonthlySpend),
    totalMonthlyWaste: Math.max(0, totalMonthlyWaste),
    totalYearlySavings: Math.max(0, totalYearlySavings),
    averageRiskScore: clamp(averageRiskScore, 10, 90),
    averageEfficiencyScore: clamp(averageEfficiencyScore, 10, 90),
    consolidationPotential: Math.max(0, consolidationPotential),
    totalToolCount: processedTools.length,
    // Formatted values for display
    formattedTotalMonthlySpend: formatCurrency(totalMonthlySpend),
    formattedTotalMonthlyWaste: formatCurrency(totalMonthlyWaste),
    formattedTotalYearlySavings: formatCurrency(totalYearlySavings),
    formattedConsolidationPotential: formatCurrency(consolidationPotential),
  };
}

// ============================================
// 7. INSIGHTS & SUMMARIES
// ============================================

/**
 * Generate audit insight with formatted numbers
 */
export function generateAuditInsight(auditResults) {
  if (!auditResults || typeof auditResults !== 'object') {
    return {
      type: 'neutral',
      emoji: '📊',
      title: 'Audit Data',
      insight: 'Unable to process audit results.',
    };
  }

  const {
    totalToolCount = 0,
    averageRiskScore = 0,
    overlaps = [],
    totalMonthlyWaste = 0,
    consolidationPotential = 0,
    processedTools = [],
  } = auditResults;

  if (averageRiskScore > 70) {
    return {
      type: 'critical',
      emoji: '⚠️',
      title: 'Significant Optimization Opportunity',
      insight: `Your AI stack shows substantial efficiency issues. Enterprise over-provisioning and inactive licenses represent ${formatCurrency(totalMonthlyWaste)} in monthly waste. Immediate consolidation and seat optimization recommended.`,
    };
  }

  if (overlaps.length >= 3 && consolidationPotential > 500) {
    return {
      type: 'warning',
      emoji: '🔄',
      title: 'High Tool Redundancy Detected',
      insight: `Your organization uses ${totalToolCount} tools with significant capability overlap. Consolidating overlapping subscriptions could save ${formatCurrency(consolidationPotential)} monthly (${formatCurrency(consolidationPotential * 12)} annually).`,
    };
  }

  if (totalMonthlyWaste > 1500) {
    return {
      type: 'opportunity',
      emoji: '💡',
      title: 'Substantial Savings Potential',
      insight: `Inactive seats and underutilized plans represent ${formatCurrency(totalMonthlyWaste)} in monthly waste. Targeted optimization could recover ${formatCurrency(totalMonthlyWaste * 12)} annually.`,
    };
  }

  if (averageRiskScore < 35) {
    return {
      type: 'positive',
      emoji: '✅',
      title: 'Efficient AI Stack',
      insight: 'Your organization demonstrates strong AI spend discipline. Utilization is healthy and tool selection is focused. Continue monitoring quarterly for emerging optimization opportunities.',
    };
  }

  return {
    type: 'neutral',
    emoji: '📊',
    title: 'Balanced AI Spending',
    insight: `Your AI stack is moderately optimized. Potential ${formatCurrency(totalMonthlyWaste)} monthly savings exist through seat optimization and plan adjustments.`,
  };
}

/**
 * Get top recommendations with formatted savings
 */
export function getTopRecommendations(auditResults, limit = 5) {
  if (!auditResults || !auditResults.processedTools) {
    return [];
  }

  const allRecommendations = auditResults.processedTools
    .flatMap((tool, toolIndex) =>
      tool.recommendations.map((rec) => ({
        ...rec,
        tool: tool.tool,
        toolIndex,
        formattedMonthlySavings: formatCurrency(rec.monthlySavings),
        formattedAnnualSavings: formatCurrency(rec.monthlySavings * 12),
      }))
    )
    .sort((a, b) => b.monthlySavings - a.monthlySavings)
    .slice(0, Math.max(1, limit));

  return allRecommendations;
}

// ============================================
// HELPER EXPORTS
// ============================================

export {
  formatCurrency,
  formatNumber,
  formatPercent,
  clamp,
  validateTool,
  getToolMetadata,
};