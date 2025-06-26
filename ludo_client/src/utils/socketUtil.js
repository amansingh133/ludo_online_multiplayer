import { io } from "socket.io-client";
import { determineUrl } from "../helpers/GetDeviceInfo";

let socket = null;

export const initializeSocket = (options = {}) => {
  const serverUrl = determineUrl();

  if (!socket) {
    socket = io(serverUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      timeout: 5000,
      autoConnect: true,
      ...options,
    });
  }
};

export const getSocket = () => socket;

export const clearSocket = () => {
  socket = null;
};
