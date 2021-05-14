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

//https://www.npmjs.com/package/use-places-autocomplete        
export function OrginSearch({ panTo, setOrigin }) {
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
            
            setValue(address, false);
            clearSuggestions();

            try {
                const results = await getGeocode({ address });
                const { lat, lng } = await getLatLng(results[0]);
                setOrigin({lat, lng})
                panTo({ lat, lng });
            } catch (error) {
                console.log("error");
            }
        };


    return (
        <>
        <div className="orginSearch">
            <Combobox onSelect={orginOnSelect}
            >
                <ComboboxInput id="route-origin" value={value}
                    onChange={(e) => {setValue(e.target.value);}}
                    disabled={!ready}
                    placeholder="Origin" />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
        </>
    );

    
    }

