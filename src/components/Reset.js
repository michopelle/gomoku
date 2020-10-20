import React from "react";
import { connect } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";

import { resetChest } from "../store/actions/";

class Reset extends React.Component {
  onResetClick = () => {
    const { store, api, database, resetChest, onClearHistory } = this.props;
    resetChest();
    onClearHistory();
    // upload to firebase
    api.uploadReducers(store.getState(), database);
  };

  render() {
    return <button onClick={() => this.onResetClick()}>Reset</button>;
  }
}

const mapStateToProps = (state) => {
  return {
    winSide: state.winSide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetChest: () => dispatch(resetChest()),
    onClearHistory: () => dispatch(UndoActionCreators.clearHistory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reset);
