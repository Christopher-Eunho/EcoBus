import { authService, firebaseInstance } from "firebase_eb";
import React, { useState } from "react";
import firebase from "firebase/app";
import Button from 'react-bootstrap/Button'; // https://react-bootstrap.github.io/
import Form from 'react-bootstrap/Form';
import GoogleButton from 'react-google-button'; // https://www.npmjs.com/package/react-google-button

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
        <div>
            <h2>Welcome to EcoBus</h2>
            <Form onSubmit={onSubmit}>
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

                <Button type="submit">Sign In</Button>
            </Form>
            <div>
                <Button variant="secondary" type="submit" onClick={toggleAcount}>Sign Up</Button>
                <GoogleButton onClick={() => onSocialClick("google")} />
            </div>
            <div>
                <small>Please sign in with your email or sign up if you are new to us</small>
            </div>
            <span>{error} </span>
        </div>
    );

};

export default Auth;