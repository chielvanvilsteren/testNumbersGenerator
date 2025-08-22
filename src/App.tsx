import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './Card';
import styles from './App.module.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Npm from './pages/Npm';
import {
  generateTestMobileNumber,
  generateTestLandlineNumber,
  generateTestBSN,
  isValidBSN,
  generateTestDutchIBAN,
  isValidDutchIBAN,
} from 'test-numbers-generator';
import { getRandomAdresInPlaatsnaam, getRandomPlaatsnaam } from 'test-numbers-generator/dist/postcodeService';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import styled from 'styled-components';

// Learn More Button CSS
const LearnMoreButtonStyles = `
  /* From Uiverse.io by Madflows - aangepast aan app theme */ 
  button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   font-family: inherit;
   font-size: 15px;
  }

  button.learn-more {
   font-weight: 600;
   color: #1E3B4C;
   text-transform: uppercase;
   padding: 1.25em 2em;
   background: #F9F4F1;
   border: 2px solid #48687C;
   border-radius: 0.75em;
   -webkit-transform-style: preserve-3d;
   transform-style: preserve-3d;
   -webkit-transition: background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
   transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  button.learn-more::before {
   position: absolute;
   content: '';
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: #D3C3B9;
   border-radius: inherit;
   -webkit-box-shadow: 0 0 0 2px #48687C, 0 0.625em 0 0 #2A4A5C;
   box-shadow: 0 0 0 2px #48687C, 0 0.625em 0 0 #2A4A5C;
   -webkit-transform: translate3d(0, 0.75em, -1em);
   transform: translate3d(0, 0.75em, -1em);
   transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-transform 150ms cubic-bezier(0, 0, 0.58, 1), -webkit-box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  button.learn-more:hover {
   background: #F2EBE7;
   -webkit-transform: translate(0, 0.25em);
   transform: translate(0, 0.25em);
  }

  button.learn-more:hover::before {
   -webkit-box-shadow: 0 0 0 2px #48687C, 0 0.5em 0 0 #2A4A5C;
   box-shadow: 0 0 0 2px #48687C, 0 0.5em 0 0 #2A4A5C;
   -webkit-transform: translate3d(0, 0.5em, -1em);
   transform: translate3d(0, 0.5em, -1em);
  }

  button.learn-more:active {
   background: #F2EBE7;
   -webkit-transform: translate(0em, 0.75em);
   transform: translate(0em, 0.75em);
  }

  button.learn-more:active::before {
   -webkit-box-shadow: 0 0 0 2px #48687C, 0 0 #2A4A5C;
   box-shadow: 0 0 0 2px #48687C, 0 0 #2A4A5C;
   -webkit-transform: translate3d(0, 0, -1em);
   transform: translate3d(0, 0, -1em);
  }
`;

export type SupportedCountry =
    | 'Netherlands'
    | 'Germany'
    | 'Belgium'
    | 'France'
    | 'UnitedKingdom'
    | 'Spain'
    | 'Italy'
    | 'Austria'
    | 'Switzerland'
    | 'Sweden'
    | 'Norway'
    | 'Denmark'
    | 'Finland'
    | 'Portugal'
    | 'Ireland'
    | 'Turkey'
    | 'Morocco';

const GeneratorBg = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
`;

const GeneratorContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05);
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  padding: 2.5rem;
`;

const GeneratorTitle = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.01em;
  text-align: center;
  background: transparent;
  padding: 0;
  display: inline-block;
  position: relative;
  border-radius: 0;
  box-shadow: none;
  border: none;
`;

const GeneratorTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0 1.5rem 0;
`;

const GeneratorTabButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => active ? theme.colors.background : theme.colors.secondary};
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 1.13rem;
  border: 1.5px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.secondary};
  border-bottom: none;
  border-radius: 0.7rem 0.7rem 0 0;
  padding: 0.7rem 2.1rem;
  margin: 0 0.18rem;
  position: relative;
  box-shadow: ${({ active }) => active ? '0 2px 12px 0 rgba(30,59,76,0.10)' : 'none'};
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, border-color 0.18s;
  outline: none;
  letter-spacing: 0.5px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
    border-radius: 0 0 2px 2px;
    transition: background 0.18s;
  }
`;

const TABS = [
  { key: 'mobile', label: 'Mobiel Nummer Generator' },
  { key: 'landline', label: 'Vast Nummer Generator' },
  { key: 'bsn', label: 'BSN Generator' },
  { key: 'iban', label: 'IBAN Generator' },
  { key: 'adres', label: 'Adres Generator' },
];

const mobileCountries: { label: string; value: SupportedCountry }[] = [
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Belgium', value: 'Belgium' },
  { label: 'France', value: 'France' },
  { label: 'United Kingdom', value: 'UnitedKingdom' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Norway', value: 'Norway' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Finland', value: 'Finland' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Ireland', value: 'Ireland' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Morocco', value: 'Morocco' },
];

const landlineCountries: { label: string; value: SupportedCountry }[] = [
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Belgium', value: 'Belgium' },
  { label: 'France', value: 'France' },
  { label: 'United Kingdom', value: 'UnitedKingdom' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Norway', value: 'Norway' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Finland', value: 'Finland' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Ireland', value: 'Ireland' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Morocco', value: 'Morocco' },
];

type CopiedState = {
  [key: string]: boolean;
};

function App() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [mobileCountry, setMobileCountry] = useState<SupportedCountry>('Netherlands');
  const [landlineCountry, setLandlineCountry] = useState<SupportedCountry>('Netherlands');
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [copied, setCopied] = useState<CopiedState>({});
  const [bsnInput, setBsnInput] = useState('');
  const [ibanInput, setIbanInput] = useState('');
  const [tabAnim, setTabAnim] = useState(false);
  const [activeIbanMode, setActiveIbanMode] = useState<'genereer' | 'controleer'>('genereer');
  const [activeBsnMode, setActiveBsnMode] = useState<'genereer' | 'controleer'>('genereer');
  const [adresPlaatsnaam, setAdresPlaatsnaam] = useState('');
  const [adresResult, setAdresResult] = useState<any>(null);
  const [plaatsnaamLoading, setPlaatsnaamLoading] = useState(false);
  const [internationalFormat, setInternationalFormat] = useState(true); // true = international (0031 6 23800360), false = local (0623800360)

  useEffect(() => {
    // Add the Learn More button CSS styles to the document
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = LearnMoreButtonStyles;
    document.head.appendChild(styleSheet);

    // Cleanup styles when component unmounts
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  useEffect(() => {
    // Bij laden van de pagina: standaard Nederlandse nummers en andere data genereren
    setData(prev => ({
      ...prev,
      mobile: generateTestMobileNumber['Netherlands'](),
      landline: generateTestLandlineNumber['Netherlands'](),
      bsn: generateTestBSN(),
      iban: generateTestDutchIBAN(),
    }));
  }, []);

  // Haal een random plaatsnaam op als de adres-tab wordt geopend
  useEffect(() => {
    if (activeTab === 'adres') {
      (async () => {
        const plaatsnaam = await getRandomPlaatsnaam();
        setAdresPlaatsnaam(plaatsnaam ?? '');
      })();
    }
  }, [activeTab]);

  const handleGenerate = () => {
    let value = '';
    switch (activeTab) {
      case 'mobile':
        value = generateTestMobileNumber[mobileCountry]();
        break;
      case 'landline':
        value = generateTestLandlineNumber[landlineCountry]();
        break;
      case 'bsn':
        value = generateTestBSN();
        break;
      case 'iban':
        value = generateTestDutchIBAN();
        break;
      default:
        value = '';
    }
    setData({ ...data, [activeTab]: value });
    setCopied({ ...copied, [activeTab]: false });
  };

  const handleCheckIBAN = () => {
    const result = isValidDutchIBAN(ibanInput) ? 'Geldig IBAN' : 'Ongeldig IBAN';
    setData({ ...data, ibanCheck: result });
    setCopied({ ...copied, ibanCheck: false });
  };

  const handleCopy = () => {
    let valueToCopy = data[activeTab];

    // For phone numbers, use the formatted version for copying
    if ((activeTab === 'mobile' || activeTab === 'landline') && valueToCopy) {
      valueToCopy = formatPhoneNumber(valueToCopy);
    }

    if (valueToCopy) {
      navigator.clipboard.writeText(valueToCopy);
      setCopied({ ...copied, [activeTab]: true });
      setTimeout(() => setCopied((prev) => ({ ...prev, [activeTab]: false })), 1200);
    }
  };

  const handleAdresGenereer = () => {
    if (adresPlaatsnaam.trim()) {
      getRandomAdresInPlaatsnaam(adresPlaatsnaam.trim()).then(adres => {
        setAdresResult(adres);
      });
    } else {
      setAdresResult(null);
    }
  };

  // Animatie bij tab wissel
  const handleTabSwitch = (key: string) => {
    setTabAnim(true);
    setTimeout(() => {
      setActiveTab(key);
      setTabAnim(false);
      // Automatisch data genereren bij openen van tab
      if (key === 'mobile') {
        const newMobile = generateTestMobileNumber['Netherlands']();
        setData((prev) => ({ ...prev, mobile: newMobile }));
      } else if (key === 'landline') {
        const newLandline = generateTestLandlineNumber['Netherlands']();
        setData((prev) => ({ ...prev, landline: newLandline }));
      } else if (key === 'bsn') {
        const newBSN = generateTestBSN();
        setData((prev) => ({ ...prev, bsn: newBSN }));
      } else if (key === 'iban') {
        const newIBAN = generateTestDutchIBAN();
        setData((prev) => ({ ...prev, iban: newIBAN }));
      }
    }, 180); // animatie duur
  };

  // Helper function to format phone numbers
  const formatPhoneNumber = (fullNumber: string): string => {
    if (!internationalFormat) {
      // Convert international format to local format
      // Remove all spaces first
      const cleaned = fullNumber.replace(/\s/g, '');

      // Check for common international prefixes and convert to local format
      const countryPrefixes: { [key: string]: string } = {
        '0031': '0', // Netherlands: 0031 -> 0
        '0049': '0', // Germany: 0049 -> 0
        '0032': '0', // Belgium: 0032 -> 0
        '0033': '0', // France: 0033 -> 0
        '0044': '0', // UK: 0044 -> 0
        '0034': '', // Spain: 0034 -> (no prefix)
        '0039': '', // Italy: 0039 -> (no prefix)
        '0043': '0', // Austria: 0043 -> 0
        '0041': '0', // Switzerland: 0041 -> 0
        '0046': '0', // Sweden: 0046 -> 0
        '0047': '', // Norway: 0047 -> (no prefix)
        '0045': '', // Denmark: 0045 -> (no prefix)
        '00358': '0', // Finland: 00358 -> 0
        '00351': '', // Portugal: 00351 -> (no prefix)
        '00353': '0', // Ireland: 00353 -> 0
        '0090': '0', // Turkey: 0090 -> 0
        '00212': '0', // Morocco: 00212 -> 0
      };

      // Try to match and convert
      for (const [intPrefix, localPrefix] of Object.entries(countryPrefixes)) {
        if (cleaned.startsWith(intPrefix)) {
          return localPrefix + cleaned.substring(intPrefix.length);
        }
      }

      // If no match found, return as is
      return fullNumber;
    }

    // Return international format as is
    return fullNumber;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/npm" element={<Npm />} />
          <Route path="/generators" element={
            <GeneratorBg>
              <GeneratorContainer>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0', flexDirection: 'column' }}>
                  <GeneratorTitle>
                    Test Numbers Generator
                    <span className="blinkingCursor" style={{ display: 'inline-block', width: '1ch', marginLeft: '0.2ch', background: 'transparent', color: '#111', animation: 'blink 1s steps(1) infinite', fontWeight: 400 }}>|</span>
                  </GeneratorTitle>
                </div>
                <GeneratorTabs>
                  {TABS.map(tab => (
                    <GeneratorTabButton
                      key={tab.key}
                      active={activeTab === tab.key}
                      onClick={() => handleTabSwitch(tab.key)}
                      type="button"
                    >
                      {tab.label}
                    </GeneratorTabButton>
                  ))}
                </GeneratorTabs>
                {/* Toggle switch for phone number formatting */}
                {(activeTab === 'mobile' || activeTab === 'landline') && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: theme.colors.secondary, fontWeight: 500 }}>
                      Nummer formaat
                    </div>
                    <div style={{ display: 'flex', border: `2px solid ${theme.colors.secondary}`, borderRadius: '0.75rem', overflow: 'hidden' }}>
                      <button
                        onClick={() => setInternationalFormat(true)}
                        style={{
                          background: internationalFormat ? theme.colors.primary : theme.colors.surface,
                          color: internationalFormat ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 1.2rem',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                        }}
                      >
                        Internationaal
                      </button>
                      <button
                        onClick={() => setInternationalFormat(false)}
                        style={{
                          background: !internationalFormat ? theme.colors.primary : theme.colors.surface,
                          color: !internationalFormat ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 1.2rem',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                          borderLeft: `1px solid ${theme.colors.secondary}`,
                        }}
                      >
                        Lokaal
                      </button>
                    </div>
                  </div>
                )}
                {/* Toggle switch for IBAN tab */}
                {activeTab === 'iban' && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <div style={{ display: 'flex', border: `2px solid ${theme.colors.secondary}`, borderRadius: '0.75rem', overflow: 'hidden' }}>
                      <button
                        onClick={() => setActiveIbanMode('genereer')}
                        style={{
                          background: activeIbanMode === 'genereer' ? theme.colors.primary : theme.colors.surface,
                          color: activeIbanMode === 'genereer' ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 2rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                        }}
                      >
                        Genereer
                      </button>
                      <button
                        onClick={() => setActiveIbanMode('controleer')}
                        style={{
                          background: activeIbanMode === 'controleer' ? theme.colors.primary : theme.colors.surface,
                          color: activeIbanMode === 'controleer' ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 2rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                          borderLeft: `1px solid ${theme.colors.secondary}`,
                        }}
                      >
                        Controleer
                      </button>
                    </div>
                  </div>
                )}
                {/* Toggle switch for BSN tab */}
                {activeTab === 'bsn' && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <div style={{ display: 'flex', border: `2px solid ${theme.colors.secondary}`, borderRadius: '0.75rem', overflow: 'hidden' }}>
                      <button
                        onClick={() => setActiveBsnMode('genereer')}
                        style={{
                          background: activeBsnMode === 'genereer' ? theme.colors.primary : theme.colors.surface,
                          color: activeBsnMode === 'genereer' ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 2rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                        }}
                      >
                        Genereer
                      </button>
                      <button
                        onClick={() => setActiveBsnMode('controleer')}
                        style={{
                          background: activeBsnMode === 'controleer' ? theme.colors.primary : theme.colors.surface,
                          color: activeBsnMode === 'controleer' ? theme.colors.background : theme.colors.primary,
                          border: 'none',
                          borderRadius: '0',
                          padding: '0.75rem 2rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                          borderLeft: `1px solid ${theme.colors.secondary}`,
                        }}
                      >
                        Controleer
                      </button>
                    </div>
                  </div>
                )}
                <div className={`${styles.tabContent} ${tabAnim ? styles.tabContentAnim : ''}`}>
                  {activeTab === 'mobile' && (
                    <div
                      style={{
                        background: theme.colors.surface,
                        borderRadius: '1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                        border: `1.5px solid ${theme.colors.secondary}`,
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: '2.5rem',
                        gap: 0,
                        fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                        minHeight: 420,
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <label htmlFor="mobile-country-select" style={{ fontWeight: 600, marginBottom: 8 }}>Land</label>
                        <select
                          id="mobile-country-select"
                          value={mobileCountry}
                          onChange={e => setMobileCountry(e.target.value as SupportedCountry)}
                          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #a7d0ff', fontSize: '1rem', marginBottom: 24, width: 220 }}
                        >
                          {mobileCountries.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <button
                          className="learn-more"
                          onClick={handleGenerate}
                        >
                          Genereer
                        </button>
                        {data.mobile && (
                          <div style={{ marginTop: 24, width: '100%' }}>
                            <Card label="Mobiel nummer" value={formatPhoneNumber(data.mobile)} onCopy={handleCopy} copied={!!copied.mobile} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === 'landline' && (
                    <div
                      style={{
                        background: theme.colors.surface,
                        borderRadius: '1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                        border: `1.5px solid ${theme.colors.secondary}`,
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: '2.5rem',
                        gap: 0,
                        fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                        minHeight: 420,
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <label htmlFor="landline-country-select" style={{ fontWeight: 600, marginBottom: 8 }}>Land</label>
                        <select
                          id="landline-country-select"
                          value={landlineCountry}
                          onChange={e => setLandlineCountry(e.target.value as SupportedCountry)}
                          style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #a7d0ff', fontSize: '1rem', marginBottom: 24, width: 220 }}
                        >
                          {landlineCountries.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <button
                          className="learn-more"
                          onClick={handleGenerate}
                        >
                          Genereer
                        </button>
                        {data.landline && (
                          <div style={{ marginTop: 24, width: '100%' }}>
                            <Card label="Vast telefoonnummer" value={formatPhoneNumber(data.landline)} onCopy={handleCopy} copied={!!copied.landline} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === 'bsn' && (
                    <div
                      style={{
                        background: theme.colors.surface,
                        borderRadius: '1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                        border: `1.5px solid ${theme.colors.secondary}`,
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: '2.5rem',
                        gap: 0,
                        fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                        minHeight: 420,
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      {activeBsnMode === 'genereer' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 2rem' }}>
                          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                              <button
                                className="learn-more"
                                onClick={handleGenerate}
                              >
                                Genereer
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                            {data.bsn && (
                              <div style={{ width: '100%' }}>
                                <Card label="BSN" value={data.bsn} onCopy={handleCopy} copied={!!copied.bsn} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {activeBsnMode === 'controleer' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 2rem', minWidth: 0, maxWidth: 480 }}>
                          <div style={{ width: '100%', maxWidth: 320 }}>
                            <input
                              style={{
                                width: '100%',
                                maxWidth: 320,
                                minWidth: 220,
                                padding: '0.85rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                marginBottom: '2rem',
                              }}
                              type="text"
                              placeholder="Check BSN..."
                              value={bsnInput}
                              onChange={e => setBsnInput(e.target.value)}
                            />
                            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                              <button
                                style={{
                                  background: theme.colors.primary,
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '0.75rem',
                                  padding: '1rem 2.5rem',
                                  fontSize: '1.15rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  marginBottom: 0,
                                  transition: 'background 0.2s',
                                  whiteSpace: 'nowrap',
                                  width: '100%',
                                  maxWidth: 320,
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
                                onClick={() => {
                                  const result = isValidBSN(bsnInput) ? 'Geldig BSN' : 'Ongeldig BSN';
                                  setData({ ...data, bsnCheck: result });
                                  setCopied({ ...copied, bsnCheck: false });
                                }}
                              >
                                Check geldig BSN
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%', maxWidth: 320 }}>
                            {data.bsnCheck && (
                              <div
                                style={{
                                  background: data.bsnCheck === 'Geldig BSN' ? '#d1fae5' : '#fee2e2', // groen of rood
                                  border: `2px solid ${data.bsnCheck === 'Geldig BSN' ? '#10b981' : '#ef4444'}`,
                                  borderRadius: '1rem',
                                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)',
                                  padding: '1.5rem',
                                  width: '100%',
                                  minWidth: 0,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  marginBottom: 0,
                                  transition: 'background 0.2s',
                                }}
                              >
                                <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Check geldig BSN</div>
                                <div style={{ fontSize: '1.15rem', marginBottom: '1rem', wordBreak: 'break-all' }}>{data.bsnCheck}</div>
                                <button
                                  style={{
                                    background: '#e0e7ef',
                                    color: '#1e3a8a',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem 1.5rem',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    marginTop: '0.5rem',
                                  }}
                                  onClick={handleCopy}
                                >
                                  Kopieer Check geldig BSN naar klembord
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'iban' && (
                    <div
                      style={{
                        background: theme.colors.surface,
                        borderRadius: '1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                        border: `1.5px solid ${theme.colors.secondary}`,
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: '2.5rem',
                        gap: 0,
                        fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                        minHeight: 420,
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      {activeIbanMode === 'genereer' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 2rem' }}>
                          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                              <button
                                className="learn-more"
                                onClick={handleGenerate}
                              >
                                Genereer
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                            {data.iban && (
                              <div style={{ width: '100%' }}>
                                <Card label="IBAN" value={data.iban} onCopy={handleCopy} copied={!!copied.iban} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {activeIbanMode === 'controleer' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 2rem', minWidth: 0, maxWidth: 480 }}>
                          <div style={{ width: '100%', maxWidth: 320 }}>
                            <input
                              style={{
                                width: '100%',
                                maxWidth: 320,
                                minWidth: 220,
                                padding: '0.85rem 1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                marginBottom: '2rem',
                              }}
                              type="text"
                              placeholder="Check IBAN..."
                              value={ibanInput}
                              onChange={e => setIbanInput(e.target.value)}
                            />
                            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                              <button
                                style={{
                                  background: theme.colors.primary,
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '0.75rem',
                                  padding: '1rem 2.5rem',
                                  fontSize: '1.15rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  marginBottom: '2rem',
                                  transition: 'background 0.2s',
                                  whiteSpace: 'nowrap',
                                  width: '100%',
                                  maxWidth: 320,
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
                                onClick={handleCheckIBAN}
                              >
                                Check geldig IBAN
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%', maxWidth: 320 }}>
                            {data.ibanCheck && (
                              <div
                                style={{
                                  background: data.ibanCheck === 'Geldig IBAN' ? '#d1fae5' : '#fee2e2', // groen of rood
                                  border: `2px solid ${data.ibanCheck === 'Geldig IBAN' ? '#10b981' : '#f87171'}`, // groene of rode border
                                  borderRadius: '1rem',
                                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)',
                                  padding: '1.5rem',
                                  width: '100%',
                                  minWidth: 0,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  marginBottom: 0,
                                  transition: 'background 0.2s',
                                }}
                              >
                                <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Check geldig IBAN</div>
                                <div style={{ fontSize: '1.15rem', marginBottom: '1rem', wordBreak: 'break-all' }}>{data.ibanCheck}</div>
                                <button
                                  style={{
                                    background: '#e0e7ef',
                                    color: '#1e3a8a',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem 1.5rem',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    marginTop: '0.5rem',
                                  }}
                                  onClick={handleCopy}
                                >
                                  Kopieer Check geldig IBAN naar klembord
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'adres' && (
                    <div
                      style={{
                        background: theme.colors.surface,
                        borderRadius: '1.5rem',
                        boxShadow: '0 8px 32px 0 rgba(30,59,76,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                        border: `1.5px solid ${theme.colors.secondary}`,
                        maxWidth: 1000,
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2.5rem',
                        fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                        minHeight: 420,
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      <div style={{ marginBottom: 18, fontWeight: 600, fontSize: '1.12rem', textAlign: 'center' }}>
                        Vul een plaatsnaam in of haal een random plaatsnaam op
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <input
                          id="adres-plaatsnaam-input"
                          type="text"
                          placeholder="Vul een plaatsnaam in..."
                          value={adresPlaatsnaam}
                          onChange={e => setAdresPlaatsnaam(e.target.value)}
                          style={{
                            padding: '0.85rem 1rem',
                            borderRadius: '0.75rem',
                            border: `1px solid ${theme.colors.secondary}`,
                            fontSize: '1rem',
                            width: 220,
                            marginRight: 4
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Haal een random plaatsnaam op"
                          style={{
                            color: 'white',
                            backgroundColor: theme.colors.primary,
                            fontWeight: 500,
                            borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            lineHeight: '1.5rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            paddingTop: '0.6rem',
                            paddingBottom: '0.6rem',
                            cursor: plaatsnaamLoading ? 'wait' : 'pointer',
                            textAlign: 'center' as const,
                            marginRight: '0.5rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: 'none',
                            opacity: plaatsnaamLoading ? 0.7 : 1,
                            transition: 'background-color 0.2s, opacity 0.2s',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                          className="refresh-button"
                          onMouseEnter={(e) => {
                            if (!plaatsnaamLoading) {
                              e.currentTarget.style.backgroundColor = theme.colors.secondary;
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = theme.colors.primary;
                          }}
                          disabled={plaatsnaamLoading}
                          onClick={async () => {
                            setPlaatsnaamLoading(true);
                            const plaatsnaam = await getRandomPlaatsnaam();
                            setAdresPlaatsnaam(plaatsnaam ?? '');
                            setPlaatsnaamLoading(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            style={{
                              display: 'inline',
                              width: '1.1rem',
                              height: '1.1rem',
                              marginRight: '0.5rem',
                              color: 'white',
                              animation: plaatsnaamLoading ? 'spin_357 1s linear infinite' : 'none',
                            }}
                          >
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                            <path
                              fillRule="evenodd"
                              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                            ></path>
                            <style>{`
                              @keyframes spin_357 {
                                from {
                                  transform: rotate(0deg);
                                }
                                to {
                                  transform: rotate(360deg);
                                }
                              }

                              .refresh-button span {
                                position: relative;
                                background: inherit;
                              }

                              .refresh-button span::before {
                                position: absolute;
                                content: "";
                                background: inherit;
                              }

                              .refresh-button:hover span::before {
                                animation: chitchat linear both 1.2s;
                              }

                              @keyframes chitchat {
                                0% { content: "#"; }
                                5% { content: "."; }
                                10% { content: "^{"; }
                                15% { content: "-!"; }
                                20% { content: "#$_"; }
                                25% { content: "№:0"; }
                                30% { content: "#{+."; }
                                35% { content: "@}-?"; }
                                40% { content: "?{4@%"; }
                                45% { content: "=.,^!"; }
                                50% { content: "?2@%"; }
                                55% { content: "\\;1}]"; }
                                60% { content: "?{%:%"; right: 0; }
                                65% { content: "|{f[4"; right: 0; }
                                70% { content: "{4%0%"; right: 0; }
                                75% { content: "'1_0<"; right: 0; }
                                80% { content: "{0%"; right: 0; }
                                85% { content: "]>'"; right: 0; }
                                90% { content: "4"; right: 0; }
                                95% { content: "2"; right: 0; }
                                100% { content: ""; right: 0; }
                              }
                            `}</style>
                          </svg>
                          <span>Refresh</span>
                        </button>
                      </div>
                      <button
                        className="learn-more"
                        onClick={handleAdresGenereer}
                      >
                        Genereer adres
                      </button>
                      {adresResult && (
                        <div style={{ width: '100%', marginTop: 32 }}>
                          <div style={{
                            background: '#fff',
                            border: '1.5px solid #a7d0ff',
                            borderRadius: '1rem',
                            boxShadow: '0 2px 12px 0 rgba(30,58,138,0.07)',
                            padding: '1.5rem',
                            maxWidth: 420,
                            margin: '0 auto',
                            fontFamily: 'Inter, Roboto, system-ui, sans-serif',
                            fontSize: '1.08rem',
                            color: '#1e293b',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}>
                            <div><strong>Straatnaam:</strong> {adresResult.straatnaam}</div>
                            <div><strong>Huisnummer:</strong> {adresResult.huisnummer}</div>
                            <div><strong>Postcode:</strong> {adresResult.postcode}</div>
                            <div><strong>Woonplaats:</strong> {adresResult.woonplaats}</div>
                            <button
                              style={{
                                marginTop: 16,
                                background: theme.colors.primary,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.5rem 1.5rem',
                                fontSize: '1rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                              }}
                              onClick={() => navigator.clipboard.writeText(`${adresResult.straatnaam} ${adresResult.huisnummer}, ${adresResult.postcode} ${adresResult.woonplaats}`)}
                            >
                              Kopieer adres
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </GeneratorContainer>
            </GeneratorBg>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
