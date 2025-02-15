//import config from "./key.js";

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector(".search");
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
//const key = config.apiKey;


//default 
let cityInput = "Seattle";

//console.log(cities.length); test success 

cities.forEach((city) => {

    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        console.log(cityInput);

        fetchWeatherData(); ///fuc to link wx API
        
        app.style.opacity = "0";
    })
})

form.addEventListener('submit', (e) => {

    //when there is NIL in placeholder
    if (search.value.length === 0) {

        alert("Please kindly type in a city name")

    } else {
        cityInput = search.value;
        fetchWeatherData();
        //revmove the input value from the form 
        search.value = "";
        app.style.opacity = "0";
    }
    //prevent the webpage to refresh 
    e.preventDefault();
    //console.log(search.value.length); ///tested success
});

function dayOfTheWeek(month, day, year) {

    const date = new Date(`${month}/${day}/${year}`);

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thurseday",
        "Friday",
        "Saturday"
    ];

    const dayOutput = weekday[date.getDay()];

    // console.log(date.getDay());

    // console.log(dayOutput);

    return dayOutput;

}

function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=2492d7138e5940bd91183342251302&q=${cityInput}&aqi=no`)

        .then(res => res.json())

        .then(data => {
           // console.log(data);
            //current temp
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            // console.log(conditionOutput);
            document.getElementById("imgIcon").src = `https:${data.current.condition.icon}`;
            //console.log(document.getElementById("imgIcon").src = `https:${data.current.condition.icon}`);
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(m, d, y)} ${d}, ${m} ${y}`
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            cloudOutput.innerHTML = data.current.cloud + "%"
            humidityOutput.innerHTML = data.current.humidity + "%"
            windOutput.innerHTML = data.current.wind_kph + "k/m";

            let timeOfDay = "day";

            const code = data.current.condition.code;
           // console.log(code);

            if (!data.current.is_day) {
                timeOfDay = "night";

            }


            if (code === 1000) {
                app.style.backgroundImage = `url(./asset/${timeOfDay}/clear.jpg)`
                
                btn.style.background = "#e5ba92";

                if (timeOfDay == "night") {

                    btn.style.background = "#181e27";

                }

                
            } else if (

                code === 1003 ||
                code === 1006 ||
                code === 1009 ||
                code === 1030 ||
                code === 1069 ||
                code === 1087 ||
                code === 1135 ||
                code === 1273 ||
                code === 1276 ||
                code === 1279 ||
                code === 1282

            ) {
                app.style.backgroundImage = `url(./asset/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (

                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252

            ) {
                app.style.backgroundImage = `url(./asset/${timeOfDay}/raining.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }

            } else {
                app.style.backgroundImage = `url(./asset/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
        app.style.opacity = 1;
    })

    .catch((error) => {
        console.error("Error fetching data:", error);  // Logs the error
        alert("City not found");
        app.style.opacity = 1;
    });
    

}
    fetchWeatherData();
    app.style.opacity = 1;


