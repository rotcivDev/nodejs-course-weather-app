const request = require('postman-request');

const weatherInfo = (data, callback) => {
  if (!data) {
    callback('No data received! please input valid geolocation or address.', undefined);
    return;
  }
  
  const {latitude, longitude, place_name} = data;
  const url = `http://api.weatherstack.com/current?access_key=ddc54550988e3e8c401df1417e33c74b&query=${latitude},${longitude}`;
  
  request({ url: url, json: true }, (error, response) => {

    if (error) {
      callback('Unable to conect to weather service.', undefined);
      return;
    }

    if (response.body.error) {
      callback(response.body.error.info, undefined);
      return;
    }

    const { current, location } = response.body;
    const dateAndTime = location.localtime.split(' ');
    const localTime = dateAndTime[1];
    const localDate = dateAndTime[0].split('-').reverse().join('/');
    const data =`
      Its ${localTime} at ${place_name}.
      Date: ${localDate}.
      Current: ${current.temperature}ºC 
      Feels like: ${current.feelslike}ºC
      Description: ${current.weather_descriptions}
      Rain: ${current.cloudcover}%
      Wind: ${current.wind_speed} km/h, Direction: ${current.wind_dir}
    `
    callback(undefined, data);
  });
}

module.exports = weatherInfo;
