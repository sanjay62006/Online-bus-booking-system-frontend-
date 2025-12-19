import axios from 'axios';

const API_BASE_URL = 'https://online-bus-booking-system-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Bus API
export const busAPI = {
  searchBuses: (searchParams) => api.get('/buses/search', { params: searchParams }),
  getAllBuses: () => api.get('/buses'),
  getBusById: (id) => api.get(`/buses/${id}`),
};

// Booking API
export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
};

// Utility API
export const utilAPI = {
  seedData: () => api.post('/seed'),
  healthCheck: () => api.get('/health'),
};

export default api;
