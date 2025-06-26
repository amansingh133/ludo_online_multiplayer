import express from "express";
import http from "http";

//imports
import configureSocket from "./config/socketConfig.js";
import setUpSocketEvents from "./handlers/socketHandler.js";

const app = express();
const server = http.createServer(app);
const io = configureSocket(server);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

setUpSocketEvents(io);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
