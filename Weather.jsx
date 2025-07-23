import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const city = location.state?.city

  const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

  const temperatureData = useMemo(() => {
    if (!weatherData) return null
    
    const celsius = Math.round(weatherData.main.temp - 273.15)
    const fahrenheit = Math.round((celsius * 9/5) + 32)
    
    return { celsius, fahrenheit }
  }, [weatherData])

  useEffect(() => {
    if (!city) {
      navigate('/')
      return
    }

    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
        setWeatherData(response.data)
        setError('')
      } catch {
        setError('City not found. Please try again.')
        setWeatherData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city, navigate, API_KEY])

  if (loading) {
    return (
      <div className="weather">
        <p className="loading">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather">
        <h2>Error</h2>
        <p className="error">{error}</p>
        <button onClick={() => navigate('/')} className="button">
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="weather">
      <h1>Weather in {weatherData.name}</h1>
      <div className="weather-card">
        <h2>{weatherData.weather[0].description}</h2>
        <div className="temperature">
          <p className="temp">{temperatureData.celsius}°C</p>
          <p className="temp">{temperatureData.fahrenheit}°F</p>
        </div>
        <div className="details">
          <div className="detail">
            <span className="label">Humidity:</span>
            <span className="value">{weatherData.main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind Speed:</span>
            <span className="value">{weatherData.wind.speed} m/s</span>
          </div>
          <div className="detail">
            <span className="label">Condition:</span>
            <span className="value">{weatherData.weather[0].main}</span>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/')} className="button">
        Search Another City
      </button>
    </div>
  )
}

export default Weather
