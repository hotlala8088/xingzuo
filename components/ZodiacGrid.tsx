
import React from 'react';
import { ZODIAC_SIGNS, getZodiacName, getElementName } from '../constants';
import { ZodiacData } from '../types';

interface ZodiacGridProps {
  onSelect: (sign: ZodiacData) => void;
}

const ZodiacGrid: React.FC<ZodiacGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 p-4 md:p-6">
      {ZODIAC_SIGNS.map((sign) => (
        <div 
          key={sign.id}
          onClick={() => onSelect(sign)}
          className="relative h-[280px] md:h-[400px] glass group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 active:scale-95 transition-all duration-300"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={sign.imageUrl} 
              alt={sign.id} 
              className="w-full h-full object-cover opacity-30 md:opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>

          {/* Content Overlays */}
          <div className="absolute inset-0 z-10 p-5 md:p-8 flex flex-col justify-end">
            <div className="mb-2 md:mb-4">
               <span className="text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{sign.symbol}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-sans text-white group-hover:text-yellow-400 transition-colors duration-300">{getZodiacName(sign.id)}</h3>
            <p className="text-[10px] md:text-sm text-yellow-400/70 tracking-[0.2em] mb-2 md:mb-4 uppercase font-sans">{sign.dateRange}</p>
            
            <div className="flex flex-wrap gap-2 opacity-100 md:opacity-0 md:max-h-0 md:group-hover:max-h-24 md:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
              <div className="flex flex-wrap gap-1 md:gap-2">
                {sign.traits.slice(0, 2).map(trait => (
                  <span key={trait} className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] bg-white/10 text-white/90 border border-white/10 font-sans">{trait}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Corner Element */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-[9px] md:text-[10px] font-sans tracking-widest text-slate-400/50">
            {getElementName(sign.element)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ZodiacGrid;
