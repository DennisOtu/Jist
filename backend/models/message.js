import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recvrId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now}
    }},
    { timestamps: true })
const Message = mongoose.model('message', messageSchema);

export default Message