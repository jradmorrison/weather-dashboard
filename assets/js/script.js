// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const formEl = $('#search-input');
const searchBtnEl = $('#search-btn');

$(function() {
    console.log( "ready!" );

    function getlocation() {
        var locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${formEl.val()}&limit=5&appid=540b5dff5680c93032680b97a3e50044`

        fetch ()
    }



    searchBtnEl.on('click', getlocation)
});