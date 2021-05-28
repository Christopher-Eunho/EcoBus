/**
 * Button in top left corner of map
 * Pans map to user's current location
 */

import React from 'react';
import { latVancouver, lngVancouver, searchRadius } from "../constants";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
// https://www.npmjs.com/package/@reach/combobox

//https://www.npmjs.com/package/use-places-autocomplete        
export function DestinationSearch({
    panTo,
    setDestination,
    setDestinationName,
    setIsDestinationValid,
    setCurrentLocation
}) {

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


    const onChange = (e) => {
        setValue(e.target.value);
        setIsDestinationValid(false);
    };


    const destinationOnSelect = async (address) => {
        setIsDestinationValid(true);
        setValue(address, false);
        clearSuggestions();
        if (address === "Current Location") {
            setCurrentAsDestination();
        } else {
            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                setDestination({ lat, lng });
                setDestinationName(value);
                panTo({ lat, lng });

            } catch (error) {
                console.log("error");
            }
        }
    };


    return (
        <div className="DestSearch">
            <Combobox onSelect={destinationOnSelect}>
                <ComboboxInput
                    id="route-destination"
                    value={value}
                    autocomplete={false}
                    onChange={onChange}
                    disabled={!ready}
                    placeholder="Destination" />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                        {status === "OK" && <ComboboxOption value={"Current Location"} />}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );

    
    function setCurrentAsDestination() {
        navigator.geolocation.getCurrentPosition(async function (position) {
            await setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            await setDestination({ lat: position.coords.latitude, lng: position.coords.longitude });
            panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }
}
