import Room from "../models/room.js";

export const getMsgThread = async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        const roomCheck1 = await Room.exists({name: `${sender}${receiver}`});
        const roomCheck2 = await Room.exists({name: `${receiver}${sender}`});

        if (!roomCheck1) {
            const room = await Room.find({ name: `${receiver}${sender}`}).populate({ path: 'messages', options: {sort: { createdAt: -1 }} });
            res.status(201).json(room[0].messages)
        } else {
            const room = await Room.find({ name: `${sender}${receiver}`}).populate({ path: 'messages', options: {sort: { createdAt: -1 }} });
            res.status(201).json(room[0].messages)
        }
    } catch (error) {
        console.log('Error: ' + error.message);
        res.status(400).json(error.message);
    }
}

export const addMessage = async (req, res) => {
    const { name, messages, sender, receiver } = req.body
    try {
        const roomCheck1 = await Room.exists({name: `${sender}${receiver}`});
        const roomCheck2 = await Room.exists({name: `${receiver}${sender}`});
        
        if (!roomCheck1 && !roomCheck2) {
        // Document not found
            const newRoom = await Room.create({ name: name, messages: messages, members: [ sender, receiver ] });
            res.status(201).json(newRoom);            
        } else {
        // Document found
            if (!roomCheck1) {
                 const updatedRoom = await Room.findOneAndUpdate(
                    { name: `${receiver}${sender}` },
                    { $push: { messages: messages } },
                    { returnDocument: 'after' } // Returns the updated document
                );
                res.status(201).json(updatedRoom);
            } else {
                const updatedRoom = await Room.findOneAndUpdate(
                    { name: `${sender}${receiver}` },
                    { $push: { messages: messages } },
                    { returnDocument: 'after' } // Returns the updated document
                );
                res.status(201).json(updatedRoom);
            } 
        }        
    } catch (error) {
        console.log('Error: ' + error.message);
        res.status(400).json(error.message);
    }
}