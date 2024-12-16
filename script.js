const apiKey = '87bcd3693f3c418c9fc181503240812';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const forecast_day_total = 4;

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('loc');
const country = document.getElementById('country');
const temperatureElement = document.getElementById('temp');
const conditionElement = document.getElementById('cond-text');
const windSpeed = document.getElementById('wind-text');
const humid = document.getElementById('humid-text');
const cond_image = document.getElementById('img-link');
const welcome_img = document.getElementById('no-data-img');
const cond_details = document.getElementById('cond-details');



const weather_day = document.getElementById('day');
const weather_date = document.getElementById('date');

const forecast_day = document.getElementById("dayforecast");

// const first_container = document.getElementById("container");
// const welcome_page= document.getElementById("welcome-page");
// Window.test= function(){
//     // var result;
//     if(!!locationInput.value){
//         first_container.style.display = "flex";
//         welcome_page.style.display = "none";
//     }
//     else{
//         first_container.style.display = "none";
//         welcome_page.style.display = "flex";
//     }
// }


searchButton.addEventListener('click', () => {
    welcome_img.style.display = "none";
    cond_details.style.display = "flex";
    forecast_day.innerHTML = "";
    const location = locationInput.value;
    console.log(location);
    if(location){
        fetchWeather(location);
    }

    locationInput.value = "";
    
});



function fetchWeather(location){
    const url = `${apiUrl}?q=${location}&key=${apiKey}&days=${forecast_day_total}&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = `${data.location.name}, ${data.location.region}`;
            country.textContent = data.location.country;
            temperatureElement.textContent = `${data.current.temp_c}°C`;
            conditionElement.textContent = data.current.condition.text;
            windSpeed.textContent = `${data.current.wind_mph} mph`;
            humid.textContent = `${data.current.humidity}%`;
            cond_image.src = 'https:' + data.current.condition.icon;

            var local_date = new Date(data.location.localtime);
            weather_date.textContent = local_date.toLocaleString('default', { month: 'long', year: 'numeric'});
            weather_day.textContent = weekday[local_date.getDay()];

            for(var i = 0; i < forecast_day_total; i++){
                var elem = document.createElement('div');
                var hr = document.createElement('hr');
                elem.className = "day";
                elem.innerHTML = 
                `            
                    <div class="day-cond">
                        ${data.forecast.forecastday[i].day.condition.text}
                    </div>
                    <div class="day-details">
                        <p class="day-temp">${data.forecast.forecastday[i].day.maxtemp_c}°C</p>
                        <p class="day-date">${data.forecast.forecastday[i].date}</p>
                    </div>
                `;


                forecast_day.appendChild(elem);
                if(i < 3){
                    forecast_day.appendChild(hr);
                }
                
                // `            
                // <div class="day">
                //     <div class="day-cond">
                //         ${data.forecast.forecastday[i].day.condition.text}
                //     </div>
                //     <div class="day-details">
                //         <p class="day-temp">${data.forecast.forecastday[i].day.maxtemp_c}°C</p>
                //         <p class="day-date">${data.forecast.forecastday[i].date}</p>
                //     </div>
                // </div>
                // <hr>`
                ;
            }

           
        

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

}