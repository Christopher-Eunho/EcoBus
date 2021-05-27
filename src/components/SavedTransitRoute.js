import { Button } from 'react-bootstrap';
import Checkmark from '../images/checkmark.png'

const SavedTransitRoute = ( {
    emissionSaved,
    setIsSearchFormOn,
    setIsSavedTransitRouteOn
    } ) => {
    
    function goToSearch() {
        setIsSearchFormOn(true);
        setIsSavedTransitRouteOn(false);
    }
    
    return (
        <section class="search-process-container" id="route-saved-message-container">
            <p>Your journey has been saved!</p>
            <p>You saved <span id="saved-route-message-emissions-saved">{emissionSaved}</span> kilograms of CO2 by taking public transporation! Thank you for being eco-friendly.</p>
        <div id="route-saved-message-buttons-container">
            <div id="social-media-share-buttons-container">
                <Button variant="primary">Twit</Button>
                <Button variant="primary">Face</Button>
            </div>
            <button variant="success" id="accept-button">
                <img src={Checkmark} onClick={goToSearch} alt="White Checkmark Button"></img>
            </button>
        </div>
        </section>
    )
}

export default SavedTransitRoute
