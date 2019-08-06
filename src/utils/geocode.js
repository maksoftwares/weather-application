const request = require('request');

const geoCode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFrc2hlZXJhbiIsImEiOiJjanhqam42Y3cwMmNpM3hxZTBveG13MHVuIn0.sQ9RIZIO_FiWdFiAaEPBZg&limit=1';
    request({url : url, json : true},(error, response)=>{
    if(error){
        callback('Unable to connect to internet!',undefined);
    } else if(response.body.features.length == 0){
        callback('No location found!!', undefined);
    }
     else {
        callback(undefined,{
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location : response.body.features[0].place_name
        })
    }
    });
}

module.exports = geoCode;

