import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components import
import Home from './components/Home/Home.jsx'
import Popular from './components/Popular/Popular.jsx'
import Archive from './components/Archive/Archive.jsx'
import Settings from './components/Settings/Settings.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}


      export default App
