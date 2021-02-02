export default (state = "black", action) => {
  switch (action.type) {
    case "CHEST_MOVE":
      return state === "black" ? "white" : "black";

    case "UPDATE_FROM_FIREBASE":
      return action.payload.side;

    case "RESET_CHEST":
      return "black";

    default:
      return state;
  }
};
