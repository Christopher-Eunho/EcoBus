import BackButton from '../images/back-button.png';
import 'firebase/firestore';

/** 
 * Render details of the steps that user needs to take a travel. 
*/
const TravelDetails = ({ setIsTravelDetailsOn, 
    transitRouteDetails,
    setIsRouteDetailsOn }) => {
    const travelSteps = transitRouteDetails.steps;
    /**
     * Hide travel detail and display route details.
     */
    const backToRouteDetails = () => {
        setIsTravelDetailsOn(false);
        setIsRouteDetailsOn(true);
    }

    /**
     * List <li> elements of steps that user needs to take from a search result.
     */
    const listTravelDetails = travelSteps.map((step) =>{
        return <li>{step.instructions}</li>
    })

    return (
        <section className={"search-process-container"} id="travel-details-container">
            <div id="travel-details-header">
                <button className="back-button" id="travel-details-back-button" onClick={backToRouteDetails}>
                    <img src={BackButton} alt="Back Button" />
                </button>
                <div id="travel-details-title">
                    <h3 >Travel Details</h3>
                </div>
            </div>
            <ol>{listTravelDetails}</ol>
            
        </section>
    )
}

export default TravelDetails;