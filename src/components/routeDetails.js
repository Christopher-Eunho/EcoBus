import BackButton from '../images/back-button.png';
import Leaf from '../images/leaf.png';
import 'firebase/firestore';
import { db, authService } from "firebase_eb";
import {emissionsProducedKgPerKm, metresToKm} from 'constants.js';
import { useHistory } from "react-router";
import { useEffect } from 'react';

const RouteDetails = ({ 
    transitRouteDetails,
    drivingRouteDetails,
    setIsTravelDetailsOn,
    setIsRouteDetailsOn,
    setIsSearchFormOn
    }) => {
        const history = useHistory();
        const user = authService.currentUser;
        const usersRef = db.collection('users');

        const isLoaded = () => transitRouteDetails.distance;

        if(transitRouteDetails.distance){
            var totalDistance = transitRouteDetails.distance.text;
            var totalDuration = transitRouteDetails.duration.text;
            var {distance : {value : drivingDistanceMetres }} = drivingRouteDetails;
            console.log(drivingDistanceMetres);
            var drivingDistanceKm = drivingDistanceMetres * metresToKm;    
            var emissionsProduced = (drivingDistanceKm * emissionsProducedKgPerKm).toFixed(2);
            }
    

        
    
    function backToSearch() {       
        setIsRouteDetailsOn(false);
        setIsSearchFormOn(true);
    }

    const showTravelDetails = () => {
        console.log("chris show travel details");
        setIsRouteDetailsOn(false);
        setIsTravelDetailsOn(true);
    }

    function showSavedRouteMessage() {
        let savedRouteMessage = document.getElementById("route-saved-message-container");
        let routeDetails = document.getElementById("route-details-container");

        routeDetails.style.display = "none";
        savedRouteMessage.style.display = "block";
    }

    const saveJourney = () => {
        const distanceInKilometers = drivingRouteDetails.distance.value * metresToKm;
        const emissionsPerKm = (distanceInKilometers * emissionsProducedKgPerKm).toFixed(2);
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
            <button className="back-button" onClick={backToSearch}>
                <img src={BackButton} alt="Back Button" />
            </button>
            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon" />
                <h5 id="emissions-saved-message"><span id="emissions-saved-big-message">N/A</span> KG of CO2 saved</h5>
                <div id="transit-route-information">
                    <ul>
                        <li>Distance: <span id="transit-distance-display">{isLoaded && totalDistance}</span> </li>
                        <li>Duration: <span id="transit-duration-display">{isLoaded && totalDuration}</span> </li>
                        <li>Emissions saved: <span id="emissions-saved-display">{isLoaded && emissionsProduced}</span>KG of CO2</li>
                    </ul>
                </div>
            </div>
            <div id="route-details-buttons">
                <button className="save-journey-button" onClick={saveJourney}>SAVE THIS ROUTE</button>
                <button className="save-journey-button" onClick={showTravelDetails}>Travel Details</button>
            </div>
        </section>
    )
}

export default RouteDetails;