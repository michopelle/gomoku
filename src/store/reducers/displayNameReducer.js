export default (state = null, action) => {
  switch (action.type) {
    case "SET_DISPLAY_NAME":
      return action.payload.displayName;

    default:
      return state;
  }
};
