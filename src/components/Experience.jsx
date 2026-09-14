import { motion } from 'framer-motion'
import { FaBriefcase, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa'
import { experience } from '../data/experience'
import './Experience.css'

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="experience" className="experience">
      <motion.div
        className="experience-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Experience</h2>

        <div className="experience-list">
          {experience.map((role) => (
            <motion.div key={role.id} className="experience-item" variants={itemVariants}>
              <div className="experience-icon">
                <FaBriefcase />
              </div>
              <div className="experience-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-position">{role.position}</h3>
                    <h4 className="experience-company">{role.company}</h4>
                  </div>
                  <div className="experience-meta">
                    {role.location && (
                      <span className="experience-location">{role.location}</span>
                    )}
                    <span className="experience-period">{role.period}</span>
                  </div>
                </div>

                {role.summary && <p className="experience-summary">{role.summary}</p>}

                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul className="achievements-list">
                    {role.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        className="achievement-item"
                        variants={itemVariants}
                      >
                        <span className="achievement-text">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {role.signals?.length > 0 && (
                    <div className="engineering-signals">
                      {role.signals.map((signal, index) => (
                        <span key={index} className="signal-tag">{signal}</span>
                      ))}
                    </div>
                  )}

                  {role.proof && (
                    <div className="experience-proof">
                      <div className="proof-badge">
                        <span className="proof-rating">{role.proof.rating}</span>
                        <span className="proof-programme">{role.proof.programme}</span>
                      </div>
                      {role.proof.lorHref && (
                        <a
                          href={role.proof.lorHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lor-btn"
                        >
                          <FaFilePdf />
                          View Letter of Recommendation
                          <FaExternalLinkAlt className="lor-btn-icon" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience
