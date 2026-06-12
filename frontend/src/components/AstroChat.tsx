import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';

interface Message { role: 'user' | 'bot'; text: string; time: string; }

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const knowledgeBase: [RegExp, string][] = [
  [/\b(ruby|manik|sun|surya)\b/i, "🔴 Ruby (Manik) — ruled by the Sun — bestows leadership, fame, and vitality. Wear it in Gold on your Ring finger every Sunday morning, chanting 'Om Suryaya Namah' 108 times. It pairs well with Pearl and Yellow Sapphire."],
  [/\b(pearl|moti|moon|chandra)\b/i, "🤍 Pearl (Moti) — ruled by the Moon — brings emotional peace and intuition. Wear it in Silver on your Little finger every Monday morning, chanting 'Om Chandraya Namah' 108 times. Avoid mixing with Hessonite or Cat's Eye."],
  [/\b(blue sapphire|neelam|saturn|shani)\b/i, "🔵 Blue Sapphire (Neelam) — Saturn's powerful stone — brings rapid success and discipline. It must be tested for 3 days before permanent wearing. Wear it in Silver on the Middle finger every Saturday, chanting 'Om Shanaye Namah' 108 times."],
  [/\b(yellow sapphire|pukhraj|jupiter|guru)\b/i, "🟡 Yellow Sapphire (Pukhraj) — ruled by Jupiter — is the most auspicious stone. It attracts wealth and wisdom. Wear it in Gold on your Index finger every Thursday, chanting 'Om Gurave Namah' 108 times."],
  [/\b(emerald|panna|mercury|budh)\b/i, "💚 Emerald (Panna) — Mercury's stone — sharpens intellect and communication. Perfect for students and business people. Wear it in Gold or Silver on the Little finger every Wednesday, chanting 'Om Budhaya Namah' 108 times."],
  [/\b(diamond|heera|venus|shukra)\b/i, "💎 Diamond (Heera) — ruled by Venus — amplifies love, luxury, and artistic success. Wear it in Gold or Platinum on the Middle finger every Friday, chanting 'Om Shukraya Namah' 108 times. Test it for 3 days first."],
  [/\b(red coral|moonga|mars|mangal)\b/i, "🔴 Red Coral (Moonga) — ruled by Mars — injects courage and physical strength. Ideal for overcoming debt and property gain. Wear it in Gold on the Ring finger every Tuesday, chanting 'Om Mangalaya Namah' 108 times."],
  [/\b(hessonite|gomed|rahu)\b/i, "🟤 Hessonite (Gomed) — Rahu's stone — brings sudden wealth and protection from hidden enemies. Wear it in Silver on Saturday nights, chanting 'Om Rahave Namah' 108 times."],
  [/\b(cat.?s eye|lehsuniya|ketu)\b/i, "⚫ Cat's Eye (Lehsuniya) — Ketu's mystical stone — sparks spiritual awakening and shields against negative energies. Wear it in Silver on Tuesday or Saturday nights, chanting 'Om Ketave Namah' 108 times."],
  [/\b(purif|clean|wash|ritual)\b/i, "🙏 General Purification: Soak the gemstone in raw milk for 1 hour, then rinse with Gangajal (holy water). Place it before a deity idol overnight, then chant the planetary mantra 108 times the next morning before wearing it."],
  [/\b(compat|mix|together|combin|wear.*with)\b/i, "⚖️ Compatibility Rules: Ruby & Blue Sapphire CANNOT be worn together (Sun vs Saturn). Diamond & Ruby CONFLICT. Safe combinations: Ruby + Yellow Sapphire + Pearl | Blue Sapphire + Diamond + Emerald. Use our Compatibility Checker tab for any specific pair!"],
  [/\b(wealth|money|rich|prosperit|finance|abundance)\b/i, "💰 For Wealth: Yellow Sapphire (Jupiter's grace) is the #1 wealth stone. Diamond (Venus luxury) and Emerald (Mercury commerce) are also powerful. Your specific birth chart should be consulted to pick the right one for you."],
  [/\b(career|job|success|promotion|business)\b/i, "🚀 For Career Success: Ruby (leadership), Blue Sapphire (discipline & rapid rise), or Emerald (communication & commerce) are ideal. Use our Gem Finder with 'Career' focus to get your personalized recommendation."],
  [/\b(love|marriage|romance|relation|partner)\b/i, "💕 For Love & Marriage: Diamond (Venus, romance & beauty) and Yellow Sapphire (Jupiter, marital bliss) are the top stones. Pearl also helps with emotional harmony in relationships."],
  [/\b(health|healin|vitality|energy|blood|illness)\b/i, "❤️‍🩹 For Health: Red Coral (Mars) boosts physical strength and treats blood disorders. Pearl (Moon) soothes mental anxiety. Ruby (Sun) improves overall vitality. Always consult a doctor alongside gemstone therapy."],
  [/\b(how|work|logic|engine|numerolog|zodiac|astrology)\b/i, "🔢 How AstroGem Works: We calculate your Life Path Number from your birth day (reducing to a single digit 1-9). Each number maps to a planet (1→Sun, 2→Moon, etc.). Your birth month approximates your zodiac sign. We then cross-check planetary friendships to ensure your stones don't conflict."],
];

const getReply = (msg: string): string => {
  for (const [pattern, reply] of knowledgeBase) {
    if (pattern.test(msg)) return reply;
  }
  return "I'm your AstroGuide! I can answer questions about specific gemstones (Ruby, Blue Sapphire, Emerald, etc.), wearing rituals, purification, compatibility, or how the recommendation engine works. What would you like to know? 🔮";
};

const SUGGESTIONS = [
  'Tell me about Ruby',
  'How does compatibility work?',
  'Which stone is best for wealth?',
  'How to purify a gemstone?',
  'Blue Sapphire benefits?',
];

export const AstroChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Namaste! 🙏 I'm AstroGuide, your Vedic gemstone consultant. Ask me about any Navaratna gemstone, wearing rituals, mantras, compatibility, or how our recommendation engine works.", time: getTime() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: getReply(text), time: getTime() }]);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)', minHeight: 500 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--gold-glow)', border: '1px solid rgba(212,175,55,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={22} color="var(--gold)" />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>AstroGuide</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
              Online — Vedic Astrology Expert
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span className="badge badge-gold"><Sparkles size={12} /> AI-Powered</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages" style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 4 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: m.role === 'user' ? 'var(--gold)' : 'var(--surface)',
                  border: m.role === 'bot' ? '1px solid var(--border)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {m.role === 'user' ? <UserIcon size={16} color="#111" /> : <Bot size={16} color="var(--gold)" />}
                </div>
                <div className={`chat-bubble chat-bubble-${m.role}`} style={{ maxWidth: '72%' }}>
                  {m.text}
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: m.role === 'bot' ? 42 : 0, paddingRight: m.role === 'user' ? 42 : 0 }}>
                {m.time}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="var(--gold)" />
              </div>
              <div className="chat-bubble chat-bubble-bot" style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2].map(d => (
                  <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block', animation: `pulse 1.2s ease ${d * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div style={{ padding: '8px 20px', display: 'flex', gap: 8, flexWrap: 'wrap', borderTop: '1px solid var(--border)' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', padding: '5px 10px', border: '1px solid var(--border)', borderRadius: '100px' }}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chat-input-row">
          <input
            className="form-input" style={{ flex: 1 }} type="text"
            placeholder="Ask about gemstones, rituals, mantras..."
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
          />
          <button className="btn btn-primary btn-icon" onClick={() => send(input)} disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
