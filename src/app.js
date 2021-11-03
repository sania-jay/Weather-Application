// current date

let now = new Date();

let current = document.querySelector("#time");

let weatherIconMapping = [
  {
    icon: "01d",
    image: "sunny.gif",
  },
  {
    icon: "01n",
    image: "moon.gif",
  },
  {
    icon: "02d",
    image: "mostly_cloudy.gif",
  },
  {
    icon: "02n",
    image: "mostly_cloudy.gif",
  },
  {
    description: "moon",
    image: "moon.gif",
  },
  {
    icon: "03d",
    image: "mostly_cloudy.gif",
  },
  {
    icon: "03n",
    image: "mostly_cloudy.gif",
  },
  {
    icon: "04d",
    image: "mostly_cloudy.gif",
  },
  {
    icon: "04n",
    image: "mostly_cloudy.gif",
  },
  {
    icon: "09d",
    image: "rain.gif",
  },
  {
    icon: "09n",
    image: "rain.gif",
  },
  {
    icon: "10d",
    image: "rain.gif",
  },
  {
    icon: "10n",
    image: "rain.gif",
  },
  {
    description: "clear sky",
    image: "sunny.gif",
  },
  {
    icon: "11d",
    image: "thunder.gif",
  },
  {
    icon: "11n",
    image: "thunder.gif",
  },
  {
    icon: "13d",
    image: "snow.gif",
  },
  {
    icon: "13n",
    image: "snow.gif",
  },
  {
    icon: "50d",
    image: "mist.gif",
  },
  {
    icon: "50n",
    image: "mist.gif",
  },
];


let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}


let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
 
current.innerHTML = `${day} ${hours}:${minutes}`;

function celsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "18";
}
// future date forecast
function formatDay(timestamp) {

  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return days[day];
}
function displayForecast(response) {
  let forecast=response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<h3> <strong>Forecast For The Next Few Days</strong></h3>
  <div class="row"> 
              <div class="col-12">
              
            
              <div class="row forecast-row">`;

forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
    console.log('api description is ', forecastDay.weather[0].icon)
    let weatherIcon = weatherIconMapping.find(x => x.icon === forecastDay.weather[0].icon).image
    
forecastHTML =
  forecastHTML +
  `
                 <div class="col-2">
                   <div class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></div>
                    <img src="src/images/${weatherIcon}" alt="cloudy" class=forecast-icon />
                  
                      <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"><strong>${Math.round(forecastDay.temp.max)}°</strong></span>
                      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                      </div>
                      </div>`;
  }
});


                      forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;                    
}

// daily forecast
function getForecast(coordinates) {

  
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}


//current temp
function displaytemp(response) {
  
  let currentCity = document.querySelector("#currentCity");
currentCity.innerHTML= (response.data.name);

  let currentTemp = document.querySelector("#tempNow");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let country = document.querySelector("#country");
  country.innerHTML = `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription"
  );
  currentWeatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let getIcon = weatherIconMapping.find(
    (x) => x.icon === response.data.weather[0].icon
  ).image

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `src/images/${getIcon}`);
weatherIcon.setAttribute("alt", response.data.weather[0].icon);


  let currentHighTemperature = document.querySelector(".currentHigh");
  currentHighTemperature.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;

  let currentLowTemperature = document.querySelector(".currentLow");
  currentLowTemperature.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;

  let feelsLike = document.querySelector(".feelsLikeTemp");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `${response.data.main.pressure}`;

  // converted to km from m with the format
  let visibility = document.querySelector(".visibility");
  visibility.innerHTML = `${Math.round(response.data.visibility / 100) / 10}`;


  getForecast(response.data.coord);
  

}

function search(city) {
 let units = "metric";
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displaytemp);
}

search("singapore");




function handleSubmit(event) {
  event.preventDefault();
  
  let searchInput = document.querySelector(".searchInput");
  let currentCity = document.querySelector("#currentCity");

  search(searchInput.value);  
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);


// current location search
function displayCurrentLocation (response) {
  let currentLocationTemperature = document.querySelector("#tempNow");
  currentLocationTemperature.innerHTML= `${Math.round(response.data.main.temp)}`;

CelsiusTemperature = response.data.main.temp;

let date = document.querySelector("#time");


let currentLocationCity = document.querySelector("#currentCity");
  currentLocationCity.innerHTML= `${response.data.name}`;
  
  let country= document.querySelector("#country");
country.innerHTML= `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription");
  currentWeatherDescription.innerHTML=`${response.data.weather[0].main}`;

let currentHighTemperature = document.querySelector(".currentHigh");
currentHighTemperature.innerHTML=`${Math.round(response.data.main.temp_max)}`;

let currentLowTemperature = document.querySelector(".currentLow");
currentLowTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}`;

let feelsLike = document.querySelector(".feelsLikeTemp");
feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;

let humidity = document.querySelector(".humidity");
humidity.innerHTML = `${response.data.main.humidity}`;

let wind= document.querySelector(".wind");
wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

let pressure = document.querySelector(".pressure");
pressure.innerHTML = `${response.data.main.pressure}`;

 let getIcon = weatherIconMapping.find(
   (x) => x.icon === response.data.weather[0].icon
 ).image;

let weatherIcon = document.querySelector("#icon");
 weatherIcon.setAttribute("src", `src/images/${getIcon}`);
weatherIcon.setAttribute("alt", response.data.weather[0].description);

// converted to km from m with the format
let visibility = document.querySelector(".visibility");
visibility.innerHTML = `${Math.round(response.data.visibility/100)/10}`;



 getForecast(response.data.coord);

 
}


function showPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let units = "metric";
        let apiKey = "62231151ce343c4d68652e1617efc22f";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        axios.get(url).then(displayCurrentLocation);
      }
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


  