// models/user.model.js

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    position: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null }
    },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' }
});

const User = mongoose.model('User', userSchema);

export default User; // Change this line for ES Module export
