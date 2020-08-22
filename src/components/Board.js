import React from "react";
import { connect, useStore } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../actions";
import { FirebaseContext } from "../firebase/firebase";

class Board extends React.Component {
  store = useStore();
  static contextType = FirebaseContext;
  shouldComponentUpdate() {
    let { api, database } = this.context;
    this.store.subscribe(() =>
      api.uploadReducers(this.store.getState(), database)
    );
  }

  // downloadReducers = useContext(FirebaseContext).api.downloadReducers();

  renderedList() {
    console.log(this.props.chests);
    return this.props.chests.map((chestList, indexChestList) => {
      return (
        <div className="row" key={indexChestList}>
          {chestList.map((chest, indexChest) => {
            if (this.props.chests[indexChestList][indexChest] === "") {
              return (
                <div
                  className="col"
                  key={(indexChestList, indexChest)}
                  onClick={
                    (indexChestList, indexChest) =>
                      this.props.chestMoveAndWinSide(
                        indexChestList, // positionX
                        indexChest, // positionY
                        this.props.side
                      )
                    // this.onChestClick(event, indexChestList, indexChest)
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
