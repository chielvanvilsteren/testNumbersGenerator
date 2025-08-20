import React, { useState, useRef, useEffect } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  padding: 0.5rem 0;
  box-shadow: 0 4px 24px 0 rgba(30,59,76,0.18);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2.5px solid ${({ theme }) => theme.colors.surface};
  min-height: 68px;
  transition: box-shadow 0.2s;
  backdrop-filter: blur(8px);
`;

const NavButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active
    ? `linear-gradient(90deg, ${theme.colors.background} 60%, ${theme.colors.surface} 100%)`
    : theme.colors.secondary};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-weight: 700;
  font-size: 1.13rem;
  border: none;
  border-radius: 0.7rem;
  padding: 0.7rem 2.1rem;
  margin: 0 0.18rem;
  box-shadow: ${({ active }) => active ? '0 2px 12px 0 rgba(30,59,76,0.10)' : 'none'};
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  letter-spacing: 0.5px;
  border-bottom: ${({ active, theme }) => active ? `2.5px solid ${theme.colors.surface}` : '2.5px solid transparent'};
`;

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
    <Nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '2.5rem' }}>
        <span style={{ color: '#F9F4F1', fontWeight: 800, fontSize: '1.45rem', letterSpacing: 1.5, textShadow: '0 2px 12px rgba(30,59,76,0.13)', fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace' }}>
          test-numbers-generator
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flex: 1, justifyContent: 'center' }}>
        {tabs.map(tab => (
          <NavButton
            key={tab.path}
            onClick={() => navigate(tab.path)}
            active={location.pathname === tab.path}
          >
            {tab.label}
          </NavButton>
        ))}
      </div>
      <div style={{ width: 120 }} />
    </Nav>
  );
};

export default NavigationBar;
