import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: String,
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
      },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    target_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status:String,
    location: {
        latitude: Number,
        longitude: Number
    },
    createdAt: { type: Date, default: Date.now },
    notes: [String]
});

export default mongoose.model('Task', modelSchema);