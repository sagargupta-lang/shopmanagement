const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Links product to a specific user
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);