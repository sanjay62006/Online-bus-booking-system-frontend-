import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <button onClick={() => navigate('/search')} className="search-btn">
            Book Your First Ticket
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>Booking ID: {booking.bookingId}</h3>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
              
              <div className="booking-info">
                <div className="route-info">
                  <h4>{booking.bus.name}</h4>
                  <p>{booking.bus.from} → {booking.bus.to}</p>
                  <p>Travel Date: {new Date(booking.travelDate).toLocaleDateString()}</p>
                  <p>Departure: {booking.bus.departureTime}</p>
                </div>
                
                <div className="passenger-info">
                  <p><strong>Passenger:</strong> {booking.passengerName}</p>
                  <p><strong>Seats:</strong> {booking.selectedSeats.join(', ')}</p>
                  <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                </div>
              </div>
              
              <div className="booking-footer">
                <small>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;