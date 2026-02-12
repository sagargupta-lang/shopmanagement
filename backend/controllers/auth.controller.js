const Owner = require('../models/Owner.model');
const Employee = require('../models/Employee.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validatePassword } = require('../utils/validators');

// 🔵 OWNER SIGNUP
exports.ownerSignup = async (req, res) => {
    try {
        const { email, password, phone, ownerName, companyName, ...rest } = req.body;

        // 1. Check if owner exists
        const existingOwner = await Owner.findOne({ $or: [{ email }, { phone }] });
        if (existingOwner) return res.status(400).json({ message: "Email or Phone already registered" });

        // 2. Validate Password Rules
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                message: "Password must have 4+ letters, 3+ numbers, and 1+ special character." 
            });
        }

        // 3. Hash Password & Save
        const hashedPassword = await bcrypt.hash(password, 12);
        const newOwner = new Owner({
            ...req.body,
            password: hashedPassword,
            role: 'owner'
        });

        await newOwner.save();
        res.status(201).json({ message: "Owner registered successfully! Please login." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 ADD EMPLOYEE (Owner Feature)
exports.addEmployee = async (req, res) => {
    try {
        const { name, phone, baseSalary } = req.body;

        // Generate ID: FirstName_Last5DigitsOfPhone
        const firstName = name.split(' ')[0];
        const last5Phone = phone.slice(-5);
        const generatedId = `${firstName}_${last5Phone}`;

        // Default password for first login (Owner sets it initially)
        const tempPassword = await bcrypt.hash("Temp@123", 12);

        const newEmployee = new Employee({
            employeeId: generatedId,
            name,
            phone,
            baseSalary,
            password: tempPassword,
            ownerId: req.user.id, // From Auth Middleware
            firstLogin: true
        });

        await newEmployee.save();
        res.status(201).json({ 
            message: "Employee added!", 
            employeeId: generatedId 
        });
    } catch (error) {
        res.status(400).json({ message: "Employee already exists or invalid data" });
    }
};