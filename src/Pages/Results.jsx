// Results.jsx
import { SendReportButton } from "../components/SendReportComponent";
import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  processAuditTools,
  generateAuditInsight,
  getTopRecommendations,
  TOOL_METADATA,
} from "../utils/optimizationEngine";

function Results() {
  const location = useLocation();
  const auditData = location.state;

  if (!auditData) {
    return <Navigate to="/audit" />;
  }

  // Process audit with optimization engine
  const auditResults = processAuditTools(auditData.tools);
  const insight = generateAuditInsight(auditResults);
  const topRecommendations = getTopRecommendations(auditResults);

 const getRiskBadgeColor = (score) => {
    if (score >= 70) return "bg-red-100 text-red-700 border-red-300";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  const getEfficiencyColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

 

  const getSeverityBadge = (severity) => {
    const styles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-blue-100 text-blue-700",
    };
    return styles[severity] || styles.low;
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mt-24 mx-auto px-6 py-20">
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm mb-6 border ${getRiskBadgeColor(
            auditResults.averageRiskScore
          )}`}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          {auditResults.averageRiskScore >= 70
            ? "Optimization Needed"
            : auditResults.averageRiskScore >= 50
            ? "Moderate Risk"
            : "Healthy Efficiency"}
        </div>

        {/* Main Headline */}
        <h1 className="text-7xl font-bold leading-tight max-w-4xl mb-6">
          <span className="text-slate-900">Save </span>
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            ${Math.round(auditResults.totalYearlySavings / 1000)}k/year
          </span>
          <span className="text-slate-900"> on AI tools</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
          Your {auditData.teamSize}-person team is spending{" "}
          <span className="font-semibold text-slate-900">
            ${Math.round(auditResults.totalMonthlyWaste)}/month
          </span>{" "}
          on overlapping tools and underutilized licenses.
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Monthly Waste
            </p>
            <p className="text-3xl font-bold text-red-600 mt-3">
              ${Math.round(auditResults.totalMonthlyWaste)}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Annual Potential
            </p>
            <p className="text-3xl font-bold text-green-600 mt-3">
              ${Math.round(auditResults.totalYearlySavings / 1000)}k
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Risk Score
            </p>
            <p
              className={`text-3xl font-bold mt-3 ${getEfficiencyColor(
                100 - auditResults.averageRiskScore
              )}`}
            >
              {auditResults.averageRiskScore}%
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              Tools Audited
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-3">
              {auditResults.totalToolCount}
            </p>
          </div>
        </div>
      </section>

      {/* INSIGHTS & HEALTH SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Insight Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-10 border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">{insight.emoji}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {insight.title}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded mt-2"></div>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {insight.insight}
            </p>

            {/* Consolidation Alert */}
            {auditResults.overlaps.length > 0 && (
              <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="font-semibold text-amber-900 mb-3">
                  ⚡ {auditResults.overlaps.length} Tool Redundanc
                  {auditResults.overlaps.length > 1 ? "ies" : "y"} Detected
                </p>
                <p className="text-sm text-amber-800">
                  You have overlapping capabilities across{" "}
                  <strong>
                    {auditResults.overlaps.reduce((sum, o) => sum + o.count, 0)}{" "}
                    tools
                  </strong>
                  . Consolidating could save{" "}
                  <strong>
                    ${Math.round(auditResults.consolidationPotential)}/month
                  </strong>
                  .
                </p>
              </div>
            )}

            {/* Action Buttons */}
             <div className="flex gap-4 mt-10 flex-wrap">
              <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition">
                Book Credex Consultation
              </button>
              
              {/* ✅ FIX: Use auditResults instead of audit */}
              <SendReportButton
                auditData={auditResults}
                organizationName="Your Company"
              />
            </div>
          </div>

          {/* Efficiency Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-10 text-white shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-4">
              Portfolio Health
            </h3>

            <div className="space-y-6">
              {/* Efficiency Score */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Efficiency Score</span>
                  <span className="text-2xl font-bold text-green-400">
                    {auditResults.averageEfficiencyScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    style={{
                      width: `${auditResults.averageEfficiencyScore}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Average Risk */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Risk Level</span>
                  <span className="text-2xl font-bold text-red-400">
                    {auditResults.averageRiskScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500"
                    style={{
                      width: `${auditResults.averageRiskScore}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-6 border-t border-slate-700 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Inactive Users</span>
                  <span className="font-semibold">
                    {auditResults.processedTools.reduce(
                      (sum, t) => sum + t.seatUtilization.inactiveUsers,
                      0
                    )}{" "}
                    seats
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Tool Overlap</span>
                  <span className="font-semibold">
                    {auditResults.overlaps.length} instance
                    {auditResults.overlaps.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP RECOMMENDATIONS */}
      {topRecommendations.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold mb-10">Top Recommendations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {topRecommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityBadge(
                        rec.severity
                      )}`}
                    >
                      {rec.severity.toUpperCase()}
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg max-w-xs">
                      {rec.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {rec.description}
                </p>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
                  <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">
                    Monthly Savings
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    ${rec.monthlySavings}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ${rec.monthlySavings * 12}/year
                  </p>
                </div>

                <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
                  {rec.action}
                </button>

                {rec.tool && (
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    Tool: <strong>{rec.tool}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TOOL BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10">Detailed Tool Analysis</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {auditResults.processedTools.map((tool, index) => {
            const metadata = TOOL_METADATA[tool.tool] || { icon: "🚀" };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-md transition duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                    {metadata.icon}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${getRiskBadgeColor(
                      tool.riskScore
                    )}`}
                  >
                    Risk: {tool.riskScore}%
                  </div>
                </div>

                {/* Tool Name */}
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  {tool.tool}
                </h3>

                {/* Utilization Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Utilization
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {tool.seatUtilization.utilization}%
                    </p>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        tool.seatUtilization.utilization >= 75
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : tool.seatUtilization.utilization >= 50
                          ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                          : "bg-gradient-to-r from-red-400 to-red-500"
                      }`}
                      style={{
                        width: `${tool.seatUtilization.utilization}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {tool.seatUtilization.activeUsers}/{tool.seats} users active
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Plan</span>
                    <span className="font-semibold text-slate-900">
                      {tool.plan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Seats</span>
                    <span className="font-semibold text-slate-900">
                      {tool.seats}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Cost</span>
                    <span className="font-semibold text-slate-900">
                      ${tool.monthlyCost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Use Case</span>
                    <span className="font-semibold text-slate-900">
                      {tool.useCase}
                    </span>
                  </div>
                </div>

                {/* Spend Breakdown */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 mb-6">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                    Monthly Breakdown
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Total Spend</span>
                      <span className="font-bold text-slate-900">
                        ${tool.totalSpend}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Waste</span>
                      <span className="font-bold text-red-600">
                        ${tool.waste.totalWaste}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-slate-300">
                      <span className="font-semibold text-slate-900">
                        Savings Potential
                      </span>
                      <span className="font-bold text-green-600">
                        ${tool.estimatedSavings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Waste Details */}
                {tool.waste.totalWaste > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-3">
                      Waste Sources
                    </p>
                    <div className="space-y-2 text-sm">
                      {tool.waste.inactiveSeatWaste > 0 && (
                        <div className="flex justify-between text-red-900">
                          <span>Inactive seats:</span>
                          <span className="font-semibold">
                            ${tool.waste.inactiveSeatWaste}
                          </span>
                        </div>
                      )}
                      {tool.waste.planOverspendWaste > 0 && (
                        <div className="flex justify-between text-red-900">
                          <span>Plan overspend:</span>
                          <span className="font-semibold">
                            ${tool.waste.planOverspendWaste}
                          </span>
                        </div>
                      )}
                      {tool.waste.apiAlternativeWaste > 0 && (
                        <div className="flex justify-between text-red-900">
                          <span>API opportunity:</span>
                          <span className="font-semibold">
                            ${tool.waste.apiAlternativeWaste}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommendations for this tool */}
                {tool.recommendations.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">
                      Recommendations
                    </p>
                    <ul className="text-sm text-blue-900 space-y-1">
                      {tool.recommendations.slice(0, 2).map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">→</span>
                          <span>{rec.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

            
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Results;
