const solDisplay = document.querySelector(".sols-display")
const unitsBtn = document.querySelector(".units-btn")


window.onload = getWeatherMars()
async function getWeatherMars() {
    const remsApi = "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json"
    const response = await fetch(remsApi)
    const data = await response.json()
    displayConditions(data)
}

function displayConditions(data) {
    let celcius = true
    let fahrenheit = false
    const maxArrC = []
    const minArrC = []

    for(var i = 0; i < 5; i++) {
        maxArrC.push(data.soles[i].max_temp)
        minArrC.push(data.soles[i].min_temp)
    }
    const maxArrF = maxArrC.map(cels => cels * 1.8 +32)
    const minArrF = minArrC.map(cels => cels * 1.8 +32)

unitsBtn.addEventListener("click", () => {
    const maxT = document.querySelectorAll(".max")
    const minT = document.querySelectorAll(".min")
    if(celcius) {
        maxT[0].innerHTML = "Max: " + maxArrF[0].toFixed(1) + "°F" 
        maxT[1].innerHTML = "Max: " + maxArrF[1].toFixed(1) + "°F" 
        maxT[2].innerHTML = "Max: " + maxArrF[2].toFixed(1) + "°F" 
        maxT[3].innerHTML = "Max: " + maxArrF[3].toFixed(1) + "°F" 
        maxT[4].innerHTML = "Max: " + maxArrF[4].toFixed(1) + "°F" 
        minT[0].innerHTML = "Min: " + minArrF[0].toFixed(1) + "°F"
        minT[1].innerHTML = "Min: " + minArrF[1].toFixed(1) + "°F"
        minT[2].innerHTML = "Min: " + minArrF[2].toFixed(1) + "°F"
        minT[3].innerHTML = "Min: " + minArrF[3].toFixed(1) + "°F"
        minT[4].innerHTML = "Min: " + minArrF[4].toFixed(1) + "°F"
        celcius = false
        fahrenheit = true
    } else if(fahrenheit){
        maxT[0].innerHTML = "Max: " + maxArrC[0] + "°C" 
        maxT[1].innerHTML = "Max: " + maxArrC[1] + "°C" 
        maxT[2].innerHTML = "Max: " + maxArrC[2] + "°C" 
        maxT[3].innerHTML = "Max: " + maxArrC[3] + "°C" 
        maxT[4].innerHTML = "Max: " + maxArrC[4] + "°C" 
        minT[0].innerHTML = "Min: " + minArrC[0] + "°C"
        minT[1].innerHTML = "Min: " + minArrC[1] + "°C"
        minT[2].innerHTML = "Min: " + minArrC[2] + "°C"
        minT[3].innerHTML = "Min: " + minArrC[3] + "°C"
        minT[4].innerHTML = "Min: " + minArrC[4] + "°C"
        celcius = true
        fahrenheit = false
    }
    
})

solDisplay.innerHTML = 
`<div class="current-sol">
<h1>Current Sol: ${data.soles[0].sol}</h1>
<h3>${data.soles[0].terrestrial_date}</h3>
<br>
<h2 class="max">Max: ${data.soles[0].max_temp}°C</h2>
<h2 class="min">Min: ${data.soles[0].min_temp}°C</h2>
<h2>Atmospheric opacity: ${data.soles[0].atmo_opacity}</h2>
</div>
<div class="sols-container">
<div class="sol -1">
    <h2>Sol ${data.soles[1].sol}</h2>
    <p>${data.soles[1].terrestrial_date}</p>
    <br>
    <h3 class="max">Max: ${data.soles[1].max_temp}°C</h3>
    <h3 class="min">Min: ${data.soles[1].min_temp}°C</h3>
</div>
<div class="sol -2">
    <h2>Sol ${data.soles[2].sol}</h2>
    <p>${data.soles[2].terrestrial_date}</p>
    <br>
    <h3 class="max">Max: ${data.soles[2].max_temp}°C</h3>
    <h3 class="min">Min: ${data.soles[2].min_temp}°C</h3>
</div>
<div class="sol -3">
    <h2>Sol ${data.soles[3].sol}</h2>
    <p>${data.soles[3].terrestrial_date}</p>
    <br>
    <h3 class="max">Max: ${data.soles[3].max_temp}°C</h3>
    <h3 class="min">Min: ${data.soles[3].min_temp}°C</h3>
</div>
<div class="sol -4">
    <h2>Sol ${data.soles[4].sol}</h2>
    <p>${data.soles[4].terrestrial_date}</p>
    <br>
    <h3 class="max">Max: ${data.soles[4].max_temp}°C</h3>
    <h3 class="min">Min: ${data.soles[4].min_temp}°C</h3>
</div>
</div>`
}
