import User from "../models/UserModel.js";
import AllGames from "../models/AllGamesModel.js";
import { emitUserList } from "./usersController.js";
import { getOppositeSlot } from "../utils/Utilities.js";

let botId = 1000;

export const addBotToGame = (game, io, botJoinDelay, botTimer) => {
  if (!game) {
    console.log("No available game for bot to join. Bot creation aborted");
    return;
  }

  const colorKeys = Object.keys(game.colorIndexMap);

  let availableColors = [];

  if (game.playerCount === 2) {
    const userIndex = game.users.findIndex(
      (user) => user && !user.userDetails.name.startsWith("Bot")
    );

    if (userIndex !== -1) {
      const oppositeIndex = getOppositeSlot(userIndex);
      const oppositeColor = colorKeys[oppositeIndex];

      if (!game.users[oppositeIndex]) {
        availableColors = [oppositeColor];
      }
    }
  } else {
    availableColors = colorKeys.filter((color) => {
      const index = game.colorIndexMap[color];
      return !game.users[index];
    });
  }

  if (
    availableColors.length === 0 ||
    game.users.filter(Boolean).length >= game.playerCount
  ) {
    clearTimeout(botTimer);
    botTimer = null;
    return null;
  }

  const selectedColor = availableColors[0];
  const botUser = new User(botId++, `Bot${botId}`, null, false);
  botUser.connectionStatus = true;

  try {
    game.addUser(botUser, selectedColor);
  } catch (error) {
    console.error("Failed to add bot:", error.message);
    return botTimer;
  }

  // const usersInGame = game.users.map((user) =>
  //   user
  //     ? {
  //         name: user.userDetails.name,
  //         playerNo: user.userDetails.playerNo,
  //         connectionStatus: user.connectionStatus,
  //       }
  //     : null
  // );

  // io.to(`game-${game.id}`).emit("userList", {
  //   usersInGame: usersInGame,
  //   gameStatus: game.gameStatus,
  // });

  emitUserList(game, io);

  if (game.users.filter(Boolean).length >= game.playerCount) {
    clearTimeout(botTimer);
    botTimer = null;
    setTimeout(() => {
      game.startGame(null, io);
    }, 500);
  } else {
    botTimer = setTimeout(() => {
      addBotToGame(game, io, botJoinDelay, botTimer);
    }, botJoinDelay);
  }

  return botTimer;
};
