import { authService } from "firebase_eb";
import React from "react";
import { useHistory } from "react-router";

const Profile = () => {
        const history = useHistory();
        const onLogoutClick = () => {
            authService.signOut();
            history.push("/");
        }
        return(
        <>
            <img src="https://randomuser.me/api/portraits/thumb/men/1.jpg" alt="Avatar"/>
            <input type="text" placeholder="Name:"/>
            <input type="email" placeholder="Email:"/>
            <button>User Statistics</button>
            <button>Route History</button>
            <button onClick={onLogoutClick}>Log Out</button>
        </>);
}
export default Profile;