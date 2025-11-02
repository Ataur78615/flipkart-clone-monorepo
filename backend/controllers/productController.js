const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne(); // Mongoose v6+ mein .remove() ki jagah
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  // Hum ek sample product banayenge, admin use baad mein edit kar sakta hai
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id, // (Iske liye productModel update karna padega, par abhi ke liye ignore karein)
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};
// @desc    Like/Unlike a product
// @route   PUT /api/products/:id/like
// @access  Private
const likeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check karo ki user pehle se like kar chuka hai ya nahi
    const alreadyLiked = product.likes.find(
      (like) => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Agar pehle se liked hai, toh unlike kar do (optional, but good)
      product.likes = product.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Agar liked nahi hai, toh like kar do
      product.likes.push(req.user._id);
    }
    
    // User ke request ke mutabik: 1 like = 1 review
    // Hum total likes ko numReviews se set kar denge
    product.numReviews = product.likes.length;
    
    // Rating ko bhi manage kar sakte hain, abhi ke liye simple rakhte hain
    
    await product.save();
    res.json({ message: 'Like status updated' });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review for a product
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400).json({ message: 'Product already reviewed' });
        return;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  likeProduct,
};
