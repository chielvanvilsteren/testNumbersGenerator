import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

const GitHubButton = styled.button`
  display: flex;
  overflow: hidden;
  align-items: center;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  background: #000;
  color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  height: 2.25rem;
  padding: 0.5rem 1rem;
  max-width: 13rem;
  white-space: pre;
  position: relative;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 0 2px #000, 0 0 0 4px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .shine {
    position: absolute;
    right: 0;
    top: -3rem;
    height: 8rem;
    width: 2rem;
    transform: translateX(3rem) rotate(12deg);
    background: white;
    opacity: 0.1;
    transition: all 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover .shine {
    transform: translateX(-10rem);
  }
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
`;

const UserInfo = styled.span`
  color: #F9F4F1;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-size: 0.9rem;
  font-weight: 500;
`;

const AdminBadge = styled.span`
  background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
  font-weight: 600;
`;

const AuthButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s;
  outline: none;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const NavigationBar: React.FC = () => {
  const [starCount, setStarCount] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const tabs = [
    { label: 'Home', path: '/' },
    { label: 'Generators', path: '/generators' },
    { label: 'NPM', path: '/npm' },
  ];

  // Add Metrics tab for admin users
  if (isAuthenticated && isAdmin) {
    tabs.push({ label: '📈 Metrics', path: '/metrics' });
  }

  // Fetch GitHub stars
  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/chielvanvilsteren/testNumbersGenerator');
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count);
        }
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
        setStarCount(0); // Fallback to 0 if API fails
      }
    };

    fetchStarCount();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '2.5rem', gap: '1rem' }}>
        {/* Authentication Section */}
        <AuthSection>
          {isAuthenticated ? (
            <>
              <UserInfo>
                Welkom, {user?.name || user?.email}
                {isAdmin && <AdminBadge>Admin</AdminBadge>}
              </UserInfo>
              <AuthButton onClick={handleLogout}>
                🚪 Logout
              </AuthButton>
            </>
          ) : (
            <AuthButton onClick={handleLogin}>
              Login
            </AuthButton>
          )}
        </AuthSection>

        {/* GitHub Button */}
        <GitHubButton
          onClick={() => window.open('https://github.com/chielvanvilsteren/testNumbersGenerator', '_blank')}
        >
          <span className="shine"></span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} viewBox="0 0 438.549 438.549">
              <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
            </svg>
            <span style={{ marginLeft: '0.25rem', color: 'white' }}>Star on GitHub</span>
          </div>
          <div style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}>
            <svg
              style={{ width: '1rem', height: '1rem', color: '#6b7280', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="star-icon"
            >
              <path
                clipRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span
              style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em', fontWeight: 500, color: 'white' }}
            >{starCount}</span>
          </div>
        </GitHubButton>
      </div>
    </Nav>
  );
};

export default NavigationBar;
