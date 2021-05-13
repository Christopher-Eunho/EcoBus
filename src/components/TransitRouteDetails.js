import BackButton from '../images/back-button.png'

const TransitRouteDetails = () => {
    const goBack = () => {
        let transitOptionDetails = document.getElementById("transit-option-details-container");
        transitOptionDetails.style["display"] = "none";
    
        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "flex";
    }
    
    const saveJourney = () => {
        let transitOptionDetails = document.getElementById("transit-option-details-container");
        transitOptionDetails.style["display"] = "none";
        
        let transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        transitJourneySavedContainer.style["display"] = "block";
    }

    return (
        <section className="search-process-container" id="transit-option-details-container">
        <button className="back-button" id="transit-option-back-button" onClick = {goBack}>
            <img src={BackButton} alt="Back Button" />
        </button>
        
        <div className="option-details"> 
            <p>Transit Route</p>
            <ul>
                <li>Some data</li>
                <li>Some data</li>
                <li>Some data</li>
            </ul>
            <button className="save-journey-button" id="save-transit-journey" onClick = {saveJourney}>SAVE THIS JOURNEY</button>
        </div>
    </section>
    )
}

export default TransitRouteDetails
