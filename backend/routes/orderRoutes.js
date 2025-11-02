const express = require('express');
const router = express.Router();
const {
     addOrderItems, 
     getOrderById, 
     updateOrderToPaid 
    } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); // Protect middleware

// POST /api/orders par jab request aayegi:
// 1.pehle 'protect' middleware chalega (token check karega)
router.post('/', protect, addOrderItems);

// Order details fetch karna (yeh naya route hai)
router.get('/:id', protect, getOrderById);

// Order ko paid mark karne ka route
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;