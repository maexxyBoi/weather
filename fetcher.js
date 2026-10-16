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
const STATION_DETAILS = 'stationdetails';
//ok i am unsure why, but if i dont define fetchWeatherData with window beforehand, the
//browser code cant find it. apparently thats a es6 problem
window.fetchWeatherData = async () => {
  const response = await fetch('https://www.met.ie/Open_Data/xml/web-3Dayforecast.xml');
  if (document.getElementById(LIST_ID).childNodes.length != 0)
  {
    return;
  }
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  parseAndUnpack(response);
};
async function parseAndUnpack(response) {
    let xmlText = await response.text();
    //console.log(xmlText);
    let parser = new DOMParser();
    let parsedText = parser.parseFromString(xmlText, 'text/xml');
    let stations = parsedText.getElementsByTagName('station');
    //console.log(stations)

    let list = document.getElementById(LIST_ID);

    for (let i = 0; i < stations.length; i++) {

      let station = stations[i];
      let stationName = station.querySelector('location').textContent;
      //console.log(stationName);
      let buttonNew = document.createElement('button')
      let listItem = document.createElement('li')

      //debugging, just first station to print
      i != 0 ? null : console.log(station);

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
  let nameTag = document.getElementById("name");

  //TODO make it iterative
  let day1 = document.getElementById("day1");
  let day2 = document.getElementById("day2");
  let day3 = document.getElementById("day3");
  day1.innerText = "";
  day2.innerText = "";
  day3.innerText = "";

  nameTag.innerText = station.querySelector('location').textContent
  let days = station.querySelectorAll('day');

  day1.innerText += days[0].querySelector("date").textContent.slice(0, 10);
  day2.innerText += days[1].querySelector("date").textContent.slice(0, 10);
  day3.innerText += days[2].querySelector("date").textContent.slice(0, 10);

  day1.innerText += "\nMaximal Temperature: " + days[0].querySelector("max_temp").textContent;
  day2.innerText += "\nMaximal Temperature: " + days[1].querySelector("max_temp").textContent;
  day3.innerText += "\nMaximal Temperature: " + days[2].querySelector("max_temp").textContent;
  day1.innerText += "\nMinimal Temperature: " + days[0].querySelector("min_temp").textContent;
  day2.innerText += "\nMinimal Temperature: " + days[1].querySelector("min_temp").textContent;
  day3.innerText += "\nMinimal Temperature: " + days[2].querySelector("min_temp").textContent;
  day1.innerText += "\nWeather: " + days[0].querySelector("weather_text").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
  day2.innerText += "\nWeather: " + days[1].querySelector("weather_text").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
  day3.innerText += "\nWeather: " + days[2].querySelector("weather_text").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
  day1.innerText += "\nWeather Night: " + days[0].querySelector("weather_textN").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
  day2.innerText += "\nWeather Night: " + days[1].querySelector("weather_textN").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
  day3.innerText += "\nWeather Night: " + days[2].querySelector("weather_textN").textContent.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).replaceAll("_", " ");
}

