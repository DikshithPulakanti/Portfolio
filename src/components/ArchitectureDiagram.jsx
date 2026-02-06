import './ArchitectureDiagram.css'

const ArchitectureDiagram = ({ flow, diagramType }) => {
  const renderFlowDiagram = () => {
    return (
      <div className="architecture-diagram">
        <div className="diagram-flow">
          {flow.map((step, idx) => (
            <div key={idx} className="diagram-step-container">
              <div className="diagram-step">
                <div className="step-box">
                  <div className="step-label">{step.step}</div>
                </div>
              </div>
              {idx < flow.length - 1 && (
                <div className="diagram-arrow">
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <path
                      d="M 0 10 L 30 10 M 25 5 L 30 10 L 25 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="arrow-path"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderRAGDiagram = () => {
    return (
      <div className="architecture-diagram rag-diagram">
        <div className="rag-flow">
          <div className="rag-stage">
            <div className="stage-box input">Input Query</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Query Embedding</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Vector Search (FAISS)</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Reranking</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Context Assembly</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box llm">LLM Generation</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box output">Output + Citations</div>
          </div>
        </div>
      </div>
    )
  }

  const renderDriverBehaviorDiagram = () => {
    return (
      <div className="architecture-diagram driver-diagram">
        <div className="driver-flow">
          <div className="driver-stage">
            <div className="stage-box input">Sensor Data</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Preprocessing</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">CNN Feature Extraction</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">RNN Sequence Modeling</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box">Anomaly Detection</div>
            <div className="stage-arrow">↓</div>
            <div className="stage-box output">Risk Score</div>
          </div>
        </div>
      </div>
    )
  }

  switch (diagramType) {
    case 'rag-chatbot':
      return renderRAGDiagram()
    case 'driver-behavior-analysis':
      return renderDriverBehaviorDiagram()
    default:
      return renderFlowDiagram()
  }
}

export default ArchitectureDiagram
