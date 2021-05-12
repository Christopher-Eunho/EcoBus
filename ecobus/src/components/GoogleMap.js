import React, {useEffect, useState} from 'react'
import { GoogleMap,
         useJsApiLoader,
         Marker,
         InfoWindow,
         useLoadScript } from '@react-google-maps/api';

const libraries = ["places"];

const mapContainerStyle = {
    width: '30vw',
    height: '100vh'
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,

}

function GMap() {

    const [currentLat, setCurrentLat] = useState(49.28);
    const [currentLng, setCurrentLng] = useState(-123.12);


    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                setCurrentLat(position.coords.latitude);
                setCurrentLng(position.coords.longitude);
              });
        } else {
            console.log("Not Available");
        }
    },[])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
        libraries
      });

    if (loadError) return "error";
    if (!isLoaded) return "Loading";

    return(
        <>
            <div>
                <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={8} 
                center={{lat: currentLat,
                         lng: currentLng}}
                options={options}
                onClick={(event) => {console.log(event)}}
                >
                    <Marker position={{lat: currentLat,
                         lng: currentLng}} />
                    
                </GoogleMap>

            </div>
        </>

    );
    };

    
export default GMap