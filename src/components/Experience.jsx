import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const experience = {
    company: 'Hewlett Packard Enterprise (HPE)',
    location: 'Singapore · On-site',
    position: 'Deep Learning Intern',
    period: 'Jun 2022 – Jul 2022',
    achievements: [
      {
        text: 'Received extensive training in Cloud computing services',
        impact: 'primarily Microsoft Azure'
      },
      {
        text: 'Utilized Microsoft Azure Machine Learning Studio to annotate and label images',
        impact: 'for production ML model training'
      },
      {
        text: 'Built and deployed machine learning models',
        impact: 'in a production environment'
      },
      {
        text: 'Built and deployed a serverless application on Microsoft Azure Functions using Python',
        impact: 'to execute ML models on demand'
      },
      {
        text: 'Conducted data analysis and visualization on Microsoft Azure',
        impact: 'using Pandas and Matplotlib'
      }
    ]
  }

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
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Experience</h2>
        
        <motion.div className="experience-item" variants={itemVariants}>
          <div className="experience-icon">
            <FaBriefcase />
          </div>
          <div className="experience-content">
            <div className="experience-header">
              <div>
                <h3 className="experience-position">{experience.position}</h3>
                <h4 className="experience-company">{experience.company}</h4>
              </div>
              <div className="experience-meta">
                <span className="experience-location">{experience.location}</span>
                <span className="experience-period">{experience.period}</span>
              </div>
            </div>
            
            <div className="experience-achievements">
              <h5>Key Achievements:</h5>
              <ul className="achievements-list">
                {experience.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    className="achievement-item"
                    variants={itemVariants}
                  >
                    <span className="achievement-text">{achievement.text}</span>
                    <span className="achievement-impact">, {achievement.impact}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="engineering-signals">
                <span className="signal-tag">☁️ Microsoft Azure</span>
                <span className="signal-tag">⚡ Azure Functions</span>
                <span className="signal-tag">🤖 Azure ML Studio</span>
                <span className="signal-tag">🐍 Python</span>
                <span className="signal-tag">📊 Pandas / Matplotlib</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience
