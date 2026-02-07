import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { decisionLog } from '../data/decisionLog'
import './DecisionLog.css'

const DecisionLog = () => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="decision-log-page">
      <div className="decision-log-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="decision-log-title">Decision Log</h1>
          <p className="decision-log-subtitle">
            Documenting the reasoning behind key technical decisions. This is how I think when building systems.
          </p>

          <div className="decision-list">
            {decisionLog.map((decision, index) => (
              <motion.div
                key={decision.id}
                className="decision-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="decision-header"
                  onClick={() => toggleExpand(decision.id)}
                >
                  <div className="decision-title-section">
                    <h2 className="decision-title">{decision.title}</h2>
                    <div className="decision-meta">
                      <span className="decision-date">{decision.date}</span>
                      <span className="decision-badge">{decision.decision}</span>
                    </div>
                  </div>
                  <button className="expand-button">
                    {expandedId === decision.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                <div className="decision-context">
                  <strong>Context:</strong> {decision.context}
                </div>

                {expandedId === decision.id && (
                  <motion.div
                    className="decision-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="alternatives-section">
                      <h3>Alternatives Considered:</h3>
                      <div className="alternatives-list">
                        {decision.alternatives.map((alt, idx) => (
                          <span key={idx} className="alternative-tag">{alt}</span>
                        ))}
                      </div>
                    </div>

                    <div className="reasoning-section">
                      <h3>Reasoning:</h3>
                      {decision.reasoning.map((reason, idx) => (
                        <div key={idx} className="reason-item">
                          <h4 className="reason-factor">{reason.factor}</h4>
                          <p className="reason-explanation">{reason.explanation}</p>
                        </div>
                      ))}
                    </div>

                    <div className="tradeoffs-section">
                      <h3>Tradeoffs:</h3>
                      <div className="tradeoffs-grid">
                        <div className="tradeoff-pros">
                          <h4>Pros:</h4>
                          <ul>
                            {decision.tradeoffs.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="tradeoff-cons">
                          <h4>Cons:</h4>
                          <ul>
                            {decision.tradeoffs.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="production-section">
                      <h3>Production Consideration:</h3>
                      <p>{decision.productionConsideration}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DecisionLog
