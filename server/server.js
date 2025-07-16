import cookieParser from 'cookie-parser'; // Middleware for parsing cookies
import express from 'express'; // Express framework for building the server
import cors from 'cors'; // Middleware for enabling CORS (Cross-Origin Resource Sharing)
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

// Set the port number from environment variables or default to 4000
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Define allowed origins (both local and deployed frontend)
const allowedOrigins = [
  'http://localhost:5173', // <-- Update this if your frontend runs on a different URL
  'https://nex-buy-rosy.vercel.app'
];

// ✅ CORS middleware with dynamic origin checking
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request from origin:', origin); // Debug log
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Enable cookie parsing

// Basic test route
app.get('/', (req, res) => {
  res.send("API is working");
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
