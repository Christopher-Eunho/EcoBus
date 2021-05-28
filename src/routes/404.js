import React, { useState } from "react";
import NavigationBar from '../components/NavigationBar';
import 'styles/404.css';

/* A page that is discovered if the user navigates outside of the boundaries of the website */

const Not_Found = () => {
    return (
        <div id="NotFoundDiv">
            <NavigationBar />
            <aside id="NotFoundAside">
                This page was not found. Please navigate to your desired page by using the choices up above.
            </aside>
        </div>
    )
}
export default Not_Found;