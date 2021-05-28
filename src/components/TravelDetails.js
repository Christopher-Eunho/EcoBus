import BackButton from '../images/back-button.png';
import 'firebase/firestore';


const TravelDetails = ({ setIsTravelDetailsOn, 
    transitRouteDetails,
    setIsRouteDetailsOn }) => {
    const travelSteps = transitRouteDetails.steps;
    
    const backToRouteDetails = () => {
        setIsTravelDetailsOn(false);
        setIsRouteDetailsOn(true);
    }
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