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

    // Naya data insert karo
    await Product.insertMany(products);

    console.log('Data Imported! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();