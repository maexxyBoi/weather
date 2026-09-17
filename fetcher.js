//TODO make lat/long dyn.
//const meEndpoint = 'http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806';

//notes
/*node.js -> own runtime, so no server runtime, because IT CANT use require for some reason
thats why i use node-windows
I need to find the task sheet about pca again, wanna do that here too (still look at: exc 7)
*/

//import works bcs npm installed it prior
const threeDForeCastEndPoint = 'https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml';

//ok i am unsure why, but if i dont define fetchWeatherData with window. beforehand, the
//browser code cant find it. apparently thats a es6 problem
window.fetchWeatherData = async () => {
  const response = await fetch('https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml');
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  parseAndUnpack(response);
};
async function parseAndUnpack(response) {
    let xmlText = await response.text();
    console.log(xmlText);
    let parser = new DOMParser();
    let parsedText = parser.parseFromString(xmlText, 'text/xml');
    let stations = parsedText.getElementsByTagName('station');
    //For now we ' ll just output dublin.
    console.log(stations)
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].getAttribute('location') === 'Dublin') {
        console.log(stations[i]);
      }
    }
}

