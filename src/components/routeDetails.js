import BackButton from '../images/back-button.png';
import Leaf from '../images/leaf.png';
import 'firebase/firestore';
import { db, authService } from "firebase_eb";
import {emissionsProducedKilograms} from 'constants.js';
import { useHistory } from "react-router";

const RouteDetails = ({ transitRouteDetails, drivingRouteDetails }) => {

    const history = useHistory();
    const user = authService.currentUser;
    const usersRef = db.collection('users');

    // Source: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
    function refreshPage() {
        window.location.reload(false);
    }

    function showSavedRouteMessage() {
        let savedRouteMessage = document.getElementById("route-saved-message-container");
        let routeDetails = document.getElementById("route-details-container");

        routeDetails.style.display = "none";
        savedRouteMessage.style.display = "block";
    }

    const saveJourney = () => {
        const distanceInKilometers = drivingRouteDetails.distance.value / 1000;
        const emissionsPerKm = (distanceInKilometers * emissionsProducedKilograms).toFixed(2);
        if (user != null) {
            usersRef.doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    db.collection("users").doc(user.uid).collection("routes").add({
                        departure_time: transitRouteDetails.departure_time.value,
                        origin: transitRouteDetails.start_address,
                        destination: transitRouteDetails.end_address,
                        distance: transitRouteDetails.distance.text,
                        duration: transitRouteDetails.duration.text,
                        emissions_saved: emissionsPerKm,
                    }).then(function() {
                        showSavedRouteMessage();
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            history.push("/" + 
            transitRouteDetails.departure_time.value + 
            "&" + 
            transitRouteDetails.start_address + 
            "&" + 
            transitRouteDetails.end_address + 
            "&" + 
            transitRouteDetails.distance.text + 
            "&" + 
            transitRouteDetails.duration.text + 
            "&" + 
            emissionsPerKm);
        }
    }

    return (
        <section className={"search-process-container"} id="route-details-container">
            <button className="back-button" onClick={refreshPage}>
                <img src={BackButton} alt="Back Button" />
            </button>

            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon" />
                <h5 id="emissions-saved-message"><span id="emissions-saved-big-message">N/A</span> KG of CO2 saved</h5>

                <div id="transit-route-information">
                    <ul>
                        <li>Distance: <span id="transit-distance-display">N/A</span> </li>
                        <li>Duration: <span id="transit-duration-display">N/A</span> </li>
                        <li>Emissions saved: <span id="emissions-saved-display">N/A</span>KG of CO2</li>
                    </ul>
                </div>
            </div>

            <button className="save-journey-button" onClick={saveJourney}>SAVE THIS ROUTE</button>
        </section>
    )
}

