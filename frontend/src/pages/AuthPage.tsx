import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiLogin, apiRegister } from '../api/client';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface Props { onBack: () => void; }

const GEMS_LEFT = [
  { emoji: '❤️', name: 'Ruby', planet: 'Sun', color: '#c0392b' },
  { emoji: '💙', name: 'Blue Sapphire', planet: 'Saturn', color: '#2980b9' },
  { emoji: '💚', name: 'Emerald', planet: 'Mercury', color: '#27ae60' },
  { emoji: '🟡', name: 'Yellow Sapphire', planet: 'Jupiter', color: '#f1c40f' },
  { emoji: '🤍', name: 'Pearl', planet: 'Moon', color: '#95a5a6' },
];

export const AuthPage: React.FC<Props> = ({ onBack }) => {
  const [tab,      setTab]      = useState<'login' | 'signup'>('login');
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (tab === 'login') {
        const r = await apiLogin(email, password);
        login(r.data.token, r.data.user);
      } else {
        if (!name.trim()) { setError('Name is required.'); setLoading(false); return; }
        const r = await apiRegister(name, email, password);
        login(r.data.token, r.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cannot connect to server. Make sure the backend is running: cd backend && npm run dev');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, sans-serif' }}>

      {/* LEFT — Dark panel */}
      <div style={{
        background: 'linear-gradient(160deg, #0c0b14 0%, #13111e 60%, #0f0d1a 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 52px', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background gem shape */}
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 380 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg,#d4af37,#a8892b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}>💎</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>AstroGem</span>
          </div>

          <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.75rem', fontWeight: 700, marginBottom: 14, lineHeight: 1.3 }}>The Nine Sacred Stones of Vedic Astrology</h2>
          <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 40 }}>
            Each Navaratna gemstone carries the living energy of a celestial planet. Your birth chart reveals which stone resonates with your soul.
          </p>

          {/* Gem list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {GEMS_LEFT.map((g, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px', borderRadius: 11,
                background: `${g.color}12`, border: `1px solid ${g.color}25`,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{g.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{g.name}</div>
                  <div style={{ color: '#6e7681', fontSize: '0.75rem', marginTop: 1 }}>Ruled by {g.planet}</div>
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#d4af37', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Navaratna</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 52px', background: 'var(--bg)', transition: 'background 0.3s' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Back */}
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'Inter', fontSize: '0.875rem', marginBottom: 36, padding: 0, transition: 'color 0.2s' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>

          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 28, lineHeight: 1.5 }}>
            {tab === 'login' ? 'Sign in to access your astrological profile.' : 'Join AstroGem and discover your sacred gemstone.'}
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 9, padding: 4, gap: 4, marginBottom: 28, transition: 'background 0.3s' }}>
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }} style={{
                flex: 1, padding: '9px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s',
                background: tab === t ? 'var(--surface)' : 'transparent',
                color: tab === t ? 'var(--text)' : 'var(--text-muted)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none'
              }}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            {tab === 'signup' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                <input style={{
                  width: '100%', padding: '11px 14px', borderRadius: 9,
                  border: '1.5px solid var(--border-solid)', background: 'var(--bg-secondary)',
                  color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none',
                  transition: 'all 0.2s', boxSizing: 'border-box'
                }}
                  placeholder="e.g. Deepanshu Singla" value={name} onChange={e => setName(e.target.value)} required
                  onFocus={e => { e.target.style.borderColor = '#d4af37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
              <input style={{
                width: '100%', padding: '11px 14px', borderRadius: 9,
                border: '1.5px solid var(--border-solid)', background: 'var(--bg-secondary)',
                color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none',
                transition: 'all 0.2s', boxSizing: 'border-box'
              }}
                type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                onFocus={e => { e.target.style.borderColor = '#d4af37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input style={{
                  width: '100%', padding: '11px 44px 11px 14px', borderRadius: 9,
                  border: '1.5px solid var(--border-solid)', background: 'var(--bg-secondary)',
                  color: 'var(--text)', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none',
                  transition: 'all 0.2s', boxSizing: 'border-box'
                }}
                  type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                  onFocus={e => { e.target.style.borderColor = '#d4af37'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 9, padding: '11px 14px', marginBottom: 16, marginTop: 12, color: '#dc2626', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              background: loading ? '#a8892b' : 'var(--gold)', color: '#111',
              fontFamily: 'Inter', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)', transition: 'all 0.2s',
              marginTop: 20
            }}>
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #111', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                  {tab === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>{tab === 'login' ? '✨ Sign In' : '🚀 Create Account'}</>
              )}
            </button>
          </form>

          {/* Demo fill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 500 }}>Quick demo</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <button type="button" onClick={() => { setEmail('demo@astrogem.com'); setPassword('demo123'); setName('Demo User'); setTab('signup'); }} style={{
            width: '100%', padding: '12px', borderRadius: 10,
            border: '1.5px solid var(--border-solid)', background: 'transparent',
            color: 'var(--text)', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.875rem',
            cursor: 'pointer', transition: 'all 0.2s', boxSizing: 'border-box'
          }}>
            Fill Demo Credentials
          </button>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            By continuing you agree to our Terms of Service.<br />
            Built for the Hamara Pandit hiring assignment.
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
