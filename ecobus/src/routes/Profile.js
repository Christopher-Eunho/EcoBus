import { authService } from "firebase_eb";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import "../styles/Profile.css";
import Toggle from "../images/toggle.png";
import Edit from "../images/editbutton.png";
import logo from "../images/logo.png";

const Profile = () => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
    // const [toggle, setToggle] = useState(false);

    const [name, changeName] = useState("");
    const [email, changeEmail] = useState("");

    const totalTrips = 0;
    const totalDistance = 0;
    const totalEmissionSaved = 0;

    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const onToggle = () => {
        return (
            <div className="stats">
                <p>Total Trips: {totalTrips}</p>
                <p>Total Distance Travelled: {totalDistance}</p>
                <p>Total Emissions Saved: {totalEmissionSaved}</p>
            </div>
        )
    }

    // const onEdit =  async (event) => {

    //      await firebase.User.updateEmail(email)



    // }


    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "name") {
            changeName(value);
        } else if (name === "email") {
            changeEmail(value);
        }
    };

    return (
        <>
            <a href="."><input type="image" src={logo} id="logo" alt="logo" /></a>
            <button onClick={onLogoutClick} id="logout">Log Out</button>

            <hr/>
            <div className="Profile">
                <div id="avatar">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" /> {/*query image later from database*/}
                    <input type="image" id="avataredit" src={Edit} alt="AvatarEdit" />
                </div>
                <div>
                    <input id="FirstName" type="text" placeholder="Name:" name="name" />
                    <input type="image" id="editbutton" src={Edit} alt="Edit" />
                </div>
                <div>

                    <input type="email" placeholder="Email" value={user["email"]} name="email" onChange={onChange} />
                    <input type="image" id="editbutton" src={Edit} alt="Edit" />
                </div>

                <div id="userStats">

                    <input type="image" id="togglebutton" src={Toggle} alt="Toggle" onClick={onToggle} />
                    <p>User Statistics</p>

                </div>

                <div id="routeHistory">
                    <input type="image" id="togglebutton" src={Toggle} alt="Toggle" onClick={onToggle} />
                    <p>Route History</p>

                </div>

            </div>

        </>);
}


export default Profile;