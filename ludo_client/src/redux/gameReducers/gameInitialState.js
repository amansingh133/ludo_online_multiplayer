const player1InitialState = [
  { id: "A1", pos: 0, travelCount: 0, user: "a" },
  { id: "A2", pos: 0, travelCount: 0 },
  { id: "A3", pos: 0, travelCount: 0 },
  { id: "A4", pos: 0, travelCount: 0 },
];

const player2InitialState = [
  { id: "B1", pos: 0, travelCount: 0 },
  { id: "B2", pos: 0, travelCount: 0 },
  { id: "B3", pos: 0, travelCount: 0 },
  { id: "B4", pos: 0, travelCount: 0 },
];

const player3InitialState = [
  { id: "C1", pos: 0, travelCount: 0 },
  { id: "C2", pos: 0, travelCount: 0 },
  { id: "C3", pos: 0, travelCount: 0 },
  { id: "C4", pos: 0, travelCount: 0 },
];

const player4InitialState = [
  { id: "D1", pos: 0, travelCount: 0 },
  { id: "D2", pos: 0, travelCount: 0 },
  { id: "D3", pos: 0, travelCount: 0 },
  { id: "D4", pos: 0, travelCount: 0 },
];

export const initialState = {
  player1: null,
  player2: null,
  player3: null,
  player4: null,
  chancePlayer: 1,
  diceNo: 1,
  isDiceRolled: false,
  tokenSelectionPlayer: -1,
  cellSelectionPlayer: -1,
  touchDiceBlock: false,
  currentPositions: [],
  fireworks: false,
  winner: [],
  diceRolling: false,
  showWinners: false,
  gameStatus: "",
};
