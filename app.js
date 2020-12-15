const request = require('postman-request');
const chalk = require('chalk');

const weatherUrl = `http://api.weatherstack.com/current?access_key=ddc54550988e3e8c401df1417e33c74b&query=-22.7896,-43.3099`;
const geolocationUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Duque%20de%20Caxias.json?access_token=pk.eyJ1Ijoicm90Y2l2ZGV2IiwiYSI6ImNraWtzbHZxYzBhMG0ydnBkajVwdmd1NXcifQ.bsH5VFrmtBcdT6G-g4Y57w&limit=1";

const forecast = msg => console.log(chalk.bold(msg));

const getWeatherData = () => {
  return request({
    url: weatherUrl,
    json: true
  }, (error, response) => {

    if (error) {
      forecast('Unable to conect to weather service.');
      return;
    }

    if (response.body.error) {
      forecast(response.body.error.info);
      return;
    }

    let currentData= response.body.current;
    let locationData = response.body.location;
    forecast(`
    Its ${locationData.localtime.split(' ').reverse().join(' ')} at ${locationData.region}, ${locationData.country}.
    Current: ${currentData.temperature}ºC 
    Feels like: ${currentData.feelslike}ºC
    Description: ${currentData.weather_descriptions}
    Rain: ${currentData.cloudcover}%
    Wind: ${currentData.wind_speed} km/h, Direction: ${currentData.wind_dir}`)    
  });
}
getWeatherData();

const getForwardGeolocation = () => {  
  return request({
    url: geolocationUrl,
    json: true
  }, (error, response) => {
    if (error) {
      forecast('Unable to conect to geolocation service.')
      return;
    }

    if (response.body.message) {
      forecast(`Location API Error: ${response.body.message}`);
      return;
    }

    let forwardGeolocation = response.body.features[0].center;
    let latitude = forwardGeolocation[1];
    let longitude = forwardGeolocation[0];
    forecast(`Mapbox data: Latitude: ${latitude}, Longitude: ${longitude}`)    
  })
}
getForwardGeolocation();
