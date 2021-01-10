import React from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";

import "../../screens/LandingPage.css";
import { setDisplayName } from "../../../store/actions/";
import { DisplayNameField, RoomIdField, SubmitButton } from "../form/";
import ShowRoomErrorModal from "../modal/ShowRoomErrorModal";

const RoomInterface = ({
  api,
  displayName,
  roomInfo,
  roomError,
  setDisplayName,
}) => {
  console.log("from landing, roomerror", roomError);
  const onDisplayNameSubmit = (values) => {
    setDisplayName(values.displayName);
    api.setUnmatchNode({ displayName: values.displayName });
  };

  const onRoomIdSubmit = (values) => {
    console.log("try entering roomId: ", values.roomId);
    api.findRoomId({ roomId: values.roomId });
  };

  return !displayName && !roomInfo.key ? (
    <>
      <h1>Welcome to My Awesome App</h1>
      <div>Please enter a display name</div>
      <Form
        onSubmit={onDisplayNameSubmit}
        // form, values, errors can be used in the props below (react-final-form)
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DisplayNameField />
            <SubmitButton {...submitting} />
          </form>
        )}
      />
    </>
  ) : roomInfo.host ? (
    <>
      <h1>Game Lobby</h1>
      <div className="card" style={{ maxWidth: 300 }}>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {displayName}
            <span className="badge bg-primary rounded-pill">host</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Waiting player
          </li>
        </ul>
      </div>
      <h2>host</h2>
      <h2>P1 {displayName}</h2>
      <div className="roomInfo">
        <h5>Room id</h5>
        <p>{roomInfo.roomId}</p>
      </div>

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
      <ShowRoomErrorModal />
    </>
  ) : (
    <>
      <h1>Game Lobby</h1>
      {/* <div className="card" style={{ width: 500 }}> */}
      <div className="card">
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

      <div className="roomInfo">
        <h5>Room id</h5>
        <p>{roomInfo.roomId}</p>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomInterface);
