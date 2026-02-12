const Owner = require('../models/Owner.model');

exports.updateCompanySettings = async (req, res) => {
    try {
        const { 
            workingHoursPerDay, 
            overtimeAllowed, 
            overtimeRate, 
            weekConfig 
        } = req.body;

        // Validation: Working hours must be provided
        if (!workingHoursPerDay) {
            return res.status(400).json({ message: "Working hours per day is mandatory (*)" });
        }

        const updatedOwner = await Owner.findByIdAndUpdate(
            req.user.id, // ID from the protect middleware
            { 
                workingHoursPerDay, 
                overtimeAllowed, 
                overtimeRate, 
                weekConfig 
            },
            { new: true }
        );

        res.json({ message: "Company settings updated successfully", settings: updatedOwner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const bcrypt = require('bcryptjs');

// Update Company & Personal Details
exports.updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        
        // Prevent manual role or password changes via this route
        delete updates.password;
        delete updates.role;

        const updatedOwner = await Owner.findByIdAndUpdate(
            req.user.id, 
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ message: "Profile updated successfully!", data: updatedOwner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Secure Password Change
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const owner = await Owner.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, owner.password);
        if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

        // Validate new password rules (using our utility)
        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: "New password does not meet security rules" });
        }

        owner.password = await bcrypt.hash(newPassword, 12);
        await owner.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};