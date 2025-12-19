import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SearchForm from './components/SearchForm';
import BusList from './components/BusList';
import SeatSelection from './components/SeatSelection';
import BookingForm from './components/BookingForm';
import BookingSuccess from './components/BookingSuccess';
import MyBookings from './components/MyBookings';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchForm />} />
            <Route path="/buses" element={<BusList />} />
            <Route path="/seats/:busId" element={<SeatSelection />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
