import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';


const RouteHistoryCard = (props) => {
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
                </ListGroup>
            </Accordion.Collapse>
        </Card>
    )
}

export default RouteHistoryCard
