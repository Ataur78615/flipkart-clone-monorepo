// backend/routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const { becomeSeller } = require('../controllers/sellerController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /api/sellers/become
// 'protect' middleware user ko req.user mein daal dega
// 'upload.single('image')' middleware image ko req.file mein daal dega
router.post('/become', protect, upload.single('image'), becomeSeller);

module.exports = router;