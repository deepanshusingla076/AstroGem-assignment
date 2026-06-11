import React, { useState } from 'react';
import type { UserDetails, LifeFocus } from '../utils/astrologyEngine';
import { Sparkles, Calendar, User, Compass } from 'lucide-react';

interface Props {
  onCalculate: (details: UserDetails) => void;
}

export const GemstoneRecommendationForm: React.FC<Props> = ({ onCalculate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    day: 1,
    month: 1,
    year: 1990,
    focus: 'wealth'
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const updateField = (field: keyof UserDetails, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '600px', margin: '40px auto', padding: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Find Your Astrological Gemstones</h2>
        <p className="text-muted">Enter your birth details and life intentions</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', padding: '0 20px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ 
            width: '32px', height: '32px', borderRadius: '50%', 
            background: step >= i ? 'var(--accent-color)' : 'transparent',
            border: `2px solid ${step >= i ? 'var(--accent-color)' : 'var(--card-border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: step >= i ? '#111' : 'var(--text-color)',
            fontWeight: 'bold'
          }}>
            {i}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User className="text-accent" /> Personal Details
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={e => updateField('name', e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button type="button" className="btn-primary" onClick={handleNext} disabled={!formData.name}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar className="text-accent" /> Birth Details
            </h3>
            <div className="grid md:grid-cols-3 gap-4" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Day</label>
                <input 
                  type="number" min="1" max="31" className="input-field" 
                  value={formData.day} onChange={e => updateField('day', parseInt(e.target.value))}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Month</label>
                <select className="input-field" value={formData.month} onChange={e => updateField('month', parseInt(e.target.value))}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Year</label>
                <input 
                  type="number" min="1900" max="2026" className="input-field" 
                  value={formData.year} onChange={e => updateField('year', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button type="button" className="btn-outline" onClick={handlePrev}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNext}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass className="text-accent" /> Life Intentions
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>What is your primary focus right now?</label>
              <select 
                className="input-field" 
                value={formData.focus} 
                onChange={e => updateField('focus', e.target.value as LifeFocus)}
              >
                <option value="wealth">Wealth & Abundance</option>
                <option value="career">Career & Success</option>
                <option value="health">Health & Vitality</option>
                <option value="love">Love & Marriage</option>
                <option value="peace">Mental Peace</option>
                <option value="protection">Protection from Negativity</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button type="button" className="btn-outline" onClick={handlePrev}>Back</button>
              <button type="submit" className="btn-primary">
                <Sparkles size={20} /> Discover Gemstones
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
