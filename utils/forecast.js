const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  
  const url = `http://api.weatherstack.com/current?access_key=ddc54550988e3e8c401df1417e33c74b&query=${latitude},${longitude}`;
  
  request({ url, json: true }, (error, { body }) => {

    if (error) return callback('Unable to conect to weather service.', undefined);
    if (body.error) return callback(response.body.error.info, undefined);

    const { current, location } = body;
    const dateAndTime = location.localtime.split(' ');
    const localTime = dateAndTime[1];
    const localDate = dateAndTime[0].split('-').reverse().join('/');
    const data =`${localDate} - ${localTime} at local time. ${current.weather_descriptions}. Temperature is currently ${current.temperature}ºC and there's ${current.cloudcover}% chance of rain.`;
    
    callback(undefined, data);
  });
}

module.exports = forecast;
