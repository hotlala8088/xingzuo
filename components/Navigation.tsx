
import React from 'react';

interface NavigationProps {
  currentView: 'home' | 'oracle' | 'compatibility';
  setView: (view: 'home' | 'oracle' | 'compatibility') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 pt-[env(safe-area-inset-top)]">
      <div className="px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <div 
          className="text-xl md:text-2xl font-cinzel font-bold text-white cursor-pointer tracking-widest flex items-center gap-2 active:opacity-70"
          onClick={() => setView('home')}
        >
          <span className="text-yellow-400">✧</span>
          星启天机
        </div>
        <div className="flex gap-4 md:gap-8 items-center text-xs md:text-sm uppercase tracking-wider font-sans">
          <button 
            onClick={() => setView('home')}
            className={`px-2 py-1 transition-colors ${currentView === 'home' ? 'text-yellow-400 border-b border-yellow-400/50' : 'text-slate-400'}`}
          >
            每日星运
          </button>
          <button 
            onClick={() => setView('compatibility')}
            className={`px-2 py-1 transition-colors ${currentView === 'compatibility' ? 'text-yellow-400 border-b border-yellow-400/50' : 'text-slate-400'}`}
          >
            星座契合
          </button>
          <button 
            onClick={() => setView('oracle')}
            className={`px-2 py-1 transition-colors ${currentView === 'oracle' ? 'text-yellow-400 border-b border-yellow-400/50' : 'text-slate-400'}`}
          >
            星语占卜
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
