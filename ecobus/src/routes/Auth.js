import { authService, firebaseInstance } from "firebase_eb";
import React, { useState } from "react";
import firebase from "firebase/app";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target : { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSocialClick = async (event) => {
        const {
            target : { name },
        } = event;

        let provider;
        try{
            if(name === "google"){
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            }

            const date = await authService.signInWithPopup(provider);
        } catch(error) {
            console.log(error);
        }
        
        
        
    }


    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
            data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };


    const toggleAcount = () => setNewAccount((prev) => !prev);


    return(
    <div>
        <h2>Weclome to EcoBus</h2> 
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={onChange} 
                required
            />
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={onChange} 
                required
            />
            <input 
                type="submit" 
                value={newAccount ? "Sign Up" : "Sign In"} />
        </form>
        <div>
            <button onClick={toggleAcount}>
                    {newAccount ? "Sign In" : "Sign Up"}
            </button>    
            <button onClick={onSocialClick} name="google" >Continue with Google</button>
        </div>
        <div>
            <small>Please sign in with your email or sign up if you are new to us</small>
        </div>
        <span>{error} </span>
        

    </div>       
    );
    
};

export default Auth;