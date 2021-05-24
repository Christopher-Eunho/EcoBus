import { authService } from "firebase_eb";
import { useHistory } from "react-router";
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'
import '../styles/navigation-bar.css'

const NavigationBar = () => {    
    const history = useHistory();
    
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }
    
    return (
        <>
            <Navbar id="navigation-bar">
                {/* <input type="image" src={Logo} id="logo" alt="logo" /> */}
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
                <Button variant="danger btn-sm" onClick={onLogoutClick} id="logout">Log Out</Button>
            </Navbar>
        </>
    )
}

export default NavigationBar
