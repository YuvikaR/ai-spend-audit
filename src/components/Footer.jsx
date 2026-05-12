// components/Footer.jsx

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h3 className="font-black text-black tracking-tighter text-lg">
              AI SPEND AUDIT
            </h3>
            <p className="text-gray-400 mt-1 text-sm font-medium">
              © 2026. Designed for modern finance teams.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Contact Support</a>
          </nav>

        </div>
      </div>
    </footer>
  );
}

export default Footer;