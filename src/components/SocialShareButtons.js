import { FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon } from "react-share";

const FacebookSharing = (props) => {
    return (
        <div id="social-media-share-buttons-container">
            <FacebookShareButton
                id="facebook-share-button"
                url="https://ecobus-189e8.web.app/#/"
                quote={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus!"}
            >
                <FacebookIcon size={50}></FacebookIcon>
            </FacebookShareButton>

            <RedditShareButton
                id="workplace-share-button"
                title="EcoBus"
                url={"I saved " + props.emissionsSaved + "kg of CO2 by taking public transportation. See how much emissions you can save with EcoBus! https://ecobus-189e8.web.app/#/"}
            >
                <RedditIcon size={50}></RedditIcon>
            </RedditShareButton>
        </div>
    )
}

export default FacebookSharing
