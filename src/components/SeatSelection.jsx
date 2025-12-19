import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const SeatSelection = () => {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, searchData } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!bus) {
    return (
      <div className="error-container">
        <p>Bus information not found. Please search again.</p>
        <button onClick={() => navigate('/search')}>Back to Search</button>
      </div>
    );
  }

  const toggleSeat = (seatNumber) => {
    if (bus.bookedSeats?.includes(seatNumber)) return; // Can't select booked seats
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleProceed = () => {
    navigate('/booking', { 
      state: { 
        bus, 
        selectedSeats, 
        searchData,
        totalPrice: selectedSeats.length * bus.price 
      } 
    });
  };

  const getSeatClass = (seatNumber) => {
    if (bus.bookedSeats?.includes(seatNumber)) return 'seat booked';
    if (selectedSeats.includes(seatNumber)) return 'seat selected';
    return 'seat available';
  };

  return (
    <div className="seat-selection-container">
      <div className="bus-info-header">
        <h2>Select Seats - {bus.name}</h2>
        <p>{bus.from} → {bus.to} | {searchData?.date}</p>
        <p>Price per seat: ₹{bus.price}</p>
      </div>

      <div className="seat-map">
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat booked"></div>
            <span>Booked</span>
          </div>
        </div>

        <div className="bus-layout">
          <div className="driver-section">Driver</div>
          <div className="seats-grid">
            {Array.from({ length: bus.totalSeats || 40 }, (_, i) => i + 1).map(seatNumber => (
              <button
                key={seatNumber}
                className={getSeatClass(seatNumber)}
                onClick={() => toggleSeat(seatNumber)}
                disabled={bus.bookedSeats?.includes(seatNumber)}
              >
                {seatNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="booking-summary">
        <div className="selected-info">
          <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
          <p><strong>Total Price:</strong> ₹{selectedSeats.length * bus.price}</p>
        </div>
        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="back-btn">Back</button>
          <button 
            onClick={handleProceed} 
            disabled={selectedSeats.length === 0}
            className="proceed-btn"
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
