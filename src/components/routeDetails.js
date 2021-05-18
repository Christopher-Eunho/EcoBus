import BackButton from '../images/back-button.png'
import Leaf from '../images/leaf.png'

const RouteDetails = () => {
    const goBack = () => {
        let routeDetailsContainer = document.getElementById("route-details-container");
        routeDetailsContainer.style["display"] = "none";
        
        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "flex";
    }

    const saveJourney = () => {
        let drivingOptionDetails = document.getElementById("route-details-container");
        drivingOptionDetails.style["display"] = "none";
        
        let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        drivingJourneySavedContainer.style["display"] = "block";

        setTimeout(function() { 
            let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
            let searchFormContainer = document.getElementById("search-container");
            
            drivingJourneySavedContainer.style["display"] = "none";
            searchFormContainer.style["display"] = "flex";
            
        }, 7000);

    }
    
    return (
        <section className="search-process-container" id="route-details-container">
            <button className="back-button" onClick={goBack}>
                <img src={BackButton} alt="Back Button"/>
            </button>
            
            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon"/>
                <h5 id="emissions-saved-message"><span id="emissions-saved-value">00000</span> KG of C02 saved</h5>
                
                <div id="transit-route-information">
                    <ul>
                        <li>Travel time: <span id="transit-travel-time">0000</span></li>
                        <li>Distance: <span id="transit-travel-distance">0000</span></li>
                        <li>Emissions saved: <span id="transit-emissions-saved">0000</span></li>
                    </ul>
                </div>
            </div>
            

            
            <button className="save-journey-button" onClick = {saveJourney}>SAVE THIS JOURNEY</button>
        </section>
    )
}

export default RouteDetails
