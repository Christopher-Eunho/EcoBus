import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Nav from "./Nav";
import Navigation from "components/Navigation";
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
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
            {isLoggedIn && <Nav />}
        </Router>
    );

};
export default AppRouter;