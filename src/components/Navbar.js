import UserProfile from '../images/user-profile.png'
import Logo from '../images/navbar-logo.png'
import SearchPage from '../images/magnifying-glass.png'

const Navbar = () => {
    return (
    <navbar>
        <button id="navigate-user-profile">
            <img src={UserProfile} alt="User Profile" />
        </button>

        <button id="navigate-about-us">
            <img src={Logo} alt="Logo" />
        </button>

        <button id="navigate-search-page">
            <img src={SearchPage} alt="Search Page"/>
        </button>
    </navbar>
    )
}

export default Navbar
