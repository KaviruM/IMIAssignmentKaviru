import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Assignment_1 from './assignments/Assignment_1.jsx'
import Assignment_2 from './assignments/Assignment_2.jsx'
import Assignment_3 from './assignments/Assignment_3.jsx'
import Assignment_4 from './assignments/Assignment_4.jsx'
import Assignment_5 from './assignments/Assignment_5.jsx'
import Assignment_6 from './assignments/Assignment_6.jsx'
import Assignment_7 from './assignments/Assignment_7.jsx'
import Assignment_8 from './assignments/Assignment_8.jsx'
import Assignment_9 from './assignments/Assignment_9.jsx'
import Assignment_10 from './assignments/Assignment_10.jsx'
import Assignment_11 from './assignments/Assignment_11.jsx'
import Assignment_12 from './assignments/Assignment_12.jsx'
import Assignment_13 from './assignments/Assignment_13.jsx'
import Assignment_14 from './assignments/Assignment_14.jsx'
import Assignment_15 from './assignments/Assignment_15.jsx'
import Assignment_16 from './assignments/Assignment_16.jsx'
import Assignment_17 from './assignments/Assignment_17.jsx'

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
        <Link to="/assignment-9">
          <button>Assignment 9</button>
        </Link>
        <Link to="/assignment-10">
          <button>Assignment 10</button>
        </Link>
        <Link to="/assignment-11">
          <button>Assignment 11</button>
        </Link>
        <Link to="/assignment-12">
          <button>Assignment 12</button>
        </Link>
        <Link to="/assignment-13">
          <button>Assignment 13</button>
        </Link>
        <Link to="/assignment-14">
          <button>Assignment 14</button>
        </Link>
        <Link to="/assignment-15">
          <button>Assignment 15</button>
        </Link>
        <Link to="/assignment-16">
          <button>Assignment 16</button>
        </Link>
        <Link to="/assignment-17">
          <button>Assignment 17</button>
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
        <Route path="/assignment-9" element={<Assignment_9 />} />
        <Route path="/assignment-10" element={<Assignment_10 />} />
        <Route path="/assignment-11" element={<Assignment_11 />} />
        <Route path="/assignment-12" element={<Assignment_12 />} />
        <Route path="/assignment-13" element={<Assignment_13 />} />
        <Route path="/assignment-14" element={<Assignment_14 />} />
        <Route path="/assignment-15" element={<Assignment_15 />} />
        <Route path="/assignment-16" element={<Assignment_16 />} />
        <Route path="/assignment-17" element={<Assignment_17 />} />
      </Routes>
    </Router>
  )
}

export default App