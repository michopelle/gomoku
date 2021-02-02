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
import Reset from "../../Reset";
import UndoRedo from "../../../containers/UndoRedo";
import WinSide from "../../WinSide";

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
  console.log("roominfo", roomInfo);
  const onDisplayNameSubmit = (values) => {
    setDisplayName(values.displayName);
    api.setUnmatchNode({ displayName: values.displayName });
  };

  const onRoomIdSubmit = (values) => {
    api.visitorJoinViaRoomId({
      roomId: values.roomId,
      visitorDisplayName: displayName,
    });
    // const { key } = roomInfo;
    // console.log("from roominterface roomid submit");
    // api.activateVisitorBoard({ key });
  };

  const onGameStart = () => {
    // reset and initialise game state in redux
    resetChest();
    gameInit();
    onClearHistory();

    // inform database for starting game
    const { roomId, key, opponentDisplayName } = roomInfo;
    const { chests, side, winSide } = store.getState();
    // create matched game in firebase
    api.startGame({
      roomId: roomId,
      key: key,
      displayName: displayName,
      opponentDisplayName: opponentDisplayName,
      chests: chests,
      side: side,
      winSide: winSide,
    });
    // add listener to the matched game node
    api.downloadReducers({ key });
  };

  return !displayName && !roomInfo.key ? (
    // before display name is entered
    <>
      <div className="card">
        <div className="card-body ">
          <p className="title">Gomoku</p>
          <p className="card-text">Play with your friend at any time</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="subtitle">Please enter a display name</p>
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
      <div className="card">
        <div className="card-body">
          <p className="title">Game Lobby</p>
          <p className="subtitle">Room id: {roomInfo.roomId}</p>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {displayName}
              <span className="badge bg-primary rounded-pill">host</span>
            </li>
            {roomInfo.opponentDisplayName ? (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {roomInfo.opponentDisplayName}
              </li>
            ) : (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                id="waitingPlayer"
              >
                Waiting player
              </li>
            )}
          </ul>

          {/* for game start button */}
          <StartButton
            opponentDisplayName={roomInfo.opponentDisplayName}
            onClick={onGameStart}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="subtitle">Join another room</p>
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
      <UndoRedo />
      <Reset store={store} api={api} />
      <WinSide />
    </>
  ) : (
    // player is a visitor
    <>
      <div className="card">
        <div className="card-body">
          <p className="title">Game Lobby</p>
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
      <UndoRedo />
      <Reset store={store} api={api} />
      <WinSide />
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
