
import React from 'react';
import { UserProfile } from '../types';
import { ZODIAC_SIGNS } from '../constants';

interface NavigationProps {
  currentView: 'home' | 'oracle' | 'compatibility';
  setView: (view: 'home' | 'oracle' | 'compatibility') => void;
  user: UserProfile | null;
  onOpenProfile: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, user, onOpenProfile }) => {
  const userZodiac = user ? ZODIAC_SIGNS.find(s => s.id === user.zodiacId) : null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5 pt-safe hidden lg:block">
        <div className="px-10 py-4 flex justify-between items-center">
          <div 
            className="text-2xl font-cinzel font-bold text-white cursor-pointer tracking-widest flex items-center gap-2 active:opacity-70 group"
            onClick={() => setView('home')}
          >
            <span className="text-amber-500 group-hover:rotate-180 transition-transform duration-700">✧</span>
            星启天机
          </div>
          
          <div className="flex gap-12 items-center text-[11px] uppercase tracking-[0.4em] font-sans font-bold">
            <button 
              onClick={() => setView('home')}
              className={`transition-all hover:text-white relative py-2 ${currentView === 'home' ? 'text-amber-400' : 'text-slate-500'}`}
            >
              每日星运
              {currentView === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>}
            </button>
            <button 
              onClick={() => setView('compatibility')}
              className={`transition-all hover:text-white relative py-2 ${currentView === 'compatibility' ? 'text-amber-400' : 'text-slate-500'}`}
            >
              合盘分析
              {currentView === 'compatibility' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>}
            </button>
            <button 
              onClick={() => setView('oracle')}
              className={`transition-all hover:text-white relative py-2 ${currentView === 'oracle' ? 'text-amber-400' : 'text-slate-500'}`}
            >
              星语占卜
              {currentView === 'oracle' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenProfile}
              className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-amber-400/40 px-5 py-2 rounded-full transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-all border border-amber-500/20">
                {userZodiac ? userZodiac.symbol : '?'}
              </div>
              <span className="text-[11px] text-slate-300 font-sans tracking-widest font-bold group-hover:text-amber-400 transition-colors">
                {user ? user.name : '开启星魂'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-[100] glass border-t border-white/5 pb-safe lg:hidden px-6 py-4">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setView('home')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'home' ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
          >
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">★</span>
            <span className="text-[9px] uppercase tracking-tighter font-bold">运势</span>
          </button>
          <button 
            onClick={() => setView('compatibility')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'compatibility' ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
          >
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">⚭</span>
            <span className="text-[9px] uppercase tracking-tighter font-bold">合盘</span>
          </button>
          <button 
            onClick={() => setView('oracle')}
            className={`flex flex-col items-center gap-1 transition-all ${currentView === 'oracle' ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
          >
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">☯</span>
            <span className="text-[9px] uppercase tracking-tighter font-bold">星语</span>
          </button>
          <button 
            onClick={onOpenProfile}
            className={`flex flex-col items-center gap-1 transition-all ${user ? 'text-slate-300' : 'text-slate-600'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${user ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'bg-white/10'}`}>
              {userZodiac ? userZodiac.symbol : '👤'}
            </div>
            <span className="text-[9px] uppercase tracking-tighter font-bold mt-0.5">{user ? '档案' : '登录'}</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
