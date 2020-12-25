console.log('Client side javascript file is loaded!')

const weatherPanel = document.getElementById("weather");
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
    <img src="${current.weather_icons[0]}" >
    <p>${data.place_name}</p>
    <p>${current.is_day === "no"?'Night':'Day'}</p>
    <p>Description: ${current.weather_descriptions}</p>
    <p>Local time: ${location.localtime}</p>
    <p>Temperature: ${current.temperature}ºC</p>
  `
}
