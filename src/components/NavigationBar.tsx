import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    { label: 'Home', path: '/' },
    { label: 'Generators', path: '/generators' },
    { label: 'NPM', path: '/npm' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav style={{
      width: '100%',
      background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
      padding: '0.5rem 0',
      boxShadow: '0 4px 24px 0 rgba(30,58,138,0.18)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '2.5px solid #60a5fa',
      minHeight: 68,
      transition: 'box-shadow 0.2s',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: 0 }}>
        <img src="/app.ico" alt="logo" style={{ width: 40, height: 40, borderRadius: '0.7rem', boxShadow: '0 2px 8px 0 rgba(30,58,138,0.13)' }} />
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.45rem', letterSpacing: 1.5, textShadow: '0 2px 12px rgba(30,58,138,0.13)' }}>
          test-numbers-generator
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flex: 1, justifyContent: 'center' }}>
        {tabs.map(tab => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: location.pathname === tab.path ? 'linear-gradient(90deg, #fff 60%, #e0e7ef 100%)' : 'rgba(255,255,255,0.13)',
              color: location.pathname === tab.path ? '#2563eb' : '#fff',
              fontWeight: 700,
              fontSize: '1.13rem',
              border: 'none',
              borderRadius: '0.7rem',
              padding: '0.7rem 2.1rem',
              margin: '0 0.18rem',
              boxShadow: location.pathname === tab.path ? '0 2px 12px 0 rgba(30,58,138,0.10)' : undefined,
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
              outline: 'none',
              letterSpacing: 0.5,
              borderBottom: location.pathname === tab.path ? '2.5px solid #2563eb' : '2.5px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ width: 120 }} />
    </nav>
  );
};

export default NavigationBar;
