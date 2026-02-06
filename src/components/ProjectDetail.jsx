import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { getProjectBySlug } from '../data/projects'
import ArchitectureDiagram from './ArchitectureDiagram'
import './ProjectDetail.css'

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="project-detail">
      <div className="project-detail-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="project-header" variants={itemVariants}>
            <Link to="/#projects" className="back-button">
              <FaArrowLeft /> Back to Projects
            </Link>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-description">{project.description}</p>
            <div className="project-technologies">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Problem Section */}
          <motion.section className="project-section" variants={itemVariants}>
            <h2 className="section-heading">1. Problem</h2>
            <div className="section-content">
              <h3 className="subsection-title">{project.problem.title}</h3>
              <p className="section-text">{project.problem.description}</p>
              <div className="problem-list">
                <h4 className="list-title">Why existing solutions failed:</h4>
                <ul>
                  {project.problem.existingSolutions.map((solution, idx) => (
                    <li key={idx} className="problem-item">
                      <FaCheckCircle className="check-icon" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Architecture Section */}
          <motion.section className="project-section" variants={itemVariants}>
            <h2 className="section-heading">2. Architecture</h2>
            <div className="section-content">
              <p className="section-text">{project.architecture.description}</p>
              <ArchitectureDiagram flow={project.architecture.flow} diagramType={project.architecture.diagram} />
              <div className="flow-steps">
                {project.architecture.flow.map((step, idx) => (
                  <div key={idx} className="flow-step">
                    <div className="flow-step-number">{idx + 1}</div>
                    <div className="flow-step-content">
                      <h4 className="flow-step-title">{step.step}</h4>
                      <p className="flow-step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Tech Decisions Section */}
          <motion.section className="project-section" variants={itemVariants}>
            <h2 className="section-heading">3. Tech Decisions</h2>
            <div className="section-content">
              <p className="section-text">
                Every technology choice was made after evaluating alternatives. Here's the reasoning behind key decisions:
              </p>
              <div className="tech-decisions">
                {project.techDecisions.map((decision, idx) => (
                  <div key={idx} className="tech-decision-card">
                    <h3 className="decision-question">{decision.decision}</h3>
                    <p className="decision-reasoning">{decision.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Metrics Section */}
          <motion.section className="project-section" variants={itemVariants}>
            <h2 className="section-heading">4. Metrics</h2>
            <div className="section-content">
              <p className="section-text">
                Quantifiable results that demonstrate the impact of this project:
              </p>
              <div className="metrics-grid">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.metric}</div>
                    <div className="metric-improvement">{metric.improvement}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Tradeoffs Section */}
          <motion.section className="project-section" variants={itemVariants}>
            <h2 className="section-heading">5. Tradeoffs</h2>
            <div className="section-content">
              <p className="section-text">
                Honest reflection on what didn't work and what would be improved with more time:
              </p>
              <div className="tradeoffs-list">
                {project.tradeoffs.map((tradeoff, idx) => (
                  <div key={idx} className="tradeoff-card">
                    <div className="tradeoff-section">
                      <h3 className="tradeoff-title">What didn't work:</h3>
                      <p className="tradeoff-text">{tradeoff.whatDidntWork}</p>
                    </div>
                    <div className="tradeoff-section">
                      <h3 className="tradeoff-title">What would change:</h3>
                      <p className="tradeoff-text">{tradeoff.whatWouldChange}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail
