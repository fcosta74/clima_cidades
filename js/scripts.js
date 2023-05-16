// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7da5d9543c4e87187fcfd9d882d9c9a2  

const apikey = "7da5d9543c4e87187fcfd9d882d9c9a2"
const apiCountryURL = "https://flagsapi.com/png/"
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const feelsLike = document.querySelector("#feels-like span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")
      
const weatherContainer = document.querySelector("#weather-data")
const errorMessageContainer = document.querySelector("#error-message")

const loader = document.querySelector("#loader")

const suggestionConatiner = document.querySelector("#suggestions")
const suggestionButtons = document.querySelectorAll("#suggestions button")

// funções
const toggleLoader = () => {
    loader.classList.toggle("hide")
}


const getWetherData = async (city) => {
    toggleLoader()

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    toggleLoader()

    return data
}
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
}
const hideInformation = () => {
    errorMessageContainer.classList.add("hide")
    weatherContainer.classList.add("hide")

    suggestionConatiner.classList.add("hide")
}
const showWeatherData = async (city) => {
    hideInformation()

    const data = await getWetherData(city)

    if(data.cod === "404"){
        showErrorMessage()
        return
    }

    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/32.png`)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
    feelsLike.textContent = parseInt(data.main.feels_like);

    /*country.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/32.png`)*/
    // mudar imagem de BG
    document.body.style.backgroundImage = `url("${apiUnsplash + city})`


    weatherContainer.classList.remove("hide")



}
    

// eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault() 

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city)
    }
});
  

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
});

