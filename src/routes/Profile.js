import { authService } from "firebase_eb";
import React, { useState } from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import "../styles/profile.css";
import Edit from "../images/editbutton.png";
import logo from "../images/logo.png";
import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import {useForm} from 'react-hook-form';

const Profile = () => {
    const history = useHistory();
    const user = firebase.auth().currentUser;
    // const [toggle, setToggle] = useState(false);
    // const [name, changeName] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm(); //taken from https://react-hook-form.com/get-started

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
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" /> {/*query image later from database*/}
                    <input type="image" id="avataredit" src={Edit} alt="AvatarEdit" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input id="FirstName" type="text" placeholder="Name" name="name" defaultValue="Austin" {...register("name")}/>
                    <img src={Edit} id="editbutton" alt="Edit"/>
                    {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    <input type="email" placeholder="Email" name="email" defaultValue={user["email"]} {...register("email")} />
                    <img src={Edit} id="editbutton" alt="Edit"/>
                    {/* <input type="image" id="editbutton" src={Edit} alt="Edit" /> */}
                    <br/>
                    <input type="submit" id="saveEdits" value="Save Changes"/>
                </form>

                <div id="userHistory">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
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
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
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