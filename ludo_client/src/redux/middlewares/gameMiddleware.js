import { navigate, resetAndNavigate } from "../../utils/NavigationUtils";
import { playSound } from "../../utils/SoundUtilityExpo";
import {
  announceWinner,
  disableTouch,
  enableCellSelection,
  enableTokenSelection,
  setDiceRolling,
  setShowWinners,
  unfreezeDice,
  updateCurrentPositions,
  updateDiceNo,
  updateFireworks,
  updateGameStatus,
  updatePlayerChance,
  updatePlayerPieceValue,
  updatePlayers,
} from "../gameReducers/gameSlice";
import {
  setGameId,
  setUserStatus,
  updateSkipCount,
} from "../userReducers/userSlice";

export const gameMiddleware = (store, socket) => {
  socket.on("startGame", (data) => {
    console.log(data);

    store.dispatch(setGameId(data.gameId));
    store.dispatch(setUserStatus(data.userStatus));
    store.dispatch(updateGameStatus(data.gameStatus));

    store.dispatch(
      updatePlayerChance({
        chancePlayer: data.chancePlayer,
        touchDiceBlock: false,
        isDiceRolled: false,
      })
    );

    store.dispatch(updateCurrentPositions(data.currentPositions));

    const filteredPlayerData = Object.keys(data)
      .filter((key) => key.startsWith("player") && data[key])
      .reduce((result, key) => {
        result[key] = data[key];
        return result;
      }, {});

    store.dispatch(
      updatePlayers({
        playerData: filteredPlayerData,
      })
    );

    resetAndNavigate("LudoBoard");
  });

  socket.on("updateDiceNo", async (data) => {
    store.dispatch(
      updateDiceNo({
        isDiceRolled: data.isDiceRolled,
        diceNo: data.diceNo,
      })
    );
  });

  socket.on("enableTokenSelection", async (data) => {
    store.dispatch(
      enableTokenSelection({
        touchDiceBlock: data.touchDiceBlock,
        playerNo: data.tokenSelectionPlayer,
      })
    );
  });

  socket.on("enableCellSelection", async (data) => {
    store.dispatch(
      enableCellSelection({
        touchDiceBlock: data.touchDiceBlock,
        playerNo: data.cellSelectionPlayer,
      })
    );
  });

  socket.on("disableTouch", async (data) => {
    store.dispatch(
      disableTouch({
        touchDiceBlock: data.touchDiceBlock,
        cellSelectionPlayer: data.cellSelectionPlayer,
        tokenSelectionPlayer: data.tokenSelectionPlayer,
      })
    );
  });

  socket.on("unfreezeDice", async (data) => {
    store.dispatch(
      unfreezeDice({
        touchDiceBlock: data.touchDiceBlock,
        cellSelectionPlayer: data.cellSelectionPlayer,
        tokenSelectionPlayer: data.tokenSelectionPlayer,
      })
    );
  });

  socket.on("updateFireWorks", async (data) => {
    store.dispatch(
      updateFireworks({
        fireworks: data.fireworks,
      })
    );
  });

  socket.on("updatePlayerChance", async (data) => {
    store.dispatch(
      updatePlayerChance({
        chancePlayer: data.chancePlayer,
        touchDiceBlock: data.touchDiceBlock,
        isDiceRolled: data.isDiceRolled,
      })
    );
  });

  socket.on("updatePlayerPieceValue", async (data) => {
    store.dispatch(
      updatePlayerPieceValue({
        playerNo: data.playerNo,
        pieceId: data.pieceId,
        pos: data.pos,
        travelCount: data.travelCount,
        tokenSelectionPlayer: data.tokenSelectionPlayer,
      })
    );
  });

  socket.on("playSound", async (data) => {
    try {
      await playSound(data.name);
    } catch (error) {
      console.error(`Error playing sound '${data.name}':`, error);
    }
  });

  socket.on("diceRolling", (data) => {
    store.dispatch(setDiceRolling(data.diceRolling));
  });

  // socket.on("showWinners", (data) => {
  //   store.dispatch(setShowWinners(data.showWinner));
  //   store.dispatch(announceWinner(data.winners));
  // });

  socket.on("winners", (data) => {
    store.dispatch(announceWinner(data.winners));
  });

  socket.on("emitWinner", (data) => {
    store.dispatch(announceWinner(data.winners));
    resetAndNavigate("ResultsScreen");
  });
};
