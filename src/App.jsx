import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ProjectDetail from './components/ProjectDetail'
import Footer from './components/Footer'
import Status from './components/Status'
import Changelog from './components/Changelog'
import DecisionLog from './components/DecisionLog'
import Benchmarks from './components/Benchmarks'
import './App.css'

function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    // Only track scroll on home page
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location])

  return (
    <div className="App">
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </main>
        } />
        <Route path="/projects/:slug" element={<><ProjectDetail /><Footer /></>} />
        <Route path="/status" element={<><Status /><Footer /></>} />
        <Route path="/changelog" element={<><Changelog /><Footer /></>} />
        <Route path="/decision-log" element={<><DecisionLog /><Footer /></>} />
        <Route path="/benchmarks" element={<><Benchmarks /><Footer /></>} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
