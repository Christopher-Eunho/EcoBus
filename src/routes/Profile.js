import { authService, db } from "firebase_eb";
import React, { useState } from "react";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import { Alert, Accordion, Button, Card, ListGroup, Modal, } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar'
import ReactImageFallback from "react-image-fallback";
import TransparentImg from "../images/initialavatarimg.png";
import RouteHistoryCard from '../components/RouteHistoryCard'
import RouteHistoryEmptyCard from '../components/RouteHistoryEmptyCard'
import { storage } from 'firebase/storage';
import firebase from "firebase/app";

const Profile = () => {
    const user = authService.currentUser;
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalDistance, setDistance] = useState(0);
    const [totalEmissionSaved, setEmissions] = useState(0);
    const [message, setMessage] = useState("");
    const [routeHistoryArray, setRouteHistoryArray] = useState([]);
    const usersRef = db.collection('users').doc(user.uid);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState(null);
    const storage = firebase.storage()


    const displayRouteDetails = () => {
        /**
         * Grab stored user routes from firestore database then stores it in a card.
         * 
         * Loops through the current users routes from firestore and stores the route number, origin, distance, distance and emission saved.
         * The saved data is then pushed and displayed onto a card as a child of a Bootstrap accordion parent. 
         */
        var routeCounter = 1;
        var routes = [];
        // idea for activating function only on first click sourced from: https://stackoverflow.com/questions/31702173/execute-clickfunction-only-first-click
        if (user != null) {
            usersRef.collection("routes").get()
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        let route = doc.data();
                        routes.push(
                            <RouteHistoryCard
                                eventKey={routeCounter}
                                origin={route.origin}
                                destination={route.destination}
                                distance={route.distance}
                                emissionsSaved={route.emissions_saved}
                            />)
                        routeCounter++;
                    })
                    setRouteHistoryArray(routes);
                })
        }
    }

    /**
    * Image upload start
    * I found this code on : https://dev.to/samuelkarani/comment/14079
    * @authors: Tallan Groberg, Samuel Karani
    */
    function handleChange(e) {
        /**
         * Check if file being uploaded is in a valid image format.
         */
        showUploadButton();
        hideAvatarEditBtn();
        let imageFile = e.target.files[0];
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|apng|avif|svg|webp|bmp|ico|tiff)$/)) { // regex format taken from https://www.cluemediator.com/validate-image-content-in-reactjs
            alert("This is not a valid image file!");
            window.location.reload();
        } else {
            setFile(imageFile);
        }
    }

    function handleUpload() {
        /**
         * Upload image to firestore database then generates a link to the image.
         */
        return new Promise(resolve => {
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        setFile(null);
                        resolve(url);
                    });
            });
        });
    }
    /*Image upload end*/

    function sumArray(array) {
        /**
         * Sum all the numbers in an array then converts it into a float.
         * 
         * param array: must be an array containing only numbers
         */
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += parseFloat(array[i]);
        }
        return sum;
    }

    function getUserStats() {
        /**
         * Grab user route data from firestore.
         * 
         * Retrieves distance and emissions for each trip from user's routes in firestore then adds them together.
         * Total trip, distance and emissions states are then changed from the added number.
         */
        var totalDistance = [];
        var totalEmissionsSaved = [];
        try {
            db.collection("users").doc(user.uid).collection("routes").get() // abstracted from BCIT COMP 1800 Projects 1, @author: Carly Orr
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        totalDistance.push(parseFloat(doc.data().distance.split(" ")[0])); // convert string from "xx km" format into a float
                        totalEmissionsSaved.push(parseFloat(doc.data().emissions_saved));
                    })
                    setTotalTrips(totalDistance.length);
                    setDistance(sumArray(totalDistance).toFixed(2));
                    setEmissions(sumArray(totalEmissionsSaved).toFixed(2));
                })
        } catch (err) {
            console.log(err);
        }
    }

    async function saveChanges() {
        /**
         * Save user edited data into database.
         * 
         * Check if user has uploaded a file and if any changes were made to the name and email form.
         * Changes that were made are then updated to the database and will display a message if successful.
         * 
         * If an error occurs, it will display an error message.
         */
        var newName = document.getElementById("name-change").value; // get name from forms
        var newEmail = document.getElementById("email-change").value; // get email from forms
        let newAvatar = "";

        if (file !== null) {
            newAvatar = await handleUpload(); // wait for avatar to be uploaded before continuing
        }

        if (user !== null) { // check if user is logged in
            try {
                if (userName !== newName && newName.trim() !== "") { // check if name is empty and if its the same one as before 
                    db.collection("users").doc(user.uid).update({ name: newName });
                }
                if (userEmail !== newEmail) {
                    await user.updateEmail(newEmail); // update email in authentication
                    db.collection("users").doc(user.uid).update({ email: newEmail }); //update email in db
                }
                if (newAvatar !== "") { // check if an avatar is uploaded
                    db.collection("users").doc(user.uid).update({ avatar: newAvatar });
                    hideAvatarUpload();
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
        /**
         * Show message box by changing the css property "display" to block.
         */
        let messagebox = document.getElementById("messagebox");
        messagebox.style["display"] = "block";
    }

    function displayErrorBox() {
        /**
         * Show error box by changing the css property "display" to block.
         */
        let errorbox = document.getElementById("errorbox");
        errorbox.style["display"] = "block";
    }

    function nameTextToForm() {
        /**
         * Hide name text by changing the css property "display" to none.
         * 
         * Show name form by changing the css property "display" to block.
         */
        let nameText = document.getElementById("nametext");
        nameText.style["display"] = "none";

        let nameForm = document.getElementById("name-change");
        nameForm.style["display"] = "block";
    }

    function emailTextToForm() {
        /**
         * Hide email text by changing the css property "display" to none.
         * 
         * Show email form by changing the css property "display" to block.
         */
        let emailText = document.getElementById("emailtext");
        emailText.style["display"] = "none";

        let emailForm = document.getElementById("email-change");
        emailForm.style["display"] = "block";
    }

    function showUploadButton() {
        /**
         * Show upload button by changing the css property "display" to inline.
         */
        let uploadbutton = document.getElementById("uploadbutton");
        uploadbutton.style["display"] = "inline";
    }

    function hideAvatarEditBtn() {
        /**
         * Hide avatar edit button by changing the css property "display" to none.
         */
        let avatarBtn = document.getElementById("avataredit");
        avatarBtn.style["display"] = "none";
    }

    function hideAvatarUpload() {
        /**
         * Hide upload button by changing the css property "display" to none.
         */
        let uploadbutton = document.getElementById("uploadbutton");
        uploadbutton.style["display"] = "none";
    }

    function setUserValues() {
        /**
         * Populate user's name, email and avatar from firestore database.
         * 
         * Retrieve current user's id then queries into the database and retrieves name, email and avatar values from the database.
         * The retrieved values will then be set as the new states for userEmail, userName and userAvatar.
         */
        usersRef.get().then((doc) => {  // abstracted from https://cloud.google.com/firestore/docs/query-data/get-data
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
    }

    setUserValues();

    /** delete firestore collection start
    * Taken from: https://stackoverflow.com/questions/62090827/how-to-delete-all-the-documents-in-a-firestore-collection-database
    * @author: Doug Stevenson
    */
    function deleteUserData() {
        /**
         * Delete all routes from current users history in firestore.  
         */
        db.collection('users').doc(user.uid).collection('routes').get()
            .then(querySnapshot => {
                if (querySnapshot.docs.length != 0) {
                    querySnapshot.docs.forEach(snapshot => {
                        snapshot.ref.delete()
                            .then(() => {
                                alert("Data deleted!")
                                window.location.reload()
                            })
                    })
                } else {
                    alert("No data to delete!");
                    window.location.reload();
                }
            })

    }
    /*delete firestore collection end*/

    return (

        <div className="profileBody">
            <NavigationBar />
            <div className="Profile">
                <div id="avatar">
                    <ReactImageFallback src={userAvatar} initialImage={TransparentImg} fallbackImage="https://firebasestorage.googleapis.com/v0/b/ecobus-189e8.appspot.com/o/images%2Fleaf.png?alt=media&token=3a9eda40-579e-4e89-b27b-83be349e71bd" id="useravatar" alt="Avatar" />
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
                            <img src={Edit} alt="edit_button"></img>
                        </button>

                    </span>

                    <span id="emailForm">
                        <h4 id="profileHeader">Email:</h4>
                        <h4 id="emailtext">{userEmail}</h4>
                        <input type="email" placeholder="Email" name="email" id="email-change" defaultValue={userEmail} />
                        <button id="emailBtn" type="button" onClick={emailTextToForm}>
                            <img src={Edit} alt="edit_button"></img>
                        </button>
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
                                    <ListGroup.Item variant="secondary">Total Emissions Saved: {totalEmissionSaved} CO2</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header id="toggleHeader">
                                <Accordion.Toggle as={Button} onClick={displayRouteDetails} variant="link" eventKey="1" id="toggleButton">
                                    Route History
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <ListGroup variant="flush">
                                    <Accordion>
                                        {routeHistoryArray.length > 0 ? (
                                            routeHistoryArray
                                        ) : (
                                            <RouteHistoryEmptyCard />
                                        )}
                                    </Accordion>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
                <div id="clearuserdata">
                    <Button variant="danger" id="clear-all-data-button" onClick={handleShow}>Clear all data</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete all user data?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Note: This cannot be undone.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="danger" onClick={deleteUserData}>Delete my data</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div >
    );
}


export default Profile;