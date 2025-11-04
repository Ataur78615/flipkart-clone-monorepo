const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');



const app = express();
// Humne backend ko bataya ki sirf aapke frontend URL se hi request accept karni hai
const frontendURL = 'https://flipkart-clone-monorepo-1.onrender.com';
app.use(cors({
  origin: frontendURL
}));
app.use(express.json()); // JSON body parser middleware

// Serve static files from public directory
app.use('/images', express.static('public/images'));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sellers', sellerRoutes);

// PayPal Client ID route
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const port = process.env.PORT || 8000;

// Server start karne ka sahi tarika (Pehle DB connect, fir server listen)
const startServer = async () => {
  try {
    await connectDB(); // 1. Pehle database connection ka intezar karo
    
    // 2. Jab connection successful ho jaye, tab server ko listen karao
    app.listen(port, () => {
      console.log(`Server http://localhost:${port} par successfully start ho gaya hai.`);
    });
  } catch (error) {
    console.error("Database connection failed, server did not start.", error);
    process.exit(1);
  }
};

startServer();