export const chestMove = (positionX, positionY, side) => {
  return {
    type: "CHEST_MOVE",
    payload: {
      positionX: positionX,
      positionY: positionY,
      side: side,
    },
  };
};
