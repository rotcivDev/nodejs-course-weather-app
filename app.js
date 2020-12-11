const request = require('postman-request');
const chalk = require('chalk');

const url = "http://api.weatherstack.com/current?access_key=ddc54550988e3e8c401df1417e33c74b&query=Duque%20de%20Caxias";

const forecast = msg => console.log(chalk.bold(msg));

const getWeatherData = async () => {
  return request({
    url: url,
    json: true
  }, async (error, response) => {
    let currentData= response.body.current;
    let locationData = response.body.location;
    debugger
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
