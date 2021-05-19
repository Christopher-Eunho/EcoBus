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
export function DestSearch({ panTo, setDestination, setDestinationName }) {
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
        <div className="DestSearch">
            <Combobox onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();

                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    panTo({ lat, lng });
                    setDestination({lat, lng});
                    setDestinationName(value);
                } catch (error) {
                    console.log(error);
                }
            }}
            >
                <ComboboxInput id="route-destination" value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Destination" />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
