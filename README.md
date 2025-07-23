# SkyCast - Find My Weather
## Date:23.07.2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
App.css
```
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: skyblue;
}

.app {
  padding-bottom: 80px;
}

.home {
  margin: 0 auto;
  padding: 20px;
  gap: 50px;
}

.home h1 {
  color: black;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  padding: 10px;
  border: 1px solid whitesmoke;
  width: 200px;
}

.button {
  padding: 10px 20px;
  background-color: darkgreen;
  color: white;
  border: none;
  margin-top: 15px; 
}

.error {
  color: red;
  margin-top: 10px;
}

.weather {
  margin: 0 auto;
  padding: 20px;
}

.weather h1 {
  color: black;
}

.weather-card {
  background-color: wheat;
  padding: 20px;
}

.weather-card h2 {
  color: black;
}

.temp {
  font-size: 24px;
  color: black;
}

.detail {
  padding: 8px;
  background-color: pink;
}

.label {
  font-weight: bold;
}

.footer {
  font-weight: bold;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
}


```
App.jsx
```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Weather from './Weather'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
        <div className='footer'> Ramya S - 212222040130 </div>
      </div>
    </Router>
  )
}

export default App

```
Home.jsx
```
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (city.trim() === '') {
      setError('Please enter a city name')
      return
    }
    setError('')
    navigate('/weather', { state: { city: city.trim() } })
  }, [city, navigate])

  return (
    <div className="home">
      <h1>SkyCast - Find My Weather</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input"
          />
          
          <br></br>
          <button type="submit" className="button">
            Get Weather
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
export default Home

```
Weather.jsx
```
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

```

## Output:
<img width="1918" height="1007" alt="image" src="https://github.com/user-attachments/assets/2a6a7577-a009-4cb8-81c5-08b082e82341" />
<img width="1918" height="1002" alt="image" src="https://github.com/user-attachments/assets/79c8c04e-72e3-45fd-87ab-37654ed0903d" />




## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
