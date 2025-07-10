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
// Initialize Express application
const app = express();

// Set the port number from environment variables or default to 4000
const port = process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

// Define allowed origins for CORS (only these domains can access your API)
const allowedOrigins = ['http://localhost:5173']; // Typically your frontend development server

// Middleware setup
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Enable cookie parsing
app.use(cors({
  origin: allowedOrigins, // Restrict access to only specified origins
  credentials: true // Allow cookies to be sent with requests
}));

// Basic route to check if API is working
app.get('/', (req, res) => {
  res.send("API is working"); // Send simple response
});

app.use('/api/user', userRouter); 
app.use('/api/seller', sellerRouter); 
app.use('/api/product', productRouter); 
app.use('/api/cart', cartRouter); 
app.use('/api/address', addressRouter); 
app.use('/api/order', orderRouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log server start
});