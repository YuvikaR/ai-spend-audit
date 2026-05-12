// components/TrustedSection.jsx

function TrustedSection() {
  const partners = ["OpenAI", "Anthropic", "Cohere", "Perplexity", "Midjourney"];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Large, Airy Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter">
            Audit once. <span className="text-green-500">Save monthly.</span>
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Distributed Logos: No borders, just pure spacing */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-16 md:gap-x-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {partners.map((name) => (
            <div key={name} className="group cursor-default">
              <span className="text-3xl md:text-4xl font-bold text-gray-400 group-hover:text-black transition-all duration-300 tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle Bottom Caption */}
        <p className="text-center mt-24 text-gray-300 font-mono text-sm tracking-[0.3em] uppercase">
          Supported Infrastructure & Model Providers
        </p>
        
      </div>
    </section>
  );
}

export default TrustedSection;