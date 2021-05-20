import UserProfile from '../images/user-profile.png'
import Logo from '../images/navbar-logo.png'
import SearchPage from '../images/magnifying-glass.png'
import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img src={Logo} alt="Search Page" />
                </Navbar.Brand>
                <Nav className="mr-auto">
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
