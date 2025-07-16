import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        if (password !== process.env.SELLER_PASSWORD || email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Fetch seller's ObjectId from User collection
        const seller = await User.findOne({ email });
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found in users collection'
            });
        }
        const sellerId = seller._id;
        const token = jwt.sign({ id: sellerId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Seller login error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// Seller isAuth : /api/seller/is-auth
export const issellerAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        console.error('Seller auth check error:', error.message);
        return res.json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

// Logout Seller : /api/seller/logout
export const sellerLogout = async (req, res) => {  
    try {  
        res.clearCookie('sellerToken', {  
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production',  
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',  
        });
        return res.json({ success: true, message: "Logged Out" });  
    } catch (error) {  
        console.log(error.message);  
        return res.json({ success: false, message: error.message });
    }
};