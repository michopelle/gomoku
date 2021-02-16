import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../store/actions/";

const Board = ({ store, api, chests, roomInfo, side, winSide, chestMove }) => {
  const onChestClick = (_, chestListIndex, chestIndex) => {
    console.log("onchestclick called: roomifo", roomInfo.host, ", side", side);
    // Disable onClick if there is a winner
    if (
      (roomInfo.host === true && side === "black") ||
      (roomInfo.host === false && side === "white")
    ) {
      // if (!winSide) {
      console.log("infor passed to chest ", chestListIndex, chestIndex, side);
      chestMove(
        chestListIndex, // positionX
        chestIndex, // positionY
        side
      );
      console.log("after chest move, store=", store.getState());
      // console.log("after chest move", api);
      // console.log("after chest move", api.uploadReducers);
      // }
      setTimeout(function () {
        //Start the timer
        api.uploadReducers(store.getState());
      }, 500);
    }
    // upload to firebase
  };

  // Render the Board if the game is started
  const renderedList = () => {
    return roomInfo.isGameStarted
      ? chests.map((chestList, chestListIndex) => {
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
                      disabled={winSide !== false ? true : false}
                      onClick={(e) =>
                        onChestClick(e, chestListIndex, chestIndex)
                      }
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
        })
      : null;
  };

  return renderedList();
};

const mapStateToProps = (state) => {
  return {
    chests: state.chests.present,
    roomInfo: state.roomInfo,
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
