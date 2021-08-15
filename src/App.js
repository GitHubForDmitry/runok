import React from "react";
import {HashRouter} from "react-router-dom";
import RouterComponent from "./Router";
import { Provider } from 'react-redux'
import store from './store/store'
function App() {
  return (
      <React.Fragment>
          <Provider store={store}>
              <HashRouter basename="/">
                  <RouterComponent/>
              </HashRouter>
          </Provider>
      </React.Fragment>
  );
}

export default App;
