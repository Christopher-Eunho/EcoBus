import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import About_Us from "routes/About_Us";
import Search from "routes/Search";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Search />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/about_us">
                            <About_Us />
                        </Route>
                    </>
                ) : (
                    <Route path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
            {isLoggedIn}
        </Router>
    );

};
export default AppRouter;