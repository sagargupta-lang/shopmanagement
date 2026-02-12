const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Vercel environment variables are accessed via process.env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        // In serverless, we don't want to kill the process with exit(1)
        // because it prevents Vercel from giving you a proper error log.
    }
};

module.exports = connectDB;