import Logo from '../images/navbar-logo.png'
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
import '../styles/navigation-bar.css'

const NavigationBar = () => {
    return (
        <>
            <Navbar id="navigation-bar">
                <Nav>
                    <Nav.Link>
                        <Link to="/">
                            Search
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/about_us">
                            About Us
                        </Link>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default NavigationBar
