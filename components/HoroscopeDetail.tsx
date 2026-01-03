
import React, { useState, useEffect } from 'react';
import { ZodiacData, HoroscopeResponse } from '../types';
import { getDailyHoroscope } from '../services/geminiService';
import { getElementName, getZodiacName } from '../constants';

interface HoroscopeDetailProps {
  sign: ZodiacData;
  onBack: () => void;
}

const HoroscopeDetail: React.FC<HoroscopeDetailProps> = ({ sign, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HoroscopeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        const result = await getDailyHoroscope(getZodiacName(sign.id));
        setData(result);
      } catch (e) {
        setError('星象目前模糊不清，命运之门暂时紧闭。');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHoroscope();
  }, [sign.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-6 text-center animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-amber-400/20 rounded-full"></div>
          <div className="absolute inset-0 w-24 h-24 border-t-2 border-amber-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-amber-400 text-glow-gold">
            {sign.symbol}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-amber-400 font-cinzel text-xl tracking-[0.3em] uppercase">正在通灵 {getZodiacName(sign.id)}</p>
          <p className="text-slate-500 text-xs tracking-widest uppercase">解构宇宙编码中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-10 md:space-y-16 animate-fadeIn pb-24">
      <div className="flex justify-between items-center px-4">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-amber-400 flex items-center gap-3 group transition-all"
        >
          <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400/40 group-hover:-translate-x-1 transition-all">←</span> 
          <span className="text-xs font-sans tracking-widest uppercase font-bold">回到众星之列</span>
        </button>
      </div>

      <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group mx-4">
        <div className="aspect-[16/10] md:aspect-[21/9] w-full relative">
          <img 
            src={sign.imageUrl} 
            alt={sign.id} 
            className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-transparent to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20">
           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl md:text-8xl text-amber-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]">{sign.symbol}</span>
                  <div className="h-px w-12 md:w-24 bg-amber-400/30"></div>
                  <span className="text-xs md:text-sm text-amber-400/60 tracking-[0.4em] uppercase font-sans font-bold">每日运势鉴</span>
                </div>
                <h1 className="text-5xl md:text-[9rem] font-sans font-bold tracking-tight leading-none text-white text-glow-white">{getZodiacName(sign.id)}</h1>
                <p className="text-slate-400 font-sans tracking-[0.3em] uppercase text-[10px] md:text-lg">
                  <span className="text-white font-bold">{sign.dateRange}</span> • <span className="text-amber-400/80">{getElementName(sign.element)}象星座</span> • 守护星 {sign.rulingPlanet}
                </p>
              </div>
              <div className="hidden lg:block glass p-8 rounded-[2rem] border-white/10 backdrop-blur-xl bg-amber-500/5">
                 <p className="text-slate-300 text-sm italic font-serif leading-relaxed max-w-xs">
                   "{sign.description}"
                 </p>
              </div>
           </div>
        </div>
      </div>

      {error ? (
        <div className="glass p-12 rounded-[2.5rem] text-center border-red-500/20 mx-4">
          <p className="text-red-400/80 font-serif italic text-lg">"{error}"</p>
          <button onClick={() => window.location.reload()} className="mt-6 text-xs text-slate-500 hover:text-white underline underline-offset-4 tracking-widest uppercase">重试请求</button>
        </div>
      ) : data && (
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 px-4">
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            <section className="glass p-8 md:p-14 rounded-[3rem] relative overflow-hidden border-amber-500/10">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl pointer-events-none text-amber-500">✦</div>
              <h3 className="text-2xl md:text-3xl font-sans text-amber-400 mb-8 flex items-center gap-4 font-bold tracking-widest">
                <span className="w-10 h-px bg-amber-400/30"></span> 
                <span>圣谕导引</span>
              </h3>
              <p className="text-slate-100 leading-relaxed text-lg md:text-2xl font-light font-serif italic drop-shadow-sm">
                {data.general}
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <section className="glass p-8 md:p-12 rounded-[2.5rem] border-pink-500/10 hover:border-pink-500/30 transition-all bg-pink-500/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-sans text-pink-400 tracking-widest uppercase font-bold">情动星宫</h3>
                  <span className="text-2xl text-pink-500/40">❤</span>
                </div>
                <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-light">{data.love}</p>
              </section>
              
              <section className="glass p-8 md:p-12 rounded-[2.5rem] border-emerald-500/10 hover:border-emerald-500/30 transition-all bg-emerald-500/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-sans text-emerald-400 tracking-widest uppercase font-bold">业力显化</h3>
                  <span className="text-2xl text-emerald-500/40">💼</span>
                </div>
                <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-light">{data.career}</p>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="glass p-8 md:p-12 rounded-[3rem] text-center border-amber-500/20 glass-gold">
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h4 className="text-slate-500 text-[10px] font-sans uppercase tracking-[0.4em] font-bold">今日能量共振</h4>
                  <div className="text-2xl md:text-4xl font-sans text-amber-400 text-glow-gold font-bold">{data.mood}</div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent"></div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-slate-500 text-[9px] font-sans uppercase tracking-widest font-bold">灵数</div>
                    <div className="text-3xl md:text-5xl font-sans text-white text-glow-white">{data.luckyNumber}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-slate-500 text-[9px] font-sans uppercase tracking-widest font-bold">圣色</div>
                    <div className="text-xs md:text-sm font-sans text-amber-100 h-12 flex items-center justify-center font-bold tracking-widest bg-white/5 rounded-2xl border border-white/5">{data.luckyColor}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-10 rounded-[2.5rem] border-white/5 text-center">
              <h4 className="text-slate-500 text-[10px] font-sans uppercase tracking-[0.4em] mb-6 font-bold">特质印记</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {sign.traits.map(trait => (
                  <span key={trait} className="px-4 py-2 rounded-xl text-[10px] bg-white/5 border border-white/10 text-slate-300 uppercase tracking-widest font-bold hover:border-amber-400/40 transition-colors">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default HoroscopeDetail;
