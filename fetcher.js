//TODO make lat/long dyn.
//const meEndpoint = 'http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806';

//notes
/*node.js -> own runtime, so no server runtime, because IT CANT use require for some reason
thats why i use node-windows
I need to find the task sheet about pca again, wanna do that here too (still look at: exc 7)
*/

//import works bcs npm installed it prior
const THREE_DAY_FORECAST_ENDPOINT = 'https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml';
const LIST_ID = 'stationlist';
//ok i am unsure why, but if i dont define fetchWeatherData with window beforehand, the
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
    console.log(stations)

    let list = document.getElementById(LIST_ID);
    

    for (let i = 0; i < stations.length; i++) {

      let station = stations[i];
      let stationName = station.querySelector('location').textContent;
      console.log(stationName);
      let buttonNew = document.createElement('button')
      let listItem = document.createElement('li')
      
      buttonNew.textContent = `${stationName}`;
      buttonNew.style.cursor = 'pointer';

      buttonNew.addEventListener('click', () => {
        unpackAndVisualizedDetails(station)
      });

      listItem.appendChild(buttonNew);
      list.appendChild(listItem);
    }
}
async function unpackAndVisualizedDetails (station)
{

}

