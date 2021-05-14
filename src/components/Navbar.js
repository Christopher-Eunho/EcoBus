import UserProfile from '../images/user-profile.png'
import Logo from '../images/navbar-logo.png'
import SearchPage from '../images/magnifying-glass.png'
import React from "react"
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
    <navbar>
        <Link to="/profile">
            <button id="navigate-user-profile">
                <img src={UserProfile} alt="User Profile" />
            </button>
        </Link>
        
        <Link to="/about_us">
            <button id="navigate-about-us">
                <img src={Logo} alt="Logo" />
            </button>
        </Link>

        <Link to="/">
            <button id="navigate-search-page">
                <img src={SearchPage} alt="Search Page"/>
            </button>
        </Link>
    </navbar>
    )
}

export default Navbar
