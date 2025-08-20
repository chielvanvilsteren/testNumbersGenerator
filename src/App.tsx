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
  generateTestDutchPostcode,
  isValidDutchPostcode,
} from 'test-numbers-generator';
import { getRandomAdresInPlaatsnaam, getRandomPlaatsnaam } from 'test-numbers-generator/dist/postcodeService';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import styled from 'styled-components';

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
  border: none;
  border-radius: 0.7rem;
  padding: 0.7rem 2.1rem;
  margin: 0 0.18rem;
  box-shadow: ${({ active }) => active ? '0 2px 12px 0 rgba(30,59,76,0.10)' : 'none'};
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
  letter-spacing: 0.5px;
  border-bottom: ${({ active, theme }) => active ? `2.5px solid ${theme.colors.secondary}` : '2.5px solid transparent'};
`;

const TABS = [
  { key: 'mobile', label: 'Mobiel nummer' },
  { key: 'landline', label: 'Vast telefoonnummer' },
  { key: 'bsn', label: 'BSN' },
  { key: 'iban', label: 'IBAN' },
  { key: 'postcode', label: 'Postcode' },
  { key: 'adres', label: 'Adres (op plaatsnaam)' },
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
  const [input, setInput] = useState('');
  const [bsnInput, setBsnInput] = useState('');
  const [ibanInput, setIbanInput] = useState('');
  const [tabAnim, setTabAnim] = useState(false);
  const [activeIbanMode, setActiveIbanMode] = useState<'genereer' | 'controleer'>('genereer');
  const [activeBsnMode, setActiveBsnMode] = useState<'genereer' | 'controleer'>('genereer');
  const [activePostcodeMode, setActivePostcodeMode] = useState<'genereer' | 'controleer'>('genereer');
  const [adresPlaatsnaam, setAdresPlaatsnaam] = useState('');
  const [adresResult, setAdresResult] = useState<any>(null);
  const [randomPlaatsnaam, setRandomPlaatsnaam] = useState('');
  const [plaatsnaamLoading, setPlaatsnaamLoading] = useState(false);

  useEffect(() => {
    // Bij laden van de pagina: standaard Nederlandse nummers en andere data genereren
    setData(prev => ({
      ...prev,
      mobile: generateTestMobileNumber['Netherlands'](),
      landline: generateTestLandlineNumber['Netherlands'](),
      bsn: generateTestBSN(),
      iban: generateTestDutchIBAN(),
      postcode: generateTestDutchPostcode(),
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
      case 'postcode':
        value = generateTestDutchPostcode();
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
  const handleCheckPostcode = () => {
    const result = isValidDutchPostcode(input) ? 'Geldige postcode' : 'Ongeldige postcode';
    setData({ ...data, postcodeCheck: result });
    setCopied({ ...copied, postcodeCheck: false });
  };

  const handleCopy = () => {
    if (data[activeTab]) {
      navigator.clipboard.writeText(data[activeTab]);
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
      } else if (key === 'postcode') {
      }
    }, 180); // animatie duur
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
                {/* Toggle switch for IBAN tab */}
                {activeTab === 'iban' && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <button
                      onClick={() => setActiveIbanMode('genereer')}
                      style={{
                        background: activeIbanMode === 'genereer' ? theme.colors.primary : theme.colors.surface,
                        color: activeIbanMode === 'genereer' ? theme.colors.background : theme.colors.primary,
                        border: 'none',
                        borderRadius: '0.75rem 0 0 0.75rem',
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
                        borderRadius: '0 0.75rem 0.75rem 0',
                        padding: '0.75rem 2rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        outline: 'none',
                        marginLeft: '-1px',
                      }}
                    >
                      Controleer
                    </button>
                  </div>
                )}
                {/* Toggle switch for BSN tab */}
                {activeTab === 'bsn' && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <button
                      onClick={() => setActiveBsnMode('genereer')}
                      style={{
                        background: activeBsnMode === 'genereer' ? theme.colors.primary : theme.colors.surface,
                        color: activeBsnMode === 'genereer' ? theme.colors.background : theme.colors.primary,
                        border: 'none',
                        borderRadius: '0.75rem 0 0 0.75rem',
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
                        borderRadius: '0 0.75rem 0.75rem 0',
                        padding: '0.75rem 2rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        outline: 'none',
                        marginLeft: '-1px',
                      }}
                    >
                      Controleer
                    </button>
                  </div>
                )}
                {/* Toggle switch for Postcode tab */}
                {activeTab === 'postcode' && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                    <button
                      onClick={() => setActivePostcodeMode('genereer')}
                      style={{
                        background: activePostcodeMode === 'genereer' ? theme.colors.primary : theme.colors.surface,
                        color: activePostcodeMode === 'genereer' ? theme.colors.background : theme.colors.primary,
                        border: 'none',
                        borderRadius: '0.75rem 0 0 0.75rem',
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
                      onClick={() => setActivePostcodeMode('controleer')}
                      style={{
                        background: activePostcodeMode === 'controleer' ? theme.colors.primary : theme.colors.surface,
                        color: activePostcodeMode === 'controleer' ? theme.colors.background : theme.colors.primary,
                        border: 'none',
                        borderRadius: '0 0.75rem 0.75rem 0',
                        padding: '0.75rem 2rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        outline: 'none',
                        marginLeft: '-1px',
                      }}
                    >
                      Controleer
                    </button>
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
                          onClick={handleGenerate}
                          style={{
                            background: theme.colors.primary,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.75rem',
                            padding: '0.75rem 2rem',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            outline: 'none',
                            width: 220
                          }}
                        >
                          Genereer
                        </button>
                        {data.mobile && (
                          <div style={{ marginTop: 24, width: '100%' }}>
                            <Card label="Mobiel nummer" value={data.mobile} onCopy={handleCopy} copied={!!copied.mobile} />
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
                          onClick={handleGenerate}
                          style={{
                            background: theme.colors.primary,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.75rem',
                            padding: '0.75rem 2rem',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            outline: 'none',
                            width: 220
                          }}
                        >
                          Genereer
                        </button>
                        {data.landline && (
                          <div style={{ marginTop: 24, width: '100%' }}>
                            <Card label="Vast telefoonnummer" value={data.landline} onCopy={handleCopy} copied={!!copied.landline} />
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
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
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
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
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
                  {activeTab === 'postcode' && (
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
                      {activePostcodeMode === 'genereer' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '0 2rem' }}>
                          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = '#2563eb')}
                                onMouseOut={e => (e.currentTarget.style.background = theme.colors.primary)}
                                onClick={handleGenerate}
                              >
                                Genereer
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                            {data.postcode && (
                              <div style={{ width: '100%' }}>
                                <Card label="Postcode" value={data.postcode} onCopy={handleCopy} copied={!!copied.postcode} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {activePostcodeMode === 'controleer' && (
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
                              placeholder="Check postcode..."
                              value={input}
                              onChange={e => setInput(e.target.value)}
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
                                onClick={handleCheckPostcode}
                              >
                                Check geldig postcode
                              </button>
                              <div style={{ height: 0, minHeight: 0, flex: 1 }} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%', maxWidth: 320 }}>
                            {data.postcodeCheck && (
                              <div
                                style={{
                                  background: data.postcodeCheck === 'Geldige postcode' ? '#d1fae5' : '#fee2e2', // groen of rood
                                  border: `2px solid ${data.postcodeCheck === 'Geldige postcode' ? '#10b981' : '#f87171'}`, // groene of rode border
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
                                <div style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Check geldig postcode</div>
                                <div style={{ fontSize: '1.15rem', marginBottom: '1rem', wordBreak: 'break-all' }}>{data.postcodeCheck}</div>
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
                                  Kopieer Check geldig postcode naar klembord
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
                            background: theme.colors.primary,
                            color: theme.colors.textOnPrimary,
                            border: 'none',
                            borderRadius: '50%',
                            width: 38,
                            height: 38,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 20,
                            cursor: plaatsnaamLoading ? 'wait' : 'pointer',
                            transition: 'background 0.2s, transform 0.2s',
                            opacity: plaatsnaamLoading ? 0.7 : 1,
                            transform: plaatsnaamLoading ? 'scale(0.95)' : 'none',
                          }}
                          disabled={plaatsnaamLoading}
                          onClick={async () => {
                            setPlaatsnaamLoading(true);
                            const plaatsnaam = await getRandomPlaatsnaam();
                            setAdresPlaatsnaam(plaatsnaam ?? '');
                            setPlaatsnaamLoading(false);
                          }}
                        >
                          {plaatsnaamLoading ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
                              <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="3" opacity="0.3" />
                              <path d="M18 10a8 8 0 0 0-8-8" stroke="white" strokeWidth="3" strokeLinecap="round" />
                              <style>{'@keyframes spin { 100% { transform: rotate(360deg); } }'}</style>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" fill="none" />
                              <path d="M6 10a4 4 0 0 1 7.5-2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      <button
                        onClick={handleAdresGenereer}
                        style={{
                          background: theme.colors.primary,
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 2rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          outline: 'none',
                          marginBottom: 24,
                          width: 320
                        }}
                      >
                        Genereer adres
                      </button>
                      {adresResult && (
                        <div style={{ width: '100%', marginTop: 16 }}>
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
