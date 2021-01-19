import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { ActionCreators as UndoActionCreators } from "redux-undo";

import "./roomInterface.css";
import { gameInit, resetChest, setDisplayName } from "../../../store/actions/";
import {
  DisplayNameField,
  RoomIdField,
  StartButton,
  SubmitButton,
} from "../form/";
import ShowRoomErrorModal from "../modal/ShowRoomErrorModal";

const RoomInterface = ({
  api,
  store,
  displayName,
  roomInfo,

  onClearHistory,
  gameInit,
  resetChest,
  setDisplayName,
}) => {
  const onDisplayNameSubmit = (values) => {
    setDisplayName(values.displayName);
    api.setUnmatchNode({ displayName: values.displayName });
  };

  const onRoomIdSubmit = (values) => {
    api.findRoomId({ roomId: values.roomId });
  };

  const onGameStart = () => {
    // reset and initialise game state in redux
    resetChest();
    gameInit();
    onClearHistory();

    // inform database for starting game
    const { roomId, key, opponentDisplayName } = roomInfo;
    const { chests, side, winSide } = store.getState();
    api.startGame({
      roomId: roomId,
      key: key,
      displayName: displayName,
      opponentDisplayName: opponentDisplayName,
      chests: chests,
      side: side,
      winSide: winSide,
    });
    api.downloadReducers({ key });
  };

  return !displayName && !roomInfo.key ? (
    // before display name is entered
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Gomoku</h5>
          <p className="card-text">Play with your friend at any time</p>
        </div>
      </div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Please enter a display name</h5>
          <Form
            onSubmit={onDisplayNameSubmit}
            // form, values, errors can be used in the props below (react-final-form)
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} id="formDisplayName">
                {/* <div className="" id="formDisplayName"> */}
                <DisplayNameField />
                <SubmitButton {...submitting} />
                {/* </div> */}
              </form>
            )}
          />
        </div>
      </div>
    </>
  ) : roomInfo.host ? (
    // player is the host
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Game Lobby</h5>
          <p className="card-text">Room id: {roomInfo.roomId}</p>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {displayName}
              <span className="badge bg-primary rounded-pill">host</span>
            </li>
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              id="waitingPlayer"
            >
              Waiting player
            </li>
          </ul>

          {/* for game start button */}
          <StartButton
            opponentDisplayName={roomInfo.opponentDisplayName}
            onClick={onGameStart}
          />
        </div>
      </div>

      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Join another room</h5>
          <Form
            onSubmit={onRoomIdSubmit}
            // form, values, errors can be used in the props below (react-final-form)
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="roomIdInput">
                  <RoomIdField />
                  <SubmitButton {...submitting} />
                </div>
              </form>
            )}
          />
        </div>
      </div>

      <ShowRoomErrorModal />
    </>
  ) : (
    // player is a visitor
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Game Lobby</h5>
          <p className="card-text">Room id: {roomInfo.roomId}</p>

          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {roomInfo.opponentDisplayName}
              <span className="badge bg-primary rounded-pill">host</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {displayName}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    chests: state.chests.present,
    displayName: state.displayName,
    roomInfo: state.roomInfo,
    roomError: state.roomError,
    side: state.side,
    winSide: state.winSide,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearHistory: () => dispatch(UndoActionCreators.clearHistory()),
    gameInit: () => dispatch(gameInit()),
    resetChest: () => dispatch(resetChest()),
    setDisplayName: (displayName) => dispatch(setDisplayName(displayName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomInterface);
