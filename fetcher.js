//TODO make lat/long dyn.
//const meEndpoint = 'http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806';

//notes
/*
*/
const { XMLParser } = require('fast-xml-parser');

const threeDForeCastEndPoint = 'https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml';


fetch(threeDForeCastEndPoint)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    //console.log(data);
    parseAndUnpack(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

async function parseAndUnpack(response) {
    let xmlText = response;

    let parser = new XMLParser();
    let parsedText = parser.parse(xmlText);

    //For now we ' ll just output dublin.

    parsedText.forecast.station.forEach(station => {
        if (station.location === 'Dublin') {
            console.log(station);
        }
    });
}