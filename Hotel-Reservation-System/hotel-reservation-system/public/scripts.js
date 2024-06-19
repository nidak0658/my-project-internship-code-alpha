document.addEventListener('DOMContentLoaded', function() {
    const roomsList = document.getElementById('rooms-list');
    const bookingsList = document.getElementById('bookings-list');
    const reservationForm = document.getElementById('reservation-form');
    const messageDiv = document.getElementById('message');

    // Fetch available rooms
    fetch('/api/rooms')
        .then(response => response.json())
        .then(rooms => {
            rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.classList.add('room-item');
                roomElement.innerHTML = `
                    <strong>${room.name}</strong><br>
                    Category: ${room.category}<br>
                    Price: $${room.price}<br>
                    <button onclick="bookRoom('${room.id}')">Book Now</button>
                `;
                roomsList.appendChild(roomElement);

                // Populate reservation form options
                const option = document.createElement('option');
                option.value = room.id;
                option.textContent = `${room.name} - ${room.category} - $${room.price}`;
                reservationForm.room.appendChild(option);
            });
        });

    // Fetch current bookings
    fetch('/api/bookings')
        .then(response => response.json())
        .then(bookings => {
            bookings.forEach(booking => {
                const bookingElement = document.createElement('div');
                bookingElement.innerHTML = `
                    <strong>Booking ID:</strong> ${booking.id}<br>
                    <strong>Room:</strong> ${booking.roomId}<br>
                    <strong>Guest Name:</strong> ${booking.guestName}<br>
                    <strong>Start Date:</strong> ${booking.startDate}<br>
                    <strong>End Date:</strong> ${booking.endDate}<br>
                    <strong>Total Price:</strong> $${booking.totalPrice}<br><br>
                `;
                bookingsList.appendChild(bookingElement);
            });
        });

    // Handle reservation form submission
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(reservationForm);
        const data = {
            roomId: formData.get('room'),
            guestName: formData.get('guestName'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate')
        };
        fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(booking => {
            messageDiv.textContent = `Booking successful! Booking ID: ${booking.id}`;
            roomsList.innerHTML = ''; // Clear rooms list
            bookingsList.innerHTML = ''; // Clear bookings list
            // Refresh rooms and bookings lists
            fetchRooms();
            fetchBookings();
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Error occurred while booking.';
        });
    });

    // Function to fetch rooms and update UI
    function fetchRooms() {
        fetch('/api/rooms')
            .then(response => response.json())
            .then(rooms => {
                roomsList.innerHTML = ''; // Clear rooms list
                rooms.forEach(room => {
                    const roomElement = document.createElement('div');
                    roomElement.classList.add('room-item');
                    roomElement.innerHTML = `
                        <strong>${room.name}</strong><br>
                        Category: ${room.category}<br>
                        Price: $${room.price}<br>
                        <button onclick="bookRoom('${room.id}')">Book Now</button>
                    `;
                    roomsList.appendChild(roomElement);

                    // Update reservation form options
                    const option = document.createElement('option');
                    option.value = room.id;
                    option.textContent = `${room.name} - ${room.category} - $${room.price}`;
                    reservationForm.room.appendChild(option);
                });
            });
    }

    // Function to fetch bookings and update UI
    function fetchBookings() {
        fetch('/api/bookings')
            .then(response => response.json())
            .then(bookings => {
                bookingsList.innerHTML = ''; // Clear bookings list
                bookings.forEach(booking => {
                    const bookingElement = document.createElement('div');
                    bookingElement.innerHTML = `
                        <strong>Booking ID:</strong> ${booking.id}<br>
                        <strong>Room:</strong> ${booking.roomId}<br>
                        <strong>Guest Name:</strong> ${booking.guestName}<br>
                        <strong>Start Date:</strong> ${booking.startDate}<br>
                        <strong>End Date:</strong> ${booking.endDate}<br>
                        <strong>Total Price:</strong> $${booking.totalPrice}<br><br>
                    `;
                    bookingsList.appendChild(bookingElement);
                });
            });
    }

    // Function to handle booking a room
    window.bookRoom = function(roomId) {
        const room = rooms.find(r => r.id === roomId);
        if (!room) {
            console.error('Room not found');
            return;
        }
        // Fill reservation form with room details
        reservationForm.room.value = room.id;
    };

});
