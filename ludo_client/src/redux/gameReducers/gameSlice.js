import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./gameInitialState";

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    updateCurrentPositions: (state, action) => {
      state.currentPositions = action.payload;
    },

    resetGame: () => initialState,
    updateDiceNo: (state, action) => {
      state.diceNo = action.payload.diceNo;
      state.isDiceRolled = action.payload.isDiceRolled;
    },
    enableTokenSelection: (state, action) => {
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.tokenSelectionPlayer = action.payload.playerNo;
    },
    enableCellSelection: (state, action) => {
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.cellSelectionPlayer = action.payload.playerNo;
    },
    disableTouch: (state, action) => {
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.cellSelectionPlayer = action.payload.cellSelectionPlayer;
      state.tokenSelectionPlayer = action.payload.tokenSelectionPlayer;
    },
    unfreezeDice: (state, action) => {
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.isDiceRolled = action.payload.isDiceRolled;
    },
    updateFireworks: (state, action) => {
      state.fireworks = action.payload.fireworks;
    },
    announceWinner: (state, action) => {
      state.winner = action.payload;
    },
    updatePlayerChance: (state, action) => {
      state.chancePlayer = action.payload.chancePlayer;
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.isDiceRolled = action.payload.isDiceRolled;
    },

    updatePlayerPieceValue: (state, action) => {
      const { playerNo, pieceId, pos, travelCount, tokenSelectionPlayer } =
        action.payload;
      const playerPieces = state[playerNo];
      const piece = playerPieces.find((p) => p.id === pieceId);

      state.tokenSelectionPlayer = tokenSelectionPlayer;

      if (piece) {
        piece.pos = pos;
        piece.travelCount = travelCount;
        const currentPositionIndex = state.currentPositions.findIndex(
          (p) => p.id === pieceId
        );

        if (pos == 0) {
          if (currentPositionIndex !== -1) {
            state.currentPositions.splice(currentPositionIndex, 1);
          }
        } else {
          if (currentPositionIndex !== -1) {
            state.currentPositions[currentPositionIndex] = {
              id: pieceId,
              pos,
            };
          } else {
            state.currentPositions.push({
              id: pieceId,
              pos,
            });
          }
        }
      }
    },
    updatePlayers: (state, action) => {
      const { playerData } = action.payload;

      state.currentPositions = [];
      Object.values(playerData).forEach((tokens) => {
        tokens.forEach((token) => {
          if (token.pos !== 0) {
            state.currentPositions.push({ id: token.id, pos: token.pos });
          }
        });
      });

      Object.keys(playerData).forEach((playerNo) => {
        if (playerData[playerNo]) {
          state[playerNo] = playerData[playerNo];
        }
      });
    },

    setDiceRolling: (state, action) => {
      state.diceRolling = action.payload;
    },

    setShowWinners: (state, action) => {
      state.showWinners = action.payload;
    },
    updateGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },

    updateGameStateOnRejoin: (state, action) => {
      state.player1 = action.payload.player1;
      state.player2 = action.payload.player2;
      state.player3 = action.payload.player3;
      state.player4 = action.payload.player4;
      state.chancePlayer = action.payload.chancePlayer;
      state.diceNo = action.payload.diceNo;
      state.isDiceRolled = action.payload.isDiceRolled;
      state.tokenSelectionPlayer = action.payload.tokenSelectionPlayer;
      state.cellSelectionPlayer = action.payload.cellSelectionPlayer;
      state.touchDiceBlock = action.payload.touchDiceBlock;
      state.currentPositions = action.payload.currentPositions;
      state.fireworks = action.payload.fireworks;
      state.gameStatus = action.payload.gameStatus;
    },
  },
});

export const {
  resetGame,
  updateDiceNo,
  enableTokenSelection,
  enableCellSelection,
  disableTouch,
  unfreezeDice,
  updateFireworks,
  announceWinner,
  updatePlayerChance,
  updatePlayerPieceValue,
  updatePlayers,
  setDiceRolling,
  setShowWinners,
  updateGameStatus,
  updateGameStateOnRejoin,
  updateCurrentPositions,
} = gameSlice.actions;

export default gameSlice.reducer;
