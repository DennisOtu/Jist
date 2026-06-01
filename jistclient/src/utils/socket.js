import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.0.101:5000"; 

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  jsonp: false,
  forceNew: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;