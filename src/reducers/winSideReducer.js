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
  var max = resultList.reduce(function (a, b) {
    return Math.max(a, b);
  });
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

export default (state = "HI", action) => {
  switch (action.type) {
    case "WIN_SIDE":
      return checkCondition(action.payload) ? action.payload.side : false;
    default:
      return state;
  }
};

// const directions = {
//   vertical: {
//     negative: [
//       [-1, 0],
//       [-2, 0],
//       [-3, 0],
//       [-4, 0],
//     ],
//     positive: [
//       [1, 0],
//       [2, 0],
//       [3, 0],
//       [4, 0],
//     ],
//   },
//   horizontal: {
//     negative: [
//       [0, -1],
//       [0, -2],
//       [0, -3],
//       [0, -4],
//     ],
//     true: [
//       [0, 1],
//       [0, 2],
//       [0, 3],
//       [0, 4],
//     ],
//   },
//   diagonalUpperLeft: {
//     //diagonal that starts from upper left cornor
//     negative: [
//       [-1, -1],
//       [-2, -2],
//       [-3, -3],
//       [-4, -4],
//     ],
//     positive: [
//       [1, 1],
//       [2, 2],
//       [3, 3],
//       [4, 4],
//     ],
//   },
//   diagonalLowerLeft: {
//     //diagonal that starts from Lower left cornor
//     negative: [
//       [1, -1],
//       [2, -2],
//       [3, -3],
//       [4, -4],
//     ],
//     positive: [
//       [-1, 1],
//       [-2, 2],
//       [-3, 3],
//       [-4, 4],
//     ],
//   },
// };
