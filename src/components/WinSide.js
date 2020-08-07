import React from "react";
import { connect } from "react-redux";

class WinSide extends React.Component {
  render() {
    if (this.props.winSide !== false) {
      return <div>The winner is {this.props.winSide}</div>;
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    winSide: state.winSide,
  };
};

export default connect(mapStateToProps)(WinSide);
