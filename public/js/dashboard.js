document.addEventListener('DOMContentLoaded', function() {
    // Fetch overall attendance data and render the corresponding chart
    fetch('/api/dashboard/overall-attendance')
    .then(response => response.json())
    .then(data => {
        const ctxOverall = document.getElementById('overallAttendanceChart').getContext('2d');
        const overallAttendanceChart = new Chart(ctxOverall, {
            type: 'bar',
            data: {
                labels: ['Students Attended', 'Students Not Attended'],
                datasets: [{
                    label: 'Overall Attendance',
                    data: [data.studentsAttended, data.studentsNotAttended], // Use the studentsNotAttended from the server
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0 // Avoids floating points on the y-axis
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching overall attendance data:', error));

    // Fetch program-specific attendance data and render the corresponding chart


    fetch('/api/dashboard/program-attendance')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.program);
        const attendanceCounts = data.map(item => item.attended);

        const ctxProgram = document.getElementById('programAttendanceChart').getContext('2d');
        const programAttendanceChart = new Chart(ctxProgram, {
            type: 'bar',
            data: {
                labels: labels, // Program names
                datasets: [{
                    label: 'Attendance by Program',
                    data: attendanceCounts, // Attendance counts
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { // Fixed for Chart.js 3.x compatibility
                        beginAtZero: true,
                        ticks: {
                            precision: 0 // Ensures no floating points on the y-axis
                        }
                    }
                }
            }
        });
    })

    .catch(error => console.error('Error fetching program-specific attendance data:', error));
});
