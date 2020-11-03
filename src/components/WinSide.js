import React from "react";
import { connect } from "react-redux";

const WinSide = ({ winSide }) => {
  if (winSide !== false) {
    return <div>The winner is {winSide}</div>;
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    winSide: state.winSide,
  };
};

export default connect(mapStateToProps)(WinSide);
