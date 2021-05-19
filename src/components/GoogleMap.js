import React, {useEffect, useState, useRef, useCallback} from 'react'
import { GoogleMap,
         Marker,
         useLoadScript,
         DirectionsService,
         DirectionsRenderer } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import { OrginSearch } from './OriginSearch';
import { DestSearch } from './DestSearch';
import RouteDetails from './RouteDetails'
import SavedTransitRoute from '../components/SavedTransitRoute'
import Search from '../images/magnifying-glass.png'

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

    const [currentLocation, setCurrentLocation] = useState({});
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [transitResponse, setTransitResponse] = useState("");
    const [driveResponse, setDriveResponse] = useState("");
    const [destinationInUse, setDestinationInUse ] = useState({});
    const [originInUse, setOriginInUse] = useState({});
    const [travelInfo, setTravelInfo] = useState({});
    
    const searchClick = () => {
        if (destination !== '' && origin !== '') {
            setDestinationInUse(destination);
            setOriginInUse(origin);
        }

        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "none";

        let routeDetailsContainer = document.getElementById("route-details-container");
        routeDetailsContainer.style["display"] = "flex";
        routeDetailsContainer.style["flexDirection"] = "column";
        routeDetailsContainer.style["justifyContent"] = "space-around";
    } 

    const transitCallback = (response) => {
        if (response !== null) {
            setTravelInfo(response.routes[0].legs[0]);
          if (response.status === 'OK') {
            setTransitResponse(response);
          } else {
            console.log('response: ', response)
          }
        }
      }
    

    const driveCallback = (response) => {
        if (response !== null) {
            console.log(response.routes[0].legs[0]);
            console.log("drive call back");
          if (response.status === 'OK') {
            setDriveResponse(response);
          } else {
            console.log('response: ', response)
          }
        }
      }
      
    const updateCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                await setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                await setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
        } else {
            console.log("GeoLocation Not Available");
        }
    }  

    const mapRef = useRef(); // this allows us to retain state w/o re-rendering
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        updateCurrentLocation();
    }, []); // 

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries
      });


    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);

    },[]);

    

    if (loadError) return "error";
    if (!isLoaded) return "Loading";

    return(
        <>
            <div>
                <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={13} 
                center={currentLocation}
                options={options}
                onClick={(event) => {console.log(event)}}
                onLoad={onMapLoad}
                >
                    <DirectionsService
                        // required
                        options={{ 
                            destination: destinationInUse,
                            origin: originInUse,
                            travelMode: "TRANSIT"
                        }}
                        // required
                        callback={transitCallback}
                        // optional
                        onLoad={directionsService => {
                            console.log('DirectionsService onLoad directionsService: ', directionsService)
                        }}
                        // optional
                        onUnmount={directionsService => {
                            console.log('DirectionsService onUnmount directionsService: ', directionsService)
                        }}
                    />
                    <DirectionsService
                        // required
                        options={{ 
                            destination: destinationInUse,
                            origin: originInUse,
                            travelMode: "DRIVING"
                        }}
                        // required
                        callback={driveCallback}
                        // optional
                        onLoad={directionsService => {
                            console.log('DirectionsService onLoad directionsService: ', directionsService)
                        }}
                        // optional
                        onUnmount={directionsService => {
                            console.log('DirectionsService onUnmount directionsService: ', directionsService)
                        }}
                    />

                    <DirectionsRenderer
                          // required
                        options={{ 
                            directions: transitResponse,
                            markerOptions: {
                                visible: false
                            }
                        }}
                        // optional
                        onLoad={directionsRenderer => {
                            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                        }}
                        // optional
                        onUnmount={directionsRenderer => {
                            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
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
                <section className="search-process-container" id="search-container">
                    <p>Where would you like to go?</p>
                    <OrginSearch panTo={panTo} setOrigin={setOrigin}/>                
                    <DestSearch panTo={panTo} setDestination    ={setDestination}/>
                    <button id="submit-search-button" onClick={searchClick}>
                        <img src={Search} alt="Search Button"/>
                    </button>
                </section>
                <RouteDetails travelInfo={travelInfo} />
                <SavedTransitRoute />
            </div>
        </>

    );

   
    };

export default GMap