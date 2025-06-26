import { getSocket } from "../utils/socketUtil";
import { connectionMiddleware } from "./middlewares/connectionMiddleware";
import { userMiddleware } from "./middlewares/userMiddleware";
import { gameMiddleware } from "./middlewares/gameMiddleware";

const socketMiddleware = (store) => (next) => (action) => {
  const { type, payload } = action;

  const socket = getSocket();

  switch (type) {
    case "SOCKET_CONNECTED":
      if (!socket || !socket.connected) {
        connectionMiddleware(store, socket, payload);
        userMiddleware(store, socket);
        gameMiddleware(store, socket);
      }
      break;

    case "SOCKET_EMIT":
      if (socket?.connected) {
        const { event, data } = payload || {};
        if (event) {
          socket.emit(event, data || undefined);
        } else {
          console.warn("SOCKET_EMIT: Event name is required.");
        }
      } else {
        console.error("SOCKET_EMIT: Socket is not connected.");
      }
      break;

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
