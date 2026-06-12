import React, { useState } from 'react';
import { apiRecommend } from '../api/client';
import {
  Sparkles, ChevronRight, ChevronLeft, RotateCcw,
  Download, User, Calendar, Compass, Info
} from 'lucide-react';

type Focus = 'wealth' | 'career' | 'health' | 'love' | 'peace' | 'protection';

interface Gemstone {
  id: string; name: string; sanskritName: string; planet: string; planetHindi: string;
  color: string; description: string; mantra: string; metal: string;
  finger: string; dayToWear: string; benefits: string[]; carat: string;
  purification: string; precautions: string;
}

interface Result {
  primary: Gemstone; secondary: Gemstone; remedy: Gemstone;
  numerologyNumber: number; zodiac: string; focus: string;
}

const FOCUS_OPTIONS: { value: Focus; label: string; desc: string; emoji: string }[] = [
  { value: 'wealth',     label: 'Wealth & Abundance',  desc: 'Money, prosperity',   emoji: '💰' },
  { value: 'career',     label: 'Career & Success',     desc: 'Rise in profession',  emoji: '🚀' },
  { value: 'health',     label: 'Health & Vitality',    desc: 'Physical wellbeing',  emoji: '❤️' },
  { value: 'love',       label: 'Love & Marriage',      desc: 'Romance, bonds',      emoji: '💑' },
  { value: 'peace',      label: 'Mental Peace',         desc: 'Calm, clarity',       emoji: '☮️' },
  { value: 'protection', label: 'Protection',           desc: 'Shield negativity',   emoji: '🛡️' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const GEM_EMOJI: Record<string,string> = {
  ruby:'❤️', pearl:'🤍', emerald:'💚', diamond:'💎',
  blue_sapphire:'💙', red_coral:'🔴', yellow_sapphire:'🟡', hessonite:'🟤', cats_eye:'⚫'
};

const getDigit = (n: number): number => n < 10 ? n : getDigit(String(n).split('').reduce((a,d)=>a+parseInt(d),0));

/* ─── Result card ─── */
const ResultCard = ({ role, roleDesc, gem }: { role: string; roleDesc: string; gem: Gemstone }) => (
  <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 5, background: gem.color }} />
    <div className="card-p" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="result-badge text-muted tracking-wider">{role}</div>
          <div style={{ fontSize: '0.72rem', color: gem.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{roleDesc}</div>
        </div>
        <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>{GEM_EMOJI[gem.id] || '💠'}</div>
      </div>

      <div className="result-gem-name">{gem.name}</div>
      <div className="result-planet">{gem.sanskritName} · Ruled by {gem.planet}</div>

      <p className="text-sm mb-4" style={{ lineHeight: 1.65 }}>{gem.description.slice(0, 130)}...</p>

      <div style={{ flex: 1 }}>
        {[
          { k: 'Metal', v: gem.metal },
          { k: 'Finger', v: gem.finger },
          { k: 'Wear on', v: gem.dayToWear },
          { k: 'Carat', v: gem.carat },
        ].map(({ k, v }) => (
          <div className="result-detail-row" key={k}>
            <span className="result-detail-key">{k}</span>
            <span className="result-detail-val">{v}</span>
          </div>
        ))}
      </div>

      <div className="result-mantra mt-3">{gem.mantra}</div>

      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {gem.benefits.slice(0, 3).map(b => <span key={b} className="badge badge-gold">{b}</span>)}
      </div>
    </div>
  </div>
);

/* ─── Step progress ─── */
const StepBar = ({ step }: { step: number }) => (
  <div className="flex items-center gap-2 mb-6">
    {[1, 2, 3].map((s, i) => (
      <React.Fragment key={s}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem',
          flexShrink: 0, transition: 'all 0.3s',
          background: step > s ? 'var(--success)' : step === s ? 'var(--gold)' : 'var(--bg-secondary)',
          color: step >= s ? '#111' : 'var(--text-muted)',
          border: step < s ? '1px solid var(--border-solid)' : 'none',
          boxShadow: step === s ? '0 0 0 4px var(--gold-glow)' : 'none',
        }}>
          {step > s ? '✓' : s}
        </div>
        {i < 2 && (
          <div style={{ flex: 1, height: 2, borderRadius: 2, transition: 'background 0.3s',
            background: step > s ? 'var(--success)' : 'var(--border-solid)' }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ─── Main Component ─── */
export const GemFinder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName]   = useState('');
  const [day, setDay]     = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear]   = useState(1995);
  const [focus, setFocus] = useState<Focus>('wealth');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]    = useState('');

  const lifePath = getDigit(day);

  const calculate = async () => {
    setLoading(true); setError('');
    try {
      const r = await apiRecommend({ name, day, month, year, focus });
      setResult(r.data.data);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to get recommendation. Ensure the backend is running on port 5000.');
    } finally { setLoading(false); }
  };

  const reset = () => { setResult(null); setStep(1); setName(''); };

  /* ── RESULTS ── */
  if (result) return (
    <div className="animate-fadeIn">
      {/* Header row */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h2 className="mb-2">Your Gemstone Report</h2>
          <div className="flex gap-3 flex-wrap">
            <span className="badge badge-gold">Life Path {result.numerologyNumber}</span>
            <span className="badge badge-muted">{result.zodiac}</span>
            <span className="badge badge-muted">{FOCUS_OPTIONS.find(f=>f.value===result.focus)?.emoji} {FOCUS_OPTIONS.find(f=>f.value===result.focus)?.label}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> Recalculate</button>
          <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Download size={14} /> Save PDF</button>
        </div>
      </div>

      {/* 3 result cards */}
      <div className="grid grid-3 gap-6 mb-6 stagger">
        <ResultCard role="Life Stone" roleDesc="Lagna Ratna — Primary" gem={result.primary} />
        <ResultCard role="Lucky Stone" roleDesc="Bhagya Ratna — Secondary" gem={result.secondary} />
        <ResultCard role="Remedy Stone" roleDesc="Karya Ratna — Focus-Based" gem={result.remedy} />
      </div>

      {/* Explanation */}
      <div className="card card-p" style={{ borderLeft: '3px solid var(--gold)' }}>
        <div className="flex items-center gap-3 mb-3">
          <Info size={18} className="text-gold" style={{ color: 'var(--gold)' }} />
          <h4>How This Report Was Generated</h4>
        </div>
        <p className="text-sm" style={{ lineHeight: 1.75 }}>
          Your <strong>{result.primary.name}</strong> (Life Stone) was derived from your Birth Path Number <strong>{result.numerologyNumber}</strong>, which maps to the planet <strong>{result.primary.planet}</strong>.
          Your <strong>{result.secondary.name}</strong> (Lucky Stone) was chosen based on your approximate zodiac sign (<strong>{result.zodiac}</strong>), and verified to be astrologically compatible with your primary stone.
          Your <strong>{result.remedy.name}</strong> (Remedy Stone) was selected based on your focus area — <strong>{FOCUS_OPTIONS.find(f=>f.value===result.focus)?.label}</strong> — ensuring no planetary conflict with your other stones.
        </p>
      </div>
    </div>
  );

  /* ── FORM ── */
  return (
    <div className="animate-fadeIn">
      {/* Stats row */}
      <div className="grid grid-4 gap-4 mb-8 stagger">
        {[
          { val: '9',    lbl: 'Navaratna Gems',   icon: '💎' },
          { val: '108',  lbl: 'Vedic Mantras',    icon: '🕉️' },
          { val: '12',   lbl: 'Zodiac Signs',     icon: '♈' },
          { val: '100%', lbl: 'Vedic Authentic',  icon: '✅' },
        ].map(s => (
          <div className="card stat-card" key={s.lbl}>
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="stat-card-value">{s.val}</div>
            <div className="stat-card-label">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: 560 }}>
        <div className="page-header">
          <h2>Find Your Gemstones</h2>
          <p>Enter your birth details and life intention to receive a personalized Vedic gemstone recommendation.</p>
        </div>

        <StepBar step={step} />

        <div className="card card-p-lg">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width:38, height:38, borderRadius:9, background:'var(--gold-glow)', border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <User size={17} style={{ color:'var(--gold)' }} />
                </div>
                <div>
                  <h4 style={{ margin:0 }}>Personal Details</h4>
                  <p style={{ margin:0, fontSize:'0.78rem' }}>What should we call you?</p>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" placeholder="e.g. Deepanshu Singla" value={name} autoFocus
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(2)} />
              </div>
              <div className="flex justify-end mt-4">
                <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!name.trim()}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width:38, height:38, borderRadius:9, background:'var(--gold-glow)', border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Calendar size={17} style={{ color:'var(--gold)' }} />
                </div>
                <div>
                  <h4 style={{ margin:0 }}>Date of Birth</h4>
                  <p style={{ margin:0, fontSize:'0.78rem' }}>Used for numerology calculation</p>
                </div>
              </div>
              <div className="grid" style={{ gridTemplateColumns:'1fr 1.8fr 1.2fr', gap:12, marginBottom:16 }}>
                <div className="form-group" style={{ margin:0 }}>
                  <label className="form-label">Day</label>
                  <input className="form-input" type="number" min={1} max={31} value={day} onChange={e => setDay(Number(e.target.value))} />
                </div>
                <div className="form-group" style={{ margin:0 }}>
                  <label className="form-label">Month</label>
                  <select className="form-input" value={month} onChange={e => setMonth(Number(e.target.value))}>
                    {MONTHS.map((m,i) => <option key={m} value={i+1}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ margin:0 }}>
                  <label className="form-label">Year</label>
                  <input className="form-input" type="number" min={1900} max={2025} value={year} onChange={e => setYear(Number(e.target.value))} />
                </div>
              </div>
              <div style={{ padding:'10px 14px', borderRadius:8, background:'var(--gold-glow)', border:'1px solid var(--gold-border)', fontSize:'0.82rem', color:'var(--gold)', marginBottom:8 }}>
                ✨ Your Life Path Number: <strong>{lifePath}</strong> — maps to {
                  ['', 'Sun (Ruby)', 'Moon (Pearl)', 'Jupiter (Yellow Sapphire)',
                   'Rahu (Hessonite)', 'Mercury (Emerald)', 'Venus (Diamond)',
                   'Ketu (Cat\'s Eye)', 'Saturn (Blue Sapphire)', 'Mars (Red Coral)'][lifePath]
                }
              </div>
              <div className="flex justify-between mt-5">
                <button className="btn btn-ghost" onClick={() => setStep(1)}><ChevronLeft size={16} /> Back</button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>Continue <ChevronRight size={16} /></button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width:38, height:38, borderRadius:9, background:'var(--gold-glow)', border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Compass size={17} style={{ color:'var(--gold)' }} />
                </div>
                <div>
                  <h4 style={{ margin:0 }}>Life Intention</h4>
                  <p style={{ margin:0, fontSize:'0.78rem' }}>What are you seeking most right now?</p>
                </div>
              </div>
              <div className="grid grid-2 gap-3 mb-5">
                {FOCUS_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => setFocus(opt.value)} style={{
                    padding:'13px 15px', borderRadius:9,
                    border:`1.5px solid ${focus===opt.value ? 'var(--gold)' : 'var(--border-solid)'}`,
                    background: focus===opt.value ? 'var(--gold-glow)' : 'transparent',
                    cursor:'pointer', textAlign:'left', transition:'all 0.18s',
                    display:'flex', gap:11, alignItems:'center'
                  }}>
                    <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{opt.emoji}</span>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontWeight:600, fontSize:'0.85rem', color: focus===opt.value ? 'var(--gold)' : 'var(--text)', transition:'color 0.18s' }}>{opt.label}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              {error && <div className="alert alert-danger mb-4">{error}</div>}
              <div className="flex justify-between">
                <button className="btn btn-ghost" onClick={() => setStep(2)}><ChevronLeft size={16} /> Back</button>
                <button className="btn btn-primary btn-lg" onClick={calculate} disabled={loading}>
                  {loading
                    ? <><div style={{ width:18, height:18, borderRadius:'50%', border:'2px solid #111', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }} /> Analyzing...</>
                    : <><Sparkles size={18} /> Get My Gemstones</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
