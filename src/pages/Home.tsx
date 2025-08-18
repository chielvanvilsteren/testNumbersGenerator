import React from 'react';

const Home: React.FC = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <img
      src="/favicon.ico"
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
        marginBottom: 32,
      }}
    />
    <h1>Welkom op de Homepagina</h1>
    <p>Gebruik het menu om naar de generators te gaan.</p>
  </div>
);

export default Home;
