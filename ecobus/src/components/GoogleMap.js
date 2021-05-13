import React, {useEffect, useState, useRef, useCallback} from 'react'
import { GoogleMap,
         useJsApiLoader,
         Marker,
         InfoWindow,
         useLoadScript } from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";


const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

const latVancouver = 49.28;
const lngVancouver = -123.12;
const searchRadius = 10000; // meters

function GMap() {

    const [currentLat, setCurrentLat] = useState(latVancouver);
    const [currentLng, setCurrentLng] = useState(lngVancouver);

    // Update current location
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                setCurrentLat(position.coords.latitude);
                setCurrentLng(position.coords.longitude);
              });
        } else {
            console.log("GeoLocation Not Available");
        }
    },[])

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
                <Search panTo={panTo} />                

                <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={13} 
                center={{lat: currentLat,
                         lng: currentLng}}
                options={options}
                onClick={(event) => {console.log(event)}}
                onLoad={onMapLoad}
                >
                    <Marker position={{lat: currentLat,
                         lng: currentLng}} />
                    
                </GoogleMap>

            </div>
        </>

    );
    };

    //https://www.npmjs.com/package/use-places-autocomplete        
    function Search( {panTo} ) {
        const {
          ready,
          value,
          suggestions: { status, data },
          setValue,
          clearSuggestions,
        } = usePlacesAutocomplete({
          requestOptions: {
            location: { lat: () => latVancouver, lng: () => lngVancouver },
            radius: searchRadius,
          },
        });


        return (
            <div className="search">
                <Combobox onSelect={async (address) => {
                            setValue(address, false);
                            clearSuggestions();

                            try {
                                const results = await getGeocode( {address});
                                const { lat, lng } = await getLatLng(results[0]);
                                panTo({ lat, lng });
                            } catch (error) {
                                console.log("error");
                            }        
                            }}
                    >
                <ComboboxInput value={value} 
                    onChange={(e) => {
                    setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter Location" 
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description}) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
                </Combobox>
            </div>
        )
    }
export default GMap