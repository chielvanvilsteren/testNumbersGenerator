import React, { useState } from 'react';
import NpmVersionsTab from './NpmVersionsTab';
import NpmExamplesTab from './NpmExamplesTab';

const Npm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'versions' | 'examples'>('info');

  return (
    <div style={{
      background: '#fff',
      minHeight: '100vh',
      fontFamily: 'Inter, Roboto, system-ui, sans-serif',
      color: '#1a202c',
      padding: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        background: '#fafbfc',
        border: '1px solid #e5e7eb',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 16px 0 rgba(30,58,138,0.10)',
        maxWidth: 700,
        width: '100%',
        padding: '2.5rem',
        margin: '2rem 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#cb3837' }}>test-numbers-generator</h1>
            <div style={{ fontSize: '1.1rem', color: '#374151', marginTop: 4 }}>A package for generating and validating Dutch test data (BSN, IBAN, phone, postcode, etc).</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              background: activeTab === 'info' ? '#cb3837' : '#e5e7eb',
              color: activeTab === 'info' ? '#fff' : '#1e3a8a',
              border: 'none',
              borderRadius: '0.5rem 0 0 0.5rem',
              padding: '0.75rem 2rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: 'none',
            }}
          >
            Info & Usage
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            style={{
              background: activeTab === 'examples' ? '#cb3837' : '#e5e7eb',
              color: activeTab === 'examples' ? '#fff' : '#1e3a8a',
              border: 'none',
              borderRadius: 0,
              padding: '0.75rem 2rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: 'none',
            }}
          >
            Voorbeelden
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            style={{
              background: activeTab === 'versions' ? '#cb3837' : '#e5e7eb',
              color: activeTab === 'versions' ? '#fff' : '#1e3a8a',
              border: 'none',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '0.75rem 2rem',
              fontWeight: 600,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: 'none',
            }}
          >
            Versies
          </button>
        </div>
        {activeTab === 'info' && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#cb3837', margin: '0 0 1.5rem 0' }}>Installatie</h2>
            <pre style={{ background: '#23272f', color: '#fff', borderRadius: '0.5rem', padding: '1rem 1.5rem', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'Menlo, Monaco, Consolas, monospace', overflowX: 'auto' }}>
$ npm install test-numbers-generator
            </pre>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#cb3837', margin: '0 0 1.5rem 0' }}>Gebruik</h2>
            <div style={{ background: '#f6f8fa', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <pre style={{ background: 'none', color: '#23272f', fontSize: '1rem', margin: 0, fontFamily: 'Menlo, Monaco, Consolas, monospace', overflowX: 'auto' }}>{`
import {
  generateTestMobileNumber,
  generateTestLandlineNumber,
  isTestMobileNumber,
  isTestLandlineNumber,
  isTestPhoneNumber,
  generateTestBSN,
  isValidBSN,
  generateTestDutchIBAN,
  isValidDutchIBAN,
  generateTestDutchPostcode,
  isValidDutchPostcode
} from 'test-numbers-generator';

// Generate a Dutch test mobile number
const dutchMobile = generateTestMobileNumber.Netherlands(); // e.g. '06 99123456'

// Validate a Dutch test mobile number
const isValid = isTestMobileNumber.Netherlands(dutchMobile); // true
`}</pre>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#cb3837', margin: '2rem 0 1rem 0' }}>Deterministic password voorbeeld</h3>
            <div style={{ background: '#f6f8fa', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <pre style={{ background: 'none', color: '#23272f', fontSize: '1rem', margin: 0, fontFamily: 'Menlo, Monaco, Consolas, monospace', overflowX: 'auto' }}>{`
import { generateDeterministicPassword } from 'test-numbers-generator';
const password = generateDeterministicPassword('verzorger1kind', 'myAppSecret');
console.log(password); // Always the same for the same user secret + app secret
`}</pre>
            </div>
          </>
        )}
        {activeTab === 'examples' && (
          <NpmExamplesTab />
        )}
        {activeTab === 'versions' && (
          <NpmVersionsTab />
        )}
        <a
          href="https://www.npmjs.com/package/test-numbers-generator"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#cb3837',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '0.5rem',
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            textDecoration: 'none',
            marginTop: '1.5rem',
            boxShadow: '0 2px 8px 0 rgba(203,56,55,0.10)',
            transition: 'background 0.2s',
          }}
        >
          Bekijk op NPM
        </a>
      </div>
    </div>
  );
};

export default Npm;
