import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

interface NpmVersionInfo {
  version: string;
  time: string;
}

const NpmVersionsTab: React.FC = () => {
  const theme = useTheme();
  const [versions, setVersions] = useState<NpmVersionInfo[]>([]);
  const [latest, setLatest] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://registry.npmjs.org/test-numbers-generator')
      .then(res => res.json())
      .then(data => {
        const times = data.time || {};
        const versionList = Object.keys(times)
          .filter(v => v !== 'created' && v !== 'modified')
          .map(v => ({ version: v, time: times[v] }))
          .sort((a, b) => (a.time < b.time ? 1 : -1));
        setVersions(versionList);
        setLatest(data['dist-tags']?.latest || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Kon versies niet ophalen.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Versies laden...</div>;
  if (error) return <div style={{ color: theme.colors.primary }}>{error}</div>;

  return (
    <div style={{ padding: '2rem 0', maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: theme.colors.primary }}>Versiegeschiedenis</h2>
      <div style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: theme.colors.secondary }}>
        <strong>Meest actuele versie:</strong> <span style={{ color: theme.colors.primary, fontWeight: 600 }}>{latest}</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: theme.colors.background, borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 2px 8px 0 rgba(30,58,138,0.05)' }}>
        <thead>
          <tr style={{ background: theme.colors.surface }}>
            <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600, color: theme.colors.primary }}>Versie</th>
            <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600, color: theme.colors.primary }}>Datum</th>
          </tr>
        </thead>
        <tbody>
          {versions.map(v => (
            <tr key={v.version} style={{ borderBottom: `1px solid ${theme.colors.secondary}` }}>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: theme.colors.text }}> {v.version}</td>
              <td style={{ padding: '0.75rem', color: theme.colors.text }}>{new Date(v.time).toLocaleString('nl-NL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NpmVersionsTab;
