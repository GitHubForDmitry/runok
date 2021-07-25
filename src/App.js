import React from "react";
import {HashRouter} from "react-router-dom";
import RouterComponent from "./Router";

function App() {
  return (
      <React.Fragment>
        <HashRouter basename="/">
          <RouterComponent />
        </HashRouter>
      </React.Fragment>
  );
}

export default App;
