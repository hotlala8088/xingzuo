
import React, { useState, useRef, useEffect } from 'react';
import { askOracle } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const OracleChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "欢迎你，探寻者。我是星启祭司。星辰正在向有心人低语。今天你想了解关于命运的什么指示？" }
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

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      const reply = await askOracle(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', content: "哎呀，星轨似乎有些错乱。请稍后再试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-180px)] md:h-[70vh]">
      <div className="text-center mb-4 md:mb-6 pt-2">
        <h2 className="text-3xl md:text-4xl font-sans font-bold">星语占卜</h2>
        <p className="text-slate-400 text-sm">随时随地的宇宙指引</p>
      </div>

      <div className="flex-1 glass rounded-2xl md:rounded-3xl flex flex-col overflow-hidden border-white/5 shadow-2xl">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] md:max-w-[80%] p-4 md:p-5 rounded-2xl text-sm md:text-base ${
                  m.role === 'user' 
                    ? 'bg-yellow-400/10 border border-yellow-400/20 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none italic font-light leading-relaxed font-sans'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-2xl animate-pulse">
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 pb-safe">
          <div className="flex gap-2 md:gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="向星辰祈祷..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3 text-sm outline-none focus:border-yellow-400/50 transition-colors font-sans"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-900 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm transition-all disabled:opacity-50 font-sans"
            >
              占卜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleChat;
