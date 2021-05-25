import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import About_Us from "routes/About_Us";
import Search from "routes/Search";

const AppRouter = ( { isLoggedIn } ) => {
    return (
        <Router>
                { isLoggedIn ? (
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route exact path="/map" component={Search} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/about-us" component={About_Us} />
                        <Route component={() => (<div> <p>404 Page Not Found</p> <a href="#/map">Click here to return to the map.</a> </div>)} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/about-us" component={About_Us} />
                        <Route exact path="/map" component={Search} />
                        <Route component={Auth} />
                    </Switch>
                )}
            { isLoggedIn }
        </Router>
    );
};
export default AppRouter;