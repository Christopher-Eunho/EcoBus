import UserProfile from '../images/user-profile.png'
import Logo from '../images/navbar-logo.png'
import SearchPage from '../images/magnifying-glass.png'
import React from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    return (
    <nav className="navbar">
        <Link to="/profile">
            <button className="navbar-button">
                <img src={UserProfile} alt="User Profile" />
            </button>
        </Link>
        
        <Link to="/about_us">
            <button className="navbar-button">
                <img src={Logo} alt="Logo" />
            </button>
        </Link>

        <Link to="/">
            <button className="navbar-button">
                <img src={SearchPage} alt="Search Page"/>
            </button>
        </Link>
    </nav>
    )
}

export default Nav
