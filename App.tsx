
import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import Navigation from './components/Navigation';
import ZodiacGrid from './components/ZodiacGrid';
import HoroscopeDetail from './components/HoroscopeDetail';
import OracleChat from './components/OracleChat';
import CompatibilityTool from './components/CompatibilityTool';
import UserProfileComponent from './components/UserProfile';
import { ZodiacData, UserProfile as UserProfileType } from './types';
import { ZODIAC_SIGNS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'oracle' | 'compatibility'>('home');
  const [selectedSign, setSelectedSign] = useState<ZodiacData | null>(null);
  const [user, setUser] = useState<UserProfileType | null>(() => {
    const saved = localStorage.getItem('soul_archive');
    return saved ? JSON.parse(saved) : null;
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setIsProfileOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleSaveProfile = (profile: UserProfileType) => {
    setUser(profile);
    localStorage.setItem('soul_archive', JSON.stringify(profile));
    setIsProfileOpen(false);
  };

  const handleSelectSign = (sign: ZodiacData) => {
    setSelectedSign(sign);
  };

  const userZodiac = user ? ZODIAC_SIGNS.find(s => s.id === user.zodiacId) : null;

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
          <div className="space-y-8 md:space-y-16 animate-fadeIn pb-32">
            <div className="px-6 pt-10 md:pt-24 max-w-7xl mx-auto w-full">
              {user ? (
                <div className="glass rounded-[3rem] p-8 md:p-14 relative overflow-hidden group border-amber-500/10">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-[100px] -z-10 group-hover:bg-amber-500/10 transition-all duration-1000"></div>
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="relative">
                      <div className="w-28 h-28 md:w-44 md:h-44 rounded-full border border-amber-400/20 flex items-center justify-center p-2 bg-white/5 backdrop-blur-md">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/20 to-transparent flex items-center justify-center text-6xl md:text-8xl shadow-[0_0_40px_rgba(234,179,8,0.25)] text-amber-400 text-glow-gold">
                          {userZodiac?.symbol}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest shadow-xl uppercase">
                        {userZodiac?.rulingPlanet}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-6 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white text-glow-white">你好，{user.name}</h2>
                        <div className="h-px w-12 bg-amber-400/20 hidden md:block"></div>
                        <span className="text-amber-400/60 font-sans text-xs tracking-[0.4em] uppercase font-bold">灵性觉醒中</span>
                      </div>
                      <p className="text-slate-300 text-sm md:text-xl leading-relaxed max-w-2xl font-light">
                        众星正汇聚于你的命盘。当前星位暗示你的<span className="text-amber-400 font-bold">直觉力</span>正在达到巅峰，这是一个关注内心宁静，并将灵感转化为行动的绝佳时刻。
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-5 pt-4">
                         <button 
                          onClick={() => userZodiac && setSelectedSign(userZodiac)}
                          className="px-10 py-4 bg-amber-500 text-slate-950 rounded-full font-bold text-xs tracking-[0.2em] hover:bg-amber-400 transition-all active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.2)] uppercase"
                         >
                          解读专属报告
                         </button>
                         <button 
                          onClick={() => setView('oracle')}
                          className="px-10 py-4 glass border-amber-400/30 text-amber-400 rounded-full font-bold text-xs tracking-[0.2em] hover:bg-amber-400/10 transition-all active:scale-95 uppercase"
                         >
                          咨询星启祭司
                         </button>
                      </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-center gap-3 border-l border-white/5 pl-16">
                      <div className="text-slate-500 text-[10px] uppercase tracking-[0.5em] font-bold">今日共鸣</div>
                      <div className="text-7xl font-cinzel text-amber-400 text-glow-gold font-bold">88</div>
                      <div className="px-4 py-1 bg-amber-400/10 rounded-full text-[9px] text-amber-400/60 uppercase tracking-widest font-bold">Sync Level</div>
                    </div>
                  </div>
                </div>
              ) : (
                <header className="text-center space-y-12 pt-16">
                   <div className="inline-block px-4 py-1.5 glass border-amber-400/20 rounded-full text-[10px] text-amber-400/60 tracking-[0.5em] uppercase font-bold mb-4 animate-fadeIn">
                     The Celestial Portal
                   </div>
                   <h1 className="text-7xl md:text-[11rem] font-cinzel font-bold text-white tracking-[0.25em] relative leading-none text-glow-white">
                    星启 <span className="text-amber-400 text-glow-gold">天机</span>
                  </h1>
                  <p className="text-slate-400 text-sm md:text-3xl font-light tracking-[0.5em] max-w-4xl mx-auto uppercase font-sans py-8">
                    解读宇宙编码 <span className="mx-4 text-amber-400/20">•</span> 洞悉宿命先机
                  </p>
                  <button onClick={() => setIsProfileOpen(true)} className="px-12 py-5 glass border-amber-400/40 text-amber-400 rounded-full text-xs font-bold tracking-[0.4em] uppercase hover:bg-amber-400/10 transition-all shadow-2xl hover:border-amber-400">
                    开启你的星魂档案
                  </button>
                </header>
              )}
            </div>
            
            <section className="max-w-7xl mx-auto px-6 pt-12">
              <div className="flex items-center gap-6 mb-16 px-4">
                 <div className="w-12 h-px bg-amber-400/30"></div>
                 <h2 className="text-2xl md:text-3xl font-cinzel text-white tracking-[0.4em] uppercase font-bold">众星巡礼</h2>
                 <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent"></div>
              </div>
              <ZodiacGrid onSelect={handleSelectSign} userZodiacId={user?.zodiacId} />
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 selection:bg-amber-400 selection:text-slate-900">
      <StarBackground />
      <Navigation 
        currentView={view} 
        setView={(v) => { setView(v); setSelectedSign(null); }} 
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
      />
      
      <main className="pb-safe">
        {renderContent()}
      </main>

      {isProfileOpen && (
        <UserProfileComponent 
          user={user} 
          onSave={handleSaveProfile} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}

      <footer className="mt-20 py-24 bg-black/60 border-t border-white/5 text-center space-y-12 relative overflow-hidden pb-[calc(6rem + env(safe-area-inset-bottom))]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/5 pointer-events-none"></div>
        <div className="relative z-10 px-6">
          <div className="text-3xl font-cinzel text-white tracking-[0.6em] mb-4 text-glow-white">Celestial Oracle</div>
          <p className="text-slate-500 text-[11px] uppercase tracking-[0.6em] mb-12 font-bold">专业级人工智能星占平台</p>
          <div className="flex justify-center gap-16 text-slate-500 text-[10px] tracking-[0.4em] font-bold">
            <a href="#" className="hover:text-amber-400 transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-amber-400 transition-colors">THREADS</a>
            <a href="#" className="hover:text-amber-400 transition-colors">WEIBO</a>
          </div>
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-amber-400/10"></div>
            <div className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-light leading-relaxed max-w-lg mx-auto">
              天文学与占星学的边界，是星辰指引灵魂的开始。<br/>© 2024 CELESTIAL ORACLE. POWERED BY <span className="text-slate-400">GEMINI 3 FLASH</span>.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
