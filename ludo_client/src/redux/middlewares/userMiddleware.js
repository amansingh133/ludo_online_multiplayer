import {
  setUsers,
  setUser,
  setUserStatus,
  setGameId,
  setColors,
  setPlotData,
  setConnected,
  updateSkipCount,
} from "../userReducers/userSlice";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtils";
import { updateGameStatus } from "../gameReducers/gameSlice";

export const userMiddleware = (store, socket) => {
  socket.on("initData", (data) => {
    store.dispatch(setGameId(data.gameId));
    store.dispatch(updateGameStatus(data.gameStatus));
    store.dispatch(setUserStatus(data.userStatus));
    store.dispatch(setConnected(data.connectionStatus));
    store.dispatch(setColors(data.colors));
    store.dispatch(setPlotData(data.plotData));
    store.dispatch(setUser(data.user));
  });

  socket.on("userList", (data) => {
    store.dispatch(updateGameStatus(data.gameStatus));
    store.dispatch(setUsers(data.usersInGame));
    resetAndNavigate("WaitingScreen");
  });
};
