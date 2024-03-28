//const { default: axios } = require("axios")

async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
const weatherWid = document.querySelector('#weatherWidget')
weatherWid.style.display = 'none'

const dropMenu = document.querySelector('#citySelect')

const wait = document.querySelector('.info')

const url = 'http://localhost:3003/api/weather?city='

const temp = document.querySelector('#apparentTemp').lastElementChild

const todayDescription = document.querySelector('#todayDescription')

const todayStatsHolder = document.querySelector('#todayStats')
const todayStats = todayStatsHolder.querySelectorAll('div')
const nextDay = document.querySelectorAll('.next-day')
//const nextDay = nextDayHolder.querySelectorAll
function Getday(dateString){
  var date = new Date(dateString);
    
    // Array to store names of days
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Use getDay() method to get the day of the week (0-6)
    var dayOfWeek = date.getUTCDay();
    
    // Return the name of the day corresponding to the index obtained
    return days[dayOfWeek];
}

dropMenu.addEventListener( 'change', evt => {
  dropMenu.disabled = true
  weatherWid.style.display = 'none'
  wait.textContent = 'Fetching weather data...'
  const selectedIndex = dropMenu.selectedIndex
  console.log(dropMenu.options[selectedIndex].text)
  axios
  .get(url + dropMenu.options[selectedIndex].text)
  .then((res) => {
    console.log(res.data)
    wait.textContent = ''
    dropMenu.disabled = false
    weatherWid.style.display = 'block'

    temp.textContent = `${res.data.current.apparent_temperature}°`

    for(let i in descriptions){
      if(res.data.current.weather_description === descriptions[i][0]){
      todayDescription.textContent = descriptions[i][1]
    }
    if(res.data.forecast.daily[0].weather_description === descriptions[i][0]){
      nextDay[0].childNodes[3].textContent = descriptions[i][1]
    }
    if(res.data.forecast.daily[1].weather_description === descriptions[i][0]){
      nextDay[1].childNodes[3].textContent = descriptions[i][1]
    }
    if(res.data.forecast.daily[2].weather_description === descriptions[i][0]){
      nextDay[2].childNodes[3].textContent = descriptions[i][1]
    }
  }

    todayStats[0].textContent = `${res.data.current.temperature_min}°/${res.data.current.temperature_max}°`
    todayStats[1].textContent = `Precipitation: ${res.data.current.precipitation_probability*100}%`
    todayStats[2].textContent = `Humidity: ${res.data.current.humidity}%`
    todayStats[3].textContent = `Wind: ${res.data.current.wind_speed}m/s`

     //next day

    nextDay[0].childNodes[1].textContent = Getday(res.data.forecast.daily[0].date)

    nextDay[0].childNodes[5].textContent = `${
      res.data.forecast.daily[0].temperature_min}°/${
        res.data.forecast.daily[0].temperature_max}°`

    nextDay[0].childNodes[7].textContent = `Precipitation: ${
      res.data.forecast.daily[0].precipitation_probability*100}%`

      //day after next

    nextDay[1].childNodes[1].textContent = Getday(res.data.forecast.daily[1].date)

    nextDay[1].childNodes[5].textContent = `${
      res.data.forecast.daily[1].temperature_min}°/${
        res.data.forecast.daily[1].temperature_max}°`

    nextDay[1].childNodes[7].textContent = `Precipitation: ${
      res.data.forecast.daily[1].precipitation_probability*100}%`

        //following day

    nextDay[2].childNodes[1].textContent = Getday(res.data.forecast.daily[2].date)

    nextDay[2].childNodes[5].textContent = `${
      res.data.forecast.daily[2].temperature_min}°/${
        res.data.forecast.daily[2].temperature_max}°`

    nextDay[2].childNodes[7].textContent = `Precipitation: ${
      res.data.forecast.daily[2].precipitation_probability*100}%`

      //location

    document.querySelector('#location').firstChild.nextSibling.textContent = 
    res.data.location.city
  })
  .catch((err) => {
    console.log(err.message)
  })

  // const forecast = document.querySelector('#forecast')
  //       console.log(forecast.children[0].getByText('Thursday'))

  
})
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
