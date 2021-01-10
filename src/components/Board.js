import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../store/actions/";

const Board = ({ store, api, database, chests, side, winSide, chestMove }) => {
  const onChestClick = (_, chestListIndex, chestIndex) => {
    // Disable onClick if there is a winner
    if (!winSide) {
      chestMove(
        chestListIndex, // positionX
        chestIndex, // positionY
        side
      );
    }
    // upload to firebase
    api.uploadReducers(store.getState(), database);
  };

  // Render the Board based on the
  const renderedList = () => {
    return chests.map((chestList, chestListIndex) => {
      return (
        <div
          className="row boardRow"
          key={chestListIndex}
          style={{
            top: String(chestListIndex * 6.67) + "%",
            height: "6.67" + "%",
            bottom: 0,
          }}
        >
          {chestList.map((chest, chestIndex) => {
            if (chests[chestListIndex][chestIndex] === "") {
              return (
                <div
                  className="col boardCol"
                  key={(chestListIndex, chestIndex)}
                  onClick={(e) => onChestClick(e, chestListIndex, chestIndex)}
                >
                  {chest}
                </div>
              );
            } else {
              return (
                <div
                  className="col boardCol"
                  key={(chestListIndex, chestIndex)}
                >
                  <img
                    src={require(`../assets/${chests[chestListIndex][chestIndex]}_chess.png`)}
                    alt={`${chests[chestListIndex][chestIndex]}_chess`}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    });
  };

  return renderedList();
};

const mapStateToProps = (state) => {
  return {
    chests: state.chests.present,
    side: state.side,
    winSide: state.winSide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chestMove: (chestListIndex, chestIndex, side) =>
      dispatch(chestMoveAndWinSide(chestListIndex, chestIndex, side)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
