import { motion } from 'framer-motion'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import './Status.css'

const Status = () => {
  const getLastDeployTime = () => {
    // In production, this would come from an API
    const deployTime = new Date()
    deployTime.setHours(deployTime.getHours() - 2)
    const hoursAgo = Math.floor((new Date() - deployTime) / (1000 * 60 * 60))
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
  }

  const systems = [
    {
      name: 'Portfolio Website',
      status: 'operational',
      uptime: '99.9%'
    },
    {
      name: 'API Endpoints',
      status: 'operational',
      uptime: '99.8%'
    },
    {
      name: 'CDN',
      status: 'operational',
      uptime: '99.9%'
    }
  ]

  return (
    <div className="status-page">
      <div className="status-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="status-title">System Status</h1>
          
          <div className="status-overview">
            <div className="status-badge operational">
              <FaCheckCircle />
              <span>All systems operational</span>
            </div>
            <div className="status-meta">
              <FaClock />
              <span>Last deploy: {getLastDeployTime()}</span>
            </div>
          </div>

          <div className="systems-list">
            {systems.map((system, index) => (
              <motion.div
                key={index}
                className="system-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="system-header">
                  <h3 className="system-name">{system.name}</h3>
                  <span className={`system-status ${system.status}`}>
                    {system.status}
                  </span>
                </div>
                <div className="system-uptime">
                  Uptime: {system.uptime}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Status
