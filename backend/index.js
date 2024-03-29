require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const crypto = require('crypto');
const saltRounds = 10;

const app = express();
const PORT = process.env.PORT || 3000;


// Generate a random secret key for JWT
const generateRandomSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};
const jwtSecret = generateRandomSecret();

// Connect to MongoDB Atlas
const dbUrl = process.env.DB_CONNSTRING;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas:', err);
        process.exit(1);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Location Schema
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    createdAt: { type: Date, default: Date.now }
});

// Group Schema
const groupSchema = new mongoose.Schema({
    name: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    locations: [locationSchema],
    createdAt: { type: Date, default: Date.now }
});
const Group = mongoose.model('Group', groupSchema);

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        // If the token includes the Bearer prefix, strip it
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } else {
        return res.status(401).json({ success: false, message: 'Authorization token is required' });
    }
}

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
});

// Signin Endpoint
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ success: false, message: 'Error authenticating user' });
    }
});

// Create Group Endpoint (Protected)
app.post('/createGroup', authenticateToken, async (req, res) => {
    try {
        //console.log("Received data:", req.body); 
        //const { name } = req.body;
        const userId = req.user.id; // Extract user ID from the authenticated user
        const { name, guests, locations } = req.body;

        //console.log("Processed data:", { name, creator, guests, locations });
        // Create a new group with the provided name and the creator's user ID
        const newGroup = new Group({
            name,
            creator : userId,
            guests, // Initially, no guests
            locations // Initially, no locations
        });

        // Save the new group to the database
        await newGroup.save();

        res.json({ success: true, message: 'Group created successfully', group: newGroup });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ success: false, message: 'Error creating group' });
    }
});

// Add Group Location Endpoint (Protected)
app.post('/addGroupLocation', authenticateToken, async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body; // Destructure the required fields from the request body

        // Checking for all required fields
        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        // Find the group by name
        const group = await Group.findOne({ name }).exec();
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found' });
        }

        // Verify if the authenticated user is the creator or part of the guests
        // This assumes the user id is stored in req.user.id from the authenticateToken middleware
        if (!group.creator.equals(req.user.id) && !group.guests.some(guest => guest.equals(req.user.id))) {
            return res.status(403).json({ success: false, message: 'User not authorized to add locations to this group' });
        }

        // Add the new location to the group's locations array
        group.locations.push({ latitude, longitude });

        // Save the updated group
        await group.save();

        res.json({ success: true, message: 'Location added successfully', group });
    } catch (error) {
        console.error('Error adding group location:', error);
        res.status(500).json({ success: false, message: 'Error adding group location' });
    }
});

// View Group Locations Endpoint (Protected)
app.get('/viewGroupLocations', authenticateToken, async (req, res) => {
    try {
        const { name } = req.query; // Assuming the group name is passed as a query parameter

        // Check if the group name is provided
        if (!name) {
            return res.status(400).json({ success: false, message: 'Group name is required' });
        }

        // Find the group by name
        const group = await Group.findOne({ name }).populate('locations').exec();
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found' });
        }

        // Verify if the authenticated user is the creator or part of the guests
        // This assumes the user id is stored in req.user.id from the authenticateToken middleware
        if (!group.creator.equals(req.user.id) && !group.guests.some(guest => guest.equals(req.user.id))) {
            return res.status(403).json({ success: false, message: 'User not authorized to view locations of this group' });
        }

        // Send the locations associated with the group as the response
        res.json({ success: true, locations: group.locations });
    } catch (error) {
        console.error('Error viewing group locations:', error);
        res.status(500).json({ success: false, message: 'Error viewing group locations' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
