/**
 * Button in top left corner of map.
 * Pans map to user's current location.
 */

import React from "react";
import currentIcon from 'images/current.png';
import '../styles/current_button.css';

const CurrentButton = ({panTo, setCurrentLocation}) => {
    return (
        <button
          className="currentButton"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
              },
              () => null
            );
          }}
        >
          <img src={currentIcon} alt="compass" />
        </button>
      );
}

export default CurrentButton;