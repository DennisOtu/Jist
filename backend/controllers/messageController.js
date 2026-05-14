import Message from '../models/message.js'

export const createMessage = async (req, res) => {
    const { text, sender, recipient } = req.body;
    try {
        const message = await Message.create({ text, sender, recipient });
        res.status(201).json({ message });
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}