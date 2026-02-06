import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import './Education.css'

const Education = () => {
  const education = [
    {
      institution: 'Northeastern University',
      location: 'Boston, MA',
      degree: 'Master of Science - Information Systems',
      period: 'Expected May 2026',
      courses: [
        'Machine Learning',
        'Data Mining',
        'AI & Deep Learning',
        'Data Management',
        'Algorithms & Optimization'
      ]
    },
    {
      institution: 'Mahindra University',
      location: 'Hyderabad, India',
      degree: 'Bachelor of Technology in Artificial Intelligence',
      period: 'August 2020 – May 2024',
      courses: [
        'Statistics',
        'Data Structures and Algorithms in Python',
        'Machine Learning',
        'Deep Learning',
        'OOPs',
        'NLP',
        'Database Management System',
        'Cloud Computing',
        'Computer Vision'
      ]
    }
  ]

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
    hidden: { opacity: 0, x: -30, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="education" className="education">
      <motion.div
        className="education-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Education</h2>
        
        <div className="education-timeline">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="education-item"
              variants={itemVariants}
            >
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-content">
                <div className="education-header">
                  <h3 className="education-institution">{edu.institution}</h3>
                  <span className="education-location">{edu.location}</span>
                </div>
                <h4 className="education-degree">{edu.degree}</h4>
                <p className="education-period">{edu.period}</p>
                <div className="education-courses">
                  <h5>Relevant Courses:</h5>
                  <div className="courses-list">
                    {edu.courses.map((course, idx) => (
                      <span key={idx} className="course-tag">{course}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Education
