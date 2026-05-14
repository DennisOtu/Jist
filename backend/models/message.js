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
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Room,
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now}
    }},
    { timestamps: true })
const Message = mongoose.model('message', messageSchema);

export default Message