import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext.jsx'
import { ArchiveProvider } from './contexts/ArchiveContext.jsx'

// Components import
import Home from './components/Home/Home.jsx'
import SplashScreen from './components/Splash/SplashScreen.jsx'
import OnBoarding from './components/Onboarding/OnBoarding.jsx'
import Authentication from './components/Authentication/Authentication.jsx'
import Popular from './components/Popular/Popular.jsx'
import Archive from './components/Archive/Archive.jsx'
import Settings from './components/Settings/Settings.jsx'
import PageNotFound from './components/PageNotFound/PageNotFound.jsx'

function App() {
  return (
    <DarkModeProvider>
      <ArchiveProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/home" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ArchiveProvider>
    </DarkModeProvider>
  )
}

export default App