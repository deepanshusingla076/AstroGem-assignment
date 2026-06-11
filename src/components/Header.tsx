import React, { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const navItems = [
    { id: 'finder', label: 'Finder' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'chat', label: 'AstroChat' }
  ];

  return (
    <header className="glass-panel" style={{ margin: '20px', padding: '16px 24px', position: 'sticky', top: '20px', zIndex: 100 }}>
      <div className="container flex justify-between items-center">
        <div 
          className="flex items-center gap-2" 
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('finder')}
        >
          <Sparkles className="text-accent" size={28} />
          <h1 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px' }}>AstroGem</h1>
        </div>
        
        <nav className="flex gap-4" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? 'var(--accent-color)' : 'var(--text-color)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1rem',
                fontWeight: activeTab === item.id ? 600 : 400,
                cursor: 'pointer',
                borderBottom: activeTab === item.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={toggleTheme} 
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};
