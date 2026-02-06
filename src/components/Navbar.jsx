import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/#about' },
    { id: 'education', label: 'Education', path: '/#education' },
    { id: 'experience', label: 'Experience', path: '/#experience' },
    { id: 'projects', label: 'Projects', path: '/#projects' },
    { id: 'skills', label: 'Skills', path: '/#skills' },
    { id: 'contact', label: 'Contact', path: '/#contact' },
  ]

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  const handleNavClick = (item) => {
    if (item.path.startsWith('/#')) {
      scrollToSection(item.id)
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <motion.span
            className="logo-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            DP
          </motion.span>
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        <div className="navbar-actions">
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </motion.button>
          <button
            className="navbar-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
