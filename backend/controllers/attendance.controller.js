const Attendance = require('../models/Attendance.model');

exports.markOut = async (req, res) => {
    try {
        const { employeeId } = req.user; // From JWT
        const checkOutTime = new Date();
        
        const record = await Attendance.findOne({ 
            employeeId, 
            date: new Date().toISOString().split('T')[0] 
        });

        if (!record) return res.status(404).json({ message: "No Check-In found for today" });

        // Calculate hours
        const diffInMs = checkOutTime - record.checkIn;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        let status = 'Present';
        if (diffInHours < 11) {
            status = 'Half-Day';
        } else if (diffInHours > 12) {
            status = 'Overtime';
        }

        record.checkOut = checkOutTime;
        record.totalHours = diffInHours.toFixed(2);
        record.status = status;

        await record.save();
        res.json({ message: `Checked out. Total hours: ${record.totalHours}`, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};