export const isUserApproved = (game, user) => {
  if (
    user.userStatus === "inGame" &&
    user.connectionStatus === true &&
    game.gameStatus === "running"
  ) {
    return true;
  } else {
    return false;
  }
};
