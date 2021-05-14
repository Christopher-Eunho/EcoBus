import React from "react";
import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";

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
