import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


/*io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
*/

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('chat message', (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        //io.emit('chat message', `${socket.id} : ${msg}`);
        socket.broadcast.emit('chat message',  `${socket.id} : ${msg}` )
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});