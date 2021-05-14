import React from "react";
import {Link} from "react-router-dom"

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Search</Link>
            </li>
            <li>
                <Link to="/profile">My Profile</Link>
            </li>
            <li>
                <Link to="/about_us">About Us</Link>
            </li>
        </ul>
    </nav>
    );

export default Navigation;
