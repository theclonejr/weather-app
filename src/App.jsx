import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import './components/styles/WeatherCard.css'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  const APIKEY = 'fa22db0a122028d84973818bc4d33b25'

  const success = position => {
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj)
  }
  
  useEffect( () => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [] )

  useEffect(()=>{
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(url)
        .then(res => {
          const celcius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = (celcius * 9/5 + 32 ).toFixed(1)
          setTemp({ celcius, fahrenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  },[coords])

  

  return (
    <div className='app'>
       {
        isLoading 
          ?
          <h2 className='app__loader'>Loading...</h2>
          :
          (<WeatherCard 
            weather={weather}
            temp={temp}
          />)
       }
       <div className='credits'>
          <p>Developed by Wences Reyes</p>
        </div>    
    </div>
  )
}

export default App
