import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'
import messageRoutes from './routes/messageRoutes.js';

dotenv.config()

const PORT =  5000;
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(cors());
app.use(express.static(join(__dirname, 'public')))
app.use(express.json());
app.use(cookieParser()); 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/messages', messageRoutes);
//app.use("*", (req, res) => res.status(404).json({ error: "page not found" }))

mongoose.connect(process.env.MONGODB_URI, { dbName: 'jist' })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err)
)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    socket.emit('socketID', socket.id);
    console.log(`${socket.id} Connected`);

    socket.on('chat message', (data) => {
        console.log(`Message from ${data.name}: ${data.message}`);
        //io.emit('chat message', `${socket.id} : ${data}`);
        socket.broadcast.emit('chat message', data)
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} Disconnected`);
    });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});