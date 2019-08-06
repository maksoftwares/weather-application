const request = require('request');

const foreCast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/984a4c2ba198721fe5166e54fc14e3db/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'?units=si';
    request({url : url, json : true},(error, response)=>{
        if(error){
            callback('Unable to connect to internet!',undefined);
        } else if(response.body.error) {
            callback('Unable to find location',undefined);
            } else {
                callback(undefined,response.body.daily.data[0].summary +' It is currently '+ response.body.currently.temperature + ' degrees out. There is ' + response.body.currently.precipIntensity +'% chance of rain.');
            }
    })
}

module.exports = foreCast;