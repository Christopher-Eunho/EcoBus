let routeSearchForm = document.getElementById("route-search-form");

let methodSelectionBackButton = document.getElementById("method-selection-back-button");
let selectTransitOption = document.getElementById("method-selection-transit-option-button");
let selectDrivingOption = document.getElementById("method-selection-driving-option-button");

let navigateUserProfile = document.getElementById("navigate-user-profile");
let navigateAboutUs = document.getElementById("navigate-about-us");
let navigateSearchPage = document.getElementById("navigate-search-page");

let transitDetailsBackButton = document.getElementById("transit-option-back-button");
let saveTransitJourney = document.getElementById("save-transit-journey");

let drivingDetailsBackButton = document.getElementById("driving-option-back-button");
let saveDrivingJourney = document.getElementById("save-driving-journey");

function initMap() {
    var options = {
        zoom: 10.9,
        center: { lat: 49.25, lng: -123.14},
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

};

// Search route process
// Alert values passed to origin and destination form fields
function alertRouteOriginDestination() {
    let routeOrigin = document.getElementById("route-origin").value;
    let routeDestination = document.getElementById("route-destination").value;

    alert("Origin: " + routeOrigin + " Desination: " + routeDestination);
};

// Alert values passed to form, then hide form and show route options
routeSearchForm.addEventListener("submit", function (event) {
    alertRouteOriginDestination();
    
    let searchFormContainer = document.getElementById("search-container");
    searchFormContainer.style["display"] = "none";

    let methodSelectionContainer = document.getElementById("method-selection-container");    
    methodSelectionContainer.style["display"] = "flex";
    methodSelectionContainer.style["flexDirection"] = "column";
    methodSelectionContainer.style["justifyContent"] = "space-around";
});

// Method selection process
// Go back to search form from method selection
methodSelectionBackButton.addEventListener("click", function (event) {
    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "none";
    
    let searchFormContainer = document.getElementById("search-container");
    searchFormContainer.style["display"] = "block";
});

// Select transit route
selectTransitOption.addEventListener("click", function (event) {
    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "none";
    
    let transitOptionDetails = document.getElementById("transit-option-details-container");
    transitOptionDetails.style["display"] = "block";
});

// Select driving route
selectDrivingOption.addEventListener("click", function (event) {
    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "none";
    
    let drivingOptionDetails = document.getElementById("driving-option-details-container");
    drivingOptionDetails.style["display"] = "block";
});

// Transit route details display
// Go back to method selection page
transitDetailsBackButton.addEventListener("click", function (event) {
    let transitOptionDetails = document.getElementById("transit-option-details-container");
    transitOptionDetails.style["display"] = "none";

    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "flex";
});

// Save journey
saveTransitJourney.addEventListener("click", function (event) {
    let transitOptionDetails = document.getElementById("transit-option-details-container");
    transitOptionDetails.style["display"] = "none";
    
    let transitJourneySavedContainer = document.getElementById("transit-journey-saved-container");
    transitJourneySavedContainer.style["display"] = "block";
});

// Driving route details display
// Go back to method selection page
drivingDetailsBackButton.addEventListener("click", function (event) {
    let transitOptionDetails = document.getElementById("driving-option-details-container");
    transitOptionDetails.style["display"] = "none";

    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "flex";
});

// Save journey 
saveDrivingJourney.addEventListener("click", function (event) {
    let drivingOptionDetails = document.getElementById("driving-option-details-container");
    drivingOptionDetails.style["display"] = "none";
    
    let drivingJourneySavedContainer = document.getElementById("driving-journey-saved-container");
    drivingJourneySavedContainer.style["display"] = "block";
});

// Navbar buttons
// Alert user in place of navigating to User Profile
navigateUserProfile.addEventListener("click", function (event){
    alert("Take me to the User Profile!");
});

// Alert user in place of navigating to About Us
navigateAboutUs.addEventListener("click", function (event){
    alert("Take me to the About Us page!");
});

// Alert user in place of navigating to Search Page
navigateSearchPage.addEventListener("click", function (event){
    alert("Take me to the Search page!");
    location.reload();
});