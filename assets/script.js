var e = document.getElementById("events");
const showFinal = document.getElementById('main-page');

function giveData(){

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(positions){
        var lat=positions.coords.latitude;
        var long=positions.coords.longitude;
        // console.log(lat,long);
        arrangeApi(lat,long);
      }
      
      }





// API Auto
    function arrangeApi(Latitude,Longitude){
        // weather API
        const apiK="cf1944c495b8f600e7c307c18734548b";
        const firstp="https://api.openweathermap.org/data/2.5/weather?lat=";
        const secondp="&lon=";
        const thirdp="&appid=";
        // ticket API
        const apiKey="pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz";
        const firstpart="https://app.ticketmaster.com/discovery/v2/events.json?apikey=";
        const secondpart="&latlong=";
    
        const WfullAPI= firstp+Latitude+secondp+Longitude+thirdp+apiK;
        const TfullAPI= firstpart+apiKey+secondpart+Latitude+","+Longitude;

    // console.log(WfullAPI);
    retData(TfullAPI);
    retDataw(WfullAPI);
    }

// ticket fetch
    async function retData(fullAPi){
        const apiUrlData = await fetch(fullAPi);
        const DataApi = await apiUrlData.json();
        console.log(DataApi);
        showData(DataApi)
         }


// weather fetch
async function retDataw(fullAPi){
    const apiUrlData = await fetch(fullAPi);
    const DataApi = await apiUrlData.json();
    
    console.log(DataApi);
    showDataw(DataApi)
    }

// ticket display
function showData(DataEvent){

    for(var i=0; i<DataEvent.page.size; i++) {
      document.querySelector('#app').insertAdjacentHTML ("afterbegin",DataEvent._embedded.events[i].name);
    }
  
    }

// weather display
function showDataw(DataWeather){
 
    const {main} = DataWeather;
  
   
    var finalTemp = main.temp-273.15;
    
  
    showFinal.innerHTML =`
    <div class="city-name">
                  <h3 class="text-white">${DataWeather.name}</h3>
              </div>
  
              <div class="weather-icon">
                  <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="">
              </div>
              
              <div class="weather-main">
                  <h3 class="text-white">${DataWeather.weather[0].main}</h3>
              </div>
  
              <div class="weather-data">
                  <h3 class="text-white">${finalTemp = main.feels_like-273.15} <sup>&#176</sup>C</h3>
              </div>
  
              <div class="weather-description">
                  <h3 class="text-white">${DataWeather.weather[0].description}</h3>
                </div>
  
                <div class="weather-humidity">
                    <h3 class="text-white">${main.humidity}</h3>
                  </div>
                  `;
  }