import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Subtle Green Accent Line to match Features/Trusted sections */}
        <div className="w-16 h-1 bg-green-500 mx-auto mb-10 rounded-full"></div>

        <h2 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter">
          Ready to reclaim <br /> 
          <span className="text-gray-400">your budget?</span>
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mt-10 text-xl font-medium leading-relaxed">
          Join 400+ finance teams already optimizing their AI 
          infrastructure for peak performance and minimal waste.
        </p>

        <div className="mt-16">
          <button
            onClick={() => navigate("/audit")}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-black rounded-full hover:bg-green-600 hover:shadow-[0_10px_40px_rgba(34,197,94,0.3)] active:scale-95"
          >
            Get My Free Audit
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* Small Trust Indicator */}
        <p className="mt-8 text-xs font-bold text-gray-300 uppercase tracking-[0.3em]">
          No credit card required • Instant report
        </p>
        
      </div>
    </section>
  );
}

export default CTASection;