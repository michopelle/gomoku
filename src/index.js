import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./store/reducers/";
import FirebaseProvider, { FirebaseContext } from "./firebase/firebase";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <FirebaseProvider store={store}>
      <FirebaseContext.Consumer>
        {(firebase) => <App firebase={firebase} />}
      </FirebaseContext.Consumer>
    </FirebaseProvider>
  </Provider>,
  document.querySelector("#root")
);
