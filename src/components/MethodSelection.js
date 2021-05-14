import BackButton from '../images/back-button.png'

const MethodSelection = () => {
    const goBack = () => {
        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "none";
        
        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "block";
    }
    
    const showTransitRoute = () => {
        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "none";
        
        let transitOptionDetails = document.getElementById("transit-option-details-container");
        transitOptionDetails.style["display"] = "flex";
        transitOptionDetails.style["flexDirection"] = "column";
        transitOptionDetails.style["justifyContent"] = "space-around";
    }

    const showDrivingRoute = () => {
        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "none";
        
        let drivingOptionDetails = document.getElementById("driving-option-details-container");
        drivingOptionDetails.style["display"] = "flex";
        drivingOptionDetails.style["flexDirection"] = "column";
        drivingOptionDetails.style["justifyContent"] = "space-around";
    }
    
    return (
        <section className="search-process-container" id="method-selection-container">
            <button className="back-button" id="method-selection-back-button" onClick={goBack}>
                <img src={BackButton} alt="Back Button"/>
            </button>

            <div id="transit-route-information">
                <button id="method-selection-transit-option-button" onClick={showTransitRoute}>Transit Route</button>
                <ul>
                    <li>Travel time: <span id="transit-travel-time">0000</span></li>
                    <li>Distance: <span id="transit-travel-distance">0000</span></li>
                    <li>Emissions saved: <span id="transit-emissions-saved">0000</span></li>
                </ul>
            </div>

            <div id="driving-route-information">
                <button id="method-selection-driving-option-button" onClick={showDrivingRoute}>Driving Route</button>
                <ul>
                    <li>Travel time: <span id="driving-travel-time">0000</span></li>
                    <li>Distance: <span id="driving-travel-distance">0000</span></li>
                    <li>Emissions produced: <span id="driving-emissions-produced">0000</span></li>
                </ul>
            </div>
        </section>
    )
}

export default MethodSelection
