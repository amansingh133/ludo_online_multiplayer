import { combineReducers } from "redux";
import gameReducer from "./gameReducers/gameSlice";
import userReducer from "./userReducers/userSlice";
import { api } from "../api/apiSlice";
import userDataReducer from "./userData/userDataSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  userData: userDataReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
