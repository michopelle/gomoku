export const chestMoveAndWinSide = (positionX, positionY, side) => {
  return async (dispatch, getState) => {
    await dispatch(chestMove(positionX, positionY, side));

    const { chests } = getState();
    dispatch(winSide(positionX, positionY, side, chests));
  };
};

const chestMove = (positionX, positionY, side) => {
  return {
    type: "CHEST_MOVE",
    payload: {
      positionX: positionX,
      positionY: positionY,
      side: side,
    },
  };
};

const winSide = (positionX, positionY, side, chests) => {
  return {
    type: "WIN_SIDE",
    payload: {
      positionX: positionX,
      positionY: positionY,
      side: side,
      chests: chests,
    },
  };
};

export const updateData = (chests, side, winSide) => {
  return {
    type: "UPDATE_FROM_FIREBASE",
    payload: {
      chests: chests,
      side: side,
      winSide: winSide,
    },
  };
};

export const resetChest = () => {
  return {
    type: "RESET_CHEST",
  };
};
