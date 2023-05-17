import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const socketModule = {
  on: (eventName, callback) => {
    socket.on(eventName, callback);
  },
  off: (eventName, callback) => {
    socket.off(eventName, callback);
  },
  emit: (eventName, data) => {
    socket.emit(eventName, data);
  },
  disconnect: () => {
    socket.disconnect();
  },
};

export default socketModule;
