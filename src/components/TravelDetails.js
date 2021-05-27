import BackButton from '../images/back-button.png';
import Leaf from '../images/leaf.png';
import 'firebase/firestore';
import { db, authService } from "firebase_eb";
import {emissionsProducedKilograms} from 'constants.js';
import { useHistory } from "react-router";

const TravelDetails = ({ setIsTravelDetailsOn, 
    transitRouteDetails,
    setIsRouteDetailsOn }) => {
    const travelSteps = transitRouteDetails.steps;
    
    const backToRouteDetails = () => {
        setIsTravelDetailsOn(false);
        setIsRouteDetailsOn(true);
    }
    const listTravelDetails = travelSteps.map((step) =>{
        return <li>{step.instructions}</li>
    })

    return (
        <section className={"search-process-container"} id="travel-details-container">
            <button className="back-button" onClick={backToRouteDetails}>
                <img src={BackButton} alt="Back Button" />
            </button>
            <h3>Travel Details</h3>
            <ul>{listTravelDetails}</ul>
            
        </section>
    )
}

export default TravelDetails;