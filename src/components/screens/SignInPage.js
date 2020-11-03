import React from "react";
import { ReactReduxContext } from "react-redux";
import { Form } from "react-final-form";

import { FirebaseContext } from "../../firebase/firebase";
import { SignUpLink } from "./SignUpPage";
import { PasswordField, EmailField, SubmitButton } from "../organisms/form/";

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
          <EmailField />
          <PasswordField />
          <SubmitButton {...submitting} />{" "}
        </form>
      )}
    />
  );
};

export default SignInPage;
