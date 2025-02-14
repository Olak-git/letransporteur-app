"use client"
import React, { useEffect } from 'react'
// import '@geoapify/geocoder-autocomplete/styles/minimal.css';
// import {
//     GeoapifyGeocoderAutocomplete,
//     GeoapifyContext
// } from '@geoapify/react-geocoder-autocomplete';

const API_KEY = 'e22941abad4846739c97fae1a1e0d36e';

export default function Index() {

  return (
    <div>
        {/* <GeoapifyContext apiKey={API_KEY}>
            <GeoapifyGeocoderAutocomplete
                placeholder="Enter address here"
                // value={value}
                // type={type}
                // lang={language}
                // position={position}
                // countryCodes={countryCodes}
                // limit={limit}
                // filterByCountryCode={filterByCountryCode}
                // filterByCircle={filterByCircle}
                // filterByRect={filterByRect}
                // filterByPlace={filterByPlace}
                // biasByCountryCode={biasByCountryCode}
                // biasByCircle={biasByCircle}
                // biasByRect={biasByRect}
                // biasByProximity={biasByProximity}
                // placeSelect={onPlaceSelect}
                // suggestionsChange={onSuggestionChange}
            />
        </GeoapifyContext> */}
    </div>
  )
}


// Map Tiles
// https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=e22941abad4846739c97fae1a1e0d36e

// Routing API
// mode: "drive"
// waypoints:
//   0: Object {"lat":50.96209827745463,"lon":4.414458883409225}
//   1: Object {"lat":50.429137079078345,"lon":5.00088081232559}
// units: "metric"
// var requestOptions = {
//   method: 'GET',
// };
// fetch("https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=e22941abad4846739c97fae1a1e0d36e", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Geocoding API
// var requestOptions = {
//   method: 'GET',
// };
// fetch("https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=e22941abad4846739c97fae1a1e0d36e", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Autocomplete API
// var requestOptions = {
//   method: 'GET',
// };
// fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=e22941abad4846739c97fae1a1e0d36e", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Place API
// var requestOptions = {
//   method: 'GET',
// };
// fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=e22941abad4846739c97fae1a1e0d36e", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Map Matching API
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// var raw = JSON.stringify({"mode":"drive","waypoints":[{"timestamp":"2019-11-04T07:09:34.000Z","location":[10.694703,47.567028]},{"timestamp":"2019-11-04T07:09:45.000Z","location":[10.6950319,47.567783]},{"timestamp":"2019-11-04T07:09:57.000Z","location":[10.6952599,47.5682759]},{"timestamp":"2019-11-04T07:10:07.000Z","location":[10.6965304,47.5687653]},{"timestamp":"2019-11-04T07:10:17.000Z","location":[10.6975647,47.5691475]},{"timestamp":"2019-11-04T07:10:28.000Z","location":[10.6984645,47.5689924]},{"timestamp":"2019-11-04T07:10:38.000Z","location":[10.6993804,47.5695884]},{"timestamp":"2019-11-04T07:10:49.000Z","location":[10.7004255,47.5696526]},{"timestamp":"2019-11-04T07:10:59.000Z","location":[10.7017509,47.5691545]},{"timestamp":"2019-11-04T07:11:34.000Z","location":[10.7028073,47.5688025]},{"timestamp":"2019-11-04T07:11:45.000Z","location":[10.7039882,47.5684956]},{"timestamp":"2019-11-04T07:11:55.000Z","location":[10.7059951,47.5678558]},{"timestamp":"2019-11-04T07:12:05.000Z","location":[10.7085059,47.5668116]},{"timestamp":"2019-11-04T07:12:16.000Z","location":[10.7106272,47.5658437]},{"timestamp":"2019-11-04T07:12:26.000Z","location":[10.7130338,47.5651228]},{"timestamp":"2019-11-04T07:12:37.000Z","location":[10.7154089,47.5652946]},{"timestamp":"2019-11-04T07:12:47.000Z","location":[10.7175699,47.5655232]},{"timestamp":"2019-11-04T07:12:58.000Z","location":[10.7203314,47.5657987]},{"timestamp":"2019-11-04T07:13:09.000Z","location":[10.7229241,47.5660543]},{"timestamp":"2019-11-04T07:13:20.000Z","location":[10.7252423,47.5656265]},{"timestamp":"2019-11-04T07:13:30.000Z","location":[10.7269064,47.5647174]},{"timestamp":"2019-11-04T07:13:41.000Z","location":[10.7275872,47.5632757]},{"timestamp":"2019-11-04T07:13:51.000Z","location":[10.7290924,47.5617733]},{"timestamp":"2019-11-04T07:14:02.000Z","location":[10.7312696,47.560384]},{"timestamp":"2019-11-04T07:14:13.000Z","location":[10.7330629,47.5588335]},{"timestamp":"2019-11-04T07:14:23.000Z","location":[10.7348687,47.5579939]},{"timestamp":"2019-11-04T07:14:33.000Z","location":[10.736509,47.5568371]},{"timestamp":"2019-11-04T07:14:44.000Z","location":[10.7384167,47.5569489]},{"timestamp":"2019-11-04T07:14:55.000Z","location":[10.740077,47.556789]},{"timestamp":"2019-11-04T07:15:21.000Z","location":[10.7405779,47.5566208]},{"timestamp":"2019-11-04T07:15:32.000Z","location":[10.7407534,47.5562106]},{"timestamp":"2019-11-04T07:15:43.000Z","location":[10.7399772,47.555543]},{"timestamp":"2019-11-04T07:16:00.000Z","location":[10.7395943,47.5552649]},{"timestamp":"2019-11-04T07:16:11.000Z","location":[10.7387026,47.554868]},{"timestamp":"2019-11-04T07:16:23.000Z","location":[10.7378114,47.554748]}]});
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw
// };
// fetch("https://api.geoapify.com/v1/mapmatching?apiKey=e22941abad4846739c97fae1a1e0d36e", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));