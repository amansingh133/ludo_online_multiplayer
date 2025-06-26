import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import reduxStorage from "./storage";
import socketMiddleware from "./socketMiddleware";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { api } from "../api/apiSlice";

const saveSubsetFilterUser = createFilter("user", [
  "user",
  "connected",
  "userStatus",
  "gameId",
]);

const saveSubsetFilterGame = createFilter("game", ["gameStatus"]);

const persistConfig = {
  key: "state",
  storage: reduxStorage,
  whitelist: [],
  blacklist: [api.reducerPath],
  // whitelist: ["game", "user"],
  stateReconciler: autoMergeLevel2,
  // transforms: [saveSubsetFilterUser, saveSubsetFilterGame],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST],
      },
    }).concat(api.middleware, socketMiddleware),
});

export const persistor = persistStore(store);
