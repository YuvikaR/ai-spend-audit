// pages/Audit.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const toolPlans = {
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],

  "GitHub Copilot": [
    "Individual",
    "Business",
    "Enterprise",
  ],

  Claude: [
    "Free",
    "Pro",
    "Max",
    "Team",
    "Enterprise",
    "API Direct",
  ],

  ChatGPT: [
    "Plus",
    "Team",
    "Enterprise",
    "API Direct",
  ],

  "Anthropic API": ["API Direct"],

  "OpenAI API": ["API Direct"],

  Gemini: ["Pro", "Ultra", "API"],

  Windsurf: [
    "Free",
    "Pro",
    "Teams",
    "Enterprise",
  ],
};

const useCases = [
  "Coding",
  "Writing",
  "Data",
  "Research",
  "Mixed",
];

function Audit() {
  const [teamSize, setTeamSize] = useState(14);

  const navigate = useNavigate();

  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem("auditTools");

    return saved
      ? JSON.parse(saved)
      : [
          {
            tool: "ChatGPT",
            plan: "Plus",
            monthlyCost: 20,
            seats: 1,
            useCase: "Writing",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "auditTools",
      JSON.stringify(tools)
    );
  }, [tools]);

  const handleChange = (index, field, value) => {
    const updated = [...tools];

    updated[index][field] = value;

    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "Claude",
        plan: "Pro",
        monthlyCost: 0,
        seats: 1,
        useCase: "Coding",
      },
    ]);
  };

  const removeTool = (index) => {
    const updated = tools.filter(
      (_, i) => i !== index
    );

    setTools(updated);
  };

  const generateAudit = () => {
    const auditReport = {
      teamSize: teamSize,

      totalTools: tools.length,

      generatedAt: new Date().toLocaleString(),

      tools: tools.map((tool) => ({
        tool: tool.tool,

        plan: tool.plan,

        monthlyCost: Number(tool.monthlyCost),

        seats: Number(tool.seats),

        useCase: tool.useCase,

        totalSpend:
          Number(tool.monthlyCost) *
          Number(tool.seats),
      })),
    };

    navigate("/results", {
      state: auditReport,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="max-w-7xl mx-auto mt-24">
    
    <div className="flex flex-col items-center text-center">
      
      {/* Small Technical Badge */}
      <div className="inline-flex items-center gap-3 border border-gray-100 px-4 py-1 rounded-full mb-10 shadow-sm">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Precision Analysis Engine
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter">
        Audit Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400">
          AI Ecosystem
        </span>
      </h1>

      <p className="text-gray-500 max-w-2xl mx-auto mt-10 text-lg md:text-xl font-medium leading-relaxed">
        Input your current software stack to identify overlapping 
        capabilities and discover <span className="text-black font-bold">cost-saving consolidations</span> in real-time.
      </p>

      {/* Decorative Minimal Line - matches your Features section */}
      <div className="mt-16 w-24 h-1 bg-green-500 rounded-full"></div>

    </div>

  </div>

        {/* TEAM SIZE */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <label className="text-lg font-semibold text-black">
            Team Size:
          </label>

          <input
            type="number"
            value={teamSize}
            onChange={(e) =>
              setTeamSize(e.target.value)
            }
            className="bg-white border border-gray-300 rounded-xl px-5 py-3 w-40 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* TOOL CARDS */}
        <div className="space-y-8 mt-14">
          {tools.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end">
                {/* TOOL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    AI Tool
                  </label>

                  <select
                    value={item.tool}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "tool",
                        e.target.value
                      )
                    }
                    className="w-full border-b border-gray-300 bg-transparent pb-3 outline-none text-xl"
                  >
                    {Object.keys(toolPlans).map(
                      (tool) => (
                        <option key={tool}>
                          {tool}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* PLAN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Plan
                  </label>

                  <select
                    value={item.plan}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "plan",
                        e.target.value
                      )
                    }
                    className="w-full border-b border-gray-300 bg-transparent pb-3 outline-none text-xl"
                  >
                    {toolPlans[item.tool].map(
                      (plan) => (
                        <option key={plan}>
                          {plan}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* COST */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Monthly Cost ($)
                  </label>

                  <input
                    type="number"
                    value={item.monthlyCost}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "monthlyCost",
                        e.target.value
                      )
                    }
                    className="w-full border-b border-gray-300 bg-transparent pb-3 outline-none text-xl"
                  />
                </div>

                {/* SEATS */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Seats
                  </label>

                  <input
                    type="number"
                    value={item.seats}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "seats",
                        e.target.value
                      )
                    }
                    className="w-full border-b border-gray-300 bg-transparent pb-3 outline-none text-xl"
                  />
                </div>

                {/* USE CASE + DELETE */}
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Use Case
                    </label>

                    <select
                      value={item.useCase}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "useCase",
                          e.target.value
                        )
                      }
                      className="w-full border-b border-gray-300 bg-transparent pb-3 outline-none text-xl"
                    >
                      {useCases.map((use) => (
                        <option key={use}>
                          {use}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      removeTool(index)
                    }
                    className="text-red-500 hover:scale-110 transition text-2xl pb-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ADD BUTTON */}
        <div className="mt-10">
          <button
            onClick={addTool}
            className="bg-white border border-gray-300 rounded-2xl px-8 py-5 text-lg font-semibold hover:shadow-xl transition"
          >
            + Add Tool
          </button>
        </div>

        {/* TIP BOX */}
        <div className="mt-10 bg-white border border-purple-200 rounded-[2rem] p-6 max-w-4xl shadow-sm">
          <div className="flex gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
              ✦
            </div>

            <div>
              <h3 className="text-xl font-bold text-purple-600">
                Pro-Tip
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                Ensure you include enterprise-wide seats.
                Our engine will cross-reference these
                against current AI platform pricing models
                for potential bulk discounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTION BAR */}
      <div className="sticky bottom-0 left-0 w-full border-t border-gray-200 bg-white/90 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-gray-700 font-medium text-lg">
            Estimated Analysis Time: ~45 seconds
          </p>

          <button
            onClick={generateAudit}
            className="bg-black text-white px-10 py-5 rounded-3xl text-2xl font-bold hover:scale-[1.02] transition shadow-xl flex items-center gap-3"
          >
            Generate Audit
            <span className="text-xl">📊</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Audit;