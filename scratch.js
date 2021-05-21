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


// const [show, setShow] = useState(false);
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

// function deleteUserData(){

// }
// <div id="clearuserdata">
// <Button variant="danger" onClick={handleShow}>Clear all data</Button>
// <Modal show={show} onHide={handleClose}>
//     <Modal.Header closeButton>
//         <Modal.Title>Delete all user data?</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>Note: This cannot be undone.</Modal.Body>
//     <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>Close</Button>
//         <Button variant="danger" onClick={handleClose}>Delete my data</Button>
//     </Modal.Footer>
// </Modal>
// </div>