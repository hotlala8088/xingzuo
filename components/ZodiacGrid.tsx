
import React from 'react';
import { ZODIAC_SIGNS, getZodiacName, getElementName } from '../constants';
import { ZodiacData } from '../types';

interface ZodiacGridProps {
  onSelect: (sign: ZodiacData) => void;
  userZodiacId?: string | null;
}

const ZodiacGrid: React.FC<ZodiacGridProps> = ({ onSelect, userZodiacId }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 p-4 md:p-8">
      {ZODIAC_SIGNS.map((sign) => {
        const isUserSign = userZodiacId === sign.id;
        return (
          <div 
            key={sign.id}
            onClick={() => onSelect(sign)}
            className={`group relative h-[280px] md:h-[450px] glass cursor-pointer rounded-[2.5rem] overflow-hidden border transition-all duration-700 active:scale-95 ${
              isUserSign 
                ? 'border-amber-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)]' 
                : 'border-white/5 hover:border-amber-400/30 hover:shadow-[0_0_60px_rgba(234,179,8,0.1)]'
            }`}
          >
            {/* 渐变蒙层优化 */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={sign.imageUrl} 
                alt={sign.id} 
                className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                  isUserSign ? 'opacity-40 grayscale-0 scale-105' : 'opacity-15 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/50 to-transparent"></div>
            </div>

            {/* 字符阴影增强 */}
            <div className="absolute top-8 right-8 text-white/5 text-8xl font-cinzel select-none group-hover:text-amber-400/10 transition-all duration-700">
              {sign.symbol}
            </div>

            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
              {isUserSign && (
                <div className="absolute top-8 left-8">
                  <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[9px] px-3 py-1 rounded-full tracking-[0.2em] font-sans uppercase backdrop-blur-md font-bold">
                    守护星位
                  </span>
                </div>
              )}
              
              <div className="mb-3 md:mb-5 transform group-hover:-translate-y-2 transition-transform duration-500">
                 <span className={`text-4xl md:text-6xl transition-all ${
                   isUserSign 
                    ? 'text-amber-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]' 
                    : 'text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:text-amber-400 group-hover:drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]'
                 }`}>
                   {sign.symbol}
                 </span>
              </div>
              
              <h3 className={`text-2xl md:text-4xl font-bold font-sans transition-colors duration-500 ${
                isUserSign ? 'text-amber-400' : 'text-white group-hover:text-amber-400'
              }`}>
                {getZodiacName(sign.id)}
              </h3>
              
              <p className="text-[10px] md:text-xs text-amber-400/60 tracking-[0.3em] mb-5 uppercase font-sans font-bold">
                {sign.dateRange}
              </p>
              
              <div className={`flex flex-wrap gap-2 transition-all duration-700 overflow-hidden ${
                isUserSign ? 'max-h-24 opacity-100' : 'max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100'
              }`}>
                {sign.traits.map(trait => (
                  <span key={trait} className="px-3 py-1 rounded-full text-[9px] md:text-[10px] bg-white/5 border border-white/10 text-slate-300 uppercase tracking-tighter backdrop-blur-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className={`absolute top-8 left-8 z-10 text-[9px] md:text-[10px] font-sans tracking-[0.4em] uppercase transition-colors ${
              isUserSign ? 'text-amber-400/40' : 'text-slate-500/80 group-hover:text-amber-400/40'
            }`}>
              {!isUserSign && getElementName(sign.element)}
            </div>
            
            <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ZodiacGrid;
