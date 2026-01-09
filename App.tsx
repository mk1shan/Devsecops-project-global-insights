
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (route.startsWith('#/country/')) {
      const code = route.replace('#/country/', '');
      return <CountryDetail code={code} />;
    }
    return <Home />;
  };

  return (
    <div className="font-sans text-atlas-light selection:bg-atlas-accent selection:text-atlas-bg">
      <Navbar />
      <main>
        {renderPage()}
      </main>
      
      <footer className="py-32 border-t border-white/5 mx-6 md:mx-12 mt-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
          <div className="flex flex-col">
            <div className="font-serif text-3xl italic tracking-tighter text-white">Global Insights</div>
            <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-atlas-accent">The World Details Archive</div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-center">RestCountries API Synchronizer</div>
            <div className="text-[8px] opacity-60 uppercase tracking-widest">© 2025 International Geospatial Records</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
