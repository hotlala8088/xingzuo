
import React, { useState, useRef, useEffect } from 'react';
import { askOracleStream } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const OracleChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "欢迎来到星语殿。我是星启祭司。星轨今日向我展示了一些关于你的秘密...你想窥见哪一部分命运？" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    setMessages(prev => [...prev, { role: 'model', content: '' }]);
    
    let fullResponse = '';
    try {
      const stream = askOracleStream(userMsg, []);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = fullResponse;
          return updated;
        });
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = "星象混乱，杂音遮蔽了真理。请稍后再向众星祈祷。";
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-220px)] md:h-[80vh] p-4 md:p-0">
      <div className="text-center mb-8 md:mb-12 space-y-4">
        <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white tracking-[0.3em] text-glow">星语占卜</h2>
        <div className="flex justify-center items-center gap-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-400/40"></div>
          <span className="text-[10px] text-yellow-400/60 uppercase tracking-[0.5em]">Celestial Portal</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-yellow-400/40"></div>
        </div>
      </div>

      <div className="flex-1 glass rounded-[3rem] flex flex-col overflow-hidden border-white/10 shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-slate-950/40 to-transparent pointer-events-none z-10"></div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-14 space-y-10 scroll-smooth scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative group max-w-[90%] md:max-w-[80%] ${m.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div 
                  className={`p-6 md:p-8 rounded-[2rem] text-sm md:text-lg leading-relaxed shadow-xl ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none font-serif italic'
                  }`}
                >
                  {m.content || (isTyping && i === messages.length - 1 ? (
                    <div className="flex gap-2 items-center text-yellow-400/60">
                      <span className="animate-bounce">✧</span>
                      <span className="animate-bounce delay-100">✧</span>
                      <span className="animate-bounce delay-200">✧</span>
                      <span className="ml-2 text-xs uppercase tracking-widest font-sans">通灵中...</span>
                    </div>
                  ) : "")}
                </div>
                {m.role === 'model' && (
                  <div className="absolute -left-4 -top-4 w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center text-yellow-400 text-xl shadow-lg">
                    ☯
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-12 bg-black/40 border-t border-white/10 pb-safe backdrop-blur-3xl">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="在星空下写下你的困惑..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 md:py-6 text-sm md:text-lg outline-none focus:border-yellow-400/40 transition-all placeholder:text-slate-600 pr-32 font-light tracking-wide"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-4 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 px-8 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest transition-all disabled:opacity-30 disabled:grayscale uppercase"
            >
              祈告
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em]">星辰始终在倾听，但答案往往藏在你自己心中</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleChat;
