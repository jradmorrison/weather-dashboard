// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const apiKey = '540b5dff5680c93032680b97a3e50044'
const formEl = $('#search-input');
const searchBtnEl = $('#search-button');
const cityListEl = $('#city-select')
var cities = ['ORLANDO', 'BOSTON', '']
var currentCitySearch = {};

$(function () {
    console.log("ready!");
// Get input form form
    function getInput() {
        var searchInput = formEl.val().trim().toUpperCase();
        console.log(searchInput)
        if (!cities.includes(searchInput)) {
            cities.push(searchInput);
            // generateButton(searchInput);
        }
        var locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${apiKey}`
        getLocation(locationURL);
    }
// get location from geo API Call
    function getLocation(locationURL) {
        fetch(locationURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var lat = data[0].lat
                var lon = data[0].lon
                var weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
                getWeather(weatherUrl);
            });
    }

    function getWeather(weatherUrl) {
        fetch(weatherUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            displayWeather(data);
        })
    }

    function displayWeather(data) {

    }




    searchBtnEl.on('click', getInput)
});