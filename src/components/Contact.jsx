import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'pulakanti.d@northeastern.edu',
      link: 'mailto:pulakanti.d@northeastern.edu',
      color: '#ea4335'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '(617) 594-2757',
      link: 'tel:+16175942757',
      color: '#34a853'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'dikshithpulakanti',
      link: 'https://www.linkedin.com/in/dikshithpulakanti/',
      color: '#0077b5'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Boston, MA',
      link: null,
      color: '#ff6b6b'
    }
  ]

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
    <section id="contact" className="contact">
      <motion.div
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <h2 className="section-title">Get In Touch</h2>
        
        <motion.p
          className="contact-intro"
          variants={itemVariants}
        >
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about 
          Machine Learning and Data Science. Feel free to reach out!
        </motion.p>

        <div className="contact-grid">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="contact-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div
                className="contact-icon"
                style={{ backgroundColor: `${info.color}15`, color: info.color }}
              >
                {info.icon}
              </div>
              <h3 className="contact-label">{info.label}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-value"
                >
                  {info.value}
                </a>
              ) : (
                <p className="contact-value">{info.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact-footer"
          variants={itemVariants}
        >
          <p className="contact-footer-text">Let's build something amazing together!</p>
          <div className="contact-signals">
            <span className="signal-item">✅ Production AI Systems</span>
            <span className="signal-item">📊 Metrics-Driven Development</span>
            <span className="signal-item">🏗️ Architecture-First Thinking</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
