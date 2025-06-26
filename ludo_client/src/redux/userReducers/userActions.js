import { PURGE } from "redux-persist";
import { initializeSocket } from "../../utils/socketUtil";
import { clearUser } from "./userSlice";
import { resetGame } from "../gameReducers/gameSlice";

export const connectSocket = (payload) => async (dispatch) => {
  initializeSocket();

  dispatch({
    type: "SOCKET_CONNECTED",
    payload,
  });
};

export const emitSocketEvent = (event, data = null) => ({
  type: "SOCKET_EMIT",
  payload: { event, data },
});

export const clearAllData = () => (dispatch) => {
  dispatch(clearUser());
  dispatch(resetGame());
  dispatch({ type: PURGE });
};
