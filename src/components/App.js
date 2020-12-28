import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import GamePlayPage from "./screens/GamePlayPage";

// replace (_) with (firebase) when necessary
const App = (_) => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Route path="/" exact component={GamePlayPage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
