import React, { useState } from 'react'

const WeatherCard = ({ weather, temp }) => {
    const [isCelcius, setIsCelcius] = useState(true)
    
    const handleChangeTemp = () => setIsCelcius(!isCelcius)
    const feelsCelcius = (weather?.main.feels_like - 273.15).toFixed(1)
    const feelsFahrenheit = (feelsCelcius * 9/5 + 32).toFixed(1)

  return (
    <article className='weather'>
        <h1 className='weather__title'>Weather App</h1>
        <h2 className='weather__location'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='weather__body'>
            <header className='weather_img-container'>
                <img className='weather__img' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />{}
            </header>
            <article className='weather__info'>
                <h3 className='weather__condition'>"{(weather?.weather[0].description).toUpperCase()}"</h3>
                <ul className='weather__list'>
                    <li className='weather__item'><span className='weather__label'>Wind Speed </span><span className='weather__value'>{weather?.wind.speed} m/s</span></li>
                    <li className='weather__item'><span className='weather__label'>Clouds </span><span className='weather__value'>{weather?.clouds.all}%</span></li>
                    <li className='weather__item'><span className='weather__label'>Pressure </span><span className='weather__value'>{weather?.main.pressure}hPa</span></li>
                    <li className='weather__item'><span className='weather__label'>Feels like</span><span className='weather__value'>{isCelcius ? `${feelsCelcius} °C` : `${feelsFahrenheit} °F` }</span></li>
                </ul>
            </article>
        </section>
        <h2 className='weather__temp'>{isCelcius ?  `${temp?.celcius}°C` : `${temp?.fahrenheit}°F` }</h2>
        <button className='weather__btn' onClick={handleChangeTemp}>Change to {isCelcius ? '°F' : '°C'}</button>
    </article>
    
  )
}

export default WeatherCard