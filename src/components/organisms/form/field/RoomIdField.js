import React from "react";
import { Field } from "react-final-form";

import { contain6Characters } from "../validators";

export const RoomIdField = () => {
  return (
    <Field name="roomId" validate={contain6Characters}>
      {({ input, meta }) => (
        <div class="row align-items-center">
          <div class="col-auto">
            <label htmlFor="inputRoomId" className="col-form-label">
              Join room
            </label>
          </div>
          <div class="col-auto">
            <input
              {...input}
              type="text"
              id="inputRoomId"
              class="form-control"
              aria-describedby="joinRoomHelpInline"
              placeholder="Enter a room id to join"
            />
          </div>
          {/* <div class="col-auto">
            <span id="joinRoomHelpInline" class="form-text">
              Enter a room id to join
            </span>
          </div> */}
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
      )}
    </Field>
  );
};
