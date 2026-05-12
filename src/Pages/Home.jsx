// Home.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import TrustedSection from "../components/sec1";
import CTASection from "../components/cta";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen text-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <TrustedSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;