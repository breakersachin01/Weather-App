/*Note:As we are using the open Weather API we need to
*first get our API key from the Open Weather map API
*so we need to go to the website register and get our API key. it is totally free, for develops and give some free tier.
*(Search "open weather map" ==> "https://openweathermap.org")
*/

const apikey = "472450c9e1c45395eb94a1f3c31ab49e";

const weatherDataEl = document.getElementById("weather-data");      //target "weather-data" class of http file.

const cityInputEl = document.getElementById("city-input");          //target "city-input" id of http file.

const formE1 = document.querySelector("form");                      //target the first "form tag" of html file

//add event listener
formE1.addEventListener("submit", (event)=>{
    event.preventDefault();           //by using it the page is not refresed after clicked on button.
    const cityValue = cityInputEl.value;
    // console.log(cityValue);

    getWeatherData(cityValue);             //call the funtion
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);                //"await" is used to wait until the response come.

        if(!response.ok){
            throw new Error("Network response was not Ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;
        
        weatherDataEl.querySelector(
           ".temperature"
        ).textContent = `${temperature}°C`;

        weatherDataEl.querySelector(
            ".description"
        ).textContent = description;

        weatherDataEl.querySelector(
            ".details"
        ).innerHTML = details.map((details) => `<div>${details}</div>`).join("");

    } 

    catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML ="";
        
        weatherDataEl.querySelector(".temperature").textContent ="";

        weatherDataEl.querySelector(".description").textContent = "An Error happened, Please Enter Valid City";

        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}
