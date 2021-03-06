/**
 * Map of Vancouver as provided by Google Maps.
 */

import React, { useState, useRef, useCallback } from 'react';
import {
    GoogleMap,
    Marker,
    useLoadScript,
    DirectionsService,
    DirectionsRenderer,
} from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import { OriginSearch } from './OriginSearch';
import { DestinationSearch } from './DestinationSearch';
import CurrentButton from './CurrentButton';
import RouteDetails from './RouteDetails';
import TravelDetails from './TravelDetails';
import SavedTransitRoute from './SavedTransitRoute';
import Search from '../images/magnifying-glass.png';
import { defaultZoomLevel } from 'constants.js';

/**
 * Options for Google Map API request
 */
const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '80vh'
};


/** https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions */ 
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy"
}

function SearchMap() {
    /**
     * DOM elements for the taco easter egg
     */
    const taco1 = document.getElementById("taco1");
    const taco2 = document.getElementById("taco2");
    const taco3 = document.getElementById("taco3");
    const taco4 = document.getElementById("taco4");
    const music = document.getElementById("music");
    
    /**
     * States used in map and search
     */
    const [currentLocation, setCurrentLocation] = useState({});
    const [origin, setOrigin] = useState({});
    const [originInUse, setOriginInUse] = useState({});
    const [destination, setDestination] = useState({});
    const [destinationInUse, setDestinationInUse] = useState({});
    const [isOriginValid, setIsOriginValid] = useState(true);
    const [isDestinationValid, setIsDestinationValid] = useState(false);
    
    /**
     * States to store search result
     */
    const [originName, setOriginName] = useState("");
    const [destinationName, setDestinationName] = useState("");
    const [transitResponse, setTransitResponse] = useState("");
    const [transitRouteDetails, setTransitRouteDetails] = useState({});
    const [drivingRouteDetails, setDrivingRouteDetails] = useState({});
    const [emissionSaved, setEmissionSaved] = useState(null);
    
    /**
     * States to render or hide components
     */

    const [isOriginCurrent, setIsOriginCurrent] = useState(true);
    const [isTravelDetailsOn, setIsTravelDetailsOn] = useState(false);
    const [isRouteDetailsOn, setIsRouteDetailsOn] = useState(false);
    const [isSavedTransitRouteOn, setIsSavedTransitRouteOn] = useState(false);
    const [isSearchFormOn, setIsSearchFormOn] = useState(true);
    

    /**
     * When route search button is clicked, validate input and show results corresponding to the inputs.
     * When inputs have "BCIT" or "Taco" in the string, activate easter egg.
     */
    const searchClick = async () => {
        if ((isOriginValid || isOriginCurrent) && isDestinationValid) {
            await setDestinationInUse(destination);
            await setOriginInUse(origin);
            hideSearchForm();
            showRouteDetailsContainer();
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
            
           
    /**
     * Handle response from the DirectionsService with TRANSIT option.
     * @param {*} response : A response from the request to Google Maps Direction Service
     */
    const transitCallback = async (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                await setTransitRouteDetails(response.routes[0].legs[0]);
                await setTransitResponse(response);
            } else if (response.status === "ZERO_RESULTS") {
                showNoResultError();
            } else {
                console.log('response: ', response)
            }
        }
    }

    /**
     * Handle response from the DirectionsService with DRIVING option.
     * @param {*} response : A response from the request to Google Maps Direction Serviece
     */
    const driveCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDrivingRouteDetails(response.routes[0].legs[0]);
            } 
        }
    }

    /**
     * A reference to save Google Maps API's map instance.
     */
    const mapRef = useRef();

    /**
     * When Google map is loaded, save Google Maps API's map instance and set current location as an origin.
     */
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

    }, []);

    /**
     * Load Google Map.
     */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries
    });


    /**
     * Pan the map to the input coordinate.
     */
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(defaultZoomLevel);
    }, []);

    const hideSearchForm = () => setIsSearchFormOn(false);

    const showRouteDetailsContainer = async () => await setIsRouteDetailsOn(true);


    /**
     * Change colours of the website to match that of the BCIT website.
     */
    function showEasterEgg() {
        const routeDetailsContainer = document.getElementById("route-details-container");
        const navBar = document.getElementById("navigation-bar");
        routeDetailsContainer.className = "bcit-search-process-container";
        navBar.className = "bcit-navigation-bar";
        
        
    }

    /**
     * Cause 4 PNGs of Tacos to rain from the sky, as well as play music.
     */
    function showSecondEasterEgg() {
            music.currentTime = 0;
            music.volume = .25;
            music.play();
            taco1.className = "falling-taco1";
            taco2.className = "falling-taco2";
            taco3.className = "falling-taco3";
            taco4.className = "falling-taco4";
    }
    /**
     * Reset Easter Eggs back to default values, if applicable.
     */
    function resetAll() {
        const navBar = document.getElementById("navigation-bar");
        navBar.className="navbar";
        taco1.className = "taco1";
        taco2.className = "taco2";
        taco3.className = "taco3";
        taco4.className = "taco4";
        music.pause();
    }

    const showLocationError = () => {
        document.getElementById("no-result-error").style["display"] = "none"
        const errorMessage = document.getElementById("location-error");
        errorMessage.style.color = "red";
        errorMessage.style["display"] = "block";
    }

    const showNoResultError = () => {
        setIsSearchFormOn(true);
        setIsRouteDetailsOn(false);
        
        /* Remove location error if there is one */
        if (isSearchFormOn) { 
        document.getElementById("location-error").style["display"] = "none";
        const errorMessage = document.getElementById("no-result-error");
        errorMessage.style.color = "red";
        errorMessage.style["display"] = "block";
        resetAll();
        }
    }


    
    /**
     * Render messages depending on loading status of Google Map.
     */
    if (loadError) return "error";
    if (!isLoaded) return "Loading";

    return (
        <>
            <div>
                <CurrentButton panTo={panTo} setCurrentLocation={setCurrentLocation} />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={defaultZoomLevel}
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
                {isSearchFormOn &&
                <section className={"search-process-container"} id="search-container">
                    <p>Where would you like to go?</p>
                    
                    <OriginSearch 
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
                        <span id="no-result-error">Sorry, we can't find a route between the two locations. Please enter other locations.</span>
                        <button id="submit-search-button" onClick={searchClick}>
                            <img src={Search} alt="Search Button"/>
                        </button>
                    </div>
                    
                </section>
                }
                {isRouteDetailsOn &&
                    <RouteDetails 
                    transitRouteDetails={transitRouteDetails} 
                    drivingRouteDetails={drivingRouteDetails}
                    setIsRouteDetailsOn={setIsRouteDetailsOn}
                    setIsTravelDetailsOn={setIsTravelDetailsOn} 
                    setIsSearchFormOn={setIsSearchFormOn}
                    setIsSavedTransitRouteOn={setIsSavedTransitRouteOn}
                    setEmissionSaved={setEmissionSaved}
                    setIsDestinationValid={setIsDestinationValid}
                    setIsOriginValid={setIsOriginValid}
                />}
                {isSavedTransitRouteOn &&
                    <SavedTransitRoute
                    emissionSaved={emissionSaved} 
                    setIsSearchFormOn={setIsSearchFormOn}
                    setIsSavedTransitRouteOn={setIsSavedTransitRouteOn}
                    setIsDestinationValid={setIsDestinationValid}
                    setIsOriginValid={setIsOriginValid}
                />}
                
                {isTravelDetailsOn && 
                    <TravelDetails
                    transitRouteDetails={transitRouteDetails} 
                    setIsTravelDetailsOn={setIsTravelDetailsOn}
                    setIsRouteDetailsOn={setIsRouteDetailsOn} 
                />}
            </div>
        </>

    );

};

export default SearchMap