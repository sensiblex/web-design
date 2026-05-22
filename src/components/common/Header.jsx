import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full px-[120px] py-[60px] flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <Bitcoin className="w-6 h-6 text-white" />
        </div>
        <span className="font-inter font-semibold text-lg tracking-wider text-white">
          CRAPPO
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8">
        <Link to="/market" className="text-white text-base font-normal hover:text-accent transition-colors">
          Market
        </Link>
        <Link to="/features" className="text-white text-base font-normal hover:text-accent transition-colors">
          Features
        </Link>
        <Link to="/about" className="text-white text-base font-normal hover:text-accent transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-white text-base font-normal hover:text-accent transition-colors">
          Contact
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-white text-base font-medium hover:text-accent transition-colors">
          Login
        </Link>
        <Link to="/register">
          <button className="bg-accent text-white px-8 py-3.5 rounded-32 font-medium hover:bg-accent/90 transition-colors">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
