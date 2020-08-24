import React from "react";
import { connect, useDispatch } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide, updateData } from "../actions";

class Board extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  // componentDidMount() {
  //   this.props.store.subscribe(() =>
  //     this.props.api.uploadReducers(
  //       this.props.store.getState(),
  //       this.props.database
  //     )
  //   );
  //   // this.props.api.downloadReducers(this.props.database);
  // }

  renderedList() {
    // console.log(this.props.chests);
    return this.props.chests.map((chestList, indexChestList) => {
      return (
        <div className="row" key={indexChestList}>
          {chestList.map((chest, indexChest) => {
            if (this.props.chests[indexChestList][indexChest] === "") {
              // console.log(indexChestList);
              return (
                <div
                  className="col"
                  key={(indexChestList, indexChest)}
                  onClick={() => {
                    this.props.chestMoveAndWinSide(
                      indexChestList, // positionX
                      indexChest, // positionY
                      this.props.side
                    );
                    this.props.api.uploadReducers(
                      this.props.store.getState(),
                      this.props.database
                    );
                  }}
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

export default connect(mapStateToProps, { chestMoveAndWinSide, updateData })(
  Board
);
