import React, { Component } from "react";
import { ReactReduxContext } from "react-redux";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "../firebase/firebase";
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

const InitialState = {
  username: "",
  email: "",
  password: "",
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.firebase.api);
    this.state = {
      ...InitialState,
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { username, email, password } = this.state;
    event.preventDefault();

    this.props.firebase.api.signInWithEmailAndPassword(
      email,
      password,
      username
    );
    // .then(() => {
    //   this.props.firebase.api.uploadReducers(
    //     this.props.store.getState(),
    //     this.props.firebase.database
    //   );
    // });
  };

  render() {
    const { username, email, password, error } = this.state;
    console.log(username, email, password);
    const isInvalid = password === "" || email === "" || username === "";

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
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign In
        </button>
      </form>
    );
  }
}

export default SignInPage;
