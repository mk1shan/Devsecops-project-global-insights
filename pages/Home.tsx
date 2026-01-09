import React, { useState, useEffect, useMemo } from 'react';
import SearchAndFilter from '../components/SearchAndFilter';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/api';
import { Country, Region } from '../types';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>(Region.All);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === Region.All || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  const handleCountryClick = (code: string) => {
    window.location.hash = `/country/${code}`;
  };

  return (
    <div className="page-fade-in">
      <section className="container mx-auto px-6 pt-44 pb-20">
        <div className="mb-12 border-b border-atlas-secondary/10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-atlas-accent mb-4 block">Centralize Intelligence</span>
              <h2 className="font-serif text-6xl md:text-8xl mb-6 text-white leading-[0.9] tracking-tighter">Global Insight</h2>
              <p className="text-atlas-secondary text-sm md:text-base leading-relaxed opacity-80 max-w-lg">
                Access a comprehensive repository of international data, demographics, and regional identifiers synchronized in real-time.
              </p>
            </div>
          </div>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-atlas-bg/40 border border-white/5 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} onClick={handleCountryClick} />
            ))}
          </div>
        )}
      </section>

      <section className="py-40 bg-atlas-accent/[0.01] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-atlas-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="font-serif text-9xl text-atlas-accent opacity-[0.03] mb-8 select-none">Insights</div>
          <h2 className="font-serif text-4xl md:text-6xl max-w-4xl mx-auto leading-tight mb-20 italic text-white/95">
            Deciphering the global landscape through granular geographic detail.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="misty-glass p-10 rounded-[2rem] space-y-6 hover:border-atlas-accent/30 transition-colors group">
               <div className="w-12 h-1 w-1 bg-atlas-accent/30 group-hover:w-full transition-all duration-700"></div>
               <p className="text-base italic leading-relaxed text-atlas-light/70">"A precise look into the demographic shifts across sovereign borders."</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-atlas-accent">Global Metrics Council</p>
            </div>
            <div className="misty-glass p-10 rounded-[2rem] space-y-6 hover:border-atlas-accent/30 transition-colors group">
               <div className="w-12 h-1 w-1 bg-atlas-accent/30 group-hover:w-full transition-all duration-700"></div>
               <p className="text-base italic leading-relaxed text-atlas-light/70">"The interface bridges the gap between raw API data and professional analysis."</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-atlas-accent">Geospatial Labs</p>
            </div>
            <div className="misty-glass p-10 rounded-[2rem] space-y-6 hover:border-atlas-accent/30 transition-colors group">
               <div className="w-12 h-1 w-1 bg-atlas-accent/30 group-hover:w-full transition-all duration-700"></div>
               <p className="text-base italic leading-relaxed text-atlas-light/70">"Navigation through international hierarchies has never been more intuitive."</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-atlas-accent">World Data Review</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
