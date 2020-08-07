import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../actions";

class Board extends React.Component {
  renderedList() {
    return this.props.chests.map((chestList, indexChestList) => {
      return (
        <div className="row" key={indexChestList}>
          {chestList.map((chest, indexChest) => {
            if (this.props.chests[indexChestList][indexChest] === "") {
              return (
                <div
                  className="col"
                  key={(indexChestList, indexChest)}
                  onClick={() =>
                    this.props.chestMoveAndWinSide(
                      indexChestList, // positionX
                      indexChest, // positionY
                      this.props.side
                    )
                  }
                >
                  {chest}
                </div>
              );
            } else {
              return (
                <div className="col" key={(indexChestList, indexChest)}>
                  {chest}
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
  };
};

export default connect(mapStateToProps, { chestMoveAndWinSide })(Board);
