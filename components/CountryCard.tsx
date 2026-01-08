
import React from 'react';
import { Country } from '../types';

interface CountryCardProps {
  country: Country;
  onClick: (code: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div
      onClick={() => onClick(country.cca3)}
      className="group cursor-pointer flex flex-col misty-glass overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)] hover:-translate-y-2 rounded-[2rem]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={country.name.common}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-atlas-bg via-atlas-bg/10 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="font-serif text-3xl leading-none mb-2 text-white drop-shadow-lg">
            {country.name.common}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-atlas-accent">
            {country.region}
          </p>
        </div>
      </div>

      <div className="p-6 bg-atlas-bg/40 border-t border-white/5 grid grid-cols-2 gap-4">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-widest text-atlas-secondary block mb-1">Density</span>
          <span className="text-xs font-medium text-atlas-light">{(country.population / 1000000).toFixed(1)}M citizens</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] uppercase font-bold tracking-widest text-atlas-secondary block mb-1">Capital</span>
          <span className="text-xs font-medium truncate block text-atlas-light">{country.capital?.[0] || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
