import { authService, db } from "firebase_eb";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import logo from "../images/logo.png";
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import { storage } from 'firebase/storage';

const Profile = () => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalDistance, setDistance] = useState(0);
    const [totalEmissionSaved, setEmissions] = useState(0);
    const storage = firebase.storage()

    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }

    /* 
    Image upload start
    I found this code on : https://dev.to/samuelkarani/comment/14079
    @authors: Tallan Groberg, Samuel Karani
    */
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload() {
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    setURL(url);
                    console.log(url)
                });
        });
    }
    /*Image upload end*/

    function getUserStats(){
        try{
        db.collection("users").doc(user.uid).collection("routes").get() // from BCITCOMP 1800 Projects 1, @author: Carly Orr
            .then(function (snap) {
                snap.forEach(function (doc) {
                    var n = parseFloat(doc.data().distance.split(" ")[0]);
                    setTotalTrips((prev) => prev+1)
                    setDistance((prev) => prev+n) 
                })
            })
        }catch(err){
            console.log(err);
        }
    }

    const saveChanges = async (e) => {
        e.preventDefault();
        var newName = document.getElementById("name-change").value;
        var newEmail = document.getElementById("email-change").value;

        console.log(file);
        await handleUpload();

        console.log(url);
        console.log("all good");
        if (user !== null) {
            if (userName !== newName && newName.trim() !== "") {
                db.collection("users").doc(user.uid).update({ name: newName });
            }
            if (userEmail !== newEmail) {
                try {
                    user.updateEmail(newEmail); // update email in authentication
                    // db.collection("users").doc(user.uid).update({ email: newEmail }); //update email in db
                } catch (err) {
                    setError(err.message);
                }
            }
            if (url !== "") {
                db.collection("users").doc(user.uid).update({ avatar: url });
            }
        }
    };

    const usersRef = db.collection('users').doc(user.uid);
    usersRef.get().then((doc) => {
        if (doc.exists) {

            setUserEmail(doc.data().email);
            setUserName(doc.data().name);
            setUserAvatar(doc.data().avatar);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    return (

        <div className="profileBody">
            <div id="header">
                <a href="."><input type="image" src={logo} id="logo" alt="logo" /></a>
                <Button variant="danger btn-sm" onClick={onLogoutClick} id="logout">Log Out</Button>
                <hr />
            </div>

            <div className="Profile">
                <div id="avatar">

                    {/* <img src={url} alt="Avatar" onerror="this.style.display='none'" />

                <input type="image" id="avataredit" src={Edit} alt="AvatarEdit" onSubmit={handleUpload} />


                <form onSubmit={handleUpload}>
                <input type="file" onChange={handleChange} />
                <button disabled={!file}>upload to firebase</button>
                </form> */}



                    <img src={userAvatar} id="useravatar" alt="Avatar" />

                    <label for="uploadbutton">
                        <input type="file" accept="image/*" onChange={handleChange} id="uploadbutton"></input>
                        <img id="avataredit" src={Edit} alt="AvatarEdit" />
                    </label>




                </div>
                <form onSubmit={saveChanges}>
                    <span id="nameForm">
                        <h4 id="profileHeader">Name:</h4>
                        <input id="name-change" type="text" placeholder="Name" name="name" defaultValue={userName} />
                        <img src={Edit} id="editbutton" alt="Edit" />
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>

                    <span id="emailForm">
                        <h4 id="profileHeader">Email:</h4>
                        <input type="email" placeholder="Email" name="email" id="email-change" defaultValue={userEmail} />
                        <img src={Edit} id="editbutton" alt="Edit" />
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>
                    <span>{error}</span>
                    <br />
                    <Button variant="success" type="submit" id="saveEdits">Save Changes</Button>
                </form>

                <div id="userHistory">
                    <Accordion>
                        <Card>
                            <Card.Header id="toggleHeader">
                                <Accordion.Toggle as={Button} onClick={getUserStats} variant="link" eventKey="0" id="toggleButton" >
                                    User Statistics
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item variant="secondary">Total Trips: {totalTrips}</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">Total Distance Travelled: {totalDistance} km</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">Total Emissions Saved: {totalEmissionSaved}</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header id="toggleHeader">
                                <Accordion.Toggle as={Button} variant="link" eventKey="1" id="toggleButton">
                                    Route History
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <ListGroup variant="flush">
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                    Route 1
                                    </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item variant="secondary">Starting location: UBC</ListGroup.Item>
                                                    <ListGroup.Item variant="secondary">Ending location: Metrotown</ListGroup.Item>
                                                    <ListGroup.Item variant="secondary">Total emissions saved: 7.5kg of CO2</ListGroup.Item>
                                                </ListGroup>
                                            </Accordion.Collapse>
                                        </Card>

                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    Route 2
                                        </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="1">
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item variant="secondary">Starting location: BCIT Downtown</ListGroup.Item>
                                                    <ListGroup.Item variant="secondary">Ending location: BCIT Burnaby</ListGroup.Item>
                                                    <ListGroup.Item variant="secondary">Total emissions saved: 6kg of CO2</ListGroup.Item>
                                                </ListGroup>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>

            </div>
        </div>
    );
}


export default Profile;