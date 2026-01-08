
import React from 'react';
import { Search, ChevronDown, Compass } from 'lucide-react';
import { Region } from '../types';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedRegion: Region;
  onRegionChange: (val: Region) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-12">
      <div className="relative w-full md:max-w-xl group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH THE GLOBE..."
          className="w-full bg-atlas-bg/60 border border-atlas-secondary/20 rounded-2xl py-4 pl-14 pr-8 focus:outline-none focus:border-atlas-accent/50 text-sm font-bold tracking-widest uppercase placeholder:text-atlas-secondary/40 text-white transition-all shadow-xl"
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-atlas-accent">
          <Search size={18} />
        </div>
      </div>

      <div className="relative w-full md:w-64">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value as Region)}
          className="appearance-none w-full bg-atlas-bg/60 border border-atlas-secondary/20 rounded-2xl px-8 py-4 focus:outline-none focus:border-atlas-accent/50 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all text-white shadow-xl"
        >
          <option value={Region.All} className="bg-atlas-bg">All Territories</option>
          {Object.values(Region).filter(r => r !== Region.All).map(region => (
            <option key={region} value={region} className="bg-atlas-bg">{region.toUpperCase()}</option>
          ))}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-atlas-accent">
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
