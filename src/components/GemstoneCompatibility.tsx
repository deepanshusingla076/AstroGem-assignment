import React, { useState } from 'react';
import { navaratna, getGemstoneById } from '../utils/gemstoneData';
import { ArrowRightLeft, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export const GemstoneCompatibility: React.FC = () => {
  const [gem1Id, setGem1Id] = useState<string>('ruby');
  const [gem2Id, setGem2Id] = useState<string>('blue_sapphire');

  const gem1 = getGemstoneById(gem1Id);
  const gem2 = getGemstoneById(gem2Id);

  let status = 'neutral';
  let message = '';

  if (gem1 && gem2) {
    if (gem1.id === gem2.id) {
      status = 'neutral';
      message = 'You selected the same gemstone. It is safe to wear, but usually one is enough.';
    } else if (gem1.compatibility.friendly.includes(gem2.name)) {
      status = 'friendly';
      message = `${gem1.name} and ${gem2.name} are highly compatible. Their planetary lords (${gem1.planet} & ${gem2.planet}) are friends. Wearing them together is highly auspicious.`;
    } else if (gem1.compatibility.inimical.includes(gem2.name)) {
      status = 'inimical';
      message = `WARNING: ${gem1.name} and ${gem2.name} are INIMICAL (enemies). Their planets (${gem1.planet} & ${gem2.planet}) conflict. Do NOT wear them together!`;
    } else {
      status = 'neutral';
      message = `${gem1.name} and ${gem2.name} are neutral to each other. They can be worn together if required by your birth chart, but usually they govern different aspects.`;
    }
  }

  return (
    <div className="container mt-8" style={{ animation: 'fadeIn 0.5s ease', maxWidth: '800px' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Planetary Compatibility</h2>
          <p className="text-muted">Check if two gemstones can be worn together safely.</p>
        </div>

        <div className="flex items-center justify-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>First Gemstone</label>
            <select className="input-field" value={gem1Id} onChange={e => setGem1Id(e.target.value)}>
              {navaratna.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', paddingBottom: '12px' }}>
            <ArrowRightLeft className="text-muted" size={32} />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Second Gemstone</label>
            <select className="input-field" value={gem2Id} onChange={e => setGem2Id(e.target.value)}>
              {navaratna.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
        </div>

        {gem1 && gem2 && (
          <div style={{ 
            marginTop: '3rem', 
            padding: '24px', 
            borderRadius: '12px',
            border: `2px solid ${status === 'friendly' ? 'var(--success)' : status === 'inimical' ? 'var(--danger)' : 'var(--accent-color)'}`,
            background: 'var(--bg-color)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            <div style={{ marginTop: '4px' }}>
              {status === 'friendly' && <CheckCircle color="var(--success)" size={32} />}
              {status === 'inimical' && <AlertTriangle color="var(--danger)" size={32} />}
              {status === 'neutral' && <HelpCircle color="var(--accent-color)" size={32} />}
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '8px',
                color: status === 'friendly' ? 'var(--success)' : status === 'inimical' ? 'var(--danger)' : 'var(--text-color)'
              }}>
                {status === 'friendly' ? 'Highly Compatible' : status === 'inimical' ? 'Incompatible (Do Not Mix)' : 'Neutral'}
              </h3>
              <p style={{ lineHeight: '1.6' }}>{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
