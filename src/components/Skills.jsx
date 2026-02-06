import { motion } from 'framer-motion'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['Python', 'SQL']
    },
    {
      category: 'Libraries & Frameworks',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'SciPy', 'NumPy', 'Pandas', 'Hugging Face', 'LangChain', 'OpenAI API']
    },
    {
      category: 'Machine Learning & AI',
      skills: ['LLM Fine-tuning', 'Retrieval-Augmented Generation (RAG)']
    },
    {
      category: 'MLOps & Deployment',
      skills: ['CI/CD Pipelines', 'Docker', 'Kubernetes', 'MLflow']
    },
    {
      category: 'Databases & Storage',
      skills: ['PostgreSQL', 'MSSQL', 'NoSQL', 'Qdrant', 'Elasticsearch']
    },
    {
      category: 'Cloud Platforms',
      skills: ['AWS (SageMaker, Lambda)', 'Azure (ML, Cognitive Search)']
    },
    {
      category: 'Data Engineering & Infrastructure',
      skills: ['Architecting ML Pipelines', 'Apache Airflow']
    },
    {
      category: 'Full-Stack Development',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js']
    }
  ]

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
    <section id="skills" className="skills">
      <motion.div
        className="skills-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
              variants={itemVariants}
            >
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-item"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
