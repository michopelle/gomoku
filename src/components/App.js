import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import GamePlayPage from "./GamePlayPage";
import * as routes from "../constants/routes";
import Board from "./Board";
import Reset from "./Reset";
import UndoRedo from "../containers/UndoRedo";
import "./App.css";
import WinSide from "./WinSide";
import { FirebaseContext } from "../firebase/firebase";
import { ReactReduxContext } from "react-redux";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />

        <div>
          <Route path={routes.LANDING} exact component={LandingPage} />
          <Route path={routes.SIGN_UP} exact component={SignUpPage} />
          <Route path={routes.SIGN_IN} exact component={SignInPage} />
          <Route path={routes.GAME_PLAY} exact component={GamePlayPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

// import React from "react";
// import {BrowserRouter, Router} from 'react-router-dom'

// import Header from "./Header";
// import Board from "./Board";
// import Reset from "./Reset";
// import UndoRedo from "../containers/UndoRedo";
// import "./App.css";
// import WinSide from "./WinSide";
// import { FirebaseContext } from "../firebase/firebase";
// import { ReactReduxContext } from "react-redux";

// const App = () => {
//   const renderedList = ({ store, api, database }) => {
//     return (
//       <div>
//         <div className="Board">
//           <Board store={store} api={api} database={database} />
//         </div>
//         <UndoRedo />
//         <Reset store={store} api={api} database={database} />
//         <WinSide />
//       </div>
//     );
//   };

//   return (
//     <div className="ui container">
//       <div className="table table-borderless">
//         <ReactReduxContext.Consumer>
//           {({ store }) => (
//             <FirebaseContext.Consumer>
//               {({ api, database }) => {
//                 return renderedList({ store, api, database });
//               }}
//             </FirebaseContext.Consumer>
//           )}
//         </ReactReduxContext.Consumer>
//       </div>
//     </div>

//   );
// };

// export default App;
