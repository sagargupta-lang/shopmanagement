const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: String, required: true }, // The generated ID (e.g., Kuldeep_77890)
    date: { type: String, required: true },       // Format: YYYY-MM-DD
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    totalHours: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Present', 'Half-Day', 'Absent', 'Overtime'], 
        default: 'Present' 
    }
}, { timestamps: true });

// Create a unique index so an employee can't have two records for the same day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);