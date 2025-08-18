import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      background: '#2563eb',
      padding: '0.5rem 0',
      boxShadow: '0 2px 8px 0 rgba(30,58,138,0.08)',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            marginLeft: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 40,
          }}
          aria-label="Menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span style={{
            display: 'block',
            width: 24,
            height: 3,
            background: '#fff',
            borderRadius: 2,
            marginBottom: 5,
          }} />
          <span style={{
            display: 'block',
            width: 24,
            height: 3,
            background: '#fff',
            borderRadius: 2,
            marginBottom: 5,
          }} />
          <span style={{
            display: 'block',
            width: 24,
            height: 3,
            background: '#fff',
            borderRadius: 2,
          }} />
        </button>
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 16px 0 rgba(30,58,138,0.10)',
            minWidth: 160,
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Link to="/" style={{ padding: '1rem', color: '#1e3a8a', textDecoration: 'none', display: 'block' }} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/generators" style={{ padding: '1rem', color: '#1e3a8a', textDecoration: 'none', display: 'block' }} onClick={() => setOpen(false)}>Generators</Link>
          <Link to="/npm" style={{ padding: '1rem', color: '#1e3a8a', textDecoration: 'none', display: 'block' }} onClick={() => setOpen(false)}>NPM</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
