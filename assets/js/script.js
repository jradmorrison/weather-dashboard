// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const apiKey = '540b5dff5680c93032680b97a3e50044'
const formEl = $('#search-input');
const searchBtnEl = $('#search-button');
const cityListEl = $('#city-select').children('button');
var cities = ['ORLANDO', 'NEW YORK', 'BOSTON']
var currentCitySearch;

$(function () {
    console.log("ready!");

    function init() {
        var locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=orlando&limit=5&appid=${apiKey}`
        $(".main-card").children().eq(0).text('ORLANDO');
        getLocation(locationURL);
    }

    function giveInput() {
        
        var input = $(this).attr('data-city');
        var locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`
        currentCitySearch = input;
        getLocation(locationURL);
    }

// Get input form form
    function getInput() {
        var searchInput = formEl.val().trim().toUpperCase();
        currentCitySearch = searchInput;
        if (!cities.includes(searchInput)) {
            cities.push(searchInput);
            generateButton(searchInput);
        }
        var locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${apiKey}`
        getLocation(locationURL);
        formEl.val('')
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
// get weather from api call
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
// display current and 5 day forcast
    function displayWeather(data) {

    // Render main card data
        var cityName = currentCitySearch
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var today = dayjs().format('M/D')

        $(".main-card").children().eq(0).text(cityName);
        $(".main-card").children().eq(1).attr("src", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
        $(".main-card").children().eq(2).text(today);
        $(".main-card").children().eq(3).text(`It is currently ${temp}℉`);
        $(".main-card").children().eq(4).text(`The wind speed is ${wind}mph`);
        $(".main-card").children().eq(5).text(`The humidity is ${humidity}%`);

    // Render forcast data
        for (let i = 1; i < 6; i++) {
            $(`#card${[i]}`).children().eq(0).text(dayjs().add([i], 'day').format('M/D'));
            $(`#card${[i]}`).children().eq(1).attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
            $(`#card${[i]}`).children().eq(2).text(`${data.daily[i].temp.max}℉`);
            $(`#card${[i]}`).children().eq(3).text(`${data.daily[i].wind_speed}mph`);
            $(`#card${[i]}`).children().eq(4).text(`${data.daily[i].humidity}%`);
        }
    }

    function generateButton(searchInput) {
        var newBtn = $('<button>');
        newBtn.attr('type', 'button');
        newBtn.addClass('btn btn-secondary mx-3');
        newBtn.attr('data-city', searchInput);
        newBtn.text(searchInput);
        $('#city-select').append(newBtn);
    }

    function nearMe() {navigator.geolocation.getCurrentPosition(showPosition);}
    function showPosition(position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        let weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        getWeather(weatherUrl);
    }

    init();
    searchBtnEl.on('click', getInput)
    cityListEl.on('click', giveInput)
});