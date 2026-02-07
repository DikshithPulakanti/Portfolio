import { motion } from 'framer-motion'
import { FaPlus, FaArrowUp, FaBug } from 'react-icons/fa'
import { changelog } from '../data/changelog'
import './Changelog.css'

const Changelog = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'added':
        return <FaPlus />
      case 'improved':
        return <FaArrowUp />
      case 'fixed':
        return <FaBug />
      default:
        return <FaPlus />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'added':
        return 'var(--accent-green)'
      case 'improved':
        return 'var(--accent-blue)'
      case 'fixed':
        return 'var(--accent-purple)'
      default:
        return 'var(--text-secondary)'
    }
  }

  return (
    <div className="changelog-page">
      <div className="changelog-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="changelog-title">Changelog</h1>
          <p className="changelog-subtitle">
            Track the evolution of this portfolio and the systems I build
          </p>

          <div className="changelog-list">
            {changelog.map((entry, index) => (
              <motion.div
                key={index}
                className="changelog-entry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="changelog-header">
                  <div className="version-badge">
                    <span className="version-number">v{entry.version}</span>
                    <span className="version-date">{entry.date}</span>
                  </div>
                </div>

                <div className="changelog-changes">
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="change-item">
                      <div
                        className="change-icon"
                        style={{ color: getTypeColor(change.type) }}
                      >
                        {getIcon(change.type)}
                      </div>
                      <div className="change-content">
                        <h3 className="change-title">{change.title}</h3>
                        <p className="change-description">{change.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Changelog
