import { authService } from "firebase_EB";
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
            <button onClick={onLogoutClick}>Log Out</button>
        </>);
}
export default Profile;