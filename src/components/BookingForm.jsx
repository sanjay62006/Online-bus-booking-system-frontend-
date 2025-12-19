import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { bus, selectedSeats, searchData, totalPrice } = location.state || {};
  
  const [formData, setFormData] = useState({
    passengerName: user?.name || '',
    passengerEmail: user?.email || '',
    passengerPhone: user?.phone || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!bus || !selectedSeats) {
    return (
      <div className="error-container">
        <p>Booking information not found. Please start over.</p>
        <button onClick={() => navigate('/search')}>Back to Search</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        busId: bus._id,
        ...formData,
        selectedSeats,
        travelDate: searchData.date
      };

      const response = await bookingAPI.createBooking(bookingData);
      navigate('/booking-success', { state: { booking: response.data.booking } });
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form">
        <h2>Confirm Booking</h2>
        
        <div className="booking-summary">
          <h3>Booking Details</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Bus:</span>
              <span className="value">{bus.name}</span>
            </div>
            <div className="summary-item">
              <span className="label">Route:</span>
              <span className="value">{bus.from} → {bus.to}</span>
            </div>
            <div className="summary-item">
              <span className="label">Date:</span>
              <span className="value">{searchData.date}</span>
            </div>
            <div className="summary-item">
              <span className="label">Time:</span>
              <span className="value">{bus.departureTime} - {bus.arrivalTime}</span>
            </div>
            <div className="summary-item">
              <span className="label">Seats:</span>
              <span className="value">{selectedSeats.join(', ')}</span>
            </div>
            <div className="summary-item total">
              <span className="label">Total Price:</span>
              <span className="value">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h3>Passenger Information</h3>
          <div className="form-group">
            <input
              type="text"
              name="passengerName"
              placeholder="Full Name"
              value={formData.passengerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="passengerEmail"
              placeholder="Email Address"
              value={formData.passengerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="passengerPhone"
              placeholder="Phone Number"
              value={formData.passengerPhone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="action-buttons">
            <button type="button" onClick={() => navigate(-1)} className="back-btn">
              Back
            </button>
            <button type="submit" disabled={loading} className="confirm-btn">
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
