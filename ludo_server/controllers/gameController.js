import AllGames from "../models/AllGamesModel.js";
import { isUserApproved } from "../validators/validators.js";

const findGame = (socket) => {
  const game = AllGames.getGameBySocketId(socket.id);
  if (!game) {
    console.log("Game not found");
    socket.emit("error", { message: "Game not found for this user" });
    return;
  }

  return game;
};

const findUser = (game, socket) => {
  const user = game.users.find((u) => u && u.socketId === socket.id);

  if (!user) {
    console.log("User not found");

    socket.emit("error", { message: "User not part of the game" });
    return;
  }

  return user;
};

export const handleDicePress = (socket, io) => {
  const game = findGame(socket);
  if (!game) return;

  const user = findUser(game, socket);
  if (!user) return;

  const player = user.userBasicInfo.playerNo;
  const playerNo = parseInt(player.match(/\d+/)?.[0], 10);

  if (isNaN(playerNo)) {
    console.error("Invalid player number format");
    socket.emit("error", { message: "Invalid player number format" });
    return;
  }

  if (game.chancePlayer !== Number(playerNo)) {
    console.log(game.chancePlayer);
    console.log(playerNo);

    console.log("Not a valid turn");

    socket.emit("error", { message: "Not your turn to roll the dice" });
    return;
  }

  const isApproved = isUserApproved(game, user);

  if (isApproved) {
    io.to(`game-${game.id}`).emit("diceRolling", { diceRolling: true });

    setTimeout(() => {
      io.to(`game-${game.id}`).emit("diceRolling", { diceRolling: false });
    }, 800);

    game.emitPlaySound("dice_roll", socket, io);

    game.handleDiceRoll(playerNo, socket, io);
  }
};

export const handlePocketPress = (data, socket, io) => {
  const game = findGame(socket);
  if (!game) return;

  const user = findUser(game, socket);
  if (!user) return;

  const isApproved = isUserApproved(game, user);

  if (isApproved) {
    game.updatePlayerPieceValue(data, socket, io);
    game.unfreezeDice(game.chancePlayer, socket, io);
  }
};

export const handleCellPress = (data, socket, io) => {
  const game = findGame(socket);
  if (!game) return;

  const user = findUser(game, socket);
  if (!user) return;

  const isApproved = isUserApproved(game, user);

  if (isApproved) {
    game.handleCellSelection(data, socket, io);
  }
};
