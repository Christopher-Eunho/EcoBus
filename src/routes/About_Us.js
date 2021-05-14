import React, { useState } from "react";
import '../styles/about_us.css';
import Caleb from '../images/caleb.png'

const About_Us = () => <main>
    <aside class="aboutus">
        <p>
            A little about Ecobus
        </p>
    </aside>
    <section>
        <h2>Our Mission</h2>
        <p>Ecobus's mission is to allow the general public to be able to get from place to place without needing to worry about how large their carbon footprint has gotten. This is accomplished by our application, aptly named "Ecobus", which allows users to track their carbon emissions in relation to their means of transport. It will also allow users to plan their transportation accordingly, by finding the quickest bus route from one point to another. After finding this route, it will then calculate to see how much smaller the user's carbon footprint will be simply by taking the bus.</p>
    </section>
    <section>
        <h2>Our Team</h2>
        <p>Our team is comprised of four students from BCIT, with varying levels of skill between us. We've all found travel to be a very difficult thing in our lives, with the world being how it is, and we wanted a way to trivialize it. This could be done by simply buying a car, but we all agreed that the more fuel-efficient solution was to take the bus, a vehicle which would run regardless of whether you are on it.</p>
    </section>
    <section>
        <h3>Eunho "Chris" Jung</h3>
        <img src='https://via.placeholder.com/150' alt="Picture of Chris"/>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
    </section>
    <section>
        <h3>Caleb Verma</h3>
        <img src={Caleb} alt="Picture of Caleb" />
        <p>
            Caleb is an aspiring software developer. He graduated from UBC in 2020 with a major in Philosophy and, that very same year, decided to apply to BCIT's CST program on a whim.
            He is fascinated by the seemingly limitless potential of programming; whether it's to create video games or robots that can explore Mars, programming offers a way to solve any problem.   
        </p>
    </section>
    <section>
        <h3>Austin He</h3>
        <img src='https://via.placeholder.com/150' alt="Picture of Austin"/>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
    </section>
    <section>
        <h3>Dylan Punter</h3>
        <img src='https://via.placeholder.com/150' alt="Picture of Dylan"/>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
    </section>
</main>;

export default About_Us;