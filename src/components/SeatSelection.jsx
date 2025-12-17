import React, { useState } from 'react';

const SeatSelection = ({ bus, onBook }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = () => {
    onBook(selectedSeats);
  };

  return (
    <div className="seat-selection">
      <h2>Select Seats for {bus.name}</h2>
      <div className="seats">
        {Array.from({ length: 20 }, (_, i) => i + 1).map(seat => (
          <button
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      <button onClick={handleBook} disabled={selectedSeats.length === 0}>
        Proceed to Booking
      </button>
    </div>
  );
};

export default SeatSelection;
