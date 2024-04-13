import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Group', groupSchema);