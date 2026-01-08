
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Users, Globe, Activity } from 'lucide-react';
import { fetchCountryByCode, fetchCountriesByCodes } from '../services/api';
import { Country } from '../types';

interface CountryDetailProps { code: string; }

const CountryDetail: React.FC<CountryDetailProps> = ({ code }) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [borders, setBorders] = useState<{ common: string; cca3: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);
        setCountry(data);
        if (data.borders && data.borders.length > 0) {
          const borderCountries = await fetchCountriesByCodes(data.borders);
          setBorders(borderCountries.map(b => ({ common: b.name.common, cca3: b.cca3 })));
        } else {
          setBorders([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCountryDetails();
  }, [code]);

  if (loading || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-serif text-3xl italic opacity-20 animate-pulse text-atlas-accent">Syncing World Data...</div>
      </div>
    );
  }

  const handleBack = () => window.location.hash = '/';
  const navigateToBorder = (cca3: string) => window.location.hash = `/country/${cca3}`;

  return (
    <div className="page-fade-in pt-32 pb-40">
      <div className="container mx-auto px-6 md:px-12">
        <button
          onClick={handleBack}
          className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-atlas-accent hover:text-white transition-all mb-20"
        >
          <ArrowLeft size={16} />
          <span>Back to Global Index</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="relative">
            <div className="absolute inset-0 bg-atlas-accent/10 blur-[120px] -z-10 rounded-full scale-110"></div>
            <div className="misty-glass p-4 rounded-[2.5rem] overflow-hidden">
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-full h-auto rounded-[1.8rem] shadow-2xl transition-all duration-700"
              />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="misty-glass p-8 rounded-3xl">
                <Globe className="text-atlas-accent mb-4" size={20} />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-atlas-secondary mb-1">Sector</h4>
                <p className="text-xl font-serif text-white">{country.region}</p>
              </div>
              <div className="misty-glass p-8 rounded-3xl">
                <Users className="text-atlas-accent mb-4" size={20} />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-atlas-secondary mb-1">Census</h4>
                <p className="text-xl font-serif text-white">{(country.population / 1000000).toFixed(2)}M</p>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h1 className="font-serif text-7xl md:text-[8rem] leading-[0.8] tracking-tighter mb-8 text-white">
                {country.name.common}
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-atlas-accent/40"></div>
                <p className="text-lg font-serif italic text-atlas-accent/80">{country.name.official}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-white/5 pt-16">
              <div className="space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-atlas-accent">
                    <MapPin size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Primary Hub</span>
                  </div>
                  <p className="text-3xl font-light text-white">{country.capital?.[0] || 'Unknown'}</p>
                  <p className="text-sm text-atlas-secondary font-light">{country.subregion || 'Global Territory'}</p>
                </section>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center gap-3 text-atlas-accent">
                    <Activity size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Vital Stats</span>
                  </div>
                  <div className="space-y-4 text-sm font-light">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-atlas-secondary">Currencies</span>
                      <span className="text-white text-right font-medium">{Object.values(country.currencies || {}).map(c => c.name).join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-atlas-secondary">Linguistics</span>
                      <span className="text-white text-right font-medium">{Object.values(country.languages || {}).join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-atlas-secondary">Domain</span>
                      <span className="text-atlas-accent font-bold">{country.tld?.join(', ')}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="pt-20 border-t border-white/5">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-atlas-accent mb-8">Border Protocols</h3>
              <div className="flex flex-wrap gap-4">
                {borders.length > 0 ? (
                  borders.map((border) => (
                    <button
                      key={border.cca3}
                      onClick={() => navigateToBorder(border.cca3)}
                      className="misty-glass px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-atlas-accent hover:text-atlas-bg transition-all active:scale-95 text-atlas-accent"
                    >
                      {border.common}
                    </button>
                  ))
                ) : (
                  <div className="text-xs italic text-atlas-secondary/40 px-10 py-8 border border-dashed border-white/10 rounded-[2rem] w-full text-center">
                    No terrestrial border records identified.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
