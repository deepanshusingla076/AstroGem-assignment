import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GemFinder } from '../components/GemFinder';
import { GemCatalog } from '../components/GemCatalog';
import { GemCompatibility } from '../components/GemCompatibility';
import { AstroChat } from '../components/AstroChat';
import { Sparkles, BookOpen, GitCompare, MessageCircle, LogOut, ChevronRight, Search, Bell } from 'lucide-react';

type Section = 'finder' | 'catalog' | 'compatibility' | 'chat';

const NAV: { id: Section; label: string; icon: React.ReactNode; desc: string; pill?: string }[] = [
  { id: 'finder',        label: 'Gem Finder',       icon: <Sparkles size={18} />,      desc: 'Get your report',  pill: 'New' },
  { id: 'catalog',       label: 'Navaratna Catalog', icon: <BookOpen size={18} />,      desc: '9 sacred gems' },
  { id: 'compatibility', label: 'Compatibility',     icon: <GitCompare size={18} />,    desc: 'Check harmony' },
  { id: 'chat',          label: 'AstroGuide Chat',   icon: <MessageCircle size={18} />, desc: 'Ask anything' },
];

const PAGE: Record<Section, { title: string; sub: string }> = {
  finder:        { title: 'Gem Finder',          sub: 'Personalized Vedic gemstone recommendation' },
  catalog:       { title: 'Navaratna Catalog',    sub: 'Explore all 9 sacred gemstones' },
  compatibility: { title: 'Compatibility Check',  sub: 'Verify planetary gemstone harmony' },
  chat:          { title: 'AstroGuide Chat',       sub: 'Ask anything about Vedic gemstones' },
};

export const DashboardLayout: React.FC = () => {
  const [section, setSection] = useState<Section>('finder');
  const [isDark, setIsDark] = useState(false);
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    const n = !isDark; setIsDark(n);
    document.documentElement.setAttribute('data-theme', n ? 'dark' : 'light');
  };

  const { title, sub } = PAGE[section];
  const initials = user?.name?.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2) || 'AG';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ═══════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════ */}
      <aside style={{
        width: 256, flexShrink: 0,
        background: 'linear-gradient(180deg, #0c0b14 0%, #10101a 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 300, overflowY: 'auto', overflowX: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg,#d4af37,#a8892b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0, boxShadow: '0 2px 12px rgba(212,175,55,0.3)' }}>💎</div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.2 }}>AstroGem</div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginTop: 2 }}>Hamara Pandit</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding: '16px 10px', flex: 1 }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '0 8px', marginBottom: 8 }}>Main Menu</div>
          {NAV.map(item => {
            const isActive = section === item.id;
            return (
              <button key={item.id} onClick={() => setSection(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', width: '100%', borderRadius: 9,
                border: isActive ? '1px solid rgba(212,175,55,0.25)' : '1px solid transparent',
                background: isActive ? 'rgba(212,175,55,0.12)' : 'transparent',
                cursor: 'pointer', textAlign: 'left', marginBottom: 4,
                transition: 'all 0.18s',
                outline: 'none'
              }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {/* Icon box */}
                <div style={{
                  width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                  background: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? '#d4af37' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.18s'
                }}>
                  {item.icon}
                </div>
                {/* Label + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: isActive ? '#d4af37' : 'rgba(255,255,255,0.75)', fontWeight: isActive ? 700 : 500, fontSize: '0.875rem', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', marginTop: 1 }}>{item.desc}</div>
                </div>
                {/* Pill or chevron */}
                {item.pill
                  ? <span style={{ background: '#d4af37', color: '#111', borderRadius: 100, fontSize: '0.62rem', padding: '2px 7px', fontWeight: 800 }}>{item.pill}</span>
                  : isActive ? <ChevronRight size={14} style={{ color: 'rgba(212,175,55,0.5)', flexShrink: 0 }} /> : null}
              </button>
            );
          })}
        </div>

        {/* Daily tip */}
        <div style={{ padding: '0 10px 10px' }}>
          <div style={{ padding: '14px 14px', borderRadius: 11, background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.15)' }}>
            <div style={{ fontSize: '0.65rem', color: '#d4af37', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 8 }}>✨ Daily Tip</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
              Wearing your gemstone on its designated day enhances planetary energy by 3×.
            </div>
          </div>
        </div>

        {/* User footer */}
        <div style={{ padding: '10px 10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 9, background: 'rgba(255,255,255,0.04)', marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#d4af37,#a8892b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem', color: '#111', flexShrink: 0 }}>{initials}</div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', width: '100%', borderRadius: 9, border: 'none', background: 'transparent', color: '#f87171', fontFamily: 'Inter', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.18s', textAlign: 'left' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <div style={{ marginLeft: 256, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* TOPBAR */}
        <header style={{
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', position: 'sticky', top: 0, zIndex: 200,
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(8px)', transition: 'background 0.3s, border-color 0.3s'
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dashboard</span>
            <ChevronRight size={13} style={{ color: 'var(--text-muted)' }} />
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{title}</span>
              <span style={{ marginLeft: 10, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub}</span>
            </div>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Theme toggle */}
            <button onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'} style={{
              width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border-solid)',
              background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', color: 'var(--text)'
            }}>
              {isDark ? '☀️' : '🌙'}
            </button>
            {/* Search */}
            <button title="Search" style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border-solid)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s' }}>
              <Search size={16} />
            </button>
            {/* Bell */}
            <button title="Notifications" style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border-solid)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s', position: 'relative' }}>
              <Bell size={16} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: '#d4af37', border: '1px solid var(--surface)' }} />
            </button>
            {/* Avatar */}
            <div title={user?.name} style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#d4af37,#a8892b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem', color: '#111', cursor: 'pointer', boxShadow: '0 2px 8px rgba(212,175,55,0.25)', border: '2px solid var(--surface)', flexShrink: 0 }}>
              {initials}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: '32px 28px', background: 'var(--bg)', transition: 'background 0.3s' }}>
          {section === 'finder'        && <GemFinder />}
          {section === 'catalog'       && <GemCatalog />}
          {section === 'compatibility' && <GemCompatibility />}
          {section === 'chat'          && <AstroChat />}
        </main>
      </div>
    </div>
  );
};
