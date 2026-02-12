const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    month: { type: Number, required: true }, // 1 for Jan, 2 for Feb...
    year: { type: Number, required: true },
    baseSalary: { type: Number, required: true },
    presentDays: { type: Number, default: 0 },
    halfDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    overtimePay: { type: Number, default: 0 },
    borrowedMoney: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);