// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const apiKey = '540b5dff5680c93032680b97a3e50044'
const formEl = $('#search-input');
const searchBtnEl = $('#search-button');
const cityListEl = $('#city-select')
var cities = []
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
        var cityName = cities[cities.length-1];
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

        $(`#card0`).children().eq(0).text(dayjs().add(1, 'day').format('M/D'));
        $(`#card1`).children().eq(0).text(dayjs().add(2, 'day').format('M/D'));
        $(`#card2`).children().eq(0).text(dayjs().add(3, 'day').format('M/D'));
        $(`#card3`).children().eq(0).text(dayjs().add(4, 'day').format('M/D'));
        $(`#card4`).children().eq(0).text(dayjs().add(5, 'day').format('M/D'));
        
        for (let i = 0; i < 5; i++) {
            $(`#card${[i]}`).children().eq(1).attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
            $(`#card${[i]}`).children().eq(2).text(`${data.daily[i].temp.max}℉`);
            $(`#card${[i]}`).children().eq(3).text(`${data.daily[i].wind_speed}mph`);
            $(`#card${[i]}`).children().eq(4).text(`${data.daily[i].humidity}%`);
        }
    }




    searchBtnEl.on('click', getInput)
});