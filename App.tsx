
import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import Navigation from './components/Navigation';
import ZodiacGrid from './components/ZodiacGrid';
import HoroscopeDetail from './components/HoroscopeDetail';
import OracleChat from './components/OracleChat';
import CompatibilityTool from './components/CompatibilityTool';
import { ZodiacData } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'oracle' | 'compatibility'>('home');
  const [selectedSign, setSelectedSign] = useState<ZodiacData | null>(null);

  const handleSelectSign = (sign: ZodiacData) => {
    setSelectedSign(sign);
  };

  const renderContent = () => {
    switch (view) {
      case 'oracle':
        return <OracleChat />;
      case 'compatibility':
        return <CompatibilityTool />;
      case 'home':
      default:
        if (selectedSign) {
          return <HoroscopeDetail sign={selectedSign} onBack={() => setSelectedSign(null)} />;
        }
        return (
          <div className="space-y-6 md:space-y-12 animate-fadeIn">
            <header className="text-center space-y-2 md:space-y-4 pt-6 md:pt-10 px-4">
              <h1 className="text-4xl md:text-8xl font-sans font-bold text-white tracking-widest break-words">
                星启 <span className="text-yellow-400">天机</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-xl font-light tracking-[0.2em] max-w-2xl mx-auto uppercase font-sans">
                解读宇宙编码 洞悉宿命先机
              </p>
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mx-auto mt-4 md:mt-8"></div>
            </header>
            
            <section className="max-w-6xl mx-auto">
              <ZodiacGrid onSelect={handleSelectSign} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-12 selection:bg-yellow-400 selection:text-slate-900">
      <StarBackground />
      <Navigation currentView={view} setView={(v) => { setView(v); setSelectedSign(null); }} />
      
      <main className="container mx-auto pb-safe">
        {renderContent()}
      </main>

      <footer className="mt-12 md:mt-20 text-center text-slate-600 text-[10px] md:text-xs tracking-widest space-y-4 pb-safe font-sans">
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Threads</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">TikTok</a>
        </div>
        <p className="px-4 uppercase tracking-[0.1em]">© 2024 星启天机 CELESTIAL ORACLE. 由人工智能星图提供技术支持.</p>
      </footer>
    </div>
  );
};

export default App;
