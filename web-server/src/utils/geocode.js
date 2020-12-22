const request = require('postman-request');

const geocode = (location, callback) => {
  const parsedLocationToQueryString = encodeURIComponent(location);
  const token = 'pk.eyJ1Ijoicm90Y2l2ZGV2IiwiYSI6ImNraWtzbHZxYzBhMG0ydnBkajVwdmd1NXcifQ.bsH5VFrmtBcdT6G-g4Y57w';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${parsedLocationToQueryString}.json?access_token=${token}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    const {message, features} = body;

    if (error) {
      callback('Unable to conect to geolocation service.', undefined)
      return;
    }

    if (message) {
      callback(`Location API Error: ${message}`, undefined);
      return;
    }

    if (features.length === 0) {
      callback('Invalid location. Please provide a valid search parameter.', undefined);
      return;
    }

    let latitude = features[0].center[1];
    let longitude = features[0].center[0];
    let place_name = features[0].place_name; 

    const data = {
      latitude,
      longitude,
      place_name
    }
    
    callback(undefined, data)
  })
}

module.exports = geocode;