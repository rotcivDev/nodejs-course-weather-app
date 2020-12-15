const geocode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherInfo');
const {defaultLog} = require('./utils/logMessages');

geocode('Monte Cristo', (error, geolocData) => {
  defaultLog(`Error: ${error}`);
  console.log('Data',geolocData);
  weatherInfo(geolocData, (error, weatherData) => {
    defaultLog(`Error: ${error}`);
    defaultLog(`Data: ${weatherData}`);
  });
});
