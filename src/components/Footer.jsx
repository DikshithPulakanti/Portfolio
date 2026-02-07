import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const lastUpdated = 'Feb 2026'
  const version = '1.2'

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/status" className="footer-link">Status</Link>
            <Link to="/changelog" className="footer-link">Changelog</Link>
            <Link to="/decision-log" className="footer-link">Decisions</Link>
            <Link to="/benchmarks" className="footer-link">Benchmarks</Link>
          </div>
          <div className="footer-version">
            <span className="version-text">Portfolio v{version}</span>
            <span className="separator">—</span>
            <span className="update-text">Last updated {lastUpdated}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
