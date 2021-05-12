let routeSearchForm = document.getElementById("route-search-form");
let navigateUserProfile = document.getElementById("navigate-user-profile");
let navigateAboutUs = document.getElementById("navigate-about-us");
let navigateSearchPage = document.getElementById("navigate-search-page");
let methodSelectionBackButton = document.getElementById("method-selection-back-button");

function initMap() {
    var options = {
        zoom: 10.9,
        center: { lat: 49.25, lng: -123.14},
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

};

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

// Go back to search form from method selection
methodSelectionBackButton.addEventListener("click", function (event) {
    let methodSelectionContainer = document.getElementById("method-selection-container");
    methodSelectionContainer.style["display"] = "none";
    
    let searchFormContainer = document.getElementById("search-container");
    searchFormContainer.style["display"] = "block";
});

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