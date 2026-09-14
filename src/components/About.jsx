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
              I'm an AI/ML engineer focused on agentic systems, retrieval-augmented generation, and production ML
              infrastructure. I build multi-agent architectures with LangGraph and MCP, design evaluation frameworks
              that route decisions by model confidence rather than trusting output blindly, and ship full-stack
              applications end to end. My work spans independent research projects and production systems at
              Wells Fargo and Aosenuma, with a consistent focus on making AI systems reliable enough to actually
              depend on.
            </p>

            <div className="about-details">
              <motion.div className="about-section" variants={itemVariants}>
                <h3>Agentic Systems</h3>
                <p>
                  <strong>APEX</strong> is a 4-agent LangGraph pipeline that gives Claude structured access to real tools through 4 custom MCP servers, with a Reasoner and a Skeptic running adversarial debate so hypotheses have to survive challenge before advancing. <strong>AI Dynamic Pricing</strong> is a LangGraph.js agent wired into a real Shopify store through OAuth and the Admin GraphQL API, not a mocked connection. In both, MCP and typed graph state are the abstraction layer, so agent logic never reaches directly into a database or a vendor API.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Evaluation & Guardrails</h3>
                <p>
                  I don't trust model output blindly, and I build the machinery that decides when not to. APEX uses a confidence-gated evaluation framework: a fine-tuned BERT model (<strong>HypothesisValidityBERT</strong>, ~98% F1, published on HuggingFace) routes high-confidence outputs automatically and escalates uncertain cases to Claude, cutting Claude calls by roughly 80%. In the pricing agent, safety limits live in deterministic code outside the LLM so pricing bounds can't be reasoned around, and every live write waits for human approval that is re-validated fresh at approval time. At <strong>Aosenuma</strong> I built the backend for automated model evaluation and CI-integrated regression testing using RAGAS, DeepEval, and LangSmith.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Retrieval & Knowledge Graphs</h3>
                <p>
                  Retrieval quality is usually an architecture problem, not a prompt problem. APEX combines Weaviate dense vector search with BM25 sparse retrieval in a hybrid RAG pipeline, because embedding similarity alone blurs the exact method names that matter in research queries, and pairs it with Neo4j and graph data science (pagerank) for relationship-aware reasoning across 780 concepts and 3,984 relationships. I've built enterprise RAG at <strong>Aosenuma</strong> with LlamaIndex, FAISS, pgvector, hybrid search, reranking, and metadata filtering, and at <strong>Wells Fargo</strong> a LangChain and FAISS pipeline over 8,000+ compliance documents exposed as a typed REST API.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Cloud & Infrastructure</h3>
                <p>
                  <strong>CloudScale</strong> treats infrastructure as the deliverable: a highly available multi-tier AWS environment across 70+ Terraform resources with a parallel GCP stack, 4 customer-managed KMS keys on 90-day auto-rotation, CPU-driven autoscaling, and an event-driven email pipeline (API to SNS to Lambda to SES). Deployment is a fleet replacement rather than an in-place update: GitHub Actions runs pytest and a Newman suite, Packer bakes a golden image, and the autoscaling group refreshes onto it, so what's running always matches a versioned artifact.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Production ML at Scale</h3>
                <p>
                  At <strong>Wells Fargo</strong> I worked with quantitative analysts, traders, and risk teams on derivative pricing and enterprise risk: PyTorch models with GPU acceleration that cut pricing model execution from 6 hours to under 20 minutes, Spark pipelines processing 500M+ daily market records, an MLOps platform on SageMaker automating 50+ daily training jobs, and SHAP explainability on XGBoost fraud models for SR 11-7 compliant governance reporting. At Aosenuma I architected a unified Infra and LLM observability platform on OTel, LiteLLM, Langfuse, Prometheus, and Grafana, consolidating telemetry across 3 AI products and 6 infrastructure layers.
                </p>
              </motion.div>

              <motion.div className="about-section" variants={itemVariants}>
                <h3>Full-Stack & Privacy Engineering</h3>
                <p>
                  <strong>EventEase</strong> is a full-stack event platform on React, Node, Express, and MongoDB with JWT auth and role-based access control across User, Organizer, and Admin roles enforced server-side, deployed as containerized services on both AWS and Azure. <strong>MedFind</strong> won 1st place at the Red Hat-sponsored TOA Health Hack; my individual contribution was the gateway-level privacy module, using k-anonymity suppression (k=5) and role-based aggregation to prevent re-identification across federated hospital nodes.
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
