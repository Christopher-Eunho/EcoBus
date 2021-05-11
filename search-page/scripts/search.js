function initMap() {
    var options = {
        zoom: 10.9,
        center: { lat: 49.25, lng: -123.14},
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

};

function alertRouteOriginDestination() {
    let routeOrigin = document.getElementById("route-origin").value;
    let routeDestination = document.getElementById("route-destination").value;

    alert("Origin: " + routeOrigin + " Desination: " + routeDestination);
};

let routeSearchForm = document.getElementById("route-search-form");
routeSearchForm.addEventListener("submit", function (event) {
    alertRouteOriginDestination();
    
    let formContainer = document.getElementById("search-container");
    formContainer.style["display"] = "none";
});

let navigateUserProfile = document.getElementById("navigate-user-profile");
navigateUserProfile.addEventListener("click", function (event){
    alert("Take me to the User Profile!");
});

let navigateAboutUs = document.getElementById("navigate-about-us");
navigateAboutUs.addEventListener("click", function (event){
    alert("Take me to the About Us page!");
});

let navigateSearchPage = document.getElementById("navigate-search-page");
navigateSearchPage.addEventListener("click", function (event){
    alert("Take me to the Search page!");
    location.reload();
});