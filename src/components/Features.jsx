// components/Features.jsx

function Features() {
  const features = [
    {
      title: "60-Second Scan",
      desc: "Connect your accounts and see the first set of optimizations in less than a minute.",
    },
    {
      title: "22% Avg. Savings",
      desc: "Our users save an average of 22% on their monthly AI tool invoices through consolidation.",
    },
    {
      title: "Read-Only Access",
      desc: "We never touch your data. Our platform uses read-only billing APIs to ensure total security.",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid layout with high-contrast, simple line accents */}
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          {features.map((item, index) => (
            <div key={index} className="relative">
              
              {/* Minimalist Green Accent Line */}
              <div className="w-10 h-1 bg-green-500 mb-8 rounded-full"></div>
              
              <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-lg font-medium">
                {item.desc}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;