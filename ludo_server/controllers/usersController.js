import User from "../models/UserModel.js";
import Game from "../models/GameModel.js";
import AllGames from "../models/AllGamesModel.js";
import { addBotToGame } from "./botController.js";

let userId = 1;
const BOT_JOIN_DELAY = 2000;
let botTimer = null;

export const addUserInGame = (data, socket, io) => {
  console.log(data);

  const newUser = new User(userId++, data.name, socket.id, true);
  const { selectedColor, gameType, playerCount } = data;

  let game = AllGames.availableGame(playerCount, gameType, selectedColor);

  if (!game) {
    game = new Game(playerCount, gameType);
  }

  try {
    game.addUser(newUser, selectedColor);
  } catch (err) {
    socket.emit("error", { message: err.message });
    return;
  }

  socket.join(`game-${game.id}`);

  socket.emit("initData", {
    colors: newUser.colors,
    plotData: newUser.plotData,
    user: newUser.userBasicInfo,
    connectionStatus: newUser.connectionStatus,
    userStatus: newUser.userStatus,
    gameId: game.id,
    gameStatus: game.gameStatus,
  });

  emitUserList(game, io);

  clearTimeout(botTimer);

  if (game.users.filter(Boolean).length >= game.playerCount) {
    setTimeout(() => {
      game.startGame(socket, io);
    }, 500);
  } else {
    botTimer = setTimeout(() => {
      botTimer = addBotToGame(game, io, BOT_JOIN_DELAY, botTimer);
    }, BOT_JOIN_DELAY);
  }
};

export const rejoinGame = (userId, socket, io) => {
  const game = AllGames.getGameByUserId(userId);

  if (!game) {
    console.log("Game not found");
    socket.emit("error", { message: "No game found for this user." });
    return;
  }

  const user = game.users.find((u) => u && u.userId === userId);

  if (!user) {
    console.log("User not found");
    socket.emit("error", { message: "User not part of this game." });
    return;
  }

  if (
    game.gameStatus !== "running" ||
    user.userStatus !== "inGame" ||
    user.gameId === null
  ) {
    socket.emit("error", {
      message: "Invalid game or user status for rejoin.",
    });
  }

  if (user.socketId && user.socketId !== socket.id) {
    const oldSocket = io.sockets.sockets.get(user.socketId);
    if (oldSocket) {
      oldSocket.leave(`game-${game.id}`);
    }
    try {
      AllGames.removeUserFromGameMap(user.socketId, user.userId);
    } catch (error) {
      console.error(`Error removing stale mapping: ${error.message}`);
    }
  }

  user.setSocketId(socket.id);
  user.connectionStatus = true;
  user.clearDisconnectTimer();

  try {
    AllGames.addUserToGameMap(socket.id, user.userId, game);
  } catch (error) {
    socket.emit("error", {
      message: "Failed to rejoin game. Please try again",
    });
    console.error(`Error adding user to game map: ${error.message}`);
    return;
  }

  socket.join(`game-${game.id}`);

  socket.emit("rejoinData", {
    gameId: game.id,
    gameStatus: game.gameStatus,
    player1: game.player1pos,
    player2: game.player2pos,
    player3: game.player3pos,
    player4: game.player4pos,
    chancePlayer: game.chancePlayer,
    diceNo: game.diceNo,
    isDiceRolled: game.isDiceRolled,
    tokenSelectionPlayer: game.tokenSelectionPlayer,
    cellSelectionPlayer: game.cellSelectionPlayer,
    touchDiceBlock: game.touchDiceBlock,
    currentPositions: game.currentPositions,
    users: game.users
      .filter((user) => user !== null)
      .map((u) => ({
        name: u.userDetails.name,
        playerNo: u.userDetails.playerNo,
        connectionStatus: u.connectionStatus,
      })),
    fireworks: game.fireworks,
    user: user.userBasicInfo,
    connectionStatus: user.connectionStatus,
    userStatus: user.userStatus,
    plotData: user.plotData,
    colors: user.colors,
  });

  io.to(`game-${game.id}`).emit("userRejoined", {
    connectionStatus: user.connectionStatus,
    name: user.userDetails.name,
    playerNo: user.userDetails.playerNo,
  });

  console.log(`User ${user.userId} rejoined game ${game.id}`);
};

export const removeUserFromGame = (userId, options = {}) => {
  const { reason = null, additionalData = {} } = options;

  const game = AllGames.getGameByUserId(userId);

  if (!game) {
    return { success: false, message: "Game not found" };
  }

  const user = game.users.find((u) => u && u.userId === userId);

  if (!user) {
    return { success: false, message: "User not part of this game" };
  }

  const removedUser = game.removeUser(user.socketId);

  if (!removedUser) {
    return { success: false, message: "Failed to remove user" };
  }

  if (game.users.filter(Boolean).length === 0) {
    AllGames.removeGame(game);
  } else {
    AllGames.updateGameQueue(game);
  }

  console.log(
    `User ${removedUser.userId} removed from game ${game.id}. Reason: ${
      reason || "unspecified"
    }`
  );

  return {
    success: true,
    removedUser,
    reason: reason || "unspecified",
    additionalData,
    gameId: game.id,
    remainingUsers: game.users,
  };
};

export const handleUserDisconnection = (socket, io) => {
  console.log("A user disconnected", socket.id);

  const game = AllGames.getGameBySocketId(socket.id);

  if (!game) {
    console.log("No game associated with this socket ID.");
    socket.emit("error", { message: "Game not found for this user" });
    return;
  }

  const user = game.users.find((u) => u && u.socketId === socket.id);

  if (!user) {
    console.log("User not found");

    socket.emit("error", { message: "User not part of the game" });
    return;
  }

  user.connectionStatus = false;

  if (
    game.gameStatus === "running" &&
    user.userStatus === "inGame" &&
    user.gameId !== null
  ) {
    let currentChance = game.chancePlayer;
    const player = user.userBasicInfo.playerNo;
    const playerNo = parseInt(player.match(/\d+/)?.[0], 10);

    const activePlayers = game.users.filter(
      (u) => u && u.connectionStatus === true && u.userStatus === "inGame"
    );

    if (currentChance === playerNo && activePlayers.length > 0) {
      let nextPlayer = game.getNextChancePlayer(currentChance);

      if (nextPlayer !== null) {
        game.updatePlayerChance(nextPlayer, null, io);
      }
    }

    io.to(`game-${game.id}`).emit("userDisconnected", {
      connectionStatus: user.connectionStatus,
      name: user.userDetails.name,
      playerNo: user.userDetails.playerNo,
    });

    user.startDisconnectTimer(() => {
      if (!user.connectionStatus) {
        const options = { reason: "timed out" };
        const removedUser = removeUserFromGame(user.userId, options);

        console.log(removedUser);

        const allUsersInvalid = removedUser.remainingUsers.every(
          (user) => user === null || user.playerType === false
        );

        if (allUsersInvalid) {
          AllGames.removeGame(game);
        }
      }
    }, 60000);
  } else if (
    game.gameStatus === "waiting for players" &&
    user.userStatus === "waiting" &&
    user.gameId !== null
  ) {
    const options = {
      reason: "disconnected",
    };

    const removedUser = removeUserFromGame(user.userId, options);

    emitUserList(game, io);
  }
};

export const emitUserList = (game, io) => {
  const usersInGame = game.users
    .filter((user) => user !== null)
    .map((user) => ({
      name: user.userDetails.name,
      playerNo: user.userDetails.playerNo,
      connectionStatus: user.connectionStatus,
    }));

  io.to(`game-${game.id}`).emit("userList", {
    usersInGame: usersInGame,
    gameStatus: game.gameStatus,
  });
};
