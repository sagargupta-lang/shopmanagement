const Stock = require('../models/Stock.model');

exports.addOrUpdateStock = async (req, res) => {
    try {
        const { itemName, price, quantity } = req.body;
        const ownerId = req.user.ownerId || req.user.id; // Works for both Owner and Employee

        // Find existing item by name for this specific shop
        let item = await Stock.findOne({ 
            itemName: { $regex: new RegExp(`^${itemName}$`, 'i') }, 
            ownerId 
        });

        if (item) {
            // ✅ ITEM EXISTS: Update quantity and price
            item.quantity += Number(quantity);
            item.price = price; // Update to latest price
            item.lastUpdatedBy = req.user.name || 'Owner';
            await item.save();
            return res.status(200).json({ message: "Quantity updated successfully", item });
        } else {
            // ✅ NEW ITEM: Create entry
            const newItem = new Stock({
                itemName,
                price,
                quantity,
                ownerId,
                lastUpdatedBy: req.user.name || 'Owner'
            });
            await newItem.save();
            return res.status(201).json({ message: "New item added to inventory", item: newItem });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};