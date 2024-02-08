// When the DOM is fully loaded, attach an event listener to the form
document.addEventListener('DOMContentLoaded', function() {
    // Attach a submit event listener to the form with ID 'checkInForm'
    document.getElementById('checkInForm').addEventListener('submit', function(e) {
        // Prevent the default form submission which refreshes the page
        e.preventDefault();

        // Get the value of the student ID input field
        const studentId = document.getElementById('studentId').value;

        // Prepare the data object to be sent to the server
        const data = { studentId: studentId };

        // Make an HTTP POST request to the server's '/api/attendance/mark-attendance' endpoint
        fetch('/api/attendance/mark-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that we're sending JSON data
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                // If the HTTP response status is not OK, throw an error to be caught later
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                // If the response is OK, convert it to JSON
                return response.json();
            }
        })
        .then(data => {
            // Display the server's response message in the HTML element with ID 'message'
            document.getElementById('message').textContent = data.message;
        })
        .catch(error => {
            // If there's an error (either network error or error thrown manually), log it to the console
            console.error('Fetch error:', error);
            // Display a generic error message to the user
            document.getElementById('message').textContent = 'An error occurred. Please try again.';
        });
    });
});
