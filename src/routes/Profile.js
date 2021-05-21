import { db } from "firebase_eb";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import { Alert, Accordion, Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { storage } from 'firebase/storage';
import NavigationBar from '../components/NavigationBar'
import ReactImageFallback from "react-image-fallback";
import TransparentImg from "../images/initialavatarimg.png";


const Profile = () => {
    const user = firebase.auth().currentUser;
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalDistance, setDistance] = useState(0);
    const [totalEmissionSaved, setEmissions] = useState(0);
    const [message, setMessage] = useState("");
    const storage = firebase.storage()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* 
    Image upload start
    I found this code on : https://dev.to/samuelkarani/comment/14079
    @authors: Tallan Groberg, Samuel Karani
    */
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        showUploadButton();
        hideAvatarEditBtn();
        let imageFile = e.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|apng|avif|svg|webp|bmp|ico|tiff)$/)){ // regex format taken from https://www.cluemediator.com/validate-image-content-in-reactjs
            alert("This is not a valid image file!");
            window.location.reload();
        }else{
            setFile(imageFile);
        }
    }

    function handleUpload() {
        return new Promise(resolve => {
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        setFile(null);
                        setURL(url);
                        resolve(url);
                    });
            });
        });
    }

    /*Image upload end*/

    function getUserStats() {
        setTotalTrips(0);
        setDistance(0);
        setEmissions(0);
        try {
            db.collection("users").doc(user.uid).collection("routes").get() // from BCIT COMP 1800 Projects 1, @author: Carly Orr
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        var n = parseFloat(doc.data().distance.split(" ")[0]);
                        setTotalTrips((prev) => prev + 1)
                        setDistance((prev) => prev + n)
                    })
                })
        } catch (err) {
            console.log(err);
        }
    }

    async function saveChanges() {
        var newName = document.getElementById("name-change").value;
        var newEmail = document.getElementById("email-change").value;

        let newAvatar = await handleUpload();

        if (user !== null) {
            try {
                if (userName !== newName && newName.trim() !== "") {
                    db.collection("users").doc(user.uid).update({ name: newName });
                }
                if (userEmail !== newEmail) {
                    await user.updateEmail(newEmail); // update email in authentication
                    db.collection("users").doc(user.uid).update({ email: newEmail }); //update email in db
                }
                if (newAvatar !== "") {
                    db.collection("users").doc(user.uid).update({ avatar: newAvatar });
                }
                displayMessageBox();
                setMessage("Profile updated!");
            } catch (err) {
                displayErrorBox();
                setError(err.message);
            }
        }
    };

    function displayMessageBox() {
        let messagebox = document.getElementById("messagebox");
        messagebox.style["display"] = "block";
    }

    function displayErrorBox() {
        let errorbox = document.getElementById("errorbox");
        errorbox.style["display"] = "block";
    }

    function nameTextToForm() {
        let nameText = document.getElementById("nametext");
        nameText.style["display"] = "none";

        let nameForm = document.getElementById("name-change");
        nameForm.style["display"] = "block";
    }

    function emailTextToForm() {
        let emailText = document.getElementById("emailtext");
        emailText.style["display"] = "none";

        let emailForm = document.getElementById("email-change");
        emailForm.style["display"] = "block";
    }

    function showUploadButton() {
        let uploadbutton = document.getElementById("uploadbutton");
        uploadbutton.style["display"] = "inline";
    }

    function hideAvatarEditBtn() {
        let avatarBtn = document.getElementById("avataredit");
        avatarBtn.style["display"] = "none";
    }

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
            <NavigationBar />
            <div className="Profile">
                <div id="avatar">
                    <ReactImageFallback src={userAvatar} initialImage={TransparentImg} fallbackImage="https://firebasestorage.googleapis.com/v0/b/ecobus-189e8.appspot.com/o/images%2Fleaf.png?alt=media&token=7c48767b-3c49-4c46-98e7-ab627f5ae81d" id="useravatar" alt="Avatar" />
                    <label for="uploadbutton">
                        <input type="file" accept="image/*" onChange={handleChange} id="uploadbutton"></input>
                        <img id="avataredit" src={Edit} alt="AvatarEdit" />
                    </label>
                </div>
                <form>
                    <span id="nameForm">
                        <h4 id="profileHeader">Name:</h4>
                        <h4 id="nametext">{userName}</h4>
                        <input id="name-change" type="text" placeholder="Name" name="name" defaultValue={userName} />
                        <button id="nameBtn" type="button" onClick={nameTextToForm}>
                            <img src={Edit}></img>
                        </button>
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>

                    <span id="emailForm">
                        <h4 id="profileHeader">Email:</h4>
                        <h4 id="emailtext">{userEmail}</h4>
                        <input type="email" placeholder="Email" name="email" id="email-change" defaultValue={userEmail} />
                        <button id="emailBtn" type="button" onClick={emailTextToForm}>
                            <img src={Edit}></img>
                        </button>
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>
                    <Alert id="messagebox" variant="success">{message}</Alert>
                    <Alert id="errorbox" variant="danger">{error}</Alert>
                    <br />
                    <Button variant="success" type="button" id="saveEdits" onClick={saveChanges}>Save Changes</Button>
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
        </div >
    );
}


export default Profile;