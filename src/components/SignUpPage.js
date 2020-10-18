import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FirebaseContext } from "../firebase/firebase";
import * as routes from "../constants/routes";
import { SetAuthUserAndUploadReducers } from "../actions";

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <FirebaseContext.Consumer>
        {(firebase) => <SignUpForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );
};

const InitialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...InitialState,
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;
    event.preventDefault();

    this.props.firebase.api.createUserWithEmailAndPassword(
      email,
      passwordOne,
      username
    );
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    console.log(username, email, passwordOne, passwordTwo);
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="User Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>
      </form>
    );
  }
}

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
