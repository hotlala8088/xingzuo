
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
      try {
        const result = await getDailyHoroscope(getZodiacName(sign.id));
        setData(result);
      } catch (e) {
        setError('星象目前模糊不清，请稍后再试。');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHoroscope();
  }, [sign.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-yellow-400 font-sans animate-pulse text-sm">正在窥探星象...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 animate-fadeIn">
      <button 
        onClick={onBack}
        className="text-slate-400 hover:text-white flex items-center gap-2 mb-2 md:mb-8 group active:opacity-50"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> <span className="text-sm font-sans">返回</span>
      </button>

      {/* Hero Header */}
      <div className="relative h-[240px] md:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 mb-6 md:mb-12 group">
        <img 
          src={sign.imageUrl} 
          alt={sign.id} 
          className="w-full h-full object-cover opacity-50 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-sans font-bold tracking-tighter">{getZodiacName(sign.id)}</h1>
                <p className="text-yellow-400 font-sans tracking-[0.2em] uppercase text-[10px] md:text-base">
                  {sign.dateRange} • {getElementName(sign.element)} • {sign.rulingPlanet}
                </p>
              </div>
              <div className="hidden md:block text-8xl md:text-9xl text-yellow-400 opacity-20 font-cinzel select-none">{sign.symbol}</div>
           </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
        {sign.traits.map(trait => (
          <span key={trait} className="px-3 py-1 md:px-6 md:py-2 rounded-full text-[10px] md:text-sm font-sans glass border-white/10 text-yellow-100/80">
            {trait}
          </span>
        ))}
      </div>

      {error ? (
        <div className="glass p-8 rounded-2xl text-center border-red-500/30">
          <p className="text-red-400 italic text-sm md:text-xl">"{error}"</p>
        </div>
      ) : data && (
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <section className="glass p-6 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden group">
              <h3 className="text-xl md:text-2xl font-sans text-yellow-400 mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-sm md:text-lg">✦</span> 今日星运
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm md:text-lg font-light italic">
                {data.general}
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <section className="glass p-5 md:p-8 rounded-2xl md:rounded-3xl border-pink-500/10">
                <h3 className="text-lg font-sans text-pink-400 mb-2 md:mb-4 flex items-center gap-2">
                  <span>❤</span> 情感与社交
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">{data.love}</p>
              </section>
              <section className="glass p-5 md:p-8 rounded-2xl md:rounded-3xl border-emerald-500/10">
                <h3 className="text-lg font-sans text-emerald-400 mb-2 md:mb-4 flex items-center gap-2">
                  <span>💼</span> 事业与财运
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">{data.career}</p>
              </section>
            </div>
          </div>

          {/* Stats Sidebar */}
          <aside className="lg:col-span-4 space-y-4 md:space-y-8">
            <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl text-center relative overflow-hidden">
              <h4 className="text-slate-500 text-[10px] font-sans uppercase mb-4 tracking-widest">今日能量</h4>
              <div className="text-xl md:text-3xl font-sans text-yellow-400 mb-6 md:mb-8">{data.mood}</div>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 relative z-10">
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-500 text-[9px] md:text-[10px] font-sans uppercase mb-1">幸运数字</div>
                  <div className="text-xl md:text-3xl font-sans text-white">{data.luckyNumber}</div>
                </div>
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-slate-500 text-[9px] md:text-[10px] font-sans uppercase mb-1">幸运颜色</div>
                  <div className="text-[10px] md:text-sm font-sans text-white h-8 flex items-center justify-center break-words">{data.luckyColor}</div>
                </div>
              </div>
            </div>
            
            <div className="glass p-5 md:p-8 rounded-2xl md:rounded-3xl border-white/5">
              <h4 className="text-slate-500 text-[10px] font-sans uppercase mb-3 text-center tracking-widest">星座精髓</h4>
              <p className="text-slate-400 text-center italic text-xs md:text-sm font-light leading-relaxed font-sans">
                "{sign.description}"
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default HoroscopeDetail;
