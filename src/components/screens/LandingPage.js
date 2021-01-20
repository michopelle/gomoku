import React from "react";
import { connect } from "react-redux";

import "./LandingPage.css";
import GamePlayInterface from "../organisms/interface/GamePlayInterface";
import RoomInterface from "../organisms/interface/RoomInterface";
import { setDisplayName } from "../../store/actions/index";

const LandingPage = ({ api, store, roomInfo }) => {
  window.addEventListener("unload", (event) => {
    if (roomInfo.isGameStarted === false) {
      console.log("calling event listener to remove unmatch node");
      api.removeUnmatchNode({ key: roomInfo.key });
    } else {
      console.log("calling event listener to remove matched node");
      api.removeMatchedNode({ key: roomInfo.key });
    }
  });

  return (
    <div className="" id="landingPage">
      <div
        className=""
        id="gamePlayInterface"
        style={{ opacity: roomInfo.isGameStarted === false ? 0.3 : 1 }}
      >
        <GamePlayInterface api={api} store={store} />
      </div>
      <div className="" id="roomInterface">
        <RoomInterface api={api} store={store} />
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
