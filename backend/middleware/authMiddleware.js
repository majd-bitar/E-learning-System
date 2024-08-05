import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.user = decoded;

            // Check user role if a role is required
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        });
    };
};

// Middleware for student routes
const studentMiddleware = (req, res, next) => {
    authMiddleware('student')(req, res, next);
};

// Middleware for admin routes
const adminMiddleware = (req, res, next) => {
    authMiddleware('admin')(req, res, next);
};

export default { adminMiddleware, studentMiddleware, authenticate };
