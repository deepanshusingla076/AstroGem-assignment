import React, { useState } from 'react';
import { navaratna } from '../utils/gemstoneData';
import { Search } from 'lucide-react';

export const GemstoneCatalog: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredGems = navaratna.filter(gem => 
    gem.name.toLowerCase().includes(search.toLowerCase()) || 
    gem.planet.toLowerCase().includes(search.toLowerCase()) ||
    gem.benefits.some(b => b.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '40px 0', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>The Navaratna (Nine Sacred Gemstones)</h2>
        <p className="text-muted">Explore the properties and planetary powers of Vedic gemstones.</p>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto 3rem auto', position: 'relative' }}>
        <Search className="text-muted" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} size={20} />
        <input 
          type="text" 
          className="input-field" 
          placeholder="Search by name, planet, or benefit..." 
          style={{ paddingLeft: '40px' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredGems.map(gem => (
          <div key={gem.id} className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '4px', color: 'var(--accent-color)' }}>{gem.name}</h3>
            <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '16px' }}>({gem.sanskritName})</p>
            
            <p style={{ marginBottom: '16px', fontSize: '0.95rem', lineHeight: '1.5' }}>{gem.description}</p>
            
            <div style={{ fontSize: '0.9rem', color: 'var(--text-color)' }}>
              <p><strong>Planet:</strong> {gem.planet}</p>
              <p><strong>Benefits:</strong> {gem.benefits.slice(0, 3).join(', ')}</p>
              <p><strong>Worn on:</strong> {gem.dayToWear}</p>
            </div>
          </div>
        ))}
        {filteredGems.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No gemstones found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
