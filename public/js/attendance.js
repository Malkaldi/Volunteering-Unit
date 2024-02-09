document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkInForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const data = { studentId: studentId };

        fetch('/api/attendance/mark-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(data => {
            document.getElementById('message').textContent = data.message;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('message').textContent = 'An error occurred. Please try again.';
        });
    });
});
