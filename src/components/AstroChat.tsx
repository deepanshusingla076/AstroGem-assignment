import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const AstroChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Namaste! I am your AstroGuide. Ask me anything about gemstones, their benefits, wearing rituals, or planetary effects.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Mock AI response logic
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "I can guide you on planetary gemstones. Please ask about specific stones like Ruby, Sapphire, Pearl, or rituals to wear them.";
      
      if (lower.includes('ruby') || lower.includes('sun')) {
        reply = "Ruby (Manik) represents the Sun. It gives leadership and confidence. Wear it on your Ring finger in Gold on Sunday mornings.";
      } else if (lower.includes('blue sapphire') || lower.includes('saturn')) {
        reply = "Blue Sapphire (Neelam) is for Saturn. It is very powerful and brings quick success, but should be tested before wearing. Wear it on the Middle finger on Saturdays.";
      } else if (lower.includes('wealth') || lower.includes('money')) {
        reply = "For wealth, Yellow Sapphire (Pukhraj) is highly recommended for abundance, or Diamond (Heera) for luxury.";
      } else if (lower.includes('purify') || lower.includes('ritual') || lower.includes('wear')) {
        reply = "To purify a gemstone, wash it with raw milk and Gangajal, then chant the respective planetary mantra 108 times before wearing it on the designated day.";
      }

      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    }, 1000);
  };

  return (
    <div className="container mt-8" style={{ animation: 'fadeIn 0.5s ease', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bot className="text-accent" size={32} />
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AstroGuide Chat</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>Ask your astrological queries</p>
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              display: 'flex',
              gap: '12px',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', 
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--card-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {msg.role === 'user' ? <User size={20} color="#fff" /> : <Bot size={20} className="text-accent" />}
              </div>
              <div style={{
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-color)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-color)',
                padding: '12px 16px',
                borderRadius: '12px',
                border: msg.role === 'bot' ? '1px solid var(--card-border)' : 'none',
                lineHeight: '1.5'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--card-border)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Type your message..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" disabled={!input.trim()} style={{ padding: '12px' }}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
