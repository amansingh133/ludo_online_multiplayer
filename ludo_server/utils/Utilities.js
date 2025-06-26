export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getOppositeSlot = (position) => {
  const opposites = [2, 3, 0, 1];
  return opposites[position];
};
