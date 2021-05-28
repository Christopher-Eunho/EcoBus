# COMP-2800
CST COMP 2800 5-week projects course

Name/Student Number:
* Austin He A00882336
* Eunho (Chris) Jung A01240744
* Dylan Punter A01180637
* Caleb Verma A01257874

## General Info
This is a browser based web application to incentivize users to take public transporation by visualizing the emissions saved.

Technologies used for this project:
## Languages
* HTML, CSS
* JavaScript
* ReactJS

## Packages and Libraries
* Google Maps API
* Bootstrap
* @react-google-maps/api
* @reach/combobox
* use-places-autocomplete

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

## Order of Installation
1. Download the source code from our Github repository (Repository link in ## Links)
2. Prepare API Keys as stated at ## Required API keys
3. "$npm i" to install dependencies
4. Done! Now you can run the app with a command "$npm start"


## Tests
* We tested our application using Selenium IDE
* .side file of the test is included in the source code
* Test Document : 
  https://docs.google.com/spreadsheets/d/1KLFmkxojnELfK5Ahl80JxKnkMzZU1sQhIgZLhw44OIA/edit#gid=394496370



## Links:
Hosted site: https://ecobus-189e8.web.app/#/
GitHub: https://github.com/fijiman24/COMP-2800-Team-DTC-05-EcoBus
Trello: https://trello.com/b/VqxXnXQP/comp-2800
WireFrames: 

```
 Top level of project folder: 
├── .firebase => contains data cache for hosting
├── public => contains files shared across components
├── src => contains web app components, styles, and images
├── .env => stores security keys and prevents them from being pushed to GitHub
├── .firebaserc
├── .gitignore
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── jsconfig.json
├── package-lock.json
├── package.json => 
├── README.md
└── storage.rules


It has the following subfolders and files:
├── .firebase
|   └── hosting.YnVpbGQ.cache
├── public
|   ├── favicon-32x32.png
|   ├── index.html
|   ├── logo192.png
|   ├── logo512.png
|   ├── manifest.json
|   └── robots.txt
├── src
|   ├── components => functionally atomic components of web pages
|   |   ├── App.js =>
|   |   ├── DestSearch.js => search bar for target destination
|   |   ├── GoogleMap.js => display map and route
|   |   ├── Nav.js => navbar
|   |   ├── OriginSearch.js => search bar for origin location
|   |   ├── RouteDetails.js => display route details
|   |   ├── Router.js => route user to different pages depending on url
|   |   └── SavedTransitRoute.js => display message when user saves route
|   ├── images
|   |   ├── back-button.png
|   |   ├── Ecobus About Us banner.png
|   |   ├── logo.png
|   |   ├── magnifying-glass.png
|   |   ├── navbar-logo.png
|   |   └── user-profile.png
|   ├── routes => views for web pages
|   |   ├── Abous_Us.js => view for about us page
|   |   ├── Auth.js => view for login page 
|   |   ├── Profile.js => view for user profile profile page
|   |   └── Search.js => view for search page
|   ├── styles => css for components and routes
|   |   ├── about_us.css => styles for about us page
|   |   ├── auth.css => styles for login page
|   |   ├── index.css
|   |   ├── profile.css => styles for user profile page
|   |   └── search.css =>
|   ├── constants.js
|   ├── firebase_eb.js
|   ├── index.js
|   └── reportWebVitals.js
└── 
```