import React, { useState, useRef, useCallback } from 'react'
import {
    GoogleMap,
    Marker,
    useLoadScript,
    DirectionsService,
    DirectionsRenderer,
} from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import { OrginSearch } from './OriginSearch';
import { DestinationSearch } from './DestinationSearch';
import CurrentButton from './CurrentButton'
import RouteDetails from './RouteDetails'
import SavedTransitRoute from '../components/SavedTransitRoute'
import Search from '../images/magnifying-glass.png'
import { emissionsProducedKilograms } from 'constants.js'
const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '80vh'
};


//refer to https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy"
}

function GMap() {

    const routeDetailsContainer = document.getElementById("route-details-container");
    const navBar = document.getElementById("navigation-bar");
    const transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
    const searchFormContainer = document.getElementById("search-container");
    
    const taco1 = document.getElementById("taco1");
    const taco2 = document.getElementById("taco2");
    const taco3 = document.getElementById("taco3");
    const taco4 = document.getElementById("taco4");
    const music = document.getElementById("music");
    
    const [currentLocation, setCurrentLocation] = useState({});
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [originName, setOriginName] = useState("");
    const [destinationName, setDestinationName] = useState("");
    const [transitResponse, setTransitResponse] = useState("");
    const [driveResponse, setDriveResponse] = useState("");
    const [destinationInUse, setDestinationInUse] = useState({});
    const [originInUse, setOriginInUse] = useState({});
    const [transitRouteDetails, setTransitRouteDetails] = useState({});
    const [drivingRouteDetails, setDrivingRouteDetails] = useState({});
    const [isOriginValid, setIsOriginValid] = useState(true);
    const [isDestinationValid, setIsDestinationValid] = useState(false);
    const [isOriginCurrent, setIsOriginCurrent] = useState(true);
    const [emissionsSaved, setEmissionsSaved] = useState(42);
    
    const searchClick = () => {
        console.log(isOriginCurrent)
        console.log(isOriginValid)
        console.log(isDestinationValid)
        if ((isOriginValid || isOriginCurrent) && isDestinationValid) {
            setDestinationInUse(destination);
            setOriginInUse(origin);
            console.log(transitRouteDetails)
            if (destinationName.includes("BCIT") || originName.includes("BCIT")) {
                showEasterEgg();
            }
            if (destinationName.includes("Taco")||originName.includes("Taco")) {
                showSecondEasterEgg();
            }
        } else {
            showLocationError();
        }
    }
            
           

    const transitCallback = async (response) => {
        if (response !== null) {
            console.log()
            setTransitRouteDetails(response.routes[0].legs[0]);
            displayTransitRouteDetails(response.routes[0].legs[0]);
            console.log("Transit route set");
            hideSearchForm();
            showRouteDetailsContainer();
            if (response.status === 'OK') {
                setTransitResponse(response);
            } else {
                console.log('response: ', response)
            }
        }
    }


    const driveCallback = (response) => {
        if (response !== null) {
            setDrivingRouteDetails(response.routes[0].legs[0]);
            displayEmissionsSaved(response.routes[0].legs[0].distance.value)
            console.log("Driving route set");
            if (response.status === 'OK') {
                setDriveResponse(response);
            } else {
                console.log('response: ', response)
            }
        }
    }

    const mapRef = useRef(); // this allows us to retain state w/o re-rendering
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                await setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                await setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            console.log("GeoLocation Not Available");
        }

    }, []); // 

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries
    });


    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    function hideSearchForm() {
        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "none";
    }

    function showRouteDetailsContainer() {
        let routeDetailsContainer = document.getElementById("route-details-container");
        routeDetailsContainer.style["display"] = "flex";
        routeDetailsContainer.style["flexDirection"] = "column";
        routeDetailsContainer.style["justifyContent"] = "space-around";
    }

    function displayTransitRouteDetails(transitRouteData) {
        document.getElementById("transit-distance-display").innerHTML = transitRouteData.distance.text;
        document.getElementById("transit-duration-display").innerHTML = transitRouteData.duration.text;
    }

    function displayEmissionsSaved(drivingDistanceMetres) {
        const distanceInKilometers = drivingDistanceMetres / 1000;
        const emissionsPerKm = (distanceInKilometers * emissionsProducedKilograms).toFixed(2);
        document.getElementById("emissions-saved-big-message").innerHTML = emissionsPerKm;
        document.getElementById("emissions-saved-display").innerHTML = emissionsPerKm;
        document.getElementById("saved-route-message-emissions-saved").innerHTML = emissionsPerKm;
        setEmissionsSaved(emissionsPerKm);
    }

    function showEasterEgg() {
        const routeDetailsContainer = document.getElementById("route-details-container");
        const transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
        const navBar = document.getElementById("navbar");
        routeDetailsContainer.className = "bcit-search-process-container";
        navBar.className = "bcit-navigation-bar";
        transitJourneySavedContainer.className = "bcit-search-process-container journey-saved-container";
    }

    function showSecondEasterEgg() {
        music.currentTime = 0;
        music.volume = .5;
        music.play();
        taco1.className = "falling-taco1";
        taco2.className = "falling-taco2";
        taco3.className = "falling-taco3";
        taco4.className = "falling-taco4";
    }
    const showLocationError = () => {
        const errorMessage = document.getElementById("location-error");
        errorMessage.style.color = "red";
    }

    

    if (loadError) return "error";
    if (!isLoaded) return "Loading";

    return (
        <>
            <div>
                <CurrentButton panTo={panTo} setCurrentLocation={setCurrentLocation} />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={currentLocation}
                    options={options}
                    onClick={(event) => { console.log(event) }}
                    onLoad={onMapLoad}
                >
                    <DirectionsService
                        options={{ 
                            destination: destinationInUse,
                            origin: originInUse,
                            travelMode: "TRANSIT"
                        }}
                        callback={transitCallback}
                    />
                    <DirectionsService
                        options={{ 
                            destination: destinationInUse,
                            origin: originInUse,
                            travelMode: "DRIVING"
                        }} 
                        callback={driveCallback}
                    />

                    <DirectionsRenderer
                        options={{ 
                            directions: transitResponse,
                            markerOptions: {
                                visible: false
                            }
                        }}
                    />   
                    
                    <Marker
                        position={currentLocation}
                        icon={{
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                    <Marker
                        position={destination}
                        icon={{
                            path:
                                "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                            fillColor: "rgb(88, 164, 206, 0.7)",
                            fillOpacity: 1,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                            anchor: new window.google.maps.Point(15, 30),
                        }}
                    />
                    {(
                        (currentLocation.lat != origin.lat && currentLocation.lng != origin.lng) && <Marker
                            position={origin}
                            icon={{
                                path:
                                    "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                                fillColor: "rgb(245, 148, 57, 0.7)",
                                fillOpacity: 1,
                                strokeWeight: 0,
                                rotation: 0,
                                scale: 2,
                                anchor: new window.google.maps.Point(15, 30),
                            }}
                        />
                    )}
                </GoogleMap>
                <section className={"search-process-container"} id="search-container">
                    <p>Where would you like to go?</p>
                    
                    <OrginSearch 
                    panTo={panTo} 
                    setOrigin={setOrigin} 
                    setOriginName={setOriginName} 
                    setIsOriginCurrent={setIsOriginCurrent} 
                    setIsOriginValid={setIsOriginValid}
                    setCurrentLocation={setCurrentLocation}/>                
                    
                    <DestinationSearch 
                    panTo={panTo} 
                    setDestination={setDestination} 
                    setDestinationName={setDestinationName} 
                    setCurrentLocation={setCurrentLocation} 
                    setIsDestinationValid={setIsDestinationValid}/>
                    
                    <div id="error-search-button">
                        <span id="location-error">Please enter valid locations</span>
                        <button id="submit-search-button" onClick={searchClick}>
                            <img src={Search} alt="Search Button"/>
                        </button>
                    </div>
                    
                </section>
                <RouteDetails transitRouteDetails={transitRouteDetails} drivingRouteDetails={drivingRouteDetails} />
                <SavedTransitRoute emissionsSaved={emissionsSaved} />
            </div>
        </>

    );

};

export default GMap