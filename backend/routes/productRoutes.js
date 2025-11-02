// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  likeProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes
router.delete('/:id', protect, admin, deleteProduct);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.put('/:id/like', protect, likeProduct);

// Review route
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
