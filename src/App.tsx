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
  isValidDutchPostcode
} from 'test-numbers-generator';

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



const TABS = [
  { key: 'mobile', label: 'Mobiel nummer' },
  { key: 'landline', label: 'Vast telefoonnummer' },
  { key: 'bsn', label: 'BSN' },
  { key: 'iban', label: 'IBAN' },
  { key: 'postcode', label: 'Postcode' }
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
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/npm" element={<Npm />} />
        <Route path="/generators" element={
          <div className={styles.appBg}>
            <div className={styles.container}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '2rem 0',
              }}>
                <img
                  src="/app.ico"
                  alt="Favicon"
                  style={{
                    width: 600,
                    height: 150,
                    borderRadius: '1.5rem',
                    boxShadow: '0 4px 16px 0 rgba(30,58,138,0.15), 0 1.5px 6px 0 rgba(0,0,0,0.08)',
                    border: '1.5px solid #a7d0ff',
                    background: '#fff',
                    padding: 8,
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={styles.tabs}>
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    className={activeTab === tab.key ? styles.activeTab : styles.tab}
                    onClick={() => handleTabSwitch(tab.key)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Toggle switch for IBAN tab */}
              {activeTab === 'iban' && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
                  <button
                    onClick={() => setActiveIbanMode('genereer')}
                    style={{
                      background: activeIbanMode === 'genereer' ? '#3b82f6' : '#e0e7ef',
                      color: activeIbanMode === 'genereer' ? '#fff' : '#1e3a8a',
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
                      background: activeIbanMode === 'controleer' ? '#3b82f6' : '#e0e7ef',
                      color: activeIbanMode === 'controleer' ? '#fff' : '#1e3a8a',
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
                      background: activeBsnMode === 'genereer' ? '#3b82f6' : '#e0e7ef',
                      color: activeBsnMode === 'genereer' ? '#fff' : '#1e3a8a',
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
                      background: activeBsnMode === 'controleer' ? '#3b82f6' : '#e0e7ef',
                      color: activeBsnMode === 'controleer' ? '#fff' : '#1e3a8a',
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
                      background: activePostcodeMode === 'genereer' ? '#3b82f6' : '#e0e7ef',
                      color: activePostcodeMode === 'genereer' ? '#fff' : '#1e3a8a',
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
                      background: activePostcodeMode === 'controleer' ? '#3b82f6' : '#e0e7ef',
                      color: activePostcodeMode === 'controleer' ? '#fff' : '#1e3a8a',
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
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
                      borderRadius: '1.5rem',
                      boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                      border: '1.5px solid #a7d0ff',
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
                          background: '#3b82f6',
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
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
                      borderRadius: '1.5rem',
                      boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                      border: '1.5px solid #a7d0ff',
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
                          background: '#3b82f6',
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
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
                      borderRadius: '1.5rem',
                      boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                      border: '1.5px solid #a7d0ff',
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
                      borderRadius: '1.5rem',
                      boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                      border: '1.5px solid #a7d0ff',
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
                      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
                      borderRadius: '1.5rem',
                      boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10), 0 4px 12px 0 rgba(0,0,0,0.05)',
                      border: '1.5px solid #a7d0ff',
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
                                background: '#3b82f6',
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
                              onMouseOut={e => (e.currentTarget.style.background = '#3b82f6')}
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
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
