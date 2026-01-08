import React from 'react';
import { Globe, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center">
      <nav className="misty-glass px-8 py-3 rounded-full flex items-center max-w-5xl w-full justify-between shadow-[0_8px_32px_rgba(34,211,238,0.1)] border-atlas-accent/10">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => window.location.hash = '/'}
        >
          <div className="bg-atlas-accent/20 p-2.5 rounded-xl group-hover:bg-atlas-accent/30 transition-all">
            <Globe className="text-atlas-accent group-hover:rotate-[20deg] transition-transform duration-700" size={20} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-2xl tracking-tight text-white group-hover:text-atlas-accent transition-colors">Global Insight</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-atlas-accent/80 font-bold">World Intelligence Archive</span>
          </div>
        </div>

        <button className="bg-atlas-accent/10 hover:bg-atlas-accent/30 p-2.5 rounded-full text-atlas-accent transition-all border border-atlas-accent/20">
          <Search size={18} />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;