/**
 * Route users to webpages. 
 * Webpages include Map, Profile, About Us, Authentication, and 404 Page.
 * Users are directed to different pages according to their login status. 
 */

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import About_Us from "routes/About_Us";
import Search from "routes/Search";
import Not_Found from "routes/404";

const AppRouter = ( { isLoggedIn } ) => {
    return (
        <Router>
                { isLoggedIn ? (
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route exact path="/map" component={Search} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/about-us" component={About_Us} />
                        <Route component={Not_Found} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/about-us" component={About_Us} />
                        <Route exact path="/map" component={Search} />
                        <Route component={Auth} />
                    </Switch>
                )}
        </Router>
    );
};
export default AppRouter;