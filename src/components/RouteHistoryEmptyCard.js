/**
 * Display message telling user that they have no saved routes in their collection.
 * Display "Add Route" button which redirects user to map when clicked.
 */

import { Button, Card, ListGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const RouteHistoryEmptyCard = () => {
    const history = useHistory();
    
    function addRoute() {
        /**
         * Redirect user to map.
         */
        history.push("/map");
    }

    return (
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item variant="secondary">
                    You have no saved routes.
                    <br/><br/> 
                    You can click on 'Add Route' to go to the map and save a new route.
                    <br/>
                    <Button variant="success" id="add-route-button" onClick={addRoute}>Add Route</Button>
                    </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default RouteHistoryEmptyCard
