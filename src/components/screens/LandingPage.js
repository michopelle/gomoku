import React from "react";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";

import { DisplayNameField, SubmitButton } from "../organisms/form/";
import * as routes from "../../constants/routes";

const LandingPage = ({ setName }) => {
  let history = useHistory();

  const onSubmit = (values) => {
    // const { email, displayName, password, confirm } = values;
    window.alert(JSON.stringify(values, 0, 2));

    // firebase.api.createUserWithEmailAndPassword(
    //   email,
    //   passwordOne,
    //   username
    // );
    console.log(setName);
    setName(values.displayName);
    history.push(routes.GAME_PLAY);
  };
  return (
    <>
      <h1>Welcome to My Awesome App</h1>
      <h3>Please enter a username</h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <DisplayNameField />
            <SubmitButton {...submitting} />
          </form>
        )}
      />
    </>
  );
};

export default LandingPage;
