import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { busAPI } from '../services/api';

const SearchForm = () => {
  const [formData, setFormData] = useState({ from: '', to: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cities = [
    // Major metros
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
    // North India
    'Jaipur', 'Lucknow', 'Agra', 'Chandigarh', 'Amritsar', 'Dehradun', 'Haridwar', 'Shimla',
    // West India
    'Nashik', 'Surat', 'Vadodara', 'Rajkot', 'Indore', 'Bhopal', 'Nagpur', 'Aurangabad',
    // Tamil Nadu
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 
    'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Tiruppur', 'Karur', 'Cuddalore',
    'Kanchipuram', 'Kumbakonam', 'Nagercoil', 'Ooty', 'Kodaikanal', 'Rameswaram',
    // Kerala
    'Kochi', 'Trivandrum', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur', 'Alappuzha',
    // Karnataka
    'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga', 'Davangere', 'Shimoga',
    // Andhra Pradesh & Telangana
    'Vijayawada', 'Visakhapatnam', 'Guntur', 'Warangal', 'Nizamabad', 'Tirupati',
    // East India
    'Bhubaneswar', 'Cuttack', 'Guwahati', 'Siliguri', 'Durgapur', 'Asansol'
  ].sort();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.from === formData.to) {
      setError('From and To cities cannot be the same. Please select different cities.');
      setLoading(false);
      return;
    }

    try {
      const response = await busAPI.searchBuses(formData);
      navigate('/buses', { state: { buses: response.data, searchData: formData } });
    } catch (error) {
      setError('Failed to search buses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <h2>Search Buses</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>From:</label>
              <select
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              >
                <option value="">Select From</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>To:</label>
              <select
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              >
                <option value="">Select To</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="search-btn">
              {loading ? 'Searching...' : 'Search Buses'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
