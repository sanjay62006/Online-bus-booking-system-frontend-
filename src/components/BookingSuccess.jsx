import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="error-container">
        <p>Booking information not found.</p>
        <button onClick={() => navigate('/search')}>Back to Search</button>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p>Your bus ticket has been booked successfully.</p>
        
        <div className="booking-details">
          <h3>Booking Details</h3>
          <div className="detail-item">
            <span className="label">Booking ID:</span>
            <span className="value">{booking.bookingId}</span>
          </div>
          <div className="detail-item">
            <span className="label">Passenger:</span>
            <span className="value">{booking.passengerName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Bus:</span>
            <span className="value">{booking.bus.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Route:</span>
            <span className="value">{booking.bus.from} → {booking.bus.to}</span>
          </div>
          <div className="detail-item">
            <span className="label">Travel Date:</span>
            <span className="value">{new Date(booking.travelDate).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">Departure:</span>
            <span className="value">{booking.bus.departureTime}</span>
          </div>
          <div className="detail-item">
            <span className="label">Seats:</span>
            <span className="value">{booking.selectedSeats.join(', ')}</span>
          </div>
          <div className="detail-item total">
            <span className="label">Total Paid:</span>
            <span className="value">₹{booking.totalPrice}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/search')} className="new-booking-btn">
            Book Another Ticket
          </button>
          <button onClick={() => navigate('/my-bookings')} className="view-bookings-btn">
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;