import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  connected: false,
  userStatus: "idle",
  gameId: null,
  plotData: {
    Plot1Data: [],
    Plot2Data: [],
    Plot3Data: [],
    Plot4Data: [],
    SafeSpots: [],
    StarSpots: [],
    ArrowSpot: [],
    turningPoints: [],
    victoryStart: [],
    startingPoints: [],
    colorPlayer: [],
  },
  colors: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
    },
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.connected = false;
      state.users = [];
      state.plotData = {
        Plot1Data: [],
        Plot2Data: [],
        Plot3Data: [],
        Plot4Data: [],
        SafeSpots: [],
        StarSpots: [],
        ArrowSpot: [],
        turningPoints: [],
        victoryStart: [],
        startingPoints: [],
        colorPlayer: [],
      };
      state.userStatus = false;
      state.colors = {};
      state.gameId = null;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setPlotData: (state, action) => {
      state.plotData = action.payload;
    },
    updateUserStateOnRejoin: (state, action) => {
      state.user = action.payload.user;
      state.users = action.payload.users;
      state.connected = action.payload.connectionStatus;
      state.userStatus = action.payload.userStatus;
      state.gameId = action.payload.gameId;
      state.plotData = action.payload.plotData;
      state.colors = action.payload.colors;
    },

    updateUserConnectionStatus: (state, action) => {
      const { playerNo, connectionStatus } = action.payload;
      const user = state.users.find((u) => u.playerNo === playerNo);
      if (user) {
        user.connectionStatus = connectionStatus;
      }
    },
  },
});

export const {
  setUser,
  setConnected,
  setUsers,
  clearUser,
  setColors,
  setPlotData,
  setGameId,
  setUserStatus,
  updateUserStateOnRejoin,
  updateUserConnectionStatus,
} = userSlice.actions;

export default userSlice.reducer;
