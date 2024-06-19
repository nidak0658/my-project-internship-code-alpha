// public/scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const stocksList = document.getElementById('stocks-list');
    const buyForm = document.getElementById('buy-form');
    const sellForm = document.getElementById('sell-form');
    const messageDiv = document.getElementById('message');

    // Fetch stocks data from server
    fetch('/api/stocks')
        .then(response => response.json())
        .then(stocks => {
            stocks.forEach(stock => {
                const stockElement = document.createElement('div');
                stockElement.innerHTML = `<strong>${stock.symbol}</strong> - ${stock.name} (${stock.price})`;
                stocksList.appendChild(stockElement);
            });
        });

    // Handle buy form submission
    buyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(buyForm);
        const data = {
            symbol: formData.get('symbol'),
            quantity: formData.get('quantity')
        };
        fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            messageDiv.textContent = message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Handle sell form submission
    sellForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(sellForm);
        const data = {
            symbol: formData.get('symbol'),
            quantity: formData.get('quantity')
        };
        fetch('/api/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => {
            messageDiv.textContent = message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
