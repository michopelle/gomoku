import undoable, { includeAction } from "redux-undo";

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
      return action.payload.chests.present;
    // const { present } = action.payload.move;
    // console.log("present", present);
    // // return present.map((indMove) => {
    // //   console.log(indMove[0]);
    // //   return state.map((chestList, chestListIndex) => {
    // //     console.log("chestList", chestList);
    // //     if (chestListIndex === indMove[0]) {
    // //       return chestList.map((chest, chestIndex) =>
    // //         chestIndex === indMove[1] ? indMove[2] : chest
    // //       );
    // //     } else {
    // //       return chestList;
    // //     }
    // //   });
    // // });

    case "RESET_CHEST":
      return initialState;

    default:
      return state;
  }
};

const undoableChests = undoable(chests, {
  filter: includeAction("CHEST_MOVE"),
});

export default undoableChests;
