import { getOppositeSlot } from "../utils/Utilities.js";

const AllGames = new Map();
const twoPlayerGameQueue = new Set();
const fourPlayerGameQueue = new Set();
const UserGameMap = new Map();
const UserIdGameMap = new Map();
const activeGames = new Set();

const addGame = (game) => {
  AllGames.set(game.id, game);

  const queue =
    game.playerCount === 2 ? twoPlayerGameQueue : fourPlayerGameQueue;

  if (game.users.filter(Boolean).length < game.playerCount) {
    queue.add(game);
  }
};

const removeGame = (game) => {
  AllGames.delete(game.id);
  game.playerCount === 2
    ? twoPlayerGameQueue.delete(game)
    : fourPlayerGameQueue.delete(game);

  // activeGames.delete(game);
};

const updateGameQueue = (game) => {
  const queue =
    game.playerCount === 2 ? twoPlayerGameQueue : fourPlayerGameQueue;

  if (game.users.filter(Boolean).length < game.playerCount) {
    queue.add(game);
  } else {
    queue.delete(game);
  }
};

const availableGame = (playerCount, gameType, selectedColor) => {
  if (!selectedColor || typeof selectedColor !== "string") {
    console.error("Invalid or missing selectedColor:", selectedColor);
    return null;
  }

  const queue = playerCount === 2 ? twoPlayerGameQueue : fourPlayerGameQueue;

  for (const game of queue) {
    const position = game.colorIndexMap[selectedColor.toLowerCase()];

    if (
      game.gameStatus !== "waiting for players" ||
      game.gameStatus === "running" ||
      game.gameStatus === "ready to start"
    ) {
      continue;
    }

    if (playerCount === 4) {
      if (
        game.gameType === gameType &&
        game.users.filter(Boolean).length < game.playerCount &&
        !game.users[position]
      ) {
        return game;
      }
    }

    if (playerCount === 2) {
      const oppositePosition = getOppositeSlot(position);

      if (
        game.gameType === gameType &&
        game.users.filter(Boolean).length < game.playerCount &&
        !game.users[position] &&
        game.users[oppositePosition]
      ) {
        return game;
      }
    }
  }
  return null;
};

const addUserToGameMap = (socketId, userId, game) => {
  try {
    UserGameMap.set(socketId, game);
    UserIdGameMap.set(userId, game);
  } catch (error) {
    console.error(`Error updating user-game map : ${error.message}`);
    throw new Error("Failed to update user-game mapping.");
  }
};

const removeUserFromGameMap = (socketId, userId) => {
  try {
    UserGameMap.delete(socketId);
    UserIdGameMap.delete(userId);
  } catch (error) {
    console.error(`Error removing user from map: ${error.message}`);
    throw new Error("Failed to remove user from game mapping.");
  }
};

const getGameBySocketId = (socketId) => {
  return UserGameMap.get(socketId);
};

const getGameByUserId = (userId) => {
  return UserIdGameMap.get(userId);
};

const cleanUpEmptyGames = () => {
  for (const [gameId, game] of AllGames) {
    if (!game.users || game.users.length === 0) {
      removeGame(game);
    }
  }
};

const getGameByGameId = (gameId) => {
  return AllGames.get(gameId) || null;
};

const getAllGames = () => {
  return AllGames;
};

export default {
  addGame,
  removeGame,
  addUserToGameMap,
  removeUserFromGameMap,
  getGameBySocketId,
  getGameByUserId,
  updateGameQueue,
  cleanUpEmptyGames,
  availableGame,
  getAllGames,
  getGameByGameId,
};
