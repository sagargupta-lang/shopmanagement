const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    itemName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    category: { type: String, default: 'General' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
    lastUpdatedBy: { type: String } // Stores the name of the person who updated it
}, { timestamps: true });

// Ensure item names are unique per shop owner
stockSchema.index({ itemName: 1, ownerId: 1 }, { unique: true });

module.exports = mongoose.model('Stock', stockSchema);