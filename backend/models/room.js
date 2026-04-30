import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }],
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    createdAt: { type: Date, default: Date.now }
})
const Room = mongoose.model('room', roomSchema);
module.exports = Room;