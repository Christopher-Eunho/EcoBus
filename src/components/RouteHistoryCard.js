import { Accordion, Button, Card, ListGroup } from 'react-bootstrap';


const RouteHistoryCard = () => {
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" id="route-history-accordion-toggle" eventKey="0">
                    Route 1
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse id="route-history-accordion-collapse" eventKey="0">
                <ListGroup variant="flush">
                    <ListGroup.Item variant="secondary" id="route-history-starting-location">Starting location: UBC</ListGroup.Item>
                    <ListGroup.Item variant="secondary" id="route-history-ending-location">Ending location: Metrotown</ListGroup.Item>
                    <ListGroup.Item variant="secondary" id="route-history-total-distance">Total emissions saved: 7.5kg of CO2</ListGroup.Item>
                    <ListGroup.Item variant="secondary" id="route-history-total-emissions">Total emissions saved: 7.5kg of CO2</ListGroup.Item>
                </ListGroup>
            </Accordion.Collapse>
        </Card>
    )
}

export default RouteHistoryCard
