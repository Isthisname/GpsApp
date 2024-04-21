import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;


const saltRounds = 10;

export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({
                message: 'Authentication successful!',
                token,
                username: user.username // Include the username in the response
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const signup = async (req, res) =>{
    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({ username, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
};




