import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "react-final-form";

import { FirebaseContext } from "../../firebase/firebase";
import * as routes from "../../constants/routes";
import { SetAuthUserAndUploadReducers } from "../../store/actions/";
import {
  DisplayNameField,
  PasswordField,
  ConfirmField,
  EmailField,
  SubmitButton,
} from "../organisms/form/";

const SignUpPage = ({ SetAuthUserAndUploadReducers }) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <FirebaseContext.Consumer>
        {(firebase) => <SignUpForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );
};

const SignUpForm = ({ firebase, store }) => {
  const onSubmit = (values) => {
    // const { email, displayName, password, confirm } = values;
    window.alert(JSON.stringify(values, 0, 2));

    // firebase.api.createUserWithEmailAndPassword(
    //   email,
    //   passwordOne,
    //   username
    // );
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (values.password !== values.confirm) {
          errors.confirm = "The passwords are not the same, please try again.";
        }
        return errors;
      }}
      // form, values, errors can be used in the props below (react-final-form)
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <EmailField />
          <DisplayNameField />
          <PasswordField />
          <ConfirmField />
          <SubmitButton {...submitting} />
        </form>
      )}
    />
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

const mapDispatchToProps = (dispatch) => {
  return {
    SetAuthUserAndUploadReducers: (authUser) =>
      dispatch(SetAuthUserAndUploadReducers(authUser)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpPage);

export { SignUpForm, SignUpLink };
