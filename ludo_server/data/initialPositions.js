export const initializePlayersPos = (tokens, overrides = {}) => {
  return tokens.map((token) => ({
    id: token,
    pos: overrides[token]?.pos ?? 0,
    travelCount: overrides[token]?.travelCount ?? 0,
  }));
};

// export const playerInitialPos = {
//   player1: initializePlayersPos(["A1", "A2", "A3", "A4"]),
//   player2: initializePlayersPos(["B1", "B2", "B3", "B4"]),
//   player3: initializePlayersPos(["C1", "C2", "C3", "C4"]),
//   player4: initializePlayersPos(["D1", "D2", "D3", "D4"]),
// };
