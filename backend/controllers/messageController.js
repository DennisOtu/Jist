import Message from '../models/message.js'

export const createMessage = async (req, res) => {
    const { text, sender, receiver } = req.body;
    try {
        const message = await Message.create({ text, sender, receiver });
        res.status(201).json(message);
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}