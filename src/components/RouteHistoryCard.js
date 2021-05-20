import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';


const RouteHistoryCard = (props) => {
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" id="route-history-accordion-toggle" eventkey={props.eventKey}>
                    Route {props.eventKey}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse id="route-history-accordion-collapse" eventkey={props.eventKey}>
                <ListGroup variant="flush">
                    <ListGroup.Item variant="secondary">{props.origin}</ListGroup.Item>
                    <ListGroup.Item variant="secondary">{props.destination}</ListGroup.Item>
                    <ListGroup.Item variant="secondary">{props.distance}</ListGroup.Item>
                    <ListGroup.Item variant="secondary">{props.emissionsSaved}</ListGroup.Item>
                </ListGroup>
            </Accordion.Collapse>
        </Card>
    )
}

export default RouteHistoryCard
