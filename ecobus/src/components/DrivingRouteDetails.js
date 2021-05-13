import BackButton from '../images/back-button.png'

const TransitRouteDetails = () => {
    const goBack = () => {
        let transitOptionDetails = document.getElementById("driving-option-details-container");
        transitOptionDetails.style["display"] = "none";
    
        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "flex";
    }
    
    const saveJourney = () => {
        let drivingOptionDetails = document.getElementById("driving-option-details-container");
        drivingOptionDetails.style["display"] = "none";
        
        let drivingJourneySavedContainer = document.getElementById("driving-journey-saved-container");
        drivingJourneySavedContainer.style["display"] = "block";
    }

    return (
        <section className="search-process-container" id="driving-option-details-container">
            <button className="back-button" id="driving-option-back-button" onClick = {goBack}>
                <img src={BackButton} alt="Back Button" />
            </button>
            <div className="option-details">
                <p>Driving Route</p>
                <ul>
                    <li>Some data</li>
                    <li>Some data</li>
                    <li>Some data</li>
                </ul>
                <button className="save-journey-button" id="save-driving-journey" onClick = {saveJourney}>SAVE THIS JOURNEY</button>
            </div>
        </section>
    )
}

export default TransitRouteDetails
