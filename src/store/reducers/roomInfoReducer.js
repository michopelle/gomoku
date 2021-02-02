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
      console.log("set froom info");
      const {
        roomId,
        key,
        host,
        opponentDisplayName,
        isGameStarted,
      } = action.payload;
      return {
        ...state,
        roomId: roomId,
        key: key,
        host: host,
        opponentDisplayName: opponentDisplayName,
        isGameStarted: isGameStarted,
      };

    case "GAME_INIT":
      console.log("game init");
      return {
        ...state,
        isGameStarted: true,
      };
    default:
      return state;
  }
};
