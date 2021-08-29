import React from "react";
import {HashRouter} from "react-router-dom";
import RouterComponent from "./Router";
import { Provider } from 'react-redux'
import store from './store/store';
import AppProvider from "./context/AppWrapper";

function App() {
  return (
      <React.Fragment>
          <AppProvider>
              <Provider store={store}>
                  <HashRouter basename="/">
                      <RouterComponent/>
                  </HashRouter>
              </Provider>
          </AppProvider>
      </React.Fragment>
  );
}

export default App;
