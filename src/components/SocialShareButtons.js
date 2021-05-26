import { FacebookShareButton, FacebookIcon, WorkplaceShareButton, WorkplaceIcon } from "react-share";
import { Button } from 'react-bootstrap';

const FacebookSharing = (props) => {
    return (
        <div id="social-media-share-buttons-container">
            <FacebookShareButton
                url="https://ecobus-189e8.web.app/#/"
                quote={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus!"}>
                <FacebookIcon size={32}></FacebookIcon>
            </FacebookShareButton>

            <WorkplaceShareButton
                url="https://ecobus-189e8.web.app/#/"
                quote={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus!"}>
                <WorkplaceIcon size={32}></WorkplaceIcon>
            </WorkplaceShareButton>
        </div>
    )
}

export default FacebookSharing
