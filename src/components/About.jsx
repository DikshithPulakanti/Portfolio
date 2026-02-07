import { motion } from 'framer-motion'
import './About.css'

const About = () => {
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
    <section id="about" className="about">
      <motion.div
        className="about-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <h2 className="section-title">About Me</h2>
        
        <motion.div className="about-content" variants={itemVariants}>
          <div className="about-text">
            <p className="about-intro">
              I'm an <strong>AI Engineer & ML Researcher</strong> who builds production AI systems, not notebook ML. 
              I solve real problems with metrics-driven approaches, architecture-first thinking, and systems that scale. 
              My focus: end-to-end ML pipelines, RAG architectures, and production-ready solutions.
            </p>
            
            <div className="about-details">
              <motion.div className="about-section" variants={itemVariants}>
                <h3>ML & AI</h3>
                <p>
                  Specialized in <strong>Machine Learning, Deep Learning, and Data Science</strong>, with hands-on 
                  experience building end-to-end ML pipelines, time-series models, and generative models including 
                  GANs, VAEs, and Transformers. Proficient in LLM fine-tuning and RAG systems.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Engineering</h3>
                <p>
                  Strong expertise in <strong>Python, TensorFlow, PyTorch, SQL, and OpenCV</strong>. 
                  Experienced in MLOps, deploying models with Docker/Kubernetes, and architecting scalable ML 
                  infrastructure on AWS and Azure.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Full-Stack</h3>
                <p>
                  Experienced in <strong>full-stack development</strong> using React, Node.js, and MongoDB, 
                  enabling me to build complete solutions that integrate ML models with production-ready applications.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
