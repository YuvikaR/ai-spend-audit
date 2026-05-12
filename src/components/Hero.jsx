import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative w-full py-24 lg:py-40 overflow-hidden bg-white">
      
      {/* BACKGROUND ACCENT: Subtle grid pattern for a "Tech" feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        
        {/* TOP BADGE: Pill style */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm hover:border-green-200 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              AI Optimization Engine v2.4
            </span>
          </div>
        </div>

        {/* MAIN HEADING: Stacked and Bold */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-black mb-8 leading-[0.95]">
          Audit Your Spend. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500">
            Reclaim Your Budget.
          </span>
        </h1>

        {/* SUBTITLE: Centered and wider line-height */}
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          Stop overpaying for your AI stack. Get CFO-grade precision audits for 
          engineering teams and discover hidden savings in under 60 seconds.
        </p>

        {/* ACTIONS: Large centered buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link to="/audit">
            <button className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300">
              Audit My AI Spend
            </button>
          </Link>
          <Link to="/reports">
            <button className="text-gray-900 font-bold text-lg flex items-center gap-2 group">
              See Example Report 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>

        {/* FLOATING PREVIEW CARD: Minimalist dashboard feel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-[2.5rem] blur-2xl opacity-50"></div>
          
          <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
              <div className="text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Annual Savings</p>
                <h2 className="text-4xl font-black text-black">$4,280.00</h2>
              </div>
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-sm">
                +14.2% Efficiency
              </div>
            </div>

            {/* Simulated Savings List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                <span className="text-gray-600 font-medium">Redundant OpenAI</span>
                <span className="text-red-500 font-bold">-$1,240</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                <span className="text-gray-600 font-medium">Unused Anthropic</span>
                <span className="text-red-500 font-bold">-$820</span>
              </div>
            </div>
          </div>

          {/* Social Proof Text */}
          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm font-medium">
            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
            Enterprise-grade SOC2 data protection
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;