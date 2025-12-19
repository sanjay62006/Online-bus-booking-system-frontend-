import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { buses = [], searchData = {} } = location.state || {};
  const [sortBy, setSortBy] = useState('price');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredAndSortedBuses = useMemo(() => {
    let filtered = [...buses];
    
    // Filter by bus type
    if (filterType !== 'all') {
      filtered = filtered.filter(bus => bus.busType.toLowerCase().includes(filterType.toLowerCase()));
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(bus => {
        if (max) return bus.price >= min && bus.price <= max;
        return bus.price >= min;
      });
    }
    
    // Sort buses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'departure': return a.departureTime.localeCompare(b.departureTime);
        case 'duration': 
          const getDuration = (dep, arr) => {
            const [depH, depM] = dep.split(':').map(Number);
            const [arrH, arrM] = arr.split(':').map(Number);
            return (arrH * 60 + arrM) - (depH * 60 + depM);
          };
          return getDuration(a.departureTime, a.arrivalTime) - getDuration(b.departureTime, b.arrivalTime);
        default: return 0;
      }
    });
    
    return filtered;
  }, [buses, sortBy, filterType, priceRange]);

  const handleSelectBus = (bus) => {
    navigate(`/seats/${bus._id}`, { state: { bus, searchData } });
  };

  return (
    <div className="bus-list-container">
      <div className="search-summary">
        <h2>Available Buses</h2>
        <p>{searchData.from} → {searchData.to} | {searchData.date}</p>
      </div>
      
      {buses.length === 0 ? (
        <div className="no-buses">
          <div className="no-buses-icon">🚌</div>
          <h3>No buses found!</h3>
          <p>No buses available for <strong>{searchData.from} → {searchData.to}</strong> on <strong>{searchData.date}</strong></p>
          <div className="suggestions">
            <p>Try:</p>
            <ul>
              <li>Different dates</li>
              <li>Nearby cities</li>
              <li>Alternative routes</li>
            </ul>
          </div>
          <div className="action-buttons">
            <button onClick={() => navigate('/search')} className="primary-btn">
              🔍 Search Again
            </button>
            <button onClick={() => navigate('/')} className="secondary-btn">
              🏠 Go Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="filters-section">
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low to High)</option>
                <option value="departure">Departure Time</option>
                <option value="duration">Duration</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Bus Type:</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="ac">AC</option>
                <option value="sleeper">Sleeper</option>
                <option value="semi-sleeper">Semi-Sleeper</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range:</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="0-500">₹0 - ₹500</option>
                <option value="500-800">₹500 - ₹800</option>
                <option value="800-1200">₹800 - ₹1200</option>
                <option value="1200">Above ₹1200</option>
              </select>
            </div>
          </div>
          <div className="results-info">
            <p>Found {filteredAndSortedBuses.length} buses</p>
          </div>
          <div className="buses-grid">
            {filteredAndSortedBuses.map(bus => (
            <div key={bus._id} className="bus-card">
              <div className="bus-header">
                <h3>{bus.name}</h3>
                <span className="bus-type">{bus.busType}</span>
              </div>
              <div className="bus-details">
                <div className="time-info">
                  <div className="departure">
                    <span className="time">{bus.departureTime}</span>
                    <span className="city">{bus.from}</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <span className="time">{bus.arrivalTime}</span>
                    <span className="city">{bus.to}</span>
                  </div>
                </div>
                <div className="bus-info">
                  <p><strong>Price:</strong> ₹{bus.price}</p>
                  <p><strong>Available Seats:</strong> {bus.availableSeats}</p>
                  <div className="amenities">
                    {bus.amenities?.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleSelectBus(bus)} 
                className="select-bus-btn"
                disabled={bus.availableSeats === 0}
              >
                {bus.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
              </button>
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusList;
