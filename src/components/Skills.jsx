import { motion } from 'framer-motion'
import './Skills.css'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Python', 'TypeScript', 'SQL', 'JavaScript']
    },
    {
      category: 'AI Agents & Orchestration',
      skills: ['LangGraph', 'MCP (Model Context Protocol)', 'LangChain', 'Multi-Agent Systems', 'RAG Pipelines', 'LLM Fine-tuning', 'Prompt Engineering']
    },
    {
      category: 'LLMs & Vision Models',
      skills: ['Claude API (Anthropic)', 'GPT-4o Vision', 'OpenAI API', 'Hugging Face Transformers', 'BERT Fine-tuning', 'CLIP', 'Whisper STT', 'YOLOv8']
    },
    {
      category: 'ML & Deep Learning',
      skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'PyTorch Lightning', 'CNN / RNN / LSTM', 'Sentence Transformers', 'NumPy', 'Pandas']
    },
    {
      category: 'Databases & Vector Search',
      skills: ['PostgreSQL', 'Neo4j + GDS', 'Weaviate', 'Qdrant', 'Redis', 'FAISS', 'MongoDB']
    },
    {
      category: 'Backend & APIs',
      skills: ['FastAPI', 'asyncio', 'Playwright', 'REST APIs', 'Server-Sent Events (SSE)', 'aiohttp', 'Pydantic']
    },
    {
      category: 'Frontend',
      skills: ['Next.js 14', 'React', 'Tailwind CSS', 'TypeScript', 'Recharts', 'PWA']
    },
    {
      category: 'MLOps & Observability',
      skills: ['MLflow', 'LangSmith', 'DVC', 'GitHub Actions CI/CD', 'CloudWatch', 'Docker', 'Kubernetes']
    },
    {
      category: 'Cloud & Infrastructure',
      skills: ['AWS (ECS Fargate, SageMaker, Lambda, Rekognition)', 'Azure (ML Studio, Azure Functions)', 'Terraform', 'Apache Kafka', 'Apache Spark']
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
