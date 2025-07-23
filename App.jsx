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
