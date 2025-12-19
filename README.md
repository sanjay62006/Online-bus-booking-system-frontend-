# Online Bus Booking System

A modern, responsive React application for booking bus tickets online.

## Features

- **User Authentication Options**: Login, Register, or Continue as Guest
- **Route Search**: Search buses between cities with date selection
- **Bus Listing**: View available buses with details (departure, arrival, price, available seats)
- **Seat Selection**: Interactive seat selection with visual feedback
- **Booking Confirmation**: Complete booking with passenger details and price calculation
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 19.2.3
- React DOM 19.2.3
- CSS3 for styling
- React Hooks (useState) for state management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login/Register/Guest options
│   ├── SearchForm.jsx     # Route and date search
│   ├── BusList.jsx        # Display available buses
│   ├── SeatSelection.jsx  # Interactive seat selection
│   └── BookingForm.jsx    # Passenger details and confirmation
├── App.js                 # Main application component
├── App.css               # Application styles
└── index.js              # Application entry point
```

## Usage Flow

1. **Welcome Screen**: Choose to login, register, or continue as guest
2. **Search**: Select departure city, destination city, and travel date
3. **Bus Selection**: Browse available buses and select preferred option
4. **Seat Selection**: Choose seats from the interactive seat map
5. **Booking**: Enter passenger details and confirm booking

## Features in Detail

### Search Form
- Dropdown selection for 10 major Indian cities
- Date picker for travel date
- Form validation to ensure all fields are filled

### Bus Listing
- Mock data with 3 different bus types (Express, Luxury, Standard)
- Shows departure/arrival times, price, and available seats
- Easy selection with dedicated buttons

### Seat Selection
- 20-seat layout in a 5x4 grid
- Visual feedback for selected seats
- Multiple seat selection allowed
- Proceed only when at least one seat is selected

### Booking Confirmation
- Comprehensive booking summary
- Passenger information form with validation
- Total price calculation
- Success confirmation with booking details

## Customization

The app uses a yellow and blue color scheme that can be easily customized in `App.css`. Key color variables:
- Primary: #ffc107 (Yellow)
- Secondary: #0073e6 (Blue)
- Background: #fff3cd (Light Yellow)

## Future Enhancements

- Backend integration for real bus data
- Payment gateway integration
- User authentication system
- Booking history and management
- Email/SMS notifications
- Real-time seat availability
- Route maps and bus tracking

## License

This project is open source and available under the MIT License.