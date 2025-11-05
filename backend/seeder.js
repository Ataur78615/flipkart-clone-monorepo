const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/product');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Sabhi purane data ko delete karo
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create a dummy admin user for products
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      isAdmin: true,
    });

    // Add user to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    // Naya data insert karo
    await Product.insertMany(sampleProducts);

    console.log('Data Imported! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
