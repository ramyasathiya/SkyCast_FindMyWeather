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
