const isSameSide = (testPositionX, testPositionY, side, chests) => {
  if (
    testPositionX > 14 ||
    testPositionY > 14 ||
    testPositionX < 0 ||
    testPositionY < 0
  ) {
    return false;
  }
  return chests.present[testPositionX][testPositionY] == side ? true : false;
};

// return all the required checking for a chest move
let count = 0;
let resultList = [];
const checkCondition = ({ positionX, positionY, side, chests }) => {
  directions.map((direction) => {
    count = 0;
    direction.map((possibility) => {
      if (
        isSameSide(
          positionX + possibility[0],
          positionY + possibility[1],
          side,
          chests
        )
      ) {
        count += 1;
      } else {
        count = 0;
      }
      resultList.push(count);
    });
  });
  console.log(
    "winsider reducer checkCondition function, resultList",
    resultList
  );
  var max = resultList.reduce(function (a, b) {
    return Math.max(a, b);
  });
  console.log("max", max);
  return max === 4 ? true : false;
};

const directions = [
  [
    [-4, 0],
    [-3, 0],
    [-2, 0],
    [-1, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ],
  [
    [0, -4],
    [0, -3],
    [0, -2],
    [0, -1],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [-4, -4],
    [-3, -3],
    [-2, -2],
    [-1, -1],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
  ],
  [
    [4, -4],
    [3, -3],
    [2, -2],
    [1, -1],
    [-1, 1],
    [-2, 2],
    [-3, 3],
    [-4, 4],
  ],
];

export default (state = false, action) => {
  switch (action.type) {
    case "WIN_SIDE":
      console.log("winSideReducer, WIN_SIDE case", action.payload);
      console.log(
        "winSideReducer, result",
        checkCondition(action.payload) ? action.payload.side : false
      );
      return checkCondition(action.payload) ? action.payload.side : false;

    case "UPDATE_FROM_FIREBASE":
      return action.payload.winSide;

    case "RESET_CHEST":
      return false;

    default:
      return state;
  }
};
