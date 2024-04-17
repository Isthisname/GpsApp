import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type:String, required:true},
    type: {type:String, required:true},
    priority:Number,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: String,
        enum: ['CREATED', 'ASSIGNED', 'COMPLETED'],
        default: 'CREATED'
      },
    location: {
        latitude: Number,
        longitude: Number
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
      },
    target_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    due_date:{type: Date},
    createdAt: { type: Date, default: Date.now },
    description: String,
    notes: [String]
});

export default mongoose.model('Task', taskSchema);