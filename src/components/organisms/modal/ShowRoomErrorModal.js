import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";

const ShowRoomErrorModal = ({ roomError }) => {
  return (
    <Popup
      // trigger={<button className="button"> Open Modal </button>}
      modal={true}
      open={roomError.isErrorVisible}
      nested
      closeOnDocumentClick
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Join room error </div>
          <div className="content">
            Join room unsuccessfully, it may be due to the room is full or it
            does not exist. <br />
            Please try again.
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
const mapStateToProps = (state) => {
  return {
    roomError: state.roomError,
  };
};

const mapDispatchToProps = (_) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowRoomErrorModal);
