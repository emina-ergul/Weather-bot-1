const locationUpdate = document.querySelector(".geolocation")
const locationBtn = document.querySelectorAll(".location-btn")
const form = document.querySelector("#form")
const unitsBtn = document.querySelector(".units-btn")
const upperPanel = document.querySelector(".upper-panel")
const lowerPanel = document.querySelector(".lower-panel")
const invalidSearch = document.querySelector(".invalid-search")
const bg = document.querySelector(".bg-container")
const navButtons = document.querySelector(".nav-buttons")
const pullDownBtn = document.querySelector(".pull-down")
const chevron = document.querySelector(".fa-chevron-down")

const apiKey = config.API_KEY;

pullDownBtn.addEventListener("click", pullDownNav) 
let chev = false
function pullDownNav() {
    if(!chev) {
        chevron.classList.remove("fa-chevron-down")
        chevron.classList.add("fa-chevron-up")
        chev = true
        pullDownBtn.style.transform = "translateY(74.7px)"
        navButtons.style.transform = "translateY(0px)"
    } else if(chev) {
        chevron.classList.remove("fa-chevron-up")
        chevron.classList.add("fa-chevron-down")
        chev = false
        pullDownBtn.style.transform = "translateY(0px)"
        navButtons.style.transform = "translateY(-80px)"
    } 
}
    

window.onload = getLocation()
function getLocation() {
    if(!"geolocation" in navigator) {
        locationUpdate.innerHTML = "Your browser does not support geolocation. Use the search bar instead!"
    } else { 
      locationUpdate.innerHTML = "Allow location to see results for your area"
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  function error() {
      locationUpdate.innerHTML = "Location disabled. Use the search bar to find a city."
  }

  function success(position) {
      locationUpdate.style.display = "none"
      const homeLat = position.coords.latitude
      const homeLon = position.coords.longitude
      coordsToCity(homeLat, homeLon)
  }

  async function coordsToCity(homeLat, homeLon) {
      form.reset()
    const coordsToCityApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${homeLat}&lon=${homeLon}&limit=1&appid=${apiKey}`
    const response = await fetch(coordsToCityApi)
    const data = await response.json()
    const currentLocation = data[0].name + " " + data[0].country
    getWeather(homeLat, homeLon, currentLocation)
  }

form.addEventListener("submit", e => {
        e.preventDefault();
        cityToCoords()
  });

locationBtn[0].addEventListener("click", findCurrentLocation)
locationBtn[1].addEventListener("click", findCurrentLocation)
function findCurrentLocation() {
    navigator.geolocation.getCurrentPosition (
        function() {
            invalidSearch.style.transform = "translateY(-20px)"
            getLocation()
        },
        function(error) { 
            if (error.code = error.PERMISSION_DENIED) {
                alert("Location is currently disabled. Enable location in your browser settings.")
            }
    });
}
    


async function cityToCoords() {
    const input = document.getElementById("search")
    const cityName = input.value
    const coordsApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    try {
        const response = await fetch(coordsApi)
        const latlonData = await response.json()
        const country = latlonData[0].country
        const lat = latlonData[0].lat
        const lon = latlonData[0].lon
        invalidSearch.style.opacity = "0"
        invalidSearch.style.transform = "translateY(-20px)"
    getWeather(lat, lon, country)
    } catch(err) {
        invalidSearch.style.transform = "translateY(20px)"
        invalidSearch.style.opacity = "1"
    }
}

function returnDayOfWeek(utc) {
    const fromUTC = new Date( utc*1000);
    const date = fromUTC.toGMTString();
    const dayOfWeek = date.slice(0,3)
    return dayOfWeek
    }

 async function getWeather(lat, lon, LocationName) {
    const input = document.getElementById("search")
    const cityName = input.value
    const cityDisplay = cityName.charAt(0).toUpperCase() + cityName.slice(1)
    form.reset()

    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const response = await fetch(api)
    const data = await response.json()
    
  function displayData(data) {
    const currentDesc = data.current.weather[0].description
    const currTemp = data.current.temp.toFixed(1)
    const sunrise = data.current.sunrise
    const sunset = data.current.sunset
    const dt = data.current.dt

   const dateTime = (new Date(data.current.dt * 1000+ (data.timezone_offset * 1000) -3600000));
   const dateTimeToStr = dateTime.toString()
   const dateTimeDisplay = dateTimeToStr.slice(0,3) + ", " + dateTimeToStr.slice(15,21)

    const uvi = data.current.uvi
    let uviScale
    let celcius = true
    let fahrenheit = false

    if(dt > sunrise && dt < sunset) {
        bg.style.backgroundColor = ""
    } else {
        bg.style.backgroundColor = "#04001a"
    }
    
     if(currentDesc === "clear sky" || currentDesc === "few clouds" || currentDesc === "scattered clouds") {
        bg.classList.add("clear")
        bg.classList.remove("cloudy", "rain", "storm", "fog", "haze")
      } else if(currentDesc === "broken clouds" || currentDesc === "overcast clouds" || currentDesc === "light rain") {
         bg.classList.add("cloudy")
         bg.classList.remove("clear", "rain", "storm", "fog", "haze")
      } else if (currentDesc === "shower rain" || currentDesc === "rain" || currentDesc === "moderate rain" || currentDesc === "heavy intensity") {
          bg.classList.add("rain")
          bg.classList.remove("cloudy", "clear", "storm", "fog", "haze")
      } else if (currentDesc === "thunderstorm") {
            bg.classList.add("storm")
            bg.classList.remove("clear", "cloudy", "rain", "fog", "haze")
      } else if (currentDesc === "snow" || currentDesc === "mist" || currentDesc === "fog") {
        bg.classList.add("fog")
        bg.classList.remove("clear", "cloudy", "rain", "storm", "haze")
      } else if (currentDesc === "haze") {
          bg.classList.add("haze")
          bg.classList.remove("fog", "clear", "cloudy", "rain", "storm")
      } 

      function convertCurrUnits(currTemp) {
        if(celcius) {
            let showFahrenheit = (currTemp * 1.8 + 32).toFixed(1) + "°F"
            temp.innerHTML = showFahrenheit
            celcius = false
            fahrenheit = true
        } else if(fahrenheit) {
            temp.innerHTML = currTemp + "°C"
            fahrenheit = false 
            celcius = true
            celsArr[1] === fahrArr[1]
         }
        }
        unitsBtn.addEventListener("click", () => {
            convertCurrUnits(currTemp)
        })

    if(uvi < 3) {
        uviScale = "Low"
      } else if(uvi < 6) {
          uviScale = "Moderate"
      } else if(uvi < 8) {
          uviScale = "High"
      } else {
          uviScale = "Very High"
      }

    upperPanel.innerHTML = 
    `<h1 id="current-weather">Current conditions in ${cityDisplay} ${LocationName}:</h1>
    <h2>${dateTimeDisplay}<h2>
    <div class="current-temp-box">
    <h2 id="temp">${currTemp}°C</h2>
    <h2 id="desc">${currentDesc}</h2>
    </div>
    <img id="icon" src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="Weather icon">
    <div class="details">
        <h3>Cloud cover: ${data.current.clouds}%</h3>
        <h3>Humidity: ${data.current.humidity}%</h3>
        <h3>UV Index: ${uviScale}</h3>
    </div>`


let celsArr = []
let fahrArr = []
    for(let i = 0; i < 6; i++) {
        const daily = data.daily[i].temp.day
        celsArr.push(daily)
    }
        
    for(var j = 0; j < celsArr.length; j++) {
        fahrArr.push(celsArr[j] * 1.8 + 32)
    }
    
    unitsBtn.addEventListener("click", () => {
       const dts = document.querySelectorAll(".daily-temp")
         if (fahrenheit) {
            dts[0].innerHTML = fahrArr[1].toFixed(1) + "°F"
            dts[1].innerHTML = fahrArr[2].toFixed(1) + "°F"
            dts[2].innerHTML = fahrArr[3].toFixed(1) + "°F"
            dts[3].innerHTML = fahrArr[4].toFixed(1) + "°F"
            dts[4].innerHTML = fahrArr[5].toFixed(1) + "°F"
         } else {
            dts[0].innerHTML = celsArr[1].toFixed(1) + "°C"
            dts[1].innerHTML = celsArr[2].toFixed(1) + "°C"
            dts[2].innerHTML = celsArr[3].toFixed(1) + "°C"
            dts[3].innerHTML = celsArr[4].toFixed(1) + "°C"
            dts[4].innerHTML = celsArr[5].toFixed(1) + "°C"
            
         }
    })
    
    lowerPanel.innerHTML = 
    `<div class="fw day1">
    <h2>${returnDayOfWeek(data.daily[1].dt)}<h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png" alt="Weather icon">
    <h1 class="daily-temp">${celsArr[1].toFixed(1)}°C</h1>
    <h2>${data.daily[1].weather[0].description}</h2>
</div>
<div class="fw day2">
<h2>${returnDayOfWeek(data.daily[2].dt)}<h2>
<img class="icon" src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png" alt="Weather icon">
    <h1 class="daily-temp">${celsArr[2].toFixed(1)}°C</h1>
    <h2>${data.daily[2].weather[0].description}</h2>
</div>
<div class="fw day3">
<h2>${returnDayOfWeek(data.daily[3].dt)}<h2>
<img class="icon" src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png" alt="Weather icon">
    <h1 class="daily-temp">${data.daily[3].temp.day.toFixed(1)}°C</h1>
    <h2>${data.daily[3].weather[0].description}</h2>
</div>
<div class="fw day4">
<h2>${returnDayOfWeek(data.daily[4].dt)}<h2>
<img class="icon" src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png" alt="Weather icon">
    <h1 class="daily-temp">${data.daily[4].temp.day.toFixed(1)}°C</h1>
    <h2>${data.daily[4].weather[0].description}</h2>
</div>
<div class="fw day5">
<h2>${returnDayOfWeek(data.daily[5].dt)}<h2>
<img class="icon" src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png" alt="Weather icon">
    <h1 class="daily-temp">${data.daily[5].temp.day.toFixed(1)}°C</h1>
    <h2>${data.daily[5].weather[0].description}</h2>
</div>`
    }

displayData(data)
}
