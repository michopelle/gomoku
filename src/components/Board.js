import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../store/actions/";

class Board extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate() {}

  onChestClick = (_, chestListIndex, chestIndex) => {
    const { store, api, database, side, winSide, chestMove } = this.props;
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
  renderedList() {
    const { chests } = this.props;

    return chests.map((chestList, chestListIndex) => {
      return (
        <div className="row" key={chestListIndex}>
          {chestList.map((chest, chestIndex) => {
            if (chests[chestListIndex][chestIndex] === "") {
              return (
                <div
                  className="col"
                  key={(chestListIndex, chestIndex)}
                  onClick={(e) =>
                    this.onChestClick(e, chestListIndex, chestIndex)
                  }
                >
                  {chest}
                </div>
              );
            } else {
              return (
                <div className="col" key={(chestListIndex, chestIndex)}>
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
  }

  render() {
    return this.renderedList();
  }
}

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
