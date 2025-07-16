import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    console.log('authSeller req.cookies:', req.cookies); // Debug log
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not Authorized' 
        });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            req.seller = tokenDecode; // Attach seller info to request
            req.user = tokenDecode;   // Also set req.user for compatibility
            return next();
        }
        return res.status(403).json({ 
            success: false, 
            message: 'Not Authorized' 
        });
    } catch (error) {
        console.error('Seller auth error:', error.message);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

export default authSeller;