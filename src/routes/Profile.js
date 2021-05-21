import { authService, db } from "firebase_eb";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import { Alert, Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import RouteHistoryCard from '../components/RouteHistoryCard'
import NavigationBar from '../components/NavigationBar'
import { storage } from 'firebase/storage';


const Profile = () => {
    const history = useHistory();
    const user = authService.currentUser;
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [error, setError] = useState("");
    const [totalTrips, setTotalTrips] = useState(0);
    const [totalDistance, setDistance] = useState(0);
    const [totalEmissionSaved, setEmissions] = useState(0);
    const [message, setMessage] = useState("");
    // const storage = firebase.storage();
    const [routeHistoryArray, setRouteHistoryArray] = useState([]);
    const usersRef = db.collection('users').doc(user.uid);

    const displayRouteDetails = () => {
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

    // function handleUpload() {
    //     const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    //     uploadTask.on("state_changed", console.log, console.error, () => {
    //         storage
    //             .ref("images")
    //             .child(file.name)
    //             .getDownloadURL()
    //             .then((url) => {
    //                 setFile(null);
    //                 setURL(url);
    //                 console.log(url)
    //             });
    //     });
    // }
    /*Image upload end*/
    
    function sumArray(array) {
        var sum = 0;
        for(var i=0; i < array.length; i++) {
            sum += parseFloat(array[i]);
        }
        return sum;
    }

    function getUserStats() {
        var totalDistance = [];
        var totalEmissionsSaved = [];
        try {
            db.collection("users").doc(user.uid).collection("routes").get() // from BCITCOMP 1800 Projects 1, @author: Carly Orr
                .then(function (snap) {
                    snap.forEach(function (doc) {
                        totalDistance.push(parseFloat(doc.data().distance.split(" ")[0]));
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

    const saveChanges = async (e) => {
        e.preventDefault();
        var newName = document.getElementById("name-change").value;
        var newEmail = document.getElementById("email-change").value;

        // console.log(file);
        // await handleUpload();

        // console.log(url);
        // console.log("all good");
        if (user !== null) {
            try {
                if (userName !== newName && newName.trim() !== "") {
                    db.collection("users").doc(user.uid).update({ name: newName });
                }
                if (userEmail !== newEmail) {
                    await user.updateEmail(newEmail); // update email in authentication
                    db.collection("users").doc(user.uid).update({ email: newEmail }); //update email in db
                }
                if (url !== "") {
                    db.collection("users").doc(user.uid).update({ avatar: url });
                }
                displayMessageBox();
                setMessage("Profile updated!");
            } catch (err) {
                displayErrorBox();
                setError(err.message);
            }
        }
    };

    function displayMessageBox(){
        let messagebox = document.getElementById("messagebox");
        messagebox.style["display"] = "block";
    }

    function displayErrorBox(){
        let errorbox = document.getElementById("errorbox");
        errorbox.style["display"] = "block";
    }

    function nameTextToForm(){
        let nameText = document.getElementById("nametext");
        nameText.style["display"] = "none";

        let nameForm = document.getElementById("name-change");
        nameForm.style["display"] = "block";
    }
    
    function emailTextToForm(){
        let emailText = document.getElementById("emailtext");
        emailText.style["display"] = "none";

        let emailForm = document.getElementById("email-change");
        emailForm.style["display"] = "block";
    }

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
                    <Alert id="messagebox" variant ="success">{message}</Alert>
                    <Alert id="errorbox" variant="danger">{error}</Alert>
                    <br />
                    <Button variant="success" type="submit" id="saveEdits" onClick={saveChanges}>Save Changes</Button>
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
                                        {routeHistoryArray}
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