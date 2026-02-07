import { motion } from 'framer-motion'
import { benchmarks } from '../data/benchmarks'
import './Benchmarks.css'

const Benchmarks = () => {
  return (
    <div className="benchmarks-page">
      <div className="benchmarks-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="benchmarks-title">Experiments & Benchmarks</h1>
          <p className="benchmarks-subtitle">
            Data-driven decisions backed by empirical testing and metrics
          </p>

          <div className="benchmarks-list">
            {benchmarks.map((benchmark, index) => (
              <motion.div
                key={benchmark.id}
                className="benchmark-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="benchmark-header">
                  <h2 className="benchmark-title">{benchmark.title}</h2>
                  <span className="benchmark-date">{benchmark.date}</span>
                </div>
                <p className="benchmark-description">{benchmark.description}</p>

                <div className="experiments-grid">
                  {benchmark.experiments.map((exp, expIndex) => (
                    <div key={expIndex} className="experiment-card">
                      <h3 className="experiment-name">{exp.name}</h3>
                      <div className="experiment-metrics">
                        {Object.entries(exp.metrics).map(([key, value]) => (
                          <div key={key} className="metric-row">
                            <span className="metric-label">{key}:</span>
                            <span className="metric-value">{value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="experiment-notes">{exp.notes}</p>
                    </div>
                  ))}
                </div>

                <div className="benchmark-conclusion">
                  <strong>Conclusion:</strong> {benchmark.conclusion}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Benchmarks
