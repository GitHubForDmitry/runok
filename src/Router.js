import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Wrapper from "./views/Wrapper";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import SignUpPassword from "./views/SignUpPassword";
import CreatePost from "./views/CreatePost";
import EditPost from "./views/EditPost";

const RouterComponent = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Wrapper />
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
                <Route path="/signuppassword">
                    <SignUpPassword />
                </Route>
                <Route path="/createpost">
                    <CreatePost />
                </Route>
                <Route path="/posts/:id"  component={EditPost} />
            </Switch>
        </Router>
    );
};

export default RouterComponent;
