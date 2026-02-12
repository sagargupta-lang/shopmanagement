const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth.route'));
// We will add more routes (attendance, stock) as we go!

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.get('/', (req, res) => {
    res.send("Backend is running successfully! 🚀");
});

const PORT = process.env.PORT || 5000;
// ONLY run app.listen if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app; // Essential for Vercel