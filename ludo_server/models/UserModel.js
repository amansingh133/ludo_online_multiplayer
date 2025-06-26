import { Colors } from "../data/Colors.js";
import {
  ArrowSpot,
  colorPlayer,
  Plot1Data,
  Plot2Data,
  Plot3Data,
  Plot4Data,
  SafeSpots,
  StarSpots,
  startingPoints,
  turningPoints,
  victoryStart,
} from "../data/PlotData.js";

class User {
  constructor(id, name, socketId, type) {
    Object.defineProperty(this, "_userData", {
      value: {
        id: id || null,
        name: name || "",
        socketId: socketId || null,
        playerNo: "",
        connectionStatus: false,
        userStatus: "idle",
        gameId: null,
        playerType: type,
        plotData: {
          Plot1Data,
          Plot2Data,
          Plot3Data,
          Plot4Data,
          SafeSpots,
          StarSpots,
          ArrowSpot,
          turningPoints,
          victoryStart,
          startingPoints,
          colorPlayer,
        },
        colors: Colors,
        disconnectTimer: null,
      },
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  startDisconnectTimer(callback, delay = 300000) {
    this.clearDisconnectTimer();
    this._userData.disconnectTimer = setTimeout(callback, delay);
  }

  clearDisconnectTimer() {
    if (this._userData.disconnectTimer) {
      clearTimeout(this._userData.disconnectTimer);
      this._userData.disconnectTimer = null;
    }
  }

  // GETTERS

  get disconnectTimer() {
    return this._userData.disconnectTimer;
  }

  get userDetails() {
    return { ...this._userData };
  }

  get userId() {
    return this._userData.id;
  }

  get socketId() {
    return this._userData.socketId;
  }

  get plotData() {
    return { ...this._userData.plotData };
  }

  get colors() {
    return { ...this._userData.colors };
  }

  get userBasicInfo() {
    return {
      userId: this._userData.id,
      name: this._userData.name,
      playerNo: this._userData.playerNo,
    };
  }

  get connectionStatus() {
    return this._userData.connectionStatus;
  }

  get userStatus() {
    return this._userData.userStatus;
  }

  get gameId() {
    return this._userData.gameId;
  }

  get playerType() {
    return this._userData.playerType;
  }

  // SETTERS

  set connectionStatus(status) {
    if (typeof status === "boolean") {
      this._userData.connectionStatus = status;
    } else {
      throw new Error("Invalid value for connection status. Must be boolean");
    }
  }

  set userStatus(status) {
    if (typeof status === "string") {
      this._userData.userStatus = status;
    } else {
      throw new Error("Invalid value for user status. Must be string");
    }
  }

  set gameId(gId) {
    this._userData.gameId = gId;
  }

  setSocketId(id) {
    this._userData.socketId = id;
  }

  //CUSTOM METHODS

  updatePlayerNo(number) {
    if (typeof number === "number" && number > 0) {
      this._userData.playerNo = `player${number}`;
    } else {
      throw new Error("Invalid Number to set the playerNo");
    }
  }
}

export default User;
