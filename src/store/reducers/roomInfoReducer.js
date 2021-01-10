export default (
  state = { roomId: null, key: null, host: true, opponentDisplayName: null },
  action
) => {
  switch (action.type) {
    case "SET_ROOM_INFO":
      const { roomId, key, host, opponentDisplayName } = action.payload;
      return {
        roomId: roomId,
        key: key,
        host: host,
        opponentDisplayName: opponentDisplayName,
      };

    default:
      return state;
  }
};
