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

export const SetAuthUserAndUploadReducers = (authUser, uploadReducers) => {
  return async (dispatch, getState) => {
    await dispatch(SetAuthUser(authUser));

    const { chests, side, winSide } = getState();
    uploadReducers({ authUser, chests, side, winSide });
  };
};

const SetAuthUser = (authUser) => {
  return {
    type: "SET_AUTH_USER",
    payload: {
      authUser: authUser,
    },
  };
};

export const setDisplayName = (displayName) => {
  return {
    type: "SET_DISPLAY_NAME",
    payload: {
      displayName: displayName,
    },
  };
};

export const setRoomInfo = ({
  roomId,
  key,
  host,
  opponentDisplayName,
  isGameStarted,
}) => {
  return {
    type: "SET_ROOM_INFO",
    payload: {
      roomId: roomId,
      key: key,
      host: host,
      opponentDisplayName: opponentDisplayName,
      isGameStarted: isGameStarted,
    },
  };
};

export const gameInit = () => {
  return {
    type: "GAME_INIT",
  };
};

export const setRoomError = ({ error }) => {
  return {
    type: "SET_ROOM_ERROR",
    payload: {
      error: error,
    },
  };
};
