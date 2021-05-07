const express = require('express');
const app = express();
const PORT = 12000;
const APIKEY = "a5VPlPx6jKrKl2p1pPU5"
const axios = require('axios');
const { response } = require('express');

    

const stopDetail = () => {
    axios.get(`http://api.translink.ca/RTTIAPI/V1/stops/55612?apiKey=${APIKEY}`)
    .then(function (response) {
        console.log("Returns stop details for stop 55612")
        console.log(response.data);
  })
}

const stopsAroundLocation = () => {
    axios.get(`http://api.translink.ca/RTTIAPI/V1/stops?apiKey=${APIKEY}&lat=49.187706&long=-122.850060`)
    .then(function (response) {
        console.log("Returns stops near latitude/longitude coordinates, radius is defaulted to 500 meters")
        console.log(response.data);
    })
}

const nextBuses = () => {
    axios.get(`https://api.translink.ca/rttiapi/v1/stops/60980/estimates?apikey=${APIKEY}`)
    .then(function (response) {
        console.log(response);
        console.log("Returns the next 6 buses for each route to service the stop in the next 24 hours")
        console.log(response.data);
        console.log("Returns the details about the route of the first bus coming")
        console.log(response.data[0].Schedules);
    }).catch(function (error) {
        console.log(error);
    })
}
 // This feature is currently unavaillable due to a recent cyber attack Translink got.
const allActiveBuses = () => {
   
    axios.get(`https://api.translink.ca/rttiapi/v1/buses?apikey=${APIKEY}`)
    .then(function (response) {
        console.log(" Returns details for all active buses")
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
};

const gtfsPositionUpdate = () => {

    axios.get(`https://gtfs.translink.ca/v2/gtfsposition?apikey=${APIKEY}`)
    .then((response) => {
        console.log(response.data)
    })
}

const statusUpdate = () => {
    axios.get(`https://api.translink.ca/rttiapi/v1/status/all?apikey=${APIKEY}`)
    .then((response) => {
        console.log(response.data)
    })
}
const route = () => {
    axios.get(`https://api.translink.ca/rttiapi/v1/routes/351?apikey=${APIKEY}&stopNo=55385`)
    .then((response) => {
        console.log("Returns details for route 351");
        console.log(response.data.Patterns);
    })
}


route();