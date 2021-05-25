import { Button } from 'react-bootstrap';
import Checkmark from '../images/checkmark.png'

const SavedTransitRoute = () => {
    
    // Source: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
    function refreshPage() {
        window.location.reload(false);
    }
    
    return (
        <section class="search-process-container" id="route-saved-message-container">
            <p>Your journey has been saved!</p>
            <p>You saved <span id="saved-route-message-emissions-saved">N/A</span> kilograms of CO2 by taking public transporation! Thank you for being eco-friendly.</p>
        <div id="route-saved-message-buttons-container">
            <div id="social-media-share-buttons-container">
                <Button variant="primary">Twit</Button>
                <Button variant="primary">Face</Button>
            </div>
            <button variant="success" id="accept-button">
                <img src={Checkmark} onClick={refreshPage} alt="White Checkmark Button"></img>
            </button>
        </div>
        </section>
    )
}

export default SavedTransitRoute
