import React from "react";
import {Link} from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";

const Navigation = () => (
    <nav>
        <Navbar>
            <Nav.Link href="/#/about_us">About Us</Nav.Link>
            <Navbar.Brand href="/#/">Home</Navbar.Brand>
            <Nav.Link href="/#/profile">My Profile</Nav.Link>
        </Navbar>
    </nav>
    );


export default Navigation;



