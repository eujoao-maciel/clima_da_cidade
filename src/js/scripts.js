// Variáveis e Elementos

const apiKey = '95170f5051fe78c27da4c0a95913ce87'

const cityInput = document.getElementById('city_input')
const searchBtn = document.getElementById('search')
const cityName = document.getElementById('city_name')
const countryFlag = document.getElementById('country_flag')
const weatherInfo = document.getElementById('clima')
const weatherIcon = document.getElementById('weather_icon')
const temperatureInfo = document.querySelector('#temperature span')

// Funções

const changeMensageRecomendation = (clima) => {
    const mensageRecomendation = document.getElementById('mensage')

    if (clima > 0 && clima <= 10) {
        mensageRecomendation.innerText = "🌀 Frio leve. Use uma jaqueta.";
    } else if (clima > 10 && clima <= 20) {
        mensageRecomendation.innerText = "🌤️ Clima ameno. Aproveite!";
    } else if (clima > 20 && clima <= 30) {
        mensageRecomendation.innerText = "☀️ Calor agradável. Hidrate-se.";
    } else if (clima > 30 && clima <= 40) {
        mensageRecomendation.innerText = "🔥 Calor intenso! Beba água.";
    } else {
        mensageRecomendation.innerText = "Muito calor! Evite o sol.";
    }
}

const changeBackground = (clima) => {
    const body = document.body

    if (clima < 0) {
        body.style.background = "linear-gradient(to right, #00008B, #0000FF)"


    } else if (clima > 0 && clima < 10) {
        body.style.background = "linear-gradient(to right, #0000FF, #00FFFF)"
    } else if (clima > 10 && clima < 20) {
        body.style.background = "linear-gradient(to right, #00FFFF, #00FF00)"
    } else if (clima > 20 && clima < 30) {
        body.style.background = "linear-gradient(to right, #00FF00, #FFFF00)"
    } else if (clima > 30 && clima < 40) {
        body.style.background = "linear-gradient(to right, #FFFF00, #FF4500)"
    } else{
        body.style.background = "linear-gradient(to right, #FF4500, #FF0000)"
    }
    
}

const getWeatherData = async(city) => {
    
    try {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch(apiWeatherURL)
        const data = await res.json()

        return data
    } catch (err) {
        console.log(err)
    }

}

const showWeatherData = async(city) => {

    try {
        
        const data = await getWeatherData(city)

        cityName.innerText = data.name
        countryFlag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        weatherInfo.innerText = data.weather[0].description
        weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        temperatureInfo.innerHTML = `${Math.floor(data.main.temp)}`

        changeBackground(Math.floor(data.main.temp))
        changeMensageRecomendation(Math.floor(data.main.temp))
        document.querySelector('section').classList.remove('hide')
        document.querySelector('footer').classList.remove('hide')

    } catch (err) {
        console.log(err)
        alert("Cidade não encontrada. Por favor, verifique o nome da cidade")

        document.querySelector('section').classList.add('hide')
        document.querySelector('footer').classList.add('hide')
    }


}

// Eventos 

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener('keydown', (e) => {
    if ( e.key === "Enter" ) {
        const city = cityInput.value

        showWeatherData(city)
    }
})