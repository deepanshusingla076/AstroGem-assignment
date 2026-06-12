import React, { useState, useEffect } from 'react';
import { apiGetGemstones } from '../api/client';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface Gem {
  id: string; name: string; sanskritName: string; planet: string;
  color: string; colorName: string; description: string; benefits: string[];
  mantra: string; dayToWear: string; finger: string; metal: string;
  chakra: string; zodiacSigns: string[]; carat: string;
  purification: string; precautions: string;
}

const EMOJI: Record<string,string> = {
  ruby:'❤️', pearl:'🤍', emerald:'💚', diamond:'💎',
  blue_sapphire:'💙', red_coral:'🔴', yellow_sapphire:'🟡', hessonite:'🟤', cats_eye:'⚫'
};

const PLANETS = ['All','Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];

export const GemCatalog: React.FC = () => {
  const [gems,     setGems]     = useState<Gem[]>([]);
  const [filtered, setFiltered] = useState<Gem[]>([]);
  const [search,   setSearch]   = useState('');
  const [planet,   setPlanet]   = useState('All');
  const [selected, setSelected] = useState<Gem | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    apiGetGemstones()
      .then(r => { setGems(r.data.data); setFiltered(r.data.data); })
      .catch(() => setError('Cannot reach the backend. Start the backend with: cd backend && npm run dev'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = gems;
    if (planet !== 'All') list = list.filter(g => g.planet === planet);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.planet.toLowerCase().includes(q) ||
        g.benefits.some(b => b.toLowerCase().includes(q)) ||
        g.sanskritName.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [search, planet, gems]);

  /* loading skeleton */
  if (loading) return (
    <div>
      <div className="skeleton" style={{ height:46, borderRadius:9, marginBottom:20 }} />
      <div className="grid grid-3 gap-5">
        {[...Array(9)].map((_,i) => <div key={i} className="skeleton" style={{ height:220, borderRadius:12 }} />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger">
      <span>⚠️</span>
      <span>{error}</span>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <h2>Navaratna Catalog</h2>
        <p>The nine sacred gemstones of Vedic Jyotish astrology — click any card for full details.</p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div style={{ flex:1, minWidth:220, position:'relative' }}>
          <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
          <input className="form-input" style={{ paddingLeft:36 }}
            placeholder="Search by name, planet, or benefit..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ position:'relative', minWidth:170 }}>
          <SlidersHorizontal size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
          <select className="form-input" style={{ paddingLeft:36 }} value={planet} onChange={e => setPlanet(e.target.value)}>
            {PLANETS.map(p => <option key={p} value={p}>{p === 'All' ? 'All Planets' : p}</option>)}
          </select>
        </div>
        <div className="flex items-center text-muted text-sm" style={{ whiteSpace:'nowrap' }}>
          {filtered.length} of {gems.length} shown
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-3 gap-5 stagger">
        {filtered.map(gem => (
          <div key={gem.id} className="card gem-catalog-card card-hover" onClick={() => setSelected(gem)}>
            <div className="gem-strip" style={{ background: gem.color }} />
            <div className="card-p">
              <div className="gem-icon-wrap" style={{ background:`${gem.color}18`, borderColor:`${gem.color}44` }}>
                <span style={{ fontSize:'1.4rem' }}>{EMOJI[gem.id] || '💠'}</span>
              </div>
              <h4 style={{ color:gem.color, marginBottom:2 }}>{gem.name}</h4>
              <p style={{ fontSize:'0.78rem', fontStyle:'italic', color:'var(--text-muted)', marginBottom:10 }}>({gem.sanskritName})</p>
              <p style={{ fontSize:'0.83rem', lineHeight:1.6, marginBottom:14, color:'var(--text-secondary)' }}>
                {gem.description.slice(0,105)}...
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-gold">{gem.planet}</span>
                {gem.zodiacSigns.slice(0,1).map(z => <span key={z} className="badge badge-muted">{z}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'64px 0', color:'var(--text-muted)' }}>
          <div style={{ fontSize:'3rem', marginBottom:14 }}>🔍</div>
          <h4 className="mb-2">No matches found</h4>
          <p className="text-sm">Try a different search or planet filter.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth:620, width:'100%' }} onClick={e => e.stopPropagation()}>
            {/* Modal header */}
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div style={{ width:44, height:44, borderRadius:'50%', background:`${selected.color}20`, border:`2px solid ${selected.color}50`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>
                  {EMOJI[selected.id] || '💠'}
                </div>
                <div>
                  <h3 style={{ margin:0, color:selected.color }}>{selected.name}</h3>
                  <p style={{ margin:0, fontSize:'0.78rem', color:'var(--text-muted)', fontStyle:'italic' }}>({selected.sanskritName}) · {selected.planet}</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="card-p">
              <p className="mb-5" style={{ lineHeight:1.75 }}>{selected.description}</p>

              <div className="grid grid-2 gap-3 mb-5">
                {[
                  { k:'Metal',    v:selected.metal     },
                  { k:'Finger',   v:selected.finger    },
                  { k:'Wear On',  v:selected.dayToWear },
                  { k:'Carat',    v:selected.carat     },
                  { k:'Chakra',   v:selected.chakra    },
                  { k:'Color',    v:selected.colorName },
                ].map(({k,v}) => (
                  <div key={k} style={{ background:'var(--bg-secondary)', borderRadius:8, padding:'11px 14px', transition:'background 0.3s' }}>
                    <div style={{ fontSize:'0.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', marginBottom:4 }}>{k}</div>
                    <div style={{ fontWeight:600, fontSize:'0.875rem' }}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', marginBottom:8 }}>Benefits</div>
                <div className="flex flex-wrap gap-2">
                  {selected.benefits.map(b => <span key={b} className="badge badge-gold">{b}</span>)}
                </div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', marginBottom:8 }}>Vedic Mantra</div>
                <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.05rem', fontStyle:'italic', color:'var(--gold)', padding:'10px 14px', background:'var(--gold-glow)', borderRadius:8, border:'1px solid var(--gold-border)' }}>
                  {selected.mantra}
                </div>
              </div>

              <div className="mb-4">
                <div style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', marginBottom:8 }}>Purification Ritual</div>
                <p className="text-sm">{selected.purification}</p>
              </div>

              <div className="alert alert-warning">
                <span>⚠️</span>
                <span style={{ fontSize:'0.85rem' }}>{selected.precautions}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
