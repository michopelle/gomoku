const same = (positionX, positionY, side) => {
  return getState().chests[positionX][positionY] === side ? true : false;
};

// return all the required checking for a chest move
const checkCondition = (positionX, positionY) => {};
const possibility = [
  {
    vertical: {
      negative: [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
      ],
      positive: [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ],
    },
    horizontal: {
      negative: [
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
      ],
      true: [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
    },
    diagonalUpperLeft: {
      //diagonal that starts from upper left cornor
      negative: [
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-4, -4],
      ],
      positive: [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
    },
    diagonalLowerLeft: {
      //diagonal that starts from Lower left cornor

      negative: [
        [1, -1],
        [2, -2],
        [3, -3],
        [4, -4],
      ],
      positive: [
        [-1, 1],
        [-2, 2],
        [-3, 3],
        [-4, 4],
      ],
    },
  },
];

export default (state = null, action) => {
  switch (action.type) {
    case "CHEST_MOVE":
      return same(
        action.payload.positionX,
        action.payload.positionY,
        action.payload.side
      );
    default:
      return state;
  }
};
