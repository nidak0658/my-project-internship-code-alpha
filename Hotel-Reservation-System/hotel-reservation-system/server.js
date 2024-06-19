// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample data (simulated database)
let rooms = [
    { id: uuidv4(), name: 'Single Room', category: 'Standard', price: 100, booked: false },
    { id: uuidv4(), name: 'Double Room', category: 'Standard', price: 150, booked: false },
    { id: uuidv4(), name: 'Suite', category: 'Luxury', price: 300, booked: false }
    // Add more rooms as needed
];

let bookings = [];

// Route to fetch available rooms
app.get('/api/rooms', (req, res) => {
    res.json(rooms.filter(room => !room.booked));
});

// Route to make a reservation
app.post('/api/bookings', (req, res) => {
    const { roomId, guestName, startDate, endDate } = req.body;
    const room = rooms.find(room => room.id === roomId);
    if (!room || room.booked) {
        return res.status(404).send('Room not available.');
    }

    // Mark room as booked
    room.booked = true;

    // Create booking
    const booking = {
        id: uuidv4(),
        roomId,
        guestName,
        startDate,
        endDate,
        totalPrice: room.price * calculateDays(startDate, endDate)
    };

    bookings.push(booking);

    res.json(booking);
});

// Route to view bookings
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

// Helper function to calculate number of days between two dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
