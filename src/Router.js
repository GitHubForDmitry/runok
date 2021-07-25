import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Catalog from "./views/Catalog";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

const RouterComponent = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Catalog />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </Router>
    );
};

export default RouterComponent;
