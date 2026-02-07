import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import './Experience.css'

const Experience = () => {
  const experience = {
    company: 'National University of Singapore - Hewlett Packard (HP)',
    location: 'Singapore',
    position: 'Data Science Intern - AI/ML',
    period: 'June 2022 – August 2022',
    achievements: [
      {
        text: 'Built LLM-based RAG pipelines with LangChain, Hugging Face, FAISS',
        impact: 'improving retrieval accuracy by 25%'
      },
      {
        text: 'Optimized CNNs for vision tasks using TensorFlow/Keras, PyTorch',
        impact: 'boosting image classification accuracy by 18%'
      },
      {
        text: 'Deployed scalable production ML models in Docker on EC2 & Azure ML',
        impact: 'cutting setup time by 40%'
      },
      {
        text: 'Engineered SQL (PostgreSQL/MySQL) & NoSQL (MongoDB, Spark) pipelines',
        impact: 'reducing preprocessing latency by 30%'
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
                <span className="signal-tag">🐳 Docker</span>
                <span className="signal-tag">☸️ Kubernetes</span>
                <span className="signal-tag">🔌 REST APIs</span>
                <span className="signal-tag">📈 MLflow</span>
                <span className="signal-tag">☁️ AWS/Azure</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience
