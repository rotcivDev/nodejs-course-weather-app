console.log('Client side javascript file is loaded!')

const weatherPanel = document.getElementById("weather-panel");
const weatherForm = document.getElementById("weather-form");
const weatherInput = document.getElementById("form-input");

weatherForm.addEventListener("submit", ev => {
  ev.preventDefault();

  weatherPanel.innerHTML = "Loading..."

  fetch(`/weather?address=${weatherInput.value}`).then(res => {
    res.json().then(data => {
      if (data.error) return weatherPanel.innerHTML = `${data.error}` 
      weatherLayout(data);
    })
  })
}) 

const weatherLayout = data => {
  const {current, location} = data.forecastData
  return weatherPanel.innerHTML = `
    
    <p>${data.place_name}</p>
    <p>${current.is_day === "no"?'Night':'Day'}</p>
    <p>Local time: ${location.localtime}</p>
    <p>Temperature: ${current.temperature}ºC</p>
    <p>Description: ${current.weather_descriptions}</p>
    <img src="${current.weather_icons[0]}" >
    
  `
}
