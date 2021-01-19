import React from "react";
import { Field } from "react-final-form";

import { contain6Characters } from "../validators";

export const RoomIdField = () => {
  return (
    <Field name="roomId" validate={contain6Characters}>
      {({ input, meta }) => (
        <>
          <input
            {...input}
            type="text"
            id="inputRoomId"
            className="form-control"
            aria-describedby="joinRoomHelpInline"
            placeholder="Enter a room id to join"
          />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </>
      )}
    </Field>
  );
};
