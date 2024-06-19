const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

// WebSocket connection handler
wss.on('connection', function(ws) {
    console.log('WebSocket connected');

    // Handle messages from client
    ws.on('message', function(message) {
        console.log('Received message:', message);

        // Forward message to ChatGPT API
        axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            max_tokens: 150,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const botMessage = response.data.choices[0].message.content;
            console.log('Bot response:', botMessage);

            // Send response back to client
            ws.send(JSON.stringify({ role: 'bot', content: botMessage }));
        })
        .catch(error => {
            console.error('Error calling ChatGPT API:', error);
            ws.send(JSON.stringify({ role: 'bot', content: 'Oops! Something went wrong.' }));
        });
    });

    // Handle WebSocket closure
    ws.on('close', function() {
        console.log('WebSocket disconnected');
    });
});

// Serve static files (index.html, styles.css, scripts.js)
app.use(express.static('public'));

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log(`Server started on http://localhost:${PORT}`);
});
