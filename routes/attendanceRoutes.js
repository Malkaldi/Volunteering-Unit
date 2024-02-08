const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Adjust the path as needed

router.post('/mark-attendance', async (req, res) => {
    const { studentId } = req.body;
    
    // Regex to validate student ID format
    const regex = /^[sg]20\d{6}0$/;

    // Validate the studentId against the regex
    if (!regex.test(studentId)) {
        // If the input is invalid, return a 400 Bad Request with an error message
        return res.status(400).json({ message: 'Please re-enter your ID and make sure it is correct.' });
    }
    try {
        // Find the student in the database
        const student = await Student.findOne({ studentId: studentId });
        if (student) {
            console.log(student);
            if (!student.presence) {
                // Mark the student's presence
                student.presence = true;
                await student.save();

                // Send a success message with the student's name and program
                // The \n characters will be interpreted by the client-side JavaScript
                res.status(200).json({
                    message: `Check-in successful.\n${student.name}\nProgram: ${student.program}`
                });
            }
            else {
                res.status(200).json({
                    message: `Welcome back, you already checked-in.\n${student.name}\nProgram: ${student.program}`
                });
            }
        } else {
            // If the student is not found, return a 404 Not Found with an error message
            res.status(404).json({ message: 'Student not found. Please head to the registration office.' });
        }
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error with an error message
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
});

module.exports = router;
