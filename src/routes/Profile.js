import { authService, db } from "firebase_eb";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "../styles/Profile.css";
import Edit from "../images/editbutton.png";
import logo from "../images/logo.png";
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
    // const [toggle, setToggle] = useState(false);
    // const [name, changeName] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm(); //taken from https://react-hook-form.com/get-started 

    const usersRef = db.collection('users').doc(authService.currentUser.uid); // from COMP 1800
    
    usersRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data().email);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    

    console.log(usersRef);
    console.log("all good");


    const totalTrips = 0;
    const totalDistance = 0;
    const totalEmissionSaved = 0;

    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }


    // const onEdit =  async (event) => {

    //      await firebase.User.updateEmail(email)
    // }


    /* 
    Image upload start
    I found this code on : https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
    @authors: Tallan Groberg, Samuel Karani
    */
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
  
    function handleChange(e) {
      setFile(e.target.files[0]);
    }
  
    function handleUpload(e) {
      e.preventDefault();
      const uploadTask = db.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        db
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
          });
      });
    }
    /*Image upload end*/
    

    const saveChanges = () => {
        var email, uid;

        var newEmail = document.getElementById("email-change");
        
        if (user != null) {
          email = user.email;
          uid = user.uid;
          user.updateEmail(newEmail.value).then(function() {
            // Update successful.
          }).catch(function(error) {
            console.log(error);
          });
        }
    };


    const onSubmit = (data) => {
        console.log(data)
    };


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

                <input type="image" id="avataredit" src={Edit} alt="AvatarEdit" onSubmit={handleUpload} /> */}


                {/* <form onSubmit={handleUpload}>
                <input type="file" onChange={handleChange} />
                <button disabled={!file}>upload to firebase</button>
                </form> */}

                

                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" /> 
                <input type="image" id="avataredit" src={Edit} alt="AvatarEdit"></input>
                
                {/*query image later from database*/}
                    
                    
                    
                    


                    




                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span id="nameForm">
                        <h4 id="profileHeader">Name:</h4>
                        <input id="FirstName" type="text" placeholder="Name" name="name" defaultValue={user.email.split("@")[0]} {...register("name")} />
                        <img src={Edit} id="editbutton" alt="Edit" />
                        {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    </span>

                    <span id="emailForm">
                        <h4 id="profileHeader">Email:</h4>
                        <input type="email" placeholder="Email" name="email" id="email-change" defaultValue={user["email"]} {...register("email")} />
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