import React from 'react';

const codeBlockStyle = {
  background: 'linear-gradient(90deg, #23272f 60%, #1e293b 100%)',
  color: '#e0e7ef',
  borderRadius: '0.7rem',
  padding: '1.25rem',
  fontSize: '1.04rem',
  fontFamily: 'Menlo, Monaco, Consolas, monospace',
  margin: 0,
  overflowX: 'auto' as const,
  marginBottom: '0.5rem',
  border: '1.5px solid #334155',
  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.10)',
};
const outputStyle = {
  background: 'linear-gradient(90deg, #181a1b 60%, #1e293b 100%)',
  color: '#10b981',
  borderRadius: '0.7rem',
  padding: '0.75rem 1.25rem',
  fontSize: '1.04rem',
  fontFamily: 'Menlo, Monaco, Consolas, monospace',
  margin: 0,
  marginBottom: '2rem',
  overflowX: 'auto' as const,
  border: '1.5px solid #334155',
  boxShadow: '0 2px 12px 0 rgba(16,185,129,0.10)',
};

const NpmExamplesTab: React.FC = () => (
  <div style={{ padding: '2rem 0', maxWidth: 700, margin: '0 auto' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#2563eb', letterSpacing: 1, textShadow: '0 2px 8px rgba(30,58,138,0.10)' }}>Voorbeelden</h2>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>getRandomPlaatsnaam</h3>
      <pre style={codeBlockStyle}>{`import { getRandomPlaatsnaam } from 'test-numbers-generator';
const plaatsnaam = await getRandomPlaatsnaam();
console.log(plaatsnaam);`}</pre>
      <pre style={outputStyle}>{`// → 'Deventer'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>getRandomAdresInPlaatsnaam</h3>
      <pre style={codeBlockStyle}>{`import { getRandomAdresInPlaatsnaam } from 'test-numbers-generator';
const adres = await getRandomAdresInPlaatsnaam('Deventer');
console.log(adres);`}</pre>
      <pre style={outputStyle}>{`// → 'Brink 1, 7411 BX Deventer'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateTestMobileNumber</h3>
      <pre style={codeBlockStyle}>{`import { generateTestMobileNumber } from 'test-numbers-generator';
const dutchMobile = generateTestMobileNumber.Netherlands();
console.log(dutchMobile);`}</pre>
      <pre style={outputStyle}>{`// → '06 99123456'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateTestLandlineNumber</h3>
      <pre style={codeBlockStyle}>{`import { generateTestLandlineNumber } from 'test-numbers-generator';
const dutchLandline = generateTestLandlineNumber.Netherlands();
console.log(dutchLandline);`}</pre>
      <pre style={outputStyle}>{`// → '010 1234567'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isTestMobileNumber</h3>
      <pre style={codeBlockStyle}>{`import { isTestMobileNumber } from 'test-numbers-generator';
const isValid = isTestMobileNumber.Netherlands('06 99123456');
console.log(isValid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isTestLandlineNumber</h3>
      <pre style={codeBlockStyle}>{`import { isTestLandlineNumber } from 'test-numbers-generator';
const isValid = isTestLandlineNumber.Netherlands('010 1234567');
console.log(isValid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isTestPhoneNumber</h3>
      <pre style={codeBlockStyle}>{`import { isTestPhoneNumber } from 'test-numbers-generator';
const isValid = isTestPhoneNumber.Netherlands('06 99123456');
console.log(isValid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateTestBSN</h3>
      <pre style={codeBlockStyle}>{`import { generateTestBSN } from 'test-numbers-generator';
const bsn = generateTestBSN();
console.log(bsn);`}</pre>
      <pre style={outputStyle}>{`// → '123456782'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isValidBSN</h3>
      <pre style={codeBlockStyle}>{`import { isValidBSN } from 'test-numbers-generator';
const valid = isValidBSN('123456782');
console.log(valid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateTestDutchIBAN</h3>
      <pre style={codeBlockStyle}>{`import { generateTestDutchIBAN } from 'test-numbers-generator';
const iban = generateTestDutchIBAN();
console.log(iban);`}</pre>
      <pre style={outputStyle}>{`// → 'NL13TEST0123456789'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isValidDutchIBAN</h3>
      <pre style={codeBlockStyle}>{`import { isValidDutchIBAN } from 'test-numbers-generator';
const valid = isValidDutchIBAN('NL13TEST0123456789');
console.log(valid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateTestDutchPostcode</h3>
      <pre style={codeBlockStyle}>{`import { generateTestDutchPostcode } from 'test-numbers-generator';
const postcode = generateTestDutchPostcode();
console.log(postcode);`}</pre>
      <pre style={outputStyle}>{`// → '1234AB'`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>isValidDutchPostcode</h3>
      <pre style={codeBlockStyle}>{`import { isValidDutchPostcode } from 'test-numbers-generator';
const valid = isValidDutchPostcode('1234AB');
console.log(valid);`}</pre>
      <pre style={outputStyle}>{`// → true`}</pre>
    </div>
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: '#2563eb', fontSize: '1.13rem', marginBottom: 8, fontWeight: 700, letterSpacing: 0.5 }}>generateDeterministicPassword</h3>
      <pre style={codeBlockStyle}>{`import { generateDeterministicPassword } from 'test-numbers-generator';
const password = generateDeterministicPassword('verzorger1kind', 'myAppSecret');
console.log(password);`}</pre>
      <pre style={outputStyle}>{`// → 'b7f8e2c1...etc'`}</pre>
    </div>
  </div>
);

export default NpmExamplesTab;
