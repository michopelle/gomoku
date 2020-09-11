import undoable, { includeAction } from "redux-undo";

const move = (state = [], action) => {
  switch (action.type) {
    case "CHEST_MOVE":
      const { positionX, positionY, side } = action.payload;
      return [...state, [positionX, positionY, side]];

    case "UPDATE_FROM_FIREBASE":
      return action.payload.move.present;

    case "RESET_CHEST":
      return [];

    default:
      return state;
  }
};

const undoableMove = undoable(move, {
  filter: includeAction("CHEST_MOVE"),
});

export default undoableMove;
