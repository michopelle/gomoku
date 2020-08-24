import undoable from "redux-undo";

let initialState = [];
for (let i = 0; i < 15; i++) {
  initialState[i] = [];
  for (let j = 0; j < 15; j++) {
    initialState[i][j] = "";
  }
}

const chests = (state = initialState, action) => {
  switch (action.type) {
    case "CHEST_MOVE":
      const { positionX, positionY, side } = action.payload;

      return state.map((el, index) =>
        index === positionX
          ? el.map((ele, i) => (i === parseInt(positionY) ? side : ele))
          : el
      );
    case "UPDATE_FROM_FIREBASE":
      // console.log("update", action.payload.chests.present);
      return action.payload.chests.present;

    default:
      return state;
  }
};

const undoableChests = undoable(chests, {
  // filter: distinctState(),
});

export default undoableChests;
