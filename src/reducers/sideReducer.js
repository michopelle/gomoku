export default (state = "black", action) => {
  switch (action.type) {
    case "CHEST_MOVE":
      return state === "black" ? "white" : "black";

    case "RESET_CHEST":
      return "black";

    default:
      return state;
  }
};
