import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Assignment_1 from './assignments/Assignment_1.jsx'
import Assignment_2 from './assignments/Assignment_2.jsx'
import Assignment_3 from './assignments/Assignment_3.jsx'
import Assignment_4 from './assignments/Assignment_4.jsx'
import Assignment_5 from './assignments/Assignment_5.jsx'
import Assignment_6 from './assignments/Assignment_6.jsx'
import Assignment_7 from './assignments/Assignment_7.jsx'
import Assignment_8 from './assignments/Assignment_8.jsx'
// Import other assignments as you create them
// import Assignment_2 from './assignments/Assignment_2'
// import Assignment_3 from './assignments/Assignment_3'
// etc.

function HomePage() {
  return (
    <div className="App">
      <h1>Arimac Assignments - Kaviru</h1>
      <div className="button-container">
        <Link to="/assignment-1">
          <button>Assignment 1</button>
        </Link>
        <Link to="/assignment-2">
          <button>Assignment 2</button>
        </Link>
        <Link to="/assignment-3">
          <button>Assignment 3</button>
        </Link>
        <Link to="/assignment-4">
          <button>Assignment 4</button>
        </Link>
        <Link to="/assignment-5">
          <button>Assignment 5</button>
        </Link>
        <Link to="/assignment-6">
          <button>Assignment 6</button>
        </Link>
        <Link to="/assignment-7">
          <button>Assignment 7</button>
        </Link>
        <Link to="/assignment-8">
          <button>Assignment 8</button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assignment-1" element={<Assignment_1 />} />
        <Route path="/assignment-2" element={<Assignment_2 />} />
        <Route path="/assignment-3" element={<Assignment_3 />} />
        <Route path="/assignment-4" element={<Assignment_4 />} />
        <Route path="/assignment-5" element={<Assignment_5 />} />
        <Route path="/assignment-6" element={<Assignment_6 />} />
        <Route path="/assignment-7" element={<Assignment_7 />} />
        <Route path="/assignment-8" element={<Assignment_8 />} />
        {/* Add more routes for additional assignments as needed */}
      </Routes>
    </Router>
  )
}

export default App