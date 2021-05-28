/* Component full of taco PNGs, as well as music, for the showSecondEasterEgg function in SearchMap.js */

import React from 'react';
import Taco from 'images/Taco.png';
import RainingTacos from '../sounds/01 Raining Tacos.mp3';

function Rain_Tacos() {
/*Code for audio from https://coderrocketfuel.com/article/how-to-play-a-mp3-sound-file-in-react-js*/
    return(
        <>
            <audio src={RainingTacos} id="music"></audio>
            <img class="taco1" id="taco1" src={Taco}></img>
            <img class="taco2" id="taco2" src={Taco}></img>
            <img class="taco3" id="taco3" src={Taco}></img>
            <img class="taco4" id="taco4" src={Taco}></img>
        </>
    )
}
export default Rain_Tacos