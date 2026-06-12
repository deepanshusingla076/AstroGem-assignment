import React, { useState, useEffect } from 'react';
import { apiGetGemstones, apiCompatibility } from '../api/client';
import { ArrowRightLeft, CheckCircle2, XCircle, HelpCircle, Loader2 } from 'lucide-react';

interface Gem { id: string; name: string; color: string; planet: string; sanskritName: string; }
interface CompatResult { status: string; message: string; gem1: Gem; gem2: Gem; }

const EMOJI: Record<string,string> = {
  ruby:'❤️', pearl:'🤍', emerald:'💚', diamond:'💎',
  blue_sapphire:'💙', red_coral:'🔴', yellow_sapphire:'🟡', hessonite:'🟤', cats_eye:'⚫'
};

export const GemCompatibility: React.FC = () => {
  const [gems,    setGems]    = useState<Gem[]>([]);
  const [gem1Id,  setGem1Id]  = useState('ruby');
  const [gem2Id,  setGem2Id]  = useState('blue_sapphire');
  const [result,  setResult]  = useState<CompatResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => { apiGetGemstones().then(r => setGems(r.data.data)).catch(() => {}); }, []);

  const check = async () => {
    setLoading(true); setError(''); setResult(null);
    try {
      const r = await apiCompatibility(gem1Id, gem2Id);
      setResult(r.data.data);
    } catch {
      setError('Failed to check. Make sure the backend server is running on port 5000.');
    } finally { setLoading(false); }
  };

  const swap = () => { setGem1Id(gem2Id); setGem2Id(gem1Id); setResult(null); };

  const StatusIcon = ({ status }: { status: string }) =>
    status === 'friendly'
      ? <CheckCircle2 size={32} style={{ color:'var(--success)', flexShrink:0 }} />
      : status === 'inimical'
      ? <XCircle size={32} style={{ color:'var(--danger)', flexShrink:0 }} />
      : <HelpCircle size={32} style={{ color:'var(--warning)', flexShrink:0 }} />;

  return (
    <div className="animate-fadeIn" style={{ maxWidth:700 }}>
      <div className="page-header">
        <h2>Compatibility Checker</h2>
        <p>Select two gemstones to verify if they can be safely worn together based on Vedic planetary friendship rules.</p>
      </div>

      {/* Selector card */}
      <div className="card card-p-lg mb-6">
        <div className="flex gap-4 items-end flex-wrap mb-5">
          <div style={{ flex:1, minWidth:180 }}>
            <label className="form-label">First Gemstone</label>
            <select className="form-input" value={gem1Id} onChange={e => { setGem1Id(e.target.value); setResult(null); }}>
              {gems.map(g => <option key={g.id} value={g.id}>{EMOJI[g.id]} {g.name} — {g.planet}</option>)}
            </select>
          </div>

          <button className="btn btn-ghost btn-icon mb-1" onClick={swap} title="Swap">
            <ArrowRightLeft size={20} style={{ color:'var(--text-muted)' }} />
          </button>

          <div style={{ flex:1, minWidth:180 }}>
            <label className="form-label">Second Gemstone</label>
            <select className="form-input" value={gem2Id} onChange={e => { setGem2Id(e.target.value); setResult(null); }}>
              {gems.map(g => <option key={g.id} value={g.id}>{EMOJI[g.id]} {g.name} — {g.planet}</option>)}
            </select>
          </div>
        </div>

        {/* Preview row */}
        {gem1Id && gem2Id && (
          <div className="flex items-center justify-center gap-6 mb-5 p-4" style={{ background:'var(--bg-secondary)', borderRadius:10, transition:'background 0.3s' }}>
            {[gems.find(g=>g.id===gem1Id), gems.find(g=>g.id===gem2Id)].filter(Boolean).map((g, i) => (
              <React.Fragment key={g!.id}>
                {i === 1 && <div style={{ fontSize:'1.2rem', color:'var(--text-muted)' }}>⟷</div>}
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'2.2rem', marginBottom:4 }}>{EMOJI[g!.id]}</div>
                  <div style={{ fontWeight:600, fontSize:'0.85rem', color:g!.color }}>{g!.name}</div>
                  <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{g!.planet}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

        {error && <div className="alert alert-danger mb-4"><span>⚠️</span><span>{error}</span></div>}

        <button className="btn btn-primary" onClick={check} disabled={loading || gem1Id === gem2Id}>
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Checking...</>
            : '⚖️ Check Compatibility'}
        </button>
        {gem1Id === gem2Id && <p className="text-sm text-muted mt-2">Select two different gemstones to compare.</p>}

        {/* Result */}
        {result && (
          <div className={`compat-result ${result.status === 'friendly' ? 'compat-friendly' : result.status === 'inimical' ? 'compat-inimical' : 'compat-neutral'}`}>
            <StatusIcon status={result.status} />
            <div>
              <div style={{ fontWeight:700, fontSize:'1rem', marginBottom:5,
                color: result.status==='friendly' ? 'var(--success)' : result.status==='inimical' ? 'var(--danger)' : 'var(--warning)' }}>
                {result.status === 'friendly' ? '✅ Highly Compatible — Safe to Wear Together'
                 : result.status === 'inimical' ? '❌ INCOMPATIBLE — Do Not Wear Together'
                 : '⚠️ Neutral — Seek Astrological Guidance'}
              </div>
              <p className="text-sm" style={{ margin:0, lineHeight:1.65 }}>{result.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Reference cards */}
      <div className="grid grid-2 gap-5">
        <div className="card card-p" style={{ borderLeft:'3px solid var(--success)' }}>
          <h4 className="mb-3" style={{ color:'var(--success)' }}>✅ Known Safe Combinations</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:'0.83rem', color:'var(--text-secondary)' }}>
            {[
              'Ruby + Pearl + Yellow Sapphire',
              'Blue Sapphire + Diamond + Emerald',
              'Red Coral + Ruby',
              'Pearl + Red Coral',
            ].map(combo => (
              <div key={combo} className="flex items-center gap-2">
                <span style={{ color:'var(--success)', fontSize:'0.7rem' }}>✓</span>{combo}
              </div>
            ))}
          </div>
        </div>
        <div className="card card-p" style={{ borderLeft:'3px solid var(--danger)' }}>
          <h4 className="mb-3" style={{ color:'var(--danger)' }}>❌ Never Combine These</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:7, fontSize:'0.83rem', color:'var(--text-secondary)' }}>
            {[
              'Ruby + Blue Sapphire (Sun vs Saturn)',
              'Ruby + Diamond (Sun vs Venus)',
              'Pearl + Cat\'s Eye',
              'Red Coral + Emerald',
            ].map(combo => (
              <div key={combo} className="flex items-center gap-2">
                <span style={{ color:'var(--danger)', fontSize:'0.7rem' }}>✗</span>{combo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
