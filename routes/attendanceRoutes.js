const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/mark-attendance', async (req, res) => {
    const { studentId } = req.body;
    const regex = /^[sg]20\d{6}0$/;

    if (!regex.test(studentId)) {
        return res.json({ message: 'Wrong ID, make sure to add s or g followed by your 9 digit ID.' });
    }
    try {
        const student = await Student.findOne({ studentId: studentId });
        if (student) {
            if (!student.presence) {
                student.presence = true;
                await student.save();
                res.status(200).json({
                    message: `Your attendance was taken successfully, \n${student.name} \n${student.program}`
                });
            } else {
                res.status(200).json({
                    message: `Your attendance was already taken, \n${student.name} \n${student.program}`
                });
            }
        } else {
            res.json({ message: 'Head to the late registration office.' });
        }
    } catch (error) {
        res.json({ message: 'Error marking attendance', error: error.message });
    }
});

module.exports = router;
