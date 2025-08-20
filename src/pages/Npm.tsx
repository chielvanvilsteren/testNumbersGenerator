import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import NpmVersionsTab from './NpmVersionsTab';
import NpmExamplesTab from './NpmExamplesTab';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  color: ${({ theme }) => theme.colors.primary};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 1.5rem;
  box-shadow: 0 4px 16px 0 rgba(30,59,76,0.10);
  max-width: 700px;
  width: 100%;
  padding: 2.5rem;
  margin: 2rem 0;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => active ? theme.colors.background : theme.colors.secondary};
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  &:not(:first-child) {
    border-radius: 0;
  }
  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
`;

const Npm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'versions' | 'examples'>('info');
  const theme = useTheme();

  return (
    <Container>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: theme.colors.primary }}>test-numbers-generator</h1>
            <div style={{ fontSize: '1.1rem', color: theme.colors.secondary, marginTop: 4 }}>A package for generating and validating Dutch test data (BSN, IBAN, phone, postcode, etc).</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')}>Info & Usage</TabButton>
          <TabButton active={activeTab === 'examples'} onClick={() => setActiveTab('examples')}>Voorbeelden</TabButton>
          <TabButton active={activeTab === 'versions'} onClick={() => setActiveTab('versions')}>Versies</TabButton>
        </div>
        {activeTab === 'info' && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.colors.primary, margin: '0 0 1.5rem 0' }}>Installatie</h2>
            <pre style={{ background: '#23272f', color: '#fff', borderRadius: '0.5rem', padding: '1rem 1.5rem', fontSize: '1.1rem', marginBottom: '2.5rem', fontFamily: 'Menlo, Monaco, Consolas, monospace', overflowX: 'auto' }}>
$ npm install test-numbers-generator
            </pre>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.colors.primary, margin: '0 0 1.5rem 0' }}>Gebruik</h2>
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
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: theme.colors.secondary, margin: '2rem 0 1rem 0' }}>Deterministic password voorbeeld</h3>
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
            background: theme.colors.primary,
            color: theme.colors.textOnPrimary,
            fontWeight: 600,
            borderRadius: '0.5rem',
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            textDecoration: 'none',
            marginTop: '1.5rem',
            boxShadow: `0 2px 8px 0 ${theme.colors.primary}22`,
            transition: 'background 0.2s',
          }}
        >
          Bekijk op NPM
        </a>
      </Card>
    </Container>
  );
};

export default Npm;
