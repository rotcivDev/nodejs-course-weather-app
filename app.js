const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const {defaultLog} = require('./utils/logMessages');

geocode('Monte Cristo', (error, geolocData) => {
  defaultLog(`Error: ${error}`);
  console.log('Data',geolocData);
  forecast(geolocData, (error, weatherData) => {
    defaultLog(`Error: ${error}`);
    defaultLog(`Data: ${weatherData}`);
  });
});
