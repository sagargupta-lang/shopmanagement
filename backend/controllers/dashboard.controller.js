const Employee = require('../models/Employee.model');
const Stock = require('../models/Stock.model');
const Attendance = require('../models/Attendance.model');

exports.getOwnerSummary = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const today = new Date().toISOString().split('T')[0];

        // Run multiple counts in parallel for speed
        const [empCount, stockCount, todayAttendance] = await Promise.all([
            Employee.countDocuments({ ownerId }),
            Stock.countDocuments({ ownerId }),
            Attendance.find({ date: today }) // You'd filter this by employees belonging to this owner
        ]);

        // Logic for Low Stock Alerts (e.g., quantity < 5)
        const lowStockItems = await Stock.find({ ownerId, quantity: { $lt: 5 } });

        res.json({
            summary: {
                totalEmployees: empCount,
                totalStockItems: stockCount,
                todayPresent: todayAttendance.filter(a => a.status === 'Present' || a.status === 'Overtime').length,
                todayHalfDay: todayAttendance.filter(a => a.status === 'Half-Day').length,
            },
            alerts: lowStockItems.map(item => `${item.itemName} is low on stock (${item.quantity} left)`)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};