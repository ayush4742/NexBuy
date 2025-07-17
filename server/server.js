import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://nex-buy-ayushs-projects-d19c3e9f.vercel.app', // optional if used before
  'https://nex-buy-rosy.vercel.app' // ✅ Your current deployed frontend
];

// ✅ Apply CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request from origin:', origin); // for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware for parsing
app.use(express.json());
app.use(cookieParser());

// ✅ Test route
app.get('/', (req, res) => {
  res.send("API is working");
});

// ✅ API routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// ✅ Start server inside async function
(async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
})();
