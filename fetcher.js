//TODO make lat/long dyn.
//const meEndpoint = 'http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806';

//notes
/*node.js -> own runtime, so no server runtime, because IT CANT use require for some reason
thats why i use node-windows
I need to find the task sheet about pca again, wanna do that here too (still look at: exc 7)
*/

//import works bcs npm installed it prior
const threeDForeCastEndPoint = 'https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml';



export function fetchWeatherData() {
  return fetch(threeDForeCastEndPoint)
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
}
async function parseAndUnpack(response) {
    let xmlText = response;

    let parser = new DOMParser();
    let parsedText = parser.parseFromString(xmlText, 'text/xml');

    //For now we ' ll just output dublin.

    parsedText.forecast.station.forEach(station => {
        if (station.location === 'Dublin') {
            console.log(station);
        }
    });
}

