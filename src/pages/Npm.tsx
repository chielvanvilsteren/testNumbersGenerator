import React from 'react';

const Npm: React.FC = () => {
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
          <img src="https://static.npmjs.com/da3e2fdc8e2e2b7e7e7e.svg" alt="npm logo" style={{ width: 60, height: 60 }} />
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#cb3837' }}>test-numbers-generator</h1>
            <div style={{ fontSize: '1.1rem', color: '#374151', marginTop: 4 }}>A package for generating and validating Dutch test data (BSN, IBAN, phone, postcode, etc).</div>
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#374151' }}>
          <span style={{ fontWeight: 600 }}>Install:</span>
          <pre style={{ background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.75rem 1rem', margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#111827', overflowX: 'auto' }}>
            npm install test-numbers-generator
          </pre>
        </div>
        <div style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#374151' }}>
          <span style={{ fontWeight: 600 }}>Usage example:</span>
          <pre style={{ background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.75rem 1rem', margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#111827', overflowX: 'auto' }}>{`
import { generateTestBSN, isValidBSN } from 'test-numbers-generator';

const bsn = generateTestBSN();
console.log(bsn, isValidBSN(bsn));
`}</pre>
        </div>
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
          Bekijk op npmjs.com
        </a>
      </div>
    </div>
  );
};

export default Npm;

