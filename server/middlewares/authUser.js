import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Authorization token required' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Attach user to request object
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Session expired, please login again' 
            });
        }
        
        return res.status(401).json({ 
            success: false,
            message: 'Invalid authorization token' 
        });
    }
};

export default authUser;