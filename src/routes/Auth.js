import { authService, firebaseInstance } from "firebase_eb";
import React, { useState } from "react";
import firebase from "firebase/app";
import Button from 'react-bootstrap/Button'; // https://react-bootstrap.github.io/
import Form from 'react-bootstrap/Form';
import GoogleButton from 'react-google-button'; // https://www.npmjs.com/package/react-google-button
import '../styles/auth.css'
import logo from '../images/logo.png'

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSocialClick = async (event) => {
        let provider;
        try {
            if (event === "google") {
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            }

            const date = await authService.signInWithPopup(provider);
        } catch (error) {
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


    return (
        <div className="center">
            <a href=".">
                <img src={logo} className="logo" alt="Logo"/>
            </a>
            
            <hr/>
            
            <h2 className="welcome-message">Welcome to EcoBus</h2>
            
            <Form onSubmit={onSubmit} className="login-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        required />
                </Form.Group>
                <Button type="submit"> 
                    {newAccount ? "Create Account" : "Sign In"} 
                </Button>
            </Form>
            
            <Button variant="secondary" onClick={toggleAcount}>
                {newAccount ? "Sign In" : "Create Account"}
            </Button>
            
            <GoogleButton className="center" onClick={() => onSocialClick("google")} />

            <span>{error} </span>
        </div>
    );

};

export default Auth;