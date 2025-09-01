// Netlify Function voor pageview counter
// Deze function houdt een simpele counter bij en retourneert de huidige waarde

const fs = require('fs');
const path = require('path');

// Voor demo doeleinden gebruiken we een lokale JSON file
// In productie zou je een echte database gebruiken zoals FaunaDB of Supabase
const DATA_FILE = '/tmp/pageviews.json';

// Helper functie om data te lezen
function readPageViews() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading pageviews:', error);
  }
  return { views: 0 };
}

// Helper functie om data te schrijven
function writePageViews(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing pageviews:', error);
  }
}

exports.handler = async (event, context) => {
  // CORS headers voor frontend toegang
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight CORS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Lees huidige pageviews
    const currentData = readPageViews();

    if (event.httpMethod === 'GET') {
      // GET request: return current count zonder increment
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          views: currentData.views,
          timestamp: new Date().toISOString()
        }),
      };
    }

    if (event.httpMethod === 'POST') {
      // POST request: increment counter en return nieuwe waarde
      const newViews = currentData.views + 1;
      const newData = {
        views: newViews,
        lastUpdated: new Date().toISOString()
      };

      writePageViews(newData);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          views: newViews,
          timestamp: newData.lastUpdated
        }),
      };
    }

    // Unsupported method
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }),
    };
  }
};
