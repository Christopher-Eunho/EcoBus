/**
 * Navigation bar for web app.
 * Fixed to the top of every page.
 * Contains links to Map, Profile, and About Us.
 */

import { authService } from "firebase_eb";
import { useHistory } from "react-router";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../styles/navigation-bar.css';

const NavigationBar = () => {
    const history = useHistory();
    const user = authService.currentUser;

    const onLogoutClick = () => {
        /**
         * Function for logout button
         * Logs user out of application and redirects them to login page
         */
        authService.signOut();
        history.push("/");
    }

    return (
        <>
            <Navbar id="navigation-bar">
                <div id="navigation-links">
                    <Nav.Link>
                        <Link to="/map">
                            Map
                            </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/profile">
                            Profile
                            </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/about-us">
                            About Us
                            </Link>
                    </Nav.Link>
                </div>
                {user ?
                    (<Button variant="danger btn-sm" onClick={onLogoutClick} id="logout">Log Out</Button>) :
                    (<Button variant="success btn-sm" href="." id="login">Log in</Button>)}

            </Navbar>
        </>
    )
}

export default NavigationBar
