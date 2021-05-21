import { authService, db } from "firebase_eb";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import NavigationBar from '../components/NavigationBar'
import RouteHistoryCard from '../components/RouteHistoryCard'

const Profile = () => {
    const history = useHistory();
    const user = authService.currentUser;
    // const [toggle, setToggle] = useState(false);
    // const [name, changeName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [routeHistoryArray, setRouteHistoryArray] = useState([]);
    let click = 0;

    // const storage = firebase.storage()

    const { register, handleSubmit, watch, formState: { errors } } = useForm(); //taken from https://react-hook-form.com/get-started 


    const totalTrips = 0;
    const totalDistance = 0;
    const totalEmissionSaved = 0;


    // const onEdit =  async (event) => {

    //      await firebase.User.updateEmail(email)
    // }


    /* 
    Image upload start
    I found this code on : https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
    @authors: Tallan Groberg, Samuel Karani
    */
    const [file, setFile] = useState(null);
    // const [url, setURL] = useState("");


    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    // function handleUpload(e) {
    //     e.preventDefault();
    //     const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    //     uploadTask.on("state_changed", console.log, console.error, () => {
    //     storage
    //         .ref("images")
    //         .child(file.name)
    //         .getDownloadURL()
    //         .then((url) => {
    //         setFile(null);
    //         setURL(url);
    //         });

    //     });
    // }

    // return (
    //     <div>
    //     <form onSubmit={handleUpload}>
    //         <input type="file" onChange={handleChange} />
    //         <button disabled={!file}>upload to firebase</button>
    //     </form>
    //     <img src={url} alt="" />
    //     </div>
    // );

    /*Image upload end*/


    const saveChanges = () => {
        var newEmail = document.getElementById("email-change");

        if (user != null) {
            var email, uid;
            email = user.email;
            uid = user.uid;
            user.updateEmail(newEmail.value).then(function () {
                // Update successful.
            }).catch(function (error) {
                console.log(error);
            });
        }
    };


    const onSubmit = (data) => {
        console.log(data)
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

    function addNewRouteHistoryCard() {
        var routeCounter = 1;
        // idea for activating function only on first click source: https://stackoverflow.com/questions/31702173/execute-clickfunction-only-first-click
        if (user != null) {
            if (click == 0) {
                usersRef.collection("routes").get()
                    .then(function (snap) {
                        snap.forEach(function (doc) {
                            let route = doc.data();
                                console.log(route.origin);
                                routeHistoryArray.push(<RouteHistoryCard eventKey={routeCounter} origin={route.origin} destination={route.destination} 
                                                        distance={route.distance} emissionsSaved={route.emissions_saved}/>)
                                routeCounter++;
                                console.log(routeCounter);
                                console.log(click);
                        })
                    })
            }
            click++;
        }
    }

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
                        <input type="file" onClick={handleChange} id="uploadbutton"></input>
                        <img id="avataredit" src={Edit} alt="AvatarEdit" />
                    </label>




                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span id="nameForm">
                        <h4 id="profileHeader">Name:</h4>
                        <input id="FirstName" type="text" placeholder="Name" name="name" defaultValue={userName} {...register("name")} />
                        <img src={Edit} id="editbutton" alt="Edit" />
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>

                    <span id="emailForm">
                        <h4 id="profileHeader">Email:</h4>
                        <input type="email" placeholder="Email" name="email" id="email-change" defaultValue={userEmail} {...register("email")} />
                        <img src={Edit} id="editbutton" alt="Edit" />
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>
                    <br />
                    <Button variant="success" type="submit" id="saveEdits" onClick={saveChanges}>Save Changes</Button>
                </form>

                <div id="userHistory">
                    <Accordion>
                        <Card>
                            <Card.Header id="toggleHeader">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" id="toggleButton" >
                                    User Statistics
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <ListGroup variant="flush">
                                    <ListGroup.Item variant="secondary">Total Trips: {totalTrips}</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">Total Distance Travelled: {totalDistance}</ListGroup.Item>
                                    <ListGroup.Item variant="secondary">Total Emissions Saved: {totalEmissionSaved}</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Card.Header id="toggleHeader">
                                <Accordion.Toggle as={Button} onClick={addNewRouteHistoryCard} variant="link" eventKey="1" id="toggleButton">
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