const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'businessName', maxCount: 1 },
  { name: 'productCategory', maxCount: 1 },
  { name: 'productName', maxCount: 1 },
  { name: 'price', maxCount: 1 },
  { name: 'title', maxCount: 1 },
  { name: 'description', maxCount: 1 },
]);

// @desc    Become a seller
// @route   POST /api/sellers/become
// @access  Private
const becomeSeller = async (req, res) => {
  const { businessName, productCategory, productName, price, title, description } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : '';

  try {
    const seller = await Seller.create({
      user: req.user._id,
      businessName,
      productCategory,
      productName,
      price: Number(price),
      image,
      title,
      description,
    });

    if (seller) {
      // Create a product from seller data
      const product = await Product.create({
        user: req.user._id, // user field add karo
        name: productName,
        image,
        description,
        brand: businessName,
        category: productCategory,
        price: Number(price),
        countInStock: 10, // Default stock
        rating: 0,
        numReviews: 0,
      });

      res.status(201).json({
        _id: seller._id,
        businessName: seller.businessName,
        productCategory: seller.productCategory,
        productName: seller.productName,
        price: seller.price,
        image: seller.image,
        title: seller.title,
        description: seller.description,
        productId: product._id,
      });
    } else {
      res.status(400).json({ message: 'Invalid seller data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { becomeSeller, upload };
