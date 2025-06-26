import {
  addUserInGame,
  handleUserDisconnection,
  rejoinGame,
} from "../controllers/usersController.js";
import {
  handleCellPress,
  handleDicePress,
  handlePocketPress,
} from "../controllers/gameController.js";

const setUpSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("addUser", (data) => addUserInGame(data, socket, io));
    socket.on("rejoinUser", ({ userId }) => rejoinGame(userId, socket, io));
    socket.on("dicePress", () => handleDicePress(socket, io));
    socket.on("pocketPress", (data) => handlePocketPress(data, socket, io));
    socket.on("cellPress", (data) => handleCellPress(data, socket, io));
    socket.on("disconnect", () => handleUserDisconnection(socket, io));
  });
};

export default setUpSocketEvents;
