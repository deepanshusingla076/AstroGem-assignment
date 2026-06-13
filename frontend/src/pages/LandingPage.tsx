import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props { onGetStarted: () => void; }

const FEATURES = [
  { icon: '💎', title: 'Personalized Recommendations', desc: 'AI-powered Vedic astrology engine analyzes your birth numerology and zodiac to deliver precise, authentic gemstone recommendations.' },
  { icon: '📖', title: 'Complete Navaratna Guide', desc: 'Explore all 9 sacred gemstones — Ruby, Sapphire, Emerald and more — with mantras, rituals, and detailed planetary profiles.' },
  { icon: '⚖️', title: 'Compatibility Checker', desc: 'Check if two gemstones can be safely worn together using Vedic planetary friendship and enmity rules.' },
  { icon: '💬', title: 'AstroGuide Chat', desc: 'Ask anything about gemstones, rituals, mantras, or planetary alignments and get expert Vedic answers instantly.' },
];

const STEPS = [
  { n: 1, title: 'Enter Birth Details', desc: 'Provide your date of birth and life intention — career, wealth, health, love, peace, or protection.' },
  { n: 2, title: 'Vedic Analysis Runs', desc: 'Our engine calculates your Life Path Number, approximates your Moon sign, and checks planetary friendships.' },
  { n: 3, title: 'Receive Your Report', desc: 'Get three personalized gemstones — Life Stone, Lucky Stone, and Remedy Stone — with complete wearing instructions.' },
];

const GEMS = [
  { emoji: '❤️', name: 'Ruby', sub: 'Manik · Sun', color: '#c0392b', top: '15%', left: '50%', delay: '0s' },
  { emoji: '🟡', name: 'Yellow Sapphire', sub: 'Pukhraj · Jupiter', color: '#f1c40f', top: '35%', left: '90%', delay: '0.5s' },
  { emoji: '💚', name: 'Emerald', sub: 'Panna · Mercury', color: '#27ae60', top: '72%', left: '82%', delay: '1s' },
  { emoji: '💙', name: 'Blue Sapphire', sub: 'Neelam · Saturn', color: '#2980b9', top: '82%', left: '50%', delay: '1.5s' },
  { emoji: '🤍', name: 'Diamond', sub: 'Heera · Venus', color: '#95a5a6', top: '72%', left: '18%', delay: '2s' },
  { emoji: '🟤', name: 'Hessonite', sub: 'Gomed · Rahu', color: '#e67e22', top: '35%', left: '10%', delay: '2.5s' },
];

export const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const toggleTheme = () => {
    const n = !isDark; setIsDark(n);
    document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: 'var(--bg)', transition: 'background 0.3s' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: 64, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s',
        ...(scrolled ? {
          background: isDark ? 'rgba(13,17,23,0.92)' : 'rgba(247,243,238,0.92)',
          backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)'
        } : {})
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #d4af37, #a8892b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            boxShadow: '0 2px 12px rgba(212,175,55,0.3)'
          }}>💎</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text)' }}>AstroGem</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-solid)', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={onGetStarted} style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid var(--border-solid)', background: 'transparent', color: 'var(--text)', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>
            Login
          </button>
          <button onClick={onGetStarted} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: 'var(--gold)', color: '#111', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}>
            Get Started →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', paddingTop: 64, display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
              padding: '6px 16px', borderRadius: 100,
              background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)',
              fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.5px'
            }}>
              ✨ Vedic Astrology · Numerology · Navaratna
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800, lineHeight: 1.15, color: 'var(--text)', marginBottom: 24, letterSpacing: '-0.02em' }}>
              Discover Your<br />
              <span style={{ background: 'linear-gradient(135deg, #d4af37, #f5d060, #a8892b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sacred Gemstone</span>
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>
              AstroGem reveals your perfect astrological gemstone using authentic Vedic Jyotish science — with wearing rituals, mantras, and planetary alignment reports.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
              <button onClick={onGetStarted} style={{
                padding: '14px 28px', borderRadius: 12, border: 'none',
                background: 'var(--gold)', color: '#111',
                fontFamily: 'Inter', fontWeight: 700, fontSize: '1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 24px rgba(212,175,55,0.35)', transition: 'all 0.2s'
              }}>
                Find My Gemstone <ArrowRight size={18} />
              </button>
              <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} style={{
                padding: '14px 28px', borderRadius: 12, border: '1.5px solid var(--border-solid)',
                background: 'transparent', color: 'var(--text)',
                fontFamily: 'Inter', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                How it Works
              </button>
            </div>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['9', 'Navaratna gems'], ['108', 'Vedic mantras'], ['100%', 'Authentic Jyotish']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', minHeight: 380 }}>
            {/* Outer orbit ring */}
            <div style={{
              position: 'absolute', inset: '5%', borderRadius: '50%',
              border: '1px dashed rgba(212,175,55,0.2)',
              animation: 'spinSlow 40s linear infinite'
            }} />
            {/* Inner orbit ring */}
            <div style={{
              position: 'absolute', inset: '22%', borderRadius: '50%',
              border: '1px dashed rgba(212,175,55,0.12)',
              animation: 'spinSlow 25s linear infinite reverse'
            }} />
            {/* Center gem */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1226, #0d0b17)',
              border: '2px solid rgba(212,175,55,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', boxShadow: '0 0 40px rgba(212,175,55,0.18), 0 0 80px rgba(212,175,55,0.08)'
            }}>💎</div>
            {/* Orbiting gems */}
            {GEMS.map((g, i) => (
              <div key={i} style={{
                position: 'absolute', top: g.top, left: g.left, transform: 'translate(-50%, -50%)',
                width: 52, height: 52, borderRadius: '50%',
                background: `${g.color}22`, border: `1.5px solid ${g.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                boxShadow: `0 4px 20px ${g.color}33`,
                animation: `gemFloat 3s ease-in-out ${g.delay} infinite alternate`
              }}>
                {g.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)'
        }}>
          {[
            { val: '9', lbl: 'Sacred Gemstones', icon: '💎' },
            { val: '108', lbl: 'Vedic Mantras', icon: '🕉️' },
            { val: '12', lbl: 'Zodiac Alignments', icon: '♈' },
            { val: '100%', lbl: 'Vedic Authenticity', icon: '✅' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '28px 24px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none'
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 32px', background: 'var(--bg-secondary)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Features</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Everything You Need</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>A complete Vedic gemstone platform for the modern spiritual seeker.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '28px 28px', display: 'flex', gap: 20, alignItems: 'flex-start',
                transition: 'all 0.2s', cursor: 'default',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem'
                }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Process</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>Three simple steps from your birth date to your perfect gemstone.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '32px 28px', textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'linear-gradient(135deg, var(--gold), #a8892b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700, color: '#111'
                }}>{s.n}</div>
                <h4 style={{ fontFamily: 'Inter', fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{s.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={onGetStarted} style={{
              padding: '14px 32px', borderRadius: 12, border: 'none',
              background: 'var(--gold)', color: '#111',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '1rem',
              cursor: 'pointer', boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
              Start My Reading <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0c0b14', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔮</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Ready to Find Your Stone?</h2>
        <p style={{ color: '#8b949e', fontSize: '1rem', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7 }}>Create a free account and receive your personalized Vedic gemstone report in under 2 minutes.</p>
        <button onClick={onGetStarted} style={{
          padding: '14px 32px', borderRadius: 12, border: 'none',
          background: 'var(--gold)', color: '#111',
          fontFamily: 'Inter', fontWeight: 700, fontSize: '1rem',
          cursor: 'pointer', boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
          display: 'inline-flex', alignItems: 'center', gap: 8
        }}>
          Create Free Account <ArrowRight size={18} />
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0c0b14', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#d4af37,#a8892b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💎</div>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.15rem', color: 'white' }}>AstroGem</span>
              </div>
              <p style={{ color: '#6e7681', fontSize: '0.85rem', lineHeight: 1.7, margin: 0, maxWidth: 280 }}>Authentic Vedic gemstone recommendations powered by numerology and Jyotish astrology. Built for Hamara Pandit.</p>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem', marginBottom: 14 }}>Platform</div>
              {['Gem Finder', 'Navaratna Catalog', 'Compatibility', 'AstroGuide Chat'].map(l => (
                <div key={l} onClick={onGetStarted} style={{ color: '#6e7681', fontSize: '0.82rem', marginBottom: 9, cursor: 'pointer', transition: 'color 0.2s' }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem', marginBottom: 14 }}>Navaratna</div>
              {['Ruby', 'Pearl', 'Red Coral', 'Emerald', 'Yellow Sapphire'].map(l => (
                <div key={l} style={{ color: '#6e7681', fontSize: '0.82rem', marginBottom: 9 }}>{l}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ color: '#6e7681', fontSize: '0.78rem', margin: 0 }}>© 2024 AstroGem · Hamara Pandit Hiring Assignment</p>
            <p style={{ color: '#6e7681', fontSize: '0.78rem', margin: 0 }}>Built with 💎 by Deepanshu Singla</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes gemFloat { from { transform: translate(-50%,-50%) translateY(0px); } to { transform: translate(-50%,-50%) translateY(-12px); } }
      `}</style>
    </div>
  );
};
