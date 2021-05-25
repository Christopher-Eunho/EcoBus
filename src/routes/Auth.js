import { authService, firebaseInstance, db } from "firebase_eb"
import 'firebase/firestore'
import React, { useState } from "react"
import { useHistory } from "react-router"
import Button from 'react-bootstrap/Button' // https://react-bootstrap.github.io/
import Form from 'react-bootstrap/Form'
import GoogleButton from 'react-google-button' // https://www.npmjs.com/package/react-google-button
import '../styles/auth.css'
import logo from '../images/logo.png'

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

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
            authService.signInWithPopup(provider)
            .then(() => {
                history.push("/map");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            })
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
                
                // Add user email to firestore start
                // Source: https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
                var user = authService.currentUser;

                const userRef = db.collection("users").doc(user.uid).set({
                    name: user.email.split("@")[0], 
                    email: user["email"],
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/ecobus-189e8.appspot.com/o/images%2Fleaf.png?alt=media&token=3a9eda40-579e-4e89-b27b-83be349e71bd'
                });
                // Add user email to firestore end
                history.push("/map");
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
                history.push("/map");
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <div className="center">
            <a href=".">
                <img src={logo} className="logo" alt="Logo"/>
            </a>
            
            <hr/>
            
            <h2 className="welcome-message">Welcome! <br />Please {newAccount? "Sign Up for" : "Sign In to"} EcoBus.</h2>  
            
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
                
                <div className="authentication-button-container">
                    <Button type="submit" id="sign-in-up-button"> 
                        {newAccount ? "Sign Up" : "Sign In"} 
                    </Button>
                    
                    <Button variant="danger" className="welcome-message" id="change-to-sign-in-up" onClick={toggleAccount}> 
                        I want to {newAccount ? "sign in!" : "sign up!"}
                    </Button>
                </div>
                <span id="error-message"> {error} </span>
            </Form>

            <GoogleButton className="center" onClick={() => onSocialClick("google")} />
        </div>
    );
};

export default Auth;