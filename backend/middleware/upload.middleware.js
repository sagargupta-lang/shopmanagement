const multer = require('multer');
const storage = multer.memoryStorage(); // Store in memory for quick upload to Cloudinary

const upload = multer({ 
    storage,
    limits: { fileSize: 250 * 1024 } // 250kb limit as per your rules
});

module.exports = upload;