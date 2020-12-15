const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const {defaultLog} = require('./utils/logMessages');

const address = process.argv[2];

geocode(address, (error, {latitude, longitude, place_name} = {}) => {
  if (error) return defaultLog(`Error: ${error}`);
  if (!address) return defaultLog('Provide a location string as parameter!');

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) return defaultLog(`Error: ${error}`);
    
    defaultLog(place_name);
    defaultLog(forecastData);
  });
});
