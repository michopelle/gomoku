import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import { FirebaseContext } from "../../firebase/firebase";
import * as routes from "../../constants/routes";
import { SetAuthUserAndUploadReducers } from "../../store/actions/";

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
  const onSubmit = (event) => {
    event.preventDefault();

    // firebase.api.createUserWithEmailAndPassword(
    //   email,
    //   passwordOne,
    //   username
    // );
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Display Name</label>
            <Field
              name="displayName"
              component="input"
              type="text"
              placeholder="Display Name"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="Password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field
              name="confirm"
              component="input"
              type="text"
              placeholder="Confirm Password"
            />
          </div>
          <div className="buttons">
            <button
              type="onSubmit"
              disabled={submitting && Object.keys(errors).length}
            />
          </div>
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
