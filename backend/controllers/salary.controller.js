const Attendance = require('../models/Attendance.model');
const Salary = require('../models/Salary.model');
const Owner = require('../models/Owner.model');

exports.calculateMonthlySalary = async (req, res) => {
    try {
        const { employeeId, month, year, borrowedMoney = 0 } = req.body;
        const employee = await Employee.findOne({ employeeId });
        const owner = await Owner.findById(employee.ownerId);

        // Fetch all attendance for that month
        const records = await Attendance.find({
            employeeId,
            date: { $regex: `^${year}-${month.toString().padStart(2, '0')}` }
        });

        let present = 0;
        let halfDays = 0;
        let otHours = 0;

        records.forEach(rec => {
            if (rec.status === 'Present') present++;
            if (rec.status === 'Half-Day') halfDays++;
            if (rec.status === 'Overtime') {
                present++;
                otHours += (rec.totalHours - 12); // Anything over 12 is OT
            }
        });

        // MATH LOGIC
        const dailyRate = employee.baseSalary / 30;
        const overtimePay = otHours * owner.overtimeRate;
        
        // Deductions: Full day for absent, Half rate for half days
        const totalEarned = (present * dailyRate) + (halfDays * (dailyRate / 2)) + overtimePay;
        const finalAmount = totalEarned - borrowedMoney;

        const report = new Salary({
            employeeId, month, year,
            baseSalary: employee.baseSalary,
            overtimePay, borrowedMoney, finalAmount: finalAmount.toFixed(2)
        });

        await report.save();
        res.json({ message: "Salary slip generated", report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};