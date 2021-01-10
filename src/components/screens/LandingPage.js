import React from "react";
import { connect } from "react-redux";

import "./LandingPage.css";
import GamePlayInterface from "../organisms/interface/GamePlayInterface";
import RoomInterface from "../organisms/interface/RoomInterface";
import { setDisplayName } from "../../store/actions/index";

const LandingPage = () => {
  return (
    <div className="">
      <div className="" id="gamePlayInterface">
        <GamePlayInterface />
      </div>
      <div className="" id="roomInterface">
        <RoomInterface />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    displayName: state.displayName,
    roomInfo: state.roomInfo,
    roomError: state.roomError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayName: (displayName) => dispatch(setDisplayName(displayName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
