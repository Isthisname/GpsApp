
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors.js';
import dotenv from "dotenv";
dotenv.config()

// Use the JWT secret from environment variable
const jwtSecret = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header
  
  if (!token) {
    return next(new UnauthorizedError('Authentication token is missing'));
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return next(new UnauthorizedError('Invalid token'));
    }
    req.user = user; // Attach user information to the request object
    next();
  });
};
