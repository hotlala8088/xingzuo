
import React, { useState } from 'react';
import { ZODIAC_SIGNS, getZodiacName } from '../constants';
import { getCompatibility } from '../services/geminiService';
import { CompatibilityResponse } from '../types';

const CompatibilityTool: React.FC = () => {
  const [sign1, setSign1] = useState(ZODIAC_SIGNS[0].id);
  const [sign2, setSign2] = useState(ZODIAC_SIGNS[1].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResponse | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const data = await getCompatibility(getZodiacName(sign1), getZodiacName(sign2));
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 animate-fadeIn mb-20">
      <div className="text-center space-y-4 pt-4">
        <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white tracking-widest text-glow">星缘契合报告</h2>
        <p className="text-slate-500 text-xs md:text-sm tracking-[0.4em] uppercase">探索两个灵魂之间的宇宙动力学</p>
      </div>

      <div className="glass rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-around gap-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        {/* Sign Selector 1 */}
        <div className="flex flex-col items-center gap-6 z-10 w-full md:w-auto">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 flex items-center justify-center glass shadow-2xl transition-all hover:scale-105 hover:border-yellow-400/30">
            <span className="text-6xl md:text-8xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {ZODIAC_SIGNS.find(s => s.id === sign1)?.symbol}
            </span>
          </div>
          <select 
            value={sign1}
            onChange={(e) => setSign1(e.target.value as any)}
            className="w-full md:w-auto bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-lg font-cinzel text-white outline-none focus:border-yellow-400/50 transition-all text-center"
          >
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{getZodiacName(s.id)}</option>)}
          </select>
        </div>

        <div className="text-4xl font-cinzel text-yellow-400/20 animate-pulse hidden md:block select-none">SYNASTRY</div>

        {/* Sign Selector 2 */}
        <div className="flex flex-col items-center gap-6 z-10 w-full md:w-auto">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/10 flex items-center justify-center glass shadow-2xl transition-all hover:scale-105 hover:border-yellow-400/30">
            <span className="text-6xl md:text-8xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {ZODIAC_SIGNS.find(s => s.id === sign2)?.symbol}
            </span>
          </div>
          <select 
            value={sign2}
            onChange={(e) => setSign2(e.target.value as any)}
            className="w-full md:w-auto bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-lg font-cinzel text-white outline-none focus:border-yellow-400/50 transition-all text-center"
          >
            {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{getZodiacName(s.id)}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleCheck}
          disabled={loading}
          className="group relative px-16 py-5 bg-yellow-400 text-slate-950 rounded-full font-bold tracking-[0.4em] uppercase text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <span className="relative z-10">{loading ? '正在解析星盘位能...' : '生成完整报告'}</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>

      {result && (
        <div className="space-y-10 animate-fadeIn">
          <div className="glass rounded-[3rem] p-12 text-center relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl pointer-events-none">⚭</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mb-4">契合指数 / Connection Index</div>
            <div className="text-7xl md:text-9xl font-cinzel font-bold text-yellow-400 text-glow">{result.score}%</div>
            <div className="w-24 h-px bg-yellow-400/30 mx-auto mt-8 mb-8"></div>
            <p className="text-slate-300 text-lg md:text-2xl leading-relaxed font-serif italic max-w-2xl mx-auto">
              "{result.summary}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="glass p-10 rounded-[2.5rem] border-emerald-500/10">
              <h3 className="text-emerald-400 font-cinzel text-xl tracking-widest mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-emerald-400/30"></span> 和谐面相
              </h3>
              <ul className="space-y-4">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex gap-4 items-start text-slate-300">
                    <span className="text-emerald-400 mt-1">✧</span>
                    <span className="text-sm md:text-base">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="glass p-10 rounded-[2.5rem] border-orange-500/10">
              <h3 className="text-orange-400 font-cinzel text-xl tracking-widest mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-orange-400/30"></span> 宿命挑战
              </h3>
              <ul className="space-y-4">
                {result.challenges.map((s, i) => (
                  <li key={i} className="flex gap-4 items-start text-slate-300">
                    <span className="text-orange-400 mt-1">✦</span>
                    <span className="text-sm md:text-base">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTool;
