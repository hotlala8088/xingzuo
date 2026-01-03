
import React, { useState, useEffect } from 'react';
import { UserProfile, ZodiacSign } from '../types';
import { ZODIAC_SIGNS, getZodiacName } from '../constants';

interface UserProfileProps {
  user: UserProfile | null;
  onSave: (user: UserProfile) => void;
  onClose: () => void;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user?.name || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [tempZodiac, setTempZodiac] = useState<ZodiacSign>(user?.zodiacId || 'Aries');

  // 根据日期自动计算星座的逻辑
  useEffect(() => {
    if (!birthDate) return;
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const calculateZodiac = (m: number, d: number): ZodiacSign => {
      if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
      if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
      if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) return 'Gemini';
      if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) return 'Cancer';
      if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
      if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
      if ((m === 9 && d >= 23) || (m === 10 && d <= 23)) return 'Libra';
      if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) return 'Scorpio';
      if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) return 'Sagittarius';
      if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn';
      if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
      return 'Pisces';
    };

    setTempZodiac(calculateZodiac(month, day));
  }, [birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, birthDate, zodiacId: tempZodiac });
  };

  const selectedSignData = ZODIAC_SIGNS.find(s => s.id === tempZodiac);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass w-full max-w-md rounded-[2.5rem] overflow-hidden border-yellow-400/20 shadow-[0_0_100px_rgba(250,204,21,0.1)]">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-widest">星魂档案</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-yellow-400/60 ml-2">灵魂称谓</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入你的名字..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-yellow-400/40 transition-all placeholder:text-slate-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-yellow-400/60 ml-2">生辰之日</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-yellow-400/40 transition-all"
                required
              />
            </div>

            {birthDate && selectedSignData && (
              <div className="p-6 rounded-2xl bg-yellow-400/5 border border-yellow-400/10 flex items-center gap-6 animate-fadeIn">
                <div className="text-5xl text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                  {selectedSignData.symbol}
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">系统识别星座</div>
                  <div className="text-xl font-cinzel text-white font-bold">{getZodiacName(tempZodiac)}</div>
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 py-4 rounded-2xl font-bold tracking-widest transition-all active:scale-95 shadow-[0_10px_30px_rgba(251,191,36,0.2)] mt-4"
            >
              刻入星魂
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
