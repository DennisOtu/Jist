import Room from "../models/room.js";

export const getMsgThread = async (req, res) => {
    const name = req.body;
    try {
        const room = await Room.findOne({name:name.name}).populate({ path: 'messages', options: {sort: { createdAt: -1 }} });
        const msgThread = room.messages;
        res.status(201).json(msgThread);
    } catch (error) {
        console.log('Error: ' + error.message);
        res.status(400).json(error.message);
    }
}

export const addMessage = async (req, res) => {
    const { name, messages, sender } = req.body
    try {
        const roomExists = await Room.exists({name});
        if (!roomExists) {
        // Document not found
            const newRoom = await Room.create({ name: name, messages: messages, members: [ name, sender ] });
            res.status(201).json(newRoom);            
        } else {
        // Document found
            const updatedRoom = await Room.findOneAndUpdate(
                { name: name },
                { $push: { messages: messages } },
                { returnDocument: 'after' } // Returns the updated document
            );
            res.status(201).json(updatedRoom);
        }        
    } catch (error) {
        console.log('Error: ' + error.message);
        res.status(400).json(error.message);
    }
}