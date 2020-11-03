import React from "react";
import { ReactReduxContext } from "react-redux";
import { Form, Field } from "react-final-form";

import { FirebaseContext } from "../../firebase/firebase";
import { SignUpLink } from "./SignUpPage";

const SignInPage = () => {
  return (
    <div>
      <div>Sign In Page</div>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <FirebaseContext.Consumer>
            {(firebase) => <SignInForm firebase={firebase} store={store} />}
          </FirebaseContext.Consumer>
        )}
      </ReactReduxContext.Consumer>
      <SignUpLink />
    </div>
  );
};

const SignInForm = ({ firebase, store }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    // firebase.api.signInWithEmailAndPassword(email, password, username);
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

export default SignInPage;
