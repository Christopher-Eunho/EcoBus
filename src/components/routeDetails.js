import BackButton from '../images/back-button.png'
import Leaf from '../images/leaf.png'
import 'firebase/firestore'
import {authService} from "firebase_eb"
import {db} from "firebase_eb"


const RouteDetails = ( {transitRouteDetails, drivingRouteDetails} ) => {
    
    const goBack = () => {
        let routeDetailsContainer = document.getElementById("route-details-container");
        routeDetailsContainer.style["display"] = "none";
        routeDetailsContainer.className = "search-process-container";

        let transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        transitJourneySavedContainer.className = "search-process-container journey-saved-container";

        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "flex";
    }

    const saveJourney = () => {
        if (authService.currentUser != null) {
            db.collection('users').get()
                .then((snap) => {
                    snap.docs.forEach(doc => {
                        if (doc.data().email === authService.currentUser.email) {
                            console.log(doc.id);
                            db.collection("users").doc(doc.id).collection("routes").add({
                                date_of_trip: transitRouteDetails.departure_time.value,
                                origin: transitRouteDetails.start_address,
                                destination: transitRouteDetails.end_address,
                                distance: transitRouteDetails.distance.text,
                                duration: transitRouteDetails.duration.text,
                            })
                        }
                    })
                }).catch(function (error) {
                    console.log(error);
                })
            }

        let drivingOptionDetails = document.getElementById("route-details-container");
        drivingOptionDetails.style["display"] = "none";

        let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        drivingJourneySavedContainer.style["display"] = "block";

        setTimeout(function () {
            let drivingJourneySavedContainer = document.getElementById("transit-journey-saved-container");
            let searchFormContainer = document.getElementById("search-container");

            drivingJourneySavedContainer.style["display"] = "none";
            searchFormContainer.style["display"] = "flex";

            let routeDetailsContainer = document.getElementById("route-details-container");
            routeDetailsContainer.className = "search-process-container";

            let navBar = document.getElementById("navbar");
            navBar.className = "navbar";

            let transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
            transitJourneySavedContainer.className = "search-process-container journey-saved-container";

        }, 7000);

    }

    return (
        <section className={"search-process-container"} id="route-details-container">
            <button className="back-button" onClick={goBack}>
                <img src={BackButton} alt="Back Button" />
            </button>

            <div id="emissions-saved-message-container">
                <img src={Leaf} alt="Leaf" id="leaf-icon" />
                <h5 id="emissions-saved-message"><span id="emissions-saved-big-message">N/A</span> KG of C02 saved</h5>

                <div id="transit-route-information">
                    <ul>
                        <li>Distance: <span id="transit-distance-display">N/A</span> </li>
                        <li>Duration: <span id="transit-duration-display">N/A</span> </li>
                        <li>Emissions saved: <span id="emissions-saved-display">N/A</span>KG of C02</li>
                    </ul>
                </div>
            </div>

            <button className="save-journey-button" onClick={saveJourney}>SAVE THIS JOURNEY</button>
        </section>
    )
}

export default RouteDetails
