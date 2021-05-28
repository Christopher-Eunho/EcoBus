/**
 * Route history card.
 * Contains information about route's origin, destination, total distance, and total emissions saved.
 * Will be inserted in Route History accordian after user saves a new route.
 */

import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';
import { db, authService } from "firebase_eb";

const RouteHistoryCard = (props) => {
    const user = authService.currentUser;
    const userRoutes = db.collection('users').doc(user.uid).collection("routes");

    function refreshPage() {
        window.location.reload(false);
    }

    function deleteRoute() {
        /**
         * Delete route from current user's collection in database, then reload page to display this change.
         */
        if (user != null) {
            userRoutes.get()
                .then(function(snap) {
                    snap.forEach(function (doc) {
                        var data = doc.data();
                        if (data.origin === props.origin && 
                            data.destination === props.destination && 
                            data.distance === props.distance && 
                            data.emissions_saved === props.emissionsSaved) {
                                var route = userRoutes.doc(doc.id);
                                route.delete()
                                .then(() => {
                                    refreshPage();
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                })
                        }
                    })
                }).catch((error) => {
                    console.log(error);
                })
        }
    }

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={props.eventKey.toString()}>
                        Route {props.eventKey}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey.toString()}>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant="secondary">Starting location: {props.origin}</ListGroup.Item>
                        <ListGroup.Item variant="secondary">Ending location: {props.destination}</ListGroup.Item>
                        <ListGroup.Item variant="secondary">Total distance: {props.distance}</ListGroup.Item>
                        <ListGroup.Item variant="secondary">Total emissions saved: {props.emissionsSaved}kg of CO2</ListGroup.Item>
                        <ListGroup.Item variant="secondary">
                            <Button variant="danger" onClick={deleteRoute}>Delete Route</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Accordion.Collapse>
            </Card>
        )
    }

export default RouteHistoryCard
