## Introduction
This project was done as a coursework of a 5-week part-time course(COMP2800) I took from BCIT with three other students. The course included 40 hours of official work hours and 30-minute daily scrum for product development with the professor. I was the Product Owner of the project. I conceived the ideas of the product, developed the main features of the application, and managed overall development process. Introduction of the application for clients in Power Point: https://docs.google.com/presentation/d/1m6Zw_lBOVI1jQZ394qUZehOf5SDdOKAGuCx2emSIbxc/edit?usp=sharing


## General Info
This is a browser based web application to incentivize users to take public transporation by visualizing the emissions saved.
Users can search for a route, and the application will generate route info and travel steps. It will also calculate how many emissions 
are saved by taking public transportation along this route instead of driving. Users can save routes to their database, and track how 
many emissions they have saved across all of their trips.

## Languages
* HTML, CSS
* JavaScript
* ReactJS

## Packages and Libraries
* Google Maps API
* react-bootstrap
* react-google-maps/api
* reach/combobox
* use-places-autocomplete
* react-share
* react-google-button
* react-image-fallback

## Database
* Firebase (Authentication, Firestore, and Firestorage)

## IDEs
* Visual Studio Code
* Selenium IDE (For Tests)

## Required API keys 
* Firebase(https://firebase.google.com/docs/projects/api-keys)
* Google Maps API 
  (https://developers.google.com/maps/documentation/javascript/get-api-key)
* API Key Format (in .env file):
    REACT_APP_API_KEY=Enter your API Key
    REACT_APP_AUTH_DOMAIN=Enter your API Key
    REACT_APP_PROJECT_ID=Enter your API Key
    REACT_APP_STORAGE_BUCKET=Enter your API Key
    REACT_APP_MESSAGING_ID=Enter your API Key
    REACT_APP_APP_ID=Enter your API Key
    REACT_APP_MEASUREMENT_ID=Enter your API Key
    REACT_APP_GOOGLE_MAP_API_KEY=Enter your API Key
 
## Tests
* We tested our application using Selenium IDE
* DTC05-tests.side file is included in the root directory
* Test Planning Document : 
  https://docs.google.com/spreadsheets/d/1KLFmkxojnELfK5Ahl80JxKnkMzZU1sQhIgZLhw44OIA/edit#gid=394496370

## Links:
* Hosted site: https://ecobus-189e8.web.app/#/
* GitHub: https://github.com/Christopher-Eunho/EcoBus
* Trello: https://trello.com/b/VqxXnXQP/comp-2800

## Directory: 
```
 Top level of project folder: 
├── .firebase => contains firebase cache for hosting
├── public => contains files shared across components
├── src => contains web app components, styles, and images
├── .env => stores security keys
├── .firebaserc => firebase hosting
├── .gitignore
├── DTC05-tests.side => contains Selenium tests
├── firebase.json => firebase hosting
├── firestore.indexes.json => firebase hosting
├── firestore.rules => firebase hosting
├── jsconfig.json => list of dependencies
├── package-lock.json => list of dependencies
├── package.json => list of dependencies
├── README.md => description of repository (you are here!)
└── storage.rules => firebase hosting


It has the following subfolders and files:
├── .firebase
|   └── hosting.YnVpbGQ.cache
├── public
|   ├── favicon-32x32.png => application favicon
|   ├── index.html => the only view for this single-page application
|   ├── logo192.png  => 192px x 192px size application logo
|   ├── logo512.png => 512px x 512px size application logo
|   └── manifest.json => application manifest 
└──  src
    ├── components => functionally atomic components of web pages
    |   ├── App.js => check login status of user and render router
    |   ├── CurrentButton.js => pans map to user's current location.
    |   ├── DestinationSearch.js => search bar for target destination
    |   ├── GoogleMap.js => display map and route
    |   ├── NavigationBar.js => navbar
    |   ├── OriginSearch.js => search bar for origin location
    |   ├── RouteDetails.js => display route details
    |   ├── RouteHistoryCard.js => contains information about route's origin, destination, total distance, and total emissions saved
    |   ├── RouteHistoryEmptyCard.js => display message telling user that they have no saved routes in their collection
    |   ├── Router.js => route user to different pages depending on url
    |   ├── SavedTransitRoute.js => displays a message after user saves a new route
    |   ├── SearchMap.js => map of Vancouver as provided by Google Maps
    |   ├── SocialShareButton.js => social media share buttons for Facebook and Reddit
    |   ├── Taco.js => for easter egg
    |   └── SavedTransitRoute.js => display message when user saves route
    ├── images
    |   ├── Austin.png
    |   ├── back-button.png
    |   ├── Caleb.png
    |   ├── current.png
    |   ├── Dylan.png
    |   ├── Ecobus About Us banner.png
    |   ├── editbutton.png
    |   ├── initalavatarimg.png
    |   ├── leaf.png
    |   ├── logo.png
    |   ├── magnifying-glass.png
    |   ├── navbar-logo.png
    |   ├── Taco.png
    |   ├── toggle.png
    |   └── user-profile.png
    ├── routes => views for web pages
    |   ├── 404.js => 404 page
    |   ├── Abous_Us.js => about us page
    |   ├── Auth.js => login page 
    |   ├── Map.js => search page 
    |   └── Profile.js => user profile profile page
    ├── sounds => files for sounds 
    |   └── 01 Raining Tacos.mp3 => sound for easter egg
    ├── styles => css for components and routes
    |   ├── 404.css => styles for 404 page
    |   ├── about_us.css => styles for about us page
    |   ├── auth.css => styles for login page
    |   ├── current_button.css => styles for current location button
    |   ├── map.css => style for map and search process
    |   ├── navigation-bar.css => styles for navbar
    |   └── Profile.css => styles for user profile page
    ├── constants.js => important numbers
    ├── firebase_eb.js => firebase services
    └── index.js => entry point to the application
```

## Order of Installation
1. Copy source code from EcoBus Github repository
2. Open Visual Studio Code
3. Open a new terminal
4. Type "$git clone [repository url]" to clone the repository to your device
5. Type "$npm i" to install application dependencies
6. Prepare API Keys as stated in ## Required API keys
7. Done! Now you can run the app with "$npm start"
