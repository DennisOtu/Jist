import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.0.141:5000"; 

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  jsonp: false,
  forceNew: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

/*
socket.on("connect", () => {
  console.log("Connected to Socket.IO Server!");
});
*/
export default socket;