/**
 * Report Generator Module
 * Handles formatting audit data and generating reports in multiple formats
 */

/**
 * Generate a structured report object from audit data
 */
export function generateAuditReport(auditData, organizationName = 'Your Organization') {
  if (!auditData || !auditData.processedTools) {
    throw new Error('Invalid audit data');
  }

  const timestamp = new Date().toLocaleString();
  const reportId = `AUDIT-${Date.now()}`;

  return {
    metadata: {
      reportId,
      organizationName,
      generatedAt: timestamp,
      generatedAtISO: new Date().toISOString(),
    },
    summary: {
      totalToolCount: auditData.totalToolCount || 0,
      totalMonthlySpend: auditData.totalMonthlySpend || 0,
      totalMonthlyWaste: auditData.totalMonthlyWaste || 0,
      totalYearlySavings: auditData.totalYearlySavings || 0,
      averageRiskScore: auditData.averageRiskScore || 0,
      averageEfficiencyScore: auditData.averageEfficiencyScore || 0,
      consolidationPotential: auditData.consolidationPotential || 0,
    },
    tools: (auditData.processedTools || []).map(tool => ({
      name: tool.tool,
      plan: tool.plan,
      seats: tool.seats,
      monthlyCost: tool.monthlyCost,
      totalSpend: tool.totalSpend,
      utilization: tool.seatUtilization?.utilization || 0,
      activeUsers: tool.seatUtilization?.activeUsers || 0,
      inactiveUsers: tool.seatUtilization?.inactiveUsers || 0,
      waste: {
        monthly: tool.waste?.totalWaste || 0,
        annual: (tool.waste?.totalWaste || 0) * 12,
        percentage: tool.waste?.wastePercentage || 0,
      },
      riskScore: tool.riskScore || 0,
      efficiencyScore: tool.efficiencyScore || 0,
      recommendations: (tool.recommendations || []).slice(0, 3), // Top 3 recommendations
    })),
    overlaps: (auditData.overlaps || []).slice(0, 5), // Top 5 overlaps
    topRecommendations: (auditData.processedTools || [])
      .flatMap(tool =>
        (tool.recommendations || []).map(rec => ({
          tool: tool.tool,
          ...rec,
        }))
      )
      .sort((a, b) => b.monthlySavings - a.monthlySavings)
      .slice(0, 10), // Top 10 recommendations
    insights: {
      primaryInsight: auditData.primaryInsight || 'AI spend optimization opportunity identified',
      riskLevel: auditData.averageRiskScore > 70 ? 'HIGH' : auditData.averageRiskScore > 50 ? 'MODERATE' : 'LOW',
      opportunitySize: auditData.totalMonthlyWaste > 5000 ? 'LARGE' : auditData.totalMonthlyWaste > 1000 ? 'MEDIUM' : 'SMALL',
    },
  };
}

/**
 * Generate HTML email content from report
 */
export function generateEmailHTML(report) {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  const formatNumber = (num) => {
    return (num || 0).toLocaleString('en-US');
  };

  const riskColor = {
    HIGH: '#dc2626',
    MODERATE: '#f59e0b',
    LOW: '#16a34a',
  };

 return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    /* Reset & Base Styling */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      line-height: 1.5;
      color: #000000;
      background-color: #fcfcfc;
      padding: 40px 20px;
    }

    /* Container: Clean & Sharp */
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border: 1px solid #eeeeee;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.03);
    }

    /* Header: Minimalist & High-Contrast */
    .header {
      padding: 60px 40px;
      border-bottom: 1px solid #f5f5f5;
      background: #ffffff;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 14px;
      color: #22c55e; /* Green accent */
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }

    .content {
      padding: 40px;
    }

    /* Report Metadata Badge */
    .report-id {
      display: inline-block;
      color: #999999;
      font-family: ui-monospace, monospace;
      font-size: 10px;
      margin-bottom: 40px;
      padding: 6px 12px;
      background: #f9f9f9;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .section {
      margin-bottom: 50px;
    }

    /* Section Titles: Bold & Geometric */
    .section-title {
      font-size: 12px;
      font-weight: 900;
      color: #000000;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-title::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #eeeeee;
    }

    /* Grid: Airy & Unboxed */
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }
    .summary-card {
      padding: 24px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      border-radius: 16px;
      transition: border-color 0.3s ease;
    }
    .summary-card .label {
      font-size: 10px;
      color: #aaaaaa;
      font-weight: 700;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .summary-card .value {
      font-size: 28px;
      font-weight: 900;
      color: #000000;
      letter-spacing: -0.02em;
    }
    .summary-card.highlight {
      background: #000000;
      border-color: #000000;
    }
    .summary-card.highlight .label { color: #666666; }
    .summary-card.highlight .value { color: #ffffff; }

    /* Risk Badge */
    .risk-badge {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: 100px;
      color: white;
      font-weight: 800;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 12px;
    }

    /* Insight Box: Modern Warning */
    .insight-box {
      background: #fffbeb;
      border-left: 4px solid #fbbf24;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
    }
    .insight-box .label {
      font-size: 11px;
      color: #92400e;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }
    .insight-box .text {
      color: #78350f;
      font-size: 15px;
      font-weight: 500;
    }

    /* Table: Professional & Spaced */
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    .table th {
      padding: 16px;
      text-align: left;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #aaaaaa;
      border-bottom: 1px solid #eeeeee;
    }
    .table td {
      padding: 20px 16px;
      border-bottom: 1px solid #f9f9f9;
      font-size: 14px;
    }
    .table tr:hover td {
      background: #fafafa;
    }

    /* Recommendations: Success-focused */
    .recommendation {
      background: #ffffff;
      border: 1px solid #f0f0f0;
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 16px;
    }
    .recommendation .title {
      font-weight: 800;
      color: #000000;
      font-size: 16px;
      margin-bottom: 6px;
    }
    .recommendation .savings {
      display: inline-block;
      margin-top: 12px;
      color: #22c55e;
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Footer: Subtle Anchor */
    .footer {
      background: #fcfcfc;
      border-top: 1px solid #eeeeee;
      padding: 40px;
      text-align: center;
      font-size: 11px;
      color: #bbbbbb;
      letter-spacing: 0.05em;
    }

    ol li {
      padding-left: 12px;
      font-size: 14px;
      font-weight: 500;
      color: #444444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>Credex Intelligence Audit</p>
      <h1>AI Spend Report</h1>
    </div>

    <div class="content">
      <div class="report-id">
        REF: ${report.metadata.reportId} // STAMP: ${report.metadata.generatedAt}
      </div>

      <div class="section">
        <h2 class="section-title">Executive Summary</h2>
        <div class="summary-grid">
          <div class="summary-card highlight">
            <div class="label">Total Monthly Spend</div>
            <div class="value">${formatCurrency(report.summary.totalMonthlySpend)}</div>
          </div>
          <div class="summary-card highlight">
            <div class="label">Identified Monthly Waste</div>
            <div class="value">${formatCurrency(report.summary.totalMonthlyWaste)}</div>
          </div>
          <div class="summary-card">
            <div class="label">Est. Annual Savings</div>
            <div class="value">${formatCurrency(report.summary.totalYearlySavings)}</div>
          </div>
          <div class="summary-card">
            <div class="label">Efficiency Score</div>
            <div class="value">${100 - report.summary.averageRiskScore}/100</div>
          </div>
        </div>

        <div class="risk-badge" style="background: #000; border: 1px solid ${riskColor[report.insights.riskLevel]}">
          Status: <span style="color: ${riskColor[report.insights.riskLevel]}; margin-left: 5px;">${report.insights.riskLevel}</span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Key Insights</h2>
        <div class="insight-box">
          <div class="label">Optimization Priority</div>
          <div class="text">${report.insights.primaryInsight}</div>
        </div>
        <div style="display: flex; gap: 40px; margin-top: 20px;">
           <div>
              <p style="font-size: 10px; color: #aaa; text-transform: uppercase; font-weight: 700;">Opportunity Size</p>
              <p style="font-weight: 700;">${report.insights.opportunitySize}</p>
           </div>
           <div>
              <p style="font-size: 10px; color: #aaa; text-transform: uppercase; font-weight: 700;">Consolidation Potential</p>
              <p style="font-weight: 700; color: #22c55e;">${formatCurrency(report.summary.consolidationPotential)}/mo</p>
           </div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Infrastructure Breakdown</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Seat Allocation</th>
              <th>Monthly Net</th>
              <th>Risk Score</th>
            </tr>
          </thead>
          <tbody>
            ${report.tools.slice(0, 5).map(tool => `
              <tr>
                <td><strong>${tool.name}</strong></td>
                <td>${tool.seats} Seats</td>
                <td>${formatCurrency(tool.totalSpend)}</td>
                <td style="font-weight: 700;">${tool.riskScore}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2 class="section-title">Strategic Recommendations</h2>
        ${report.topRecommendations.slice(0, 5).map((rec, idx) => `
          <div class="recommendation">
            <div class="title">${idx + 1}. ${rec.tool}: ${rec.title}</div>
            <div style="font-size: 14px; color: #666;">${rec.description || 'Action required to mitigate budget leakage.'}</div>
            <div class="savings">Potential Monthly Recovery: ${formatCurrency(rec.monthlySavings)}</div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2 class="section-title">Next Steps</h2>
        <ol style="margin-left: 20px;">
          <li style="margin-bottom: 12px;">Initiate seat reclamation for inactive licenses.</li>
          <li style="margin-bottom: 12px;">Consolidate redundant API billing into corporate accounts.</li>
          <li style="margin-bottom: 12px;">Schedule governance review for Q${Math.floor(new Date().getMonth() / 3) + 1} deployment.</li>
        </ol>
      </div>
    </div>

    <div class="footer">
      <p>GENERATED BY CREDEX AI OPTIMIZATION ENGINE • CONFIDENTIAL FINANCIAL DATA</p>
      <p style="margin-top: 8px;">© 2026 AI SPEND AUDIT LABS</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send report via email (requires backend endpoint)
 */
export async function sendReportEmail(
  recipientEmail,
  reportHTML
) {
  try {
    const response = await fetch(
      'http://localhost:5000/api/send-report-email',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          to: recipientEmail,

          subject:
            'AI Audit Report',

          htmlContent: reportHTML,
        }),
      }
    );

    const data =
      await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Download report as PDF
 */
export async function downloadReportPDF(report, organizationName) {
  try {
    // If you have a PDF library available (e.g., jsPDF + html2pdf)
    // This is a placeholder for server-side generation
    const response = await fetch('/api/generate-report-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const blob = await response.blob();
    downloadBlob(
      blob,
      `AI-Spend-Audit-${organizationName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
      'application/pdf'
    );
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback: Download HTML as document
    downloadReportHTML(report, organizationName);
  }
}

/**
 * Fallback: Download report as HTML
 */
function downloadReportHTML(report, organizationName) {
  const htmlContent = generateEmailHTML(report);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  downloadBlob(
    blob,
    `AI-Spend-Audit-${organizationName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.html`,
    'text/html'
  );
}

/**
 * Download report as CSV
 */
export function downloadReportCSV(report, organizationName) {
  const lines = [];

  // Header
  lines.push(`AI Spend Optimization Audit Report`);
  lines.push(`Organization: ${report.metadata.organizationName}`);
  lines.push(`Report ID: ${report.metadata.reportId}`);
  lines.push(`Generated: ${report.metadata.generatedAt}`);
  lines.push('');

  // Summary Section
  lines.push('SUMMARY');
  lines.push('Metric,Value');
  lines.push(`Total Tools,${report.summary.totalToolCount}`);
  lines.push(`Monthly Spend,$${report.summary.totalMonthlySpend.toLocaleString()}`);
  lines.push(`Monthly Waste,$${report.summary.totalMonthlyWaste.toLocaleString()}`);
  lines.push(`Annual Savings Potential,$${report.summary.totalYearlySavings.toLocaleString()}`);
  lines.push(`Average Risk Score,${report.summary.averageRiskScore}/100`);
  lines.push(`Average Efficiency Score,${report.summary.averageEfficiencyScore}/100`);
  lines.push(`Consolidation Potential,$${report.summary.consolidationPotential.toLocaleString()}`);
  lines.push('');

  // Tools Section
  lines.push('TOOLS ANALYZED');
  lines.push('Tool,Plan,Seats,Monthly Cost,Total Spend,Utilization %,Active Users,Inactive Users,Monthly Waste,Annual Waste,Waste %,Risk Score,Efficiency Score');
  report.tools.forEach(tool => {
    lines.push(
      `"${tool.name}","${tool.plan}",${tool.seats},` +
      `$${tool.monthlyCost.toLocaleString()},$${tool.totalSpend.toLocaleString()},` +
      `${tool.utilization}%,${tool.activeUsers},${tool.inactiveUsers},` +
      `$${tool.waste.monthly.toLocaleString()},$${tool.waste.annual.toLocaleString()},${tool.waste.percentage}%,` +
      `${tool.riskScore},${tool.efficiencyScore}`
    );
  });
  lines.push('');

  // Top Recommendations
  lines.push('TOP RECOMMENDATIONS');
  lines.push('Tool,Recommendation,Description,Monthly Savings,Severity');
  report.topRecommendations.slice(0, 10).forEach(rec => {
    lines.push(
      `"${rec.tool}","${rec.title}","${(rec.description || '').replace(/"/g, '""')}",` +
      `$${rec.monthlySavings.toLocaleString()},"${rec.severity || 'medium'}"`
    );
  });

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadBlob(
    blob,
    `AI-Spend-Audit-${organizationName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`,
    'text/csv'
  );
}

/**
 * Helper function to trigger browser download
 */
function downloadBlob(blob, filename, type) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.type = type;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validate report data
 */
export function validateReportData(auditData) {
  if (!auditData) return false;
  if (!auditData.processedTools || !Array.isArray(auditData.processedTools)) return false;
  if (auditData.processedTools.length === 0) return false;
  return true;
}