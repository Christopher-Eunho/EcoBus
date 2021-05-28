/**
 * Container display details about the searched-for route.
 * Displays total distance, duration, and emissions saved by route.
 */

import BackButton from '../images/back-button.png';
import Leaf from '../images/leaf.png';
import 'firebase/firestore';
import { db, authService } from "firebase_eb";
import {emissionsProducedKgPerKm, metresToKm} from 'constants.js';
import { useHistory } from "react-router";

const RouteDetails = ({ 
    transitRouteDetails,
    drivingRouteDetails,
    setIsTravelDetailsOn,
    setIsRouteDetailsOn,
    setIsSearchFormOn,
    setIsSavedTransitRouteOn,
    setEmissionSaved
    }) => {
        const history = useHistory();
        const user = authService.currentUser;
        const usersRef = db.collection('users');
        const routeDetailsContainer = document.getElementById("route-details-container");
        const navBar = document.getElementById("navigation-bar");
        
        /* Falling tacos for easter egg */
        const taco1 = document.getElementById("taco1");
        const taco2 = document.getElementById("taco2");
        const taco3 = document.getElementById("taco3");
        const taco4 = document.getElementById("taco4");
        const music = document.getElementById("music");

        /* Checks whether route data is loaded. */
        const isLoaded = () => transitRouteDetails.distance;

        if (transitRouteDetails.distance) {
            var totalDistance = transitRouteDetails.distance.text;
            var totalDuration = transitRouteDetails.duration.text;
            var {distance : {value : drivingDistanceMetres }} = drivingRouteDetails;
            var drivingDistanceKm = drivingDistanceMetres * metresToKm;    
            var emissionsProduced = (drivingDistanceKm * emissionsProducedKgPerKm).toFixed(2);
            setEmissionSaved(emissionsProduced);
            }
    

        
    /* Hide route details container and render route search container */
    function backToSearch() {
        setIsRouteDetailsOn(false);
        setIsSearchFormOn(true);
        resetAll();
    }

    /* Hide route details container and render travel details container */    
    const showTravelDetails = () => {
        setIsRouteDetailsOn(false);
        setIsTravelDetailsOn(true);
    }

    const saveJourney = () => {
        /**
         * Create a new route document in current user's collection in database.
         * Route document fields include departure time, origin, destination, total distance, total duration, 
         * and total emissions of route.
         */
        if (user != null) {
            usersRef.doc(user.uid).get().then((doc) => {
                if (doc.exists) {
                    db.collection("users").doc(user.uid).collection("routes").add({
                        departure_time: transitRouteDetails.departure_time.value,
                        origin: transitRouteDetails.start_address,
                        destination: transitRouteDetails.end_address,
                        distance: transitRouteDetails.distance.text,
                        duration: transitRouteDetails.duration.text,
                        emissions_saved: emissionsProduced,
                    }).then(function() {
                        setIsRouteDetailsOn(false);
                        setIsSavedTransitRouteOn(true);
                        resetAll();
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        } else {
            /**
             * Feature in progress: if non-logged-in user tries to save a route, they are redirected to the login page.
             * Insert data about route user tried to save into the URL.
             * Plans are to parse URL and immediately create new route document in user's collection after they sign up.
             */
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
            emissionsProduced);
        }
    }

    function resetAll() { //Resets Easter Eggs back to default values, if applicable
        navBar.className="navbar";
        routeDetailsContainer.className = "search-process-container";
        taco1.className = "taco1";
        taco2.className = "taco2";
        taco3.className = "taco3";
        taco4.className = "taco4";
        music.pause();
    }

    return (
        <section className={"search-process-container"} id="route-details-container">
            <button className="back-button" onClick={backToSearch}>
                <img src={BackButton} alt="Back Button" />
            </button>
            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon" />
                <h5 id="emissions-saved-message"><span id="emissions-saved-big-message">{isLoaded && emissionsProduced}</span> KG of CO2 saved</h5>
                <div id="transit-route-information">
                    <ul>
                        <li>Distance: <span id="transit-distance-display">{isLoaded && totalDistance}</span> </li>
                        <li>Duration: <span id="transit-duration-display">{isLoaded && totalDuration}</span> </li>
                        <li>Emissions saved: <span id="emissions-saved-display">{isLoaded && emissionsProduced}</span>KG of CO2</li>
                    </ul>
                </div>
            </div>
            <div id="route-details-buttons">
                <button className="save-journey-button" onClick={saveJourney}>SAVE ROUTE</button>
                <button className="save-journey-button" onClick={showTravelDetails}>TRAVEL DETAILS</button>
            </div>
        </section>
    )
}

export default RouteDetails;
