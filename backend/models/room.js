import mongoose from "mongoose";
import User from './user.js';
import Message from './message.js';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }],
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }],
    admins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: User
    }]},
    { timestamps: true }
)

const Room = mongoose.model('room', roomSchema);

export default Room