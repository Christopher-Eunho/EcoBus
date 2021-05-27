import { authService } from "firebase_eb";
import { useHistory } from "react-router";
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'
import '../styles/navigation-bar.css'

const NavigationBar = () => {    
    const history = useHistory();
    const user = authService.currentUser;
    
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }

    // function displayLoginButton(){
    //     let user = authService.currentUser;
    //     if(user){
    //         let logoutBtn = document.getElementById("logout");
    //         logoutBtn.style["display"] = "none";

    //         let loginBtn = document.getElementById("login");
    //         loginBtn.style["display"] = "block";
    //     }
    // }
    
    // displayLoginButton();

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
                {user ? 
                (<Button variant="danger btn-sm" onClick={onLogoutClick} id="logout">Log Out</Button>) : 
                (<Button variant="success btn-sm" href="." id="login">Log in</Button>)}
                               
            </Navbar>
        </>
    )
}

export default NavigationBar
