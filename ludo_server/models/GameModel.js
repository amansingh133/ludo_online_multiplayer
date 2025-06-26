import {
  SafeSpots,
  StarSpots,
  startingPoints,
  turningPoints,
  victoryStart,
} from "../data/PlotData.js";
import AllGames from "./AllGamesModel.js";
import { initializePlayersPos } from "../data/initialPositions.js";
import { delay } from "../utils/Utilities.js";

class Game {
  static idCounter = 0;

  constructor(playerCount, gameType) {
    if (![2, 4].includes(playerCount)) {
      throw new Error("Game must have 2 or 4 players");
    }

    if (!gameType || typeof gameType !== "string") {
      throw new Error("A valid game type must be provided");
    }

    this.id = ++Game.idCounter;
    this._playerCount = playerCount;
    this._data = {};
    this._gameStatus = "initialized";
    this._gameType = gameType;

    this._colorIndexMap = {
      red: 0,
      green: 1,
      yellow: 2,
      blue: 3,
    };

    this.initializePlayers();
    AllGames.addGame(this);
    AllGames.updateGameQueue(this);
  }

  initializePlayers() {
    const initialData = {
      player1pos: initializePlayersPos(["A1", "A2", "A3", "A4"]),
      player2pos: initializePlayersPos(["B1", "B2", "B3", "B4"]),
      player3pos: initializePlayersPos(["C1", "C2", "C3", "C4"]),
      player4pos: initializePlayersPos(["D1", "D2", "D3", "D4"]),
      chancePlayer: 1,
      diceNo: 1,
      isDiceRolled: false,
      tokenSelectionPlayer: -1,
      cellSelectionPlayer: -1,
      touchDiceBlock: false,
      currentPositions: [],
      // users: Array(this.playerCount).fill(null),
      users: Array(4).fill(null),

      ranks: [],
      fireworks: false,
    };

    const allPieces = [
      ...initialData.player1pos,
      ...initialData.player2pos,
      ...initialData.player3pos,
      ...initialData.player4pos,
    ];

    initialData.currentPositions = allPieces
      .filter((piece) => piece.pos !== 0)
      .map((piece) => ({ id: piece.id, pos: piece.pos }));

    this._data = new Proxy(initialData, {
      set: (target, property, value) => {
        target[property] = value;
        return true;
      },
    });
  }

  get colorIndexMap() {
    return this._colorIndexMap;
  }

  get playerCount() {
    return this._playerCount;
  }

  get gameType() {
    return this._gameType;
  }

  get users() {
    return this._data.users;
  }

  get ranks() {
    return this._data.ranks;
  }

  get gameStatus() {
    return this._gameStatus;
  }

  get player1pos() {
    return this._data.player1pos;
  }

  get player2pos() {
    return this._data.player2pos;
  }

  get player3pos() {
    return this._data.player3pos;
  }

  get player4pos() {
    return this._data.player4pos;
  }

  get chancePlayer() {
    return this._data.chancePlayer;
  }

  get diceNo() {
    return this._data.diceNo;
  }

  get isDiceRolled() {
    return this._data.isDiceRolled;
  }

  get tokenSelectionPlayer() {
    return this._data.tokenSelectionPlayer;
  }

  get cellSelectionPlayer() {
    return this._data.cellSelectionPlayer;
  }

  get touchDiceBlock() {
    return this._data.touchDiceBlock;
  }

  get currentPositions() {
    return this._data.currentPositions;
  }

  get fireworks() {
    return this._data.fireworks;
  }

  playerNumPos(playerNo) {
    switch (playerNo) {
      case 1:
        return this._data.player1pos;
      case 2:
        return this._data.player2pos;
      case 3:
        return this._data.player3pos;
      case 4:
        return this._data.player4pos;
      default:
        throw new Error("Invalid player number");
    }
  }

  setRanks(user) {
    if (this._data.users.includes(user)) {
      this._data.ranks.push(user);
    } else {
      console.error("User not found in the game.");
    }
  }

  addUser(user, selectedColor) {
    console.log("Selected Color : ", selectedColor);

    if (this._data.users.filter(Boolean).length >= this.playerCount) {
      throw new Error("Cannot add more than 4 users.");
    }

    const position = this.colorIndexMap[selectedColor.toLowerCase()];
    if (position === undefined) {
      throw new Error("Invalid color selected!");
    }

    if (this._data.users[position]) {
      throw new Error("Selected color is already taken");
    }

    // if (!this.checkSlotAvailability(position, this.playerCount)) {
    //   throw new Error("Slot is unavailable for the selected color.");
    // }

    this._data.users[position] = user;
    user.gameId = this.id;
    user.connectionStatus = true;
    user.userStatus = "waiting";

    user.updatePlayerNo(position + 1);

    if (this._data.users.filter(Boolean).length === 1) {
      this._data.chancePlayer = position + 1;
    }

    this._gameStatus =
      this._data.users.filter(Boolean).length < this.playerCount
        ? "waiting for players"
        : "ready to start";

    AllGames.addUserToGameMap(user.socketId, user.userId, this);

    AllGames.updateGameQueue(this);
  }

  removeUser(socketId) {
    const index = this._data.users.findIndex(
      (user) => user && user.socketId === socketId
    );

    if (index === -1) return null;

    const removedUser = this._data.users[index];
    this._data.users[index] = null;

    AllGames.removeUserFromGameMap(socketId);
    AllGames.updateGameQueue(this);
    return removedUser;
  }

  startGame(socket, io) {
    const validPlayers = this._data.users.filter((user) => user != null);

    if (validPlayers.length >= this.playerCount) {
      this._gameStatus = "running";

      try {
        validPlayers.forEach((user) => (user.userStatus = "inGame"));

        const allInGame = validPlayers.every(
          (user) => user.userStatus === "inGame"
        );

        if (allInGame) {
          const playerPositions = {};

          validPlayers.forEach((user) => {
            const playerNo = parseInt(
              user.userBasicInfo.playerNo.replace("player", "")
            );
            const playerPos = this.playerNumPos(playerNo);
            playerPositions[`player${playerNo}`] = playerPos;
          });

          io.to(`game-${this.id}`).emit("startGame", {
            ...playerPositions,
            gameStatus: this.gameStatus,
            userStatus: "inGame",
            gameId: this.id,
            chancePlayer: this.chancePlayer,
            currentPositions: this._data.currentPositions,
          });

          this.emitPlaySound("game_start", socket, io);
        } else {
          throw new Error("Not all users are ready for the game");
        }
      } catch (error) {
        console.error("Error starting the game: ", error.message);
      }
    } else {
      console.warn("Not enough players to start the game.");
    }
  }

  updateDiceNo(num, socket, io) {
    this._data.diceNo = num;
    this._data.isDiceRolled = true;

    io.to(`game-${this.id}`).emit("updateDiceNo", {
      diceNo: this._data.diceNo,
      isDiceRolled: this._data.isDiceRolled,
    });
  }

  enableTokenSelection(playerNo, socket, io) {
    this._data.touchDiceBlock = true;
    this._data.tokenSelectionPlayer = playerNo;

    io.to(`game-${this.id}`).emit("enableTokenSelection", {
      touchDiceBlock: this._data.touchDiceBlock,
      tokenSelectionPlayer: this._data.tokenSelectionPlayer,
    });
  }

  enableCellSelection(playerNo, socket, io) {
    this._data.touchDiceBlock = true;
    this._data.cellSelectionPlayer = playerNo;

    io.to(`game-${this.id}`).emit("enableCellSelection", {
      touchDiceBlock: this._data.touchDiceBlock,
      cellSelectionPlayer: this._data.cellSelectionPlayer,
    });
  }

  disableTouch(socket, io) {
    this._data.touchDiceBlock = true;
    this._data.cellSelectionPlayer = -1;
    this._data.tokenSelectionPlayer = -1;

    io.to(`game-${this.id}`).emit("disableTouch", {
      touchDiceBlock: this._data.touchDiceBlock,
      cellSelectionPlayer: this._data.cellSelectionPlayer,
      tokenSelectionPlayer: this._data.tokenSelectionPlayer,
    });
  }

  unfreezeDice(data, socket, io) {
    this._data.touchDiceBlock = false;
    this._data.isDiceRolled = false;

    io.to(`game-${this.id}`).emit("unfreezeDice", {
      touchDiceBlock: this._data.touchDiceBlock,
      isDiceRolled: this._data.isDiceRolled,
    });

    const currentChancePlayer = this._data.users
      .filter((user) => user !== null)
      .find((user) => user.userBasicInfo.playerNo === `player${data}`);

    if (currentChancePlayer && !currentChancePlayer.playerType) {
      this.handleBotDiceRoll(currentChancePlayer, io);
    }
  }

  updateFireWorks(data, socket, io) {
    this._data.fireworks = data;

    io.to(`game-${this.id}`).emit("updateFireWorks", {
      fireworks: this._data.fireworks,
    });
  }

  updatePlayerChance(data, socket, io) {
    this._data.chancePlayer = data;
    this._data.touchDiceBlock = false;
    this._data.isDiceRolled = false;

    io.to(`game-${this.id}`).emit("updatePlayerChance", {
      chancePlayer: this._data.chancePlayer,
      touchDiceBlock: this._data.touchDiceBlock,
      isDiceRolled: this._data.isDiceRolled,
    });

    const currentChancePlayer = this._data.users
      .filter((user) => user !== null)
      .find((user) => user.userBasicInfo.playerNo === `player${data}`);

    if (!currentChancePlayer) {
      console.error(`No active player found for player${data}`);
      return;
    }

    if (!currentChancePlayer.playerType) {
      this.handleBotDiceRoll(currentChancePlayer, io);
    }
  }

  updatePlayerPieceValue(data, socket, io) {
    const { playerNo, pieceId, pos, travelCount } = data;

    const player = parseInt(data.playerNo.match(/\d+/)?.[0], 10);

    const playerPieces = this.playerNumPos(player);

    const piece = playerPieces.find((p) => p.id === pieceId);

    this._data.tokenSelectionPlayer = -1;

    if (piece) {
      piece.pos = pos;
      piece.travelCount = travelCount;
      const currentPositionIndex = this._data.currentPositions.findIndex(
        (p) => p.id === pieceId
      );

      if (pos == 0) {
        if (currentPositionIndex !== -1) {
          this._data.currentPositions.splice(currentPositionIndex, 1);
        }
      } else {
        if (currentPositionIndex !== -1) {
          this._data.currentPositions[currentPositionIndex] = {
            id: pieceId,
            pos,
          };
        } else {
          this._data.currentPositions.push({
            id: pieceId,
            pos,
          });
        }
      }
    }

    io.to(`game-${this.id}`).emit("updatePlayerPieceValue", {
      playerNo,
      pieceId,
      pos: piece.pos,
      travelCount: piece.travelCount,
      tokenSelectionPlayer: this._data.tokenSelectionPlayer,
    });
  }

  async handleDiceRoll(playerNo, socket, io) {
    const newDiceNo = Math.floor(Math.random() * 6) + 1;

    await delay(800);

    this.updateDiceNo(newDiceNo, socket, io);

    const playerData = this.playerNumPos(playerNo);

    const isAnyPieceAlive = playerData?.findIndex(
      (i) => i.pos != 0 && i.pos != 57
    );

    const isAnyPieceLocked = playerData?.findIndex((i) => i.pos == 0);

    if (isAnyPieceAlive == -1) {
      if (newDiceNo === 6) {
        this.enableTokenSelection(playerNo, socket, io);
      } else {
        let nextPlayer = this.getNextChancePlayer(playerNo);
        await delay(600);
        this.updatePlayerChance(nextPlayer, socket, io);
      }
    } else {
      const playerPieces = this.playerNumPos(this._data.chancePlayer);

      const canMove = playerPieces.some(
        (token) => token.travelCount + newDiceNo <= 57 && token.pos != 0
      );
      if (
        (!canMove && newDiceNo == 6 && isAnyPieceLocked == -1) ||
        (!canMove && newDiceNo != 6 && isAnyPieceLocked != -1) ||
        (!canMove && newDiceNo != 6 && isAnyPieceLocked == -1)
      ) {
        let nextPlayer = this.getNextChancePlayer(playerNo);

        await delay(600);
        this.updatePlayerChance(nextPlayer, socket, io);
        return;
      }

      if (newDiceNo === 6) {
        this.enableTokenSelection(playerNo, socket, io);
      }
      this.enableCellSelection(playerNo, socket, io);
    }
  }

  async handleCellSelection(data, socket, io) {
    const { playerNo, id, pos } = data;
    const plottedPieces = this._data.currentPositions;

    // const playerNo = parseInt(player.match(/\d+/)?.[0], 10);

    let alpha =
      playerNo == 1 ? "A" : playerNo == 2 ? "B" : playerNo == 3 ? "C" : "D";

    const piecesAtPosition = plottedPieces?.filter((item) => item.pos === pos);

    const piece =
      piecesAtPosition[
        piecesAtPosition.findIndex((item) => item.id[0] == alpha)
      ];

    this.disableTouch(socket, io);

    let finalPath = piece.pos;

    const beforePlayer = this.playerNumPos(playerNo);

    const beforePlayerPiece = beforePlayer.find((item) => item.id == id);

    let travelCount = beforePlayerPiece.travelCount;

    for (let i = 0; i < this._data.diceNo; i++) {
      const player = this.playerNumPos(playerNo);

      const playerPiece = player.find((item) => item.id == id);

      let path = playerPiece.pos + 1;

      if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
        path = victoryStart[playerNo - 1];
      }

      if (path == 53) {
        path = 1;
      }

      finalPath = path;
      travelCount += 1;

      this.emitPlaySound("pile_move", socket, io);
      this.updatePlayerPieceValue(
        {
          playerNo: `player${playerNo}`,
          pieceId: playerPiece.id,
          pos: path,
          travelCount: travelCount,
        },
        socket,
        io
      );
      await delay(200);
    }

    const updatedPlottedPieces = this._data.currentPositions;

    const finalPlot = updatedPlottedPieces?.filter(
      (item) => item.pos == finalPath
    );

    const ids = finalPlot.map((item) => item.id[0]);

    const uniqueIds = new Set(ids);

    const areDifferentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
      this.emitPlaySound("safe_spot", socket, io);
    }

    if (
      areDifferentIds &&
      !SafeSpots.includes(finalPlot[0].pos) &&
      !StarSpots.includes(finalPlot[0].pos)
    ) {
      const enemyPiece = finalPlot.find((piece) => piece.id[0] !== id[0]);

      const enemyId = enemyPiece.id[0];

      let no =
        enemyId === "A" ? 1 : enemyId === "B" ? 2 : enemyId === "C" ? 3 : 4;

      let backWardPath = startingPoints[no - 1];
      let i = enemyPiece.pos;

      this.emitPlaySound("collide", socket, io);

      while (i !== backWardPath) {
        this.updatePlayerPieceValue(
          {
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: i,
            travelCount: 0,
          },
          socket,
          io
        );

        // await delay(0.4);

        i--;

        if (i == 0) {
          i = 52;
        }
      }

      this.updatePlayerPieceValue(
        {
          playerNo: `player${no}`,
          pieceId: enemyPiece.id,
          pos: 0,
          travelCount: 0,
        },
        socket,
        io
      );

      this.unfreezeDice(playerNo, socket, io);
      return;
    }

    if (this._data.diceNo == 6 || travelCount == 57) {
      this.updatePlayerChance(playerNo, socket, io);

      if (travelCount == 57) {
        this.emitPlaySound("home_win", socket, io);

        const playerAllPieces = this.playerNumPos(playerNo);

        if (this.checkWinningCriteria(playerAllPieces)) {
          this.emitPlaySound("cheer", socket, io);

          const user = this._data.users
            .filter((user) => user !== null)
            .find(
              (user) => user.userBasicInfo.playerNo === `player${playerNo}`
            );

          this.setRanks(user);

          await this.emitResults(socket, io);

          let nextPlayer = this.getNextChancePlayer(playerNo);

          this.updatePlayerChance(nextPlayer, socket, io);

          return;
        }

        this.updateFireWorks(true, socket, io);
        this.unfreezeDice(playerNo, socket, io);
        return;
      }
    } else {
      let nextPlayer = this.getNextChancePlayer(playerNo);

      this.updatePlayerChance(nextPlayer, socket, io);
    }
  }

  checkWinningCriteria(pieces) {
    for (let piece of pieces) {
      if (piece.travelCount < 57) {
        return false;
      }
    }
    return true;
  }

  emitPlaySound(name, socket, io) {
    io.to(`game-${this.id}`).emit("playSound", { name: name });
  }

  getNextChancePlayer(currentPlayer) {
    if (
      !this._data.users ||
      this._data.users.filter(Boolean).length === 0 ||
      this.playerCount <= 0
    ) {
      console.warn("No users available or invalid player count");
      return null;
    }

    const playerNos = this._data.users
      .filter((user) => user !== null)
      .map((user) => {
        const playerNo = parseInt(
          user.userBasicInfo.playerNo.replace("player", "")
        );
        return playerNo;
      });

    if (playerNos.length === 0) {
      console.warn("No valid players available");
      return null;
    }

    if (!playerNos.includes(currentPlayer)) {
      console.warn("Current player is not valid");
      return null;
    }

    let currentIndex = playerNos.indexOf(currentPlayer);

    let attempts = 0;

    const maxAttempts = playerNos.length;

    while (attempts < maxAttempts) {
      currentIndex = (currentIndex + 1) % playerNos.length;
      const nextPlayer = playerNos[currentIndex];

      const nextPlayerUserInRanks = this._data.ranks.some((user) => {
        user.userBasicInfo.playerNo === `player${nextPlayer}`;
      });

      const nextPlayerUser = this._data.users.find(
        (user) => user && user.userBasicInfo.playerNo === `player${nextPlayer}`
      );

      const nextPlayerConnected = nextPlayerUser?.connectionStatus === true;

      const connectedUser = this._data.users
        .filter((user) => user !== null)
        .filter((user) => user && user.connectionStatus === true);

      if (!nextPlayerUserInRanks && nextPlayerConnected && connectedUser) {
        return nextPlayer;
      }

      attempts += 1;

      if (attempts >= maxAttempts) {
        console.warn("No valid player found after checking all the players");
        return null;
      }
    }

    return null;
  }

  async handleBotDiceRoll(bot, io) {
    const playerNo = parseInt(bot.userBasicInfo.playerNo.match(/\d+/)?.[0], 10);
    if (isNaN(playerNo)) {
      console.error("Invalid player number format for bot");
      return;
    }

    const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

    await delay(randomDelay);

    // await delay(1000);

    io.to(`game-${this.id}`).emit("diceRolling", { diceRolling: true });

    setTimeout(() => {
      io.to(`game-${this.id}`).emit("diceRolling", { diceRolling: false });
    }, 800);

    this.emitPlaySound("dice_roll", null, io);

    await this.handleDiceRoll(playerNo, null, io);

    await delay(500);

    await this.botPieceToMove(bot, io);
  }

  evaluateBestMove(bot) {
    const playerNo = parseInt(bot.userBasicInfo.playerNo.match(/\d+/)?.[0], 10);
    if (isNaN(playerNo)) {
      console.error("Invalid player number format for bot");
      return {
        selectedPiece: null,
        isOnBoard: null,
      };
    }

    const playerPieces = this.playerNumPos(playerNo);
    const diceValue = this._data.diceNo;

    let bestMove = null;
    let highestScore = -Infinity;

    for (let piece of playerPieces) {
      // Ignore pieces off the board unless dice roll is 6
      if (piece.pos === 0 && diceValue !== 6) continue;

      const newPos = piece.pos + diceValue;
      const travelCount = piece.travelCount + diceValue;

      if (newPos <= 57) {
        const score = this.evaluateMove(piece, newPos, playerNo, travelCount);

        if (score > highestScore) {
          highestScore = score;
          bestMove = { piece, isOnBoard: piece.pos !== 0 };
        }
      }
    }

    return bestMove
      ? { selectedPiece: bestMove.piece, isOnBoard: bestMove.isOnBoard }
      : { selectedPiece: null, isOnBoard: null };
  }
  evaluateMove(piece, newPos, playerNo, travelCount) {
    let score = 0;

    // Bonus for reaching the finish line
    if (newPos === 57) score += 1000;

    // Bonus for moving closer to victory
    score += travelCount;

    // Bonus for landing on a safe spot
    if (SafeSpots.includes(newPos)) score += 100;

    // Bonus for capturing opponents
    const opponents = this._data.currentPositions.filter(
      (p) => p.pos === newPos && p.id[0] !== piece.id[0]
    );
    if (opponents.length > 0) score += 500;

    // Penalize locked pieces unless dice roll is 6
    if (piece.pos === 0) score -= 50;

    return score;
  }

  async botPieceToMove(bot, io) {
    const { selectedPiece, isOnBoard } = this.evaluateBestMove(bot);

    if (!selectedPiece) {
      // console.log("No valid move for bot.");
      return;
    }

    const playerNo = parseInt(bot.userBasicInfo.playerNo.match(/\d+/)?.[0], 10);
    if (isOnBoard) {
      await delay(400);
      this.enableCellSelection(playerNo, null, io);
      await delay(400);

      this.handleCellSelection(
        { playerNo, id: selectedPiece.id, pos: selectedPiece.pos },
        null,
        io
      );
    } else {
      await delay(400);

      this.enableTokenSelection(playerNo, null, io);
      await delay(400);

      this.updatePlayerPieceValue(
        {
          playerNo: `player${playerNo}`,
          pieceId: selectedPiece.id,
          pos: startingPoints[playerNo - 1],
          travelCount: 0,
        },
        null,
        io
      );

      this.unfreezeDice(playerNo, null, io);
    }
  }

  async emitResults(socket, io) {
    const ranksArray = this._data.ranks.map((user, index) => ({
      name: user.userBasicInfo.name,
      playerNo: user.userBasicInfo.playerNo,
      connectionStatus: user.connectionStatus,
      rank: `${index + 1}${this.getRankSuffix(index + 1)}`,
    }));

    io.to(`game-${this.id}`).emit("winners", {
      winners: ranksArray,
    });

    socket.emit("emitWinner", {
      winners: ranksArray,
    });
  }

  getRankSuffix(rank) {
    if (rank % 100 >= 11 && rank % 100 <= 13) {
      return "th"; // Handles 11th, 12th, 13th cases
    }
    switch (rank % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}

export default Game;
