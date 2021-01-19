export default (
  state = {
    roomId: null,
    key: null,
    host: true,
    opponentDisplayName: null,
    isGameStarted: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_ROOM_INFO":
      const { roomId, key, host, opponentDisplayName } = action.payload;
      return {
        ...state,
        roomId: roomId,
        key: key,
        host: host,
        opponentDisplayName: opponentDisplayName,
      };

    case "GAME_INIT":
      return {
        ...state,
        isGameStarted: true,
      };
    default:
      return state;
  }
};
