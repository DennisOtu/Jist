import mongoose from "mongoose";
import User from './user.js';
import Room from './room.js';

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiver: { 
        type: String, 
        required: true,
    }},
    { timestamps: true }
)

const Message = mongoose.models.message || mongoose.model('message', messageSchema);

export default Message