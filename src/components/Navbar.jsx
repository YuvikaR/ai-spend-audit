import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-6 pointer-events-none">
      <nav className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-xl shadow-black/5 rounded-2xl p-2 flex items-center justify-between pointer-events-auto">

        {/* LOGO SECTION - Enhanced Visibility */}
        <Link to="/" className="flex items-center group">
          <div className="bg-gray-50 p-2 rounded-xl group-hover:bg-green-50 transition-colors duration-300">
            <img
              src={logo}
              alt="AI Spend Audit Logo"
              /* Increased size and used 'brightness-110' to make colors pop */
              className="w-12 h-12 md:w-14 md:h-14 object-contain filter brightness-110 contrast-110 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="ml-4">
            <span className="block font-black text-lg tracking-tighter leading-none text-black">
              CREDEX
            </span>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
              AI Audit
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-1 md:gap-4 pr-2">
          <Link
            to="/"
            className="hidden sm:block px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            Home
          </Link>

          <Link
            to="/audit"
            className="bg-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-all duration-300 shadow-lg shadow-black/10"
          >
            Start Audit
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;