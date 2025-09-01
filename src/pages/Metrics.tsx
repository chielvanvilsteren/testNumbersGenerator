import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Metrics.css';

interface PageViewData {
  views: number;
  timestamp: string;
}

const Metrics: React.FC = () => {
  const [pageViews, setPageViews] = useState<PageViewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect niet-geauthenticeerde gebruikers
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Functie om pageviews op te halen
  const fetchPageViews = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/pageviews', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPageViews(data);
    } catch (err) {
      console.error('Error fetching pageviews:', err);
      setError('Kon pageviews niet ophalen. Controleer of de Netlify function actief is.');
    } finally {
      setIsLoading(false);
    }
  };

  // Functie om pageview counter te incrementeren (voor test doeleinden)
  const incrementPageViews = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/pageviews', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPageViews(data);
    } catch (err) {
      console.error('Error incrementing pageviews:', err);
      setError('Kon pageview niet incrementeren.');
    } finally {
      setIsLoading(false);
    }
  };

  // Laad pageviews bij component mount
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchPageViews();
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return null; // Component wordt ge-redirect
  }

  return (
    <div className="metrics-container">
      <div className="metrics-card">
        <h1>📊 Website Metrics</h1>
        <p className="metrics-subtitle">Hier zie je de pageview statistieken van je website</p>

        <div className="metrics-content">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="pageview-section">
            <div className="pageview-counter">
              <span className="counter-label">Totaal Pageviews</span>
              <span className="counter-value">
                {isLoading ? '⏳' : pageViews?.views || 0}
              </span>
            </div>

            {pageViews?.timestamp && (
              <div className="last-updated">
                Laatst bijgewerkt: {new Date(pageViews.timestamp).toLocaleString('nl-NL')}
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              onClick={fetchPageViews}
              disabled={isLoading}
              className="refresh-button"
            >
              {isLoading ? '🔄 Laden...' : '🔄 Vernieuwen'}
            </button>

            <button
              onClick={incrementPageViews}
              disabled={isLoading}
              className="increment-button"
            >
              {isLoading ? '➕ Bezig...' : '➕ Test Increment'}
            </button>
          </div>

          <div className="info-section">
            <h3>ℹ️ Informatie</h3>
            <ul>
              <li>De pageview counter wordt automatisch verhoogd bij elke website bezoek</li>
              <li>Data wordt opgeslagen via Netlify Functions</li>
              <li>De "Test Increment" knop is voor demo doeleinden</li>
              <li>In productie zou je een echte database gebruiken (FaunaDB, Supabase, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
