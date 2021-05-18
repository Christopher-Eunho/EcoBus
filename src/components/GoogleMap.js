import React, {useEffect, useState, useRef, useCallback} from 'react'
import {latVancouver, lngVancouver} from "../constants"
import { GoogleMap,
         Marker,
         useLoadScript,
         DirectionsService,
         DirectionsRenderer } from '@react-google-maps/api';


import "@reach/combobox/styles.css";
import { OrginSearch } from './OrginSearch';
import { DestSearch } from './DestSearch';
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

    const [currentLat, setCurrentLat] = useState(latVancouver);
    const [currentLng, setCurrentLng] = useState(lngVancouver);
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [response, setResponse] = useState("");
    const [destinationInUse, setDestinationInUse ] = useState({});
    const [originInUse, setOriginInUse] = useState({});

    // Update current location
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords)
                setCurrentLat(position.coords.latitude);
                setCurrentLng(position.coords.longitude);
                setOrigin({lat: currentLat, lng: currentLng});
                console.log(origin);
              });
        } else {
            console.log("GeoLocation Not Available");
        }
    },[]);

    const searchClick = () => {
        console.log (origin);
        console.log(destination);
        if (destination !== '' && origin !== '') {
            setDestinationInUse(destination);
            setOriginInUse(origin);
        }

        let searchFormContainer = document.getElementById("search-container");
        searchFormContainer.style["display"] = "none";

        let methodSelectionContainer = document.getElementById("method-selection-container");
        methodSelectionContainer.style["display"] = "flex";
        methodSelectionContainer.style["flexDirection"] = "column";
        methodSelectionContainer.style["justifyContent"] = "space-around";
    } 

    const directionsCallback = (response) => {
        if (response !== null) {
            console.log(response.routes[0].legs[0]);
            console.log(response.routes[0].legs[0]["distance"]["text"]);
          if (response.status === 'OK') {
            setResponse(response);
          } else {
            console.log('response: ', response)
          }
        }
      }
    

    const mapRef = useRef(); // this allows us to retain state w/o re-rendering
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
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
                center={{lat: currentLat,
                         lng: currentLng}}
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
                        callback={directionsCallback}
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
                            directions: response
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
                    <Marker position={{lat: currentLat,
                         lng: currentLng}} />
                    
                </GoogleMap>
                <section className="search-process-container" id="search-container">
                    <p>Where would you like to go?</p>
                    <OrginSearch panTo={panTo} setOrigin={setOrigin}/>                
                    <DestSearch panTo={panTo} setDestination    ={setDestination}/>
                    <button id="submit-search-button" onClick={searchClick}>
                        <img src={Search} alt="Search Button"/>
                    </button>
                </section>
            </div>
        </>

    );
    };

export default GMap