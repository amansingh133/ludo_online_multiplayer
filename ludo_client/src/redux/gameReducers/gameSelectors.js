import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentPositions = (state) => state.game.currentPositions;

export const selectCurrentPlayerChance = (state) => state.game.chancePlayer;

export const selectDiceRolled = (state) => state.game.isDiceRolled;

export const selectDiceNo = (state) => state.game.diceNo;

export const selectPlayer1 = (state) => state.game.player1;
export const selectPlayer2 = (state) => state.game.player2;
export const selectPlayer3 = (state) => state.game.player3;
export const selectPlayer4 = (state) => state.game.player4;

export const selectPocketTokenSelection = (state) =>
  state.game.tokenSelectionPlayer;
export const selectCellSelection = (state) => state.game.cellSelectionPlayer;
export const selectDiceTouch = (state) => state.game.touchDiceBlock;
export const selectFireworks = (state) => state.game.fireworks;
export const selectDiceRolling = (state) => state.game.diceRolling;
export const selectGameStatus = (state) => state.game.gameStatus;
export const selectWinners = (state) => state.game.winner;

export const makeSelectPiecesAtCell = (cell) =>
  createSelector([selectCurrentPositions], (currentPositions) =>
    currentPositions.filter((piece) => piece.pos === cell)
  );
