// import { authService, firebaseInstance } from "firebase_eb";
// import React, { useState } from "react";
// import firebase from "firebase/app";
// import Button from 'react-bootstrap/Button'; // https://react-bootstrap.github.io/
// import Form from 'react-bootstrap/Form';
// import GoogleButton from 'react-google-button'; // https://www.npmjs.com/package/react-google-button
// import '../styles/auth.css'
// import logo from '../images/logo.png'

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
                    value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            
            <button onClick={toggleAcount}>
                {newAccount ? "Sign In" : "Create Account"}
            </button>
        
            <span>{error} </span>
    </div>       
    );
    
};

export default Auth;