import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronRight, FaInfoCircle } from 'react-icons/fa'
import './ArchitectureExplorer.css'

const ArchitectureExplorer = ({ flow, title = 'Architecture Explorer' }) => {
  const [expandedStep, setExpandedStep] = useState(null)
  const [selectedStep, setSelectedStep] = useState(null)

  const handleStepClick = (index) => {
    if (expandedStep === index) {
      setExpandedStep(null)
      setSelectedStep(null)
    } else {
      setExpandedStep(index)
      setSelectedStep(index)
    }
  }

  return (
    <div className="architecture-explorer">
      <div className="explorer-header">
        <h3 className="explorer-title">{title}</h3>
        <p className="explorer-subtitle">Click on any stage to explore details</p>
      </div>

      <div className="explorer-flow">
        {flow.map((step, index) => (
          <div key={index} className="explorer-step-container">
            <motion.div
              className={`explorer-step ${expandedStep === index ? 'expanded' : ''} ${selectedStep === index ? 'selected' : ''}`}
              onClick={() => handleStepClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h4 className="step-name">{step.step}</h4>
                <p className="step-preview">{step.description.substring(0, 60)}...</p>
              </div>
              <FaChevronRight className={`step-arrow ${expandedStep === index ? 'rotated' : ''}`} />
            </motion.div>

            <AnimatePresence>
              {expandedStep === index && (
                <motion.div
                  className="step-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="details-content">
                    <div className="details-icon">
                      <FaInfoCircle />
                    </div>
                    <div className="details-text">
                      <h5>Details</h5>
                      <p>{step.description}</p>
                      {step.technologies && (
                        <div className="details-tech">
                          <strong>Technologies:</strong>
                          <div className="tech-list">
                            {step.technologies.map((tech, idx) => (
                              <span key={idx} className="tech-badge">{tech}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {step.metrics && (
                        <div className="details-metrics">
                          <strong>Metrics:</strong>
                          <ul>
                            {step.metrics.map((metric, idx) => (
                              <li key={idx}>{metric}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {index < flow.length - 1 && (
              <div className="flow-connector">
                <svg width="2" height="40" viewBox="0 0 2 40">
                  <line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchitectureExplorer
