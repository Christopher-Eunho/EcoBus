import { FacebookShareButton, FacebookIcon, WorkplaceShareButton, WorkplaceIcon } from "react-share";
import { Button } from 'react-bootstrap';

const FacebookSharing = (props) => {
    return (
        <div id="social-media-share-buttons-container">
            <FacebookShareButton 
                id="facebook-share-button"
                url="https://ecobus-189e8.web.app/#/"
                quote={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus!"}>
                <FacebookIcon size={40}></FacebookIcon>
            </FacebookShareButton>

            <WorkplaceShareButton
                id="workplace-share-button"
                url="https://ecobus-189e8.web.app/#/"
                quote={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus!"}>
                <WorkplaceIcon size={40}></WorkplaceIcon>
            </WorkplaceShareButton>
        </div>
    )
}

export default FacebookSharing
