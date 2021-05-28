import AppRouter from "components/Router";
import React, {useEffect, useState} from "react"
import {authService} from "firebase_eb";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Check weather user is logged in and renders router after finishing the checking.
*/
function App() {
    
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    
    
    
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    }, []);
    
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing.."}
        </>);
}

export default App;
