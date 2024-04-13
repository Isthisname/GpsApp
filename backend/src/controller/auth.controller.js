import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const generateRandomSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

const saltRounds = 10;

export const signin = async (req, res) =>{
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Incorrect password' });
            }
            const token = jwt.sign({ id: user._id, username: user.username }, generateRandomSecret(), { expiresIn: '1h' });
            res.json({ success: true, token });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ success: false, message: 'Error authenticating user' });
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




