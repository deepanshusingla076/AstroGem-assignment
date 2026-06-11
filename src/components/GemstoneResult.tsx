import React from 'react';
import type { RecommendationResult } from '../utils/astrologyEngine';
import type { Gemstone } from '../utils/gemstoneData';
import { RefreshCw, Download, Star } from 'lucide-react';

interface Props {
  result: RecommendationResult;
  onReset: () => void;
}

const GemCard = ({ title, type, gem }: { title: string, type: string, gem: Gemstone }) => (
  <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-color)', fontWeight: 'bold' }}>{type}</span>
        <h3 style={{ fontSize: '1.5rem', marginTop: '4px' }}>{title}</h3>
      </div>
      <Star className="text-accent" fill="currentColor" size={24} />
    </div>
    
    <div style={{ flex: 1 }}>
      <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: '1.6' }}>{gem.description}</p>
      
      <div style={{ display: 'grid', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <p><strong>Planet:</strong> {gem.planet} ({gem.planetHindi})</p>
        <p><strong>Mantra:</strong> <span style={{ fontStyle: 'italic', color: 'var(--text-color)' }}>{gem.mantra}</span></p>
        <p><strong>Metal:</strong> {gem.metal}</p>
        <p><strong>Finger:</strong> {gem.finger}</p>
        <p><strong>Day:</strong> {gem.dayToWear}</p>
      </div>
    </div>
  </div>
);

export const GemstoneResult: React.FC<Props> = ({ result, onReset }) => {
  return (
    <div className="container" style={{ padding: '40px 0', animation: 'fadeIn 0.8s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Your Astrological Recommendations</h2>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Based on your birth path ({result.numerologyNumber}) and astrological alignments, we have determined the optimal gemstones for your journey.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8" style={{ marginBottom: '3rem' }}>
        <GemCard title={result.primary.name} type="Life Stone (Lagna)" gem={result.primary} />
        <GemCard title={result.secondary.name} type="Lucky Stone (Bhagya)" gem={result.secondary} />
        <GemCard title={result.remedy.name} type="Remedy Stone (Karya)" gem={result.remedy} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button className="btn-outline" onClick={onReset}>
          <RefreshCw size={18} /> Recalculate
        </button>
        <button className="btn-primary" onClick={() => window.print()}>
          <Download size={18} /> Save Report
        </button>
      </div>
    </div>
  );
};
