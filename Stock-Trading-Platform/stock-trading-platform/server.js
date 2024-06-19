// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample market data (simulated)
let stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.50 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300.75 },
    // Add more stocks as needed
];

// Route to fetch market data (stocks)
app.get('/api/stocks', (req, res) => {
    res.json(stocks);
});

// Route to buy stocks
app.post('/api/buy', (req, res) => {
    const { symbol, quantity } = req.body;
    // Simulate buying logic (update portfolio, deduct funds, etc.)
    // For simplicity, we'll just log the transaction
    console.log(`Bought ${quantity} shares of ${symbol}`);
    res.send('Stock bought successfully.');
});

// Route to sell stocks
app.post('/api/sell', (req, res) => {
    const { symbol, quantity } = req.body;
    // Simulate selling logic (update portfolio, add funds, etc.)
    // For simplicity, we'll just log the transaction
    console.log(`Sold ${quantity} shares of ${symbol}`);
    res.send('Stock sold successfully.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
