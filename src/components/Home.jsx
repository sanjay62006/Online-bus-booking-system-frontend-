import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedMessage('');
    try {
      const response = await axios.post('/api/seed');
      setSeedMessage(`✅ ${response.data.message} (${response.data.count} buses added)`);
    } catch (error) {
      setSeedMessage('❌ Failed to seed database. Make sure backend is running.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="bus-icon">🚌</div>
        <h1>Online Bus Booking System</h1>
        <p>Book your bus tickets easily and securely</p>
        <div className="cta-buttons">
          <Link to="/search" className="cta-btn primary">Search Buses</Link>
          {!isAuthenticated && (
            <Link to="/login" className="cta-btn secondary">Login</Link>
          )}
        </div>
        
        <div className="admin-section" style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <button 
            onClick={handleSeedDatabase} 
            disabled={seeding}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: seeding ? 'not-allowed' : 'pointer',
              opacity: seeding ? 0.6 : 1
            }}
          >
            {seeding ? '🔄 Seeding...' : '🌱 Seed Database'}
          </button>
          {seedMessage && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: seedMessage.includes('✅') ? '#28a745' : '#dc3545' }}>
              {seedMessage}
            </p>
          )}
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>🔍 Easy Search</h3>
          <p>Find buses between any two cities</p>
        </div>
        <div className="feature">
          <h3>💺 Seat Selection</h3>
          <p>Choose your preferred seats</p>
        </div>
        <div className="feature">
          <h3>💳 Secure Payment</h3>
          <p>Safe and secure booking process</p>
        </div>
      </div>
    </div>
  );
};

export default Home;