import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../data/projects'
import './Projects.css'

const Projects = () => {
  // Filter to show only the 3 main projects
  const displayedProjects = projects.filter(p => 
    ['movie-semantic-search', 'rag-chatbot', 'driver-behavior-analysis'].includes(p.slug)
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="projects" className="projects">
      <motion.div
        className="projects-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-number">0{index + 1}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="tech-tag">+{project.technologies.length - 4}</span>
                )}
              </div>
              <div className="project-highlights">
                {project.highlights.map((highlight, idx) => (
                  <span key={idx} className="highlight-badge">{highlight}</span>
                ))}
              </div>
              <Link to={`/projects/${project.slug}`} className="project-view-btn">
                View Details <FaExternalLinkAlt />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
