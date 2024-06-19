const ws = new WebSocket('ws://localhost:3000');

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// WebSocket onmessage handler
ws.onmessage = function(event) {
    const message = JSON.parse(event.data);
    displayMessage(message);
};

// Function to display message in chat
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <div class="${message.role === 'user' ? 'user-message' : 'bot-message'}">
            ${message.content}
        </div>
    `;
    chatMessages.appendChild(messageElement);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for send button click
sendBtn.addEventListener('click', function() {
    const message = userInput.value.trim();
    if (message !== '') {
        ws.send(message); // Send message to server
        displayMessage({ role: 'user', content: message }); // Display user message in chat
        userInput.value = ''; // Clear input field
    }
});
