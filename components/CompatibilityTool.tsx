
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
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
      <div className="text-center space-y-2 md:space-y-4 pt-4">
        <h2 className="text-3xl md:text-4xl font-sans font-bold">星缘契合度</h2>
        <p className="text-slate-400 text-sm md:text-base">探索两个灵魂之间的宇宙共鸣。</p>
      </div>

      <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center justify-around gap-6 md:gap-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-around w-full gap-6">
          <div className="flex flex-col items-center gap-2 md:gap-4 z-10 w-full md:w-auto">
            <select 
              value={sign1}
              onChange={(e) => setSign1(e.target.value as any)}
              className="w-full md:w-auto bg-slate-900 md:bg-transparent text-xl md:text-2xl font-sans border border-white/10 md:border-0 md:border-b border-white/20 p-2 outline-none focus:border-yellow-400 transition-colors rounded-lg md:rounded-none"
            >
              {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.symbol} {getZodiacName(s.id)}</option>)}
            </select>
            <div className="text-5xl md:text-6xl">{ZODIAC_SIGNS.find(s => s.id === sign1)?.symbol}</div>
          </div>

          <div className="text-2xl md:text-4xl text-slate-600 font-sans animate-pulse md:block">VS</div>

          <div className="flex flex-col items-center gap-2 md:gap-4 z-10 w-full md:w-auto">
            <select 
              value={sign2}
              onChange={(e) => setSign2(e.target.value as any)}
              className="w-full md:w-auto bg-slate-900 md:bg-transparent text-xl md:text-2xl font-sans border border-white/10 md:border-0 md:border-b border-white/20 p-2 outline-none focus:border-yellow-400 transition-colors rounded-lg md:rounded-none"
            >
              {ZODIAC_SIGNS.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.symbol} {getZodiacName(s.id)}</option>)}
            </select>
            <div className="text-5xl md:text-6xl">{ZODIAC_SIGNS.find(s => s.id === sign2)?.symbol}</div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleCheck}
          disabled={loading}
          className="w-full md:w-auto px-12 py-4 bg-yellow-400 text-slate-950 rounded-full font-bold font-sans hover:bg-yellow-300 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? '正在窥探星缘...' : '揭示契合度'}
        </button>
      </div>

      {result && (
        <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 md:space-y-8 animate-fadeIn">
          <div className="text-center">
             <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">契合指数</div>
             <div className="text-5xl md:text-7xl font-bold font-sans text-yellow-400">{result.score}%</div>
          </div>
          
          <div className="space-y-2">
             <h3 className="text-lg md:text-xl font-sans text-white">星象解析</h3>
             <p className="text-sm md:text-base text-slate-400 leading-relaxed italic">{result.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <h4 className="text-emerald-400 font-sans text-sm mb-2">和谐共振</h4>
              <ul className="text-xs text-slate-300 space-y-1">
                {result.strengths.map((s, i) => <li key={i}>✧ {s}</li>)}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <h4 className="text-orange-400 font-sans text-sm mb-2">潜在磨合</h4>
              <ul className="text-xs text-slate-300 space-y-1">
                {result.challenges.map((s, i) => <li key={i}>✧ {s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTool;
