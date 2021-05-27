import React, { useEffect } from 'react';
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

//https://www.npmjs.com/package/use-places-autocomplete        
export function OrginSearch({ panTo, setOrigin, setOriginName, setIsOriginCurrent, setIsOriginValid, setCurrentLocation }) {
    useEffect(() => {        
        setValue("Current Location", false);
    },[]);
    

    const onChange = (e) => {
        setValue(e.target.value);
        setIsOriginCurrent(false);
        setIsOriginValid(false);
    };

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
    
    const orginOnSelect = async (address) => {
            setIsOriginValid(true);
            clearSuggestions();
            setValue(address, false);
            if(address === "Current Location"){
                setCurrentAsOrgin();
            }else{
                try {
                    
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    setOrigin({lat, lng});
                    setOriginName(value);
                    panTo({ lat, lng });
                } catch (error) {
                    console.log("error");
                }
        }
        };



    return (
        <>
        <div className="orginSearch">
            <Combobox onSelect={orginOnSelect}
            >
                <ComboboxInput id="route-origin" value={value}
                    onChange={onChange}
                    disabled={!ready}
                    placeholder="Origin" />
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
        </>
    );

    

    function setCurrentAsOrgin() {
            navigator.geolocation.getCurrentPosition(async function (position) {
                await setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                await setOrigin({ lat: position.coords.latitude, lng: position.coords.longitude });
                panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
            });
    }
    }

