import { clearSocket } from "../../utils/socketUtil";
import { resetGame, updateGameStateOnRejoin } from "../gameReducers/gameSlice";
import {
  clearUser,
  setConnected,
  updateUserConnectionStatus,
  updateUserStateOnRejoin,
} from "../userReducers/userSlice";

export const connectionMiddleware = (store, socket, payload) => {
  socket?.on("connect", () => {
    console.log("Socket connected");
    store.dispatch(setConnected(true));

    if (payload?.type === "addUser" && payload.name) {
      socket.emit("addUser", {
        name: payload.name,
        selectedColor: payload.selectedColor,
        gameType: payload.gameType,
        playerCount: payload.playerCount,
      });
      console.log("Emitted addUser event");
    } else if (payload?.type === "rejoinUser" && payload.userId) {
      socket.emit("rejoinUser", { userId: payload.userId });
      console.log("Emitted rejoinUser event");
    }
  });

  socket?.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    store.dispatch(setConnected(false));
  });

  socket?.on("disconnect", () => {
    console.log("Socket disconnected");
    store.dispatch(setConnected(false));
    clearSocket();
  });

  socket.on("rejoinData", (data) => {
    store.dispatch(updateGameStateOnRejoin(data));
    store.dispatch(updateUserStateOnRejoin(data));
  });

  socket.on("userRejoined", (data) => {
    store.dispatch(updateUserConnectionStatus(data));
  });

  socket.on("userDisconnected", (data) => {
    store.dispatch(updateUserConnectionStatus(data));
  });
};
