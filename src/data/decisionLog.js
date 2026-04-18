export const decisionLog = [
  {
    id: 'mcp-over-direct-api',
    title: 'Why MCP Protocol over direct API calls?',
    date: 'Mar 2026',
    context: 'Foresight (12 agents, 6 external services) and APEX (4 agents, 4 data sources). Both needed agents to call external tools without coupling agent logic to service implementations.',
    decision: 'Anthropic Model Context Protocol (MCP)',
    alternatives: ['Direct API calls per agent', 'LangChain tool wrappers', 'Custom RPC layer'],
    reasoning: [
      {
        factor: 'Testability',
        explanation: 'Each MCP server can be tested in isolation. With direct API calls, unit testing an agent requires mocking 6 external services simultaneously. With MCP, you mock one server interface.'
      },
      {
        factor: 'Swappability',
        explanation: 'Switching from Plaid to a different bank data provider only changes one MCP server, not every agent that touches financial data. Direct calls would require modifying agent code throughout.'
      },
      {
        factor: 'Explicit contracts',
        explanation: 'Every tool is declared with a schema. Agents know exactly what inputs and outputs look like. This catches integration errors at definition time rather than at runtime.'
      },
      {
        factor: 'Observability',
        explanation: 'All tool calls flow through a single protocol layer. Logging, rate limiting, and tracing can be added to the MCP layer once rather than per-agent.'
      }
    ],
    tradeoffs: {
      pros: ['Clean agent/service separation', 'Easy to test', 'Swappable backends', 'Explicit schemas'],
      cons: ['Additional abstraction layer to maintain', 'More upfront design work', 'Slight latency overhead per call']
    },
    productionConsideration: 'In production, MCP servers would each get their own rate limiting, circuit breakers, and retry logic. The protocol boundary makes these infrastructure concerns fully independent of agent business logic.'
  },
  {
    id: 'langgraph-over-langchain',
    title: 'Why LangGraph over plain LangChain or AutoGen?',
    date: 'Mar 2026',
    context: 'All three multi-agent projects (Foresight, JobPilot, APEX) needed reliable multi-step agent orchestration with error recovery and conditional routing.',
    decision: 'LangGraph',
    alternatives: ['Plain LangChain chains', 'AutoGen', 'Custom asyncio orchestration'],
    reasoning: [
      {
        factor: 'Conditional routing',
        explanation: 'LangGraph StateGraph supports conditional edges: if the Profile Builder fails in JobPilot, the pipeline routes directly to END instead of attempting downstream steps with invalid data. Plain chains have no built-in branching.'
      },
      {
        factor: 'Explicit state',
        explanation: 'The shared AgentState TypedDict makes every pipeline\'s data flow inspectable at every stage. With AutoGen\'s conversation model, state is implicit in message history and hard to inspect or debug.'
      },
      {
        factor: 'Parallel fan-out',
        explanation: 'APEX\'s Advisor agent runs 4 sub-agents concurrently via asyncio.gather within the graph. LangGraph supports this natively. AutoGen\'s sequential conversation model would have required significant custom code.'
      },
      {
        factor: 'Predictability',
        explanation: 'AutoGen agents can negotiate their own execution order, which introduces unpredictability in financial or research pipelines where deterministic behavior matters. LangGraph execution order is explicit.'
      }
    ],
    tradeoffs: {
      pros: ['Explicit execution order', 'Built-in error routing', 'Parallel fan-out support', 'Inspectable shared state'],
      cons: ['More boilerplate than simple LangChain chains', 'Graph design requires upfront thinking', 'Less flexible for conversational agents']
    },
    productionConsideration: 'For production, would add LangSmith tracing to every node for full agent call visibility. LangGraph\'s graph structure maps cleanly to LangSmith\'s trace hierarchy, making debugging significantly easier than with flat chains.'
  },
  {
    id: 'bert-over-claude-classification',
    title: 'Why fine-tune BERT instead of prompting Claude for classification?',
    date: 'Feb 2026',
    context: 'Foresight needed to classify every bank transaction into spending categories. APEX needed to validate every hypothesis. Both ran at high frequency where per-call LLM costs would compound.',
    decision: 'Fine-tuned BERT (SpendingCategoryBERT + HypothesisValidityBERT)',
    alternatives: ['Claude API for every classification', 'GPT-3.5-turbo with few-shot prompts', 'Rule-based classifiers'],
    reasoning: [
      {
        factor: 'Cost at scale',
        explanation: 'Claude costs roughly $0.003 per transaction classification. At 1000 transactions/month per user, that is $3/month/user just for categorization. SpendingCategoryBERT runs at effectively zero marginal cost after training. 99.8% cheaper per call.'
      },
      {
        factor: 'Latency',
        explanation: 'Local BERT inference takes roughly 5ms. A Claude API call takes 500ms minimum. For real-time transaction feeds, 100x latency difference changes the user experience entirely.'
      },
      {
        factor: 'Consistency',
        explanation: 'LLM prompting produces inconsistent outputs for structured classification, especially with edge cases like ambiguous merchant names. Fine-tuned BERT is deterministic given the same input.'
      },
      {
        factor: 'Synthetic data generation',
        explanation: 'Used Claude Haiku to generate 50,000 synthetic training examples for SpendingCategoryBERT. This gave the best of both worlds: LLM intelligence at data generation time, BERT efficiency at inference time.'
      }
    ],
    tradeoffs: {
      pros: ['99.8% cost reduction', '100x faster inference', 'Consistent outputs', 'No API dependency at runtime'],
      cons: ['Upfront training cost and time', 'Requires retraining when categories change', 'Less flexible than prompting for novel inputs']
    },
    productionConsideration: 'Would implement a confidence threshold: transactions below 80% confidence escalate to Claude for review rather than being misclassified silently. This hybrid approach captures the cost benefits of BERT while using Claude as a safety net for genuinely ambiguous cases.'
  },
  {
    id: 'vision-over-dom-parsing',
    title: 'Why GPT-4o Vision over DOM parsing for form reading?',
    date: 'Feb 2026',
    context: 'JobPilot needed to read and fill application forms across Workday, Greenhouse, Lever, and hundreds of custom ATS platforms. Initial approach used a DOM parser.',
    decision: 'GPT-4o Vision (screenshot-based), with DOM fallback',
    alternatives: ['DOM parsing per ATS', 'Selenium with custom selectors', 'Pre-built ATS API integrations'],
    reasoning: [
      {
        factor: 'ATS diversity',
        explanation: 'There are over 200 ATS platforms. Each has completely different DOM structure. A DOM parser would require custom selector logic per platform, meaning the system breaks every time a platform updates its UI.'
      },
      {
        factor: 'Dynamic SPAs',
        explanation: 'Workday and Greenhouse render fields with JavaScript. By the time a DOM parser runs, the actual input elements may not exist yet. Vision reads the rendered page exactly as a human sees it.'
      },
      {
        factor: 'Zero maintenance',
        explanation: 'Vision-based reading requires no updates when ATS platforms redesign their UI. One model handles every form layout without code changes.'
      },
      {
        factor: 'Graceful fallback',
        explanation: 'DOM fallback handles cases where Vision returns empty results (rare but it happens). The two-layer approach gives resilience without sacrificing the primary Vision advantage.'
      }
    ],
    tradeoffs: {
      pros: ['Works on any ATS without custom code', 'Zero maintenance when UIs change', 'Handles dynamic SPAs', 'Reads exactly what the user sees'],
      cons: ['GPT-4o Vision API cost per screenshot', 'Slightly slower than DOM parsing', 'Dependent on API availability']
    },
    productionConsideration: 'Production would cache screenshots per application for debugging and re-processing. Would also implement headless browser pooling so multiple applications can be processed in parallel without each waiting for a browser to free up.'
  },
  {
    id: 'neo4j-over-relational',
    title: 'Why Neo4j for knowledge graphs instead of PostgreSQL?',
    date: 'Jan 2026',
    context: 'APEX needed to find gaps between research concepts across 780 nodes and 3984 relationships. Foresight needed to detect recurring subscription patterns across transactions.',
    decision: 'Neo4j + GDS (Graph Data Science)',
    alternatives: ['PostgreSQL with recursive CTEs', 'NetworkX in Python', 'MongoDB with manual relationship tracking'],
    reasoning: [
      {
        factor: 'Gap detection query expressiveness',
        explanation: 'Finding concept pairs that should be connected but are not is a graph traversal problem. In PostgreSQL this requires a multi-level self-join that becomes exponentially slower as the graph grows. In Cypher: MATCH (a:Concept), (b:Concept) WHERE NOT (a)-[:RELATED_TO]->(b) returns it in milliseconds.'
      },
      {
        factor: 'Graph Data Science plugins',
        explanation: 'Neo4j GDS provides centrality, community detection, and path-finding algorithms as first-class operations on the same data. Replicating these in Python (NetworkX) requires loading the entire graph into memory.'
      },
      {
        factor: 'Subscription pattern detection',
        explanation: 'In Foresight, detecting recurring charges involves traversing: Transaction -> Merchant -> PreviousTransactions with date-based pattern matching. This is naturally a graph query and awkward in relational schema.'
      },
      {
        factor: 'Schema flexibility',
        explanation: 'Research knowledge does not fit neatly into a relational schema. APEX added new node types (Hypothesis, Patent, Agent) without schema migrations, just by adding new node labels.'
      }
    ],
    tradeoffs: {
      pros: ['Natural fit for relationship-heavy queries', 'GDS algorithms included', 'Flexible schema', '10x faster on graph traversals vs SQL joins'],
      cons: ['Steeper learning curve than SQL', 'Less tooling than PostgreSQL', 'Harder to do aggregations and reporting', 'Requires GDS plugin for advanced algorithms']
    },
    productionConsideration: 'Would use AuraDB (managed Neo4j) in production to avoid GDS plugin maintenance. Would pair with PostgreSQL for relational audit trails and reporting, since the two databases complement rather than replace each other.'
  },
  {
    id: 'faiss-over-pinecone',
    title: 'Why FAISS over Pinecone for Movie Semantic Search?',
    date: 'Nov 2025',
    context: 'Movie Semantic Search needed a vector store for 1M+ CLIP embeddings from video frames with sub-10ms search latency.',
    decision: 'FAISS (HNSW index)',
    alternatives: ['Pinecone', 'Qdrant', 'Weaviate'],
    reasoning: [
      {
        factor: 'Cost during R&D',
        explanation: 'FAISS is free. Pinecone charges per query and storage. During development with frequent index rebuilds and test queries, Pinecone costs compound quickly with no proportional benefit.'
      },
      {
        factor: 'Index control',
        explanation: 'FAISS exposes IVF, HNSW, and quantization parameters directly. For 1M+ video frame embeddings, HNSW gave sub-10ms search. Pinecone abstracts the index type, making it harder to optimize for specific latency targets.'
      },
      {
        factor: 'Local iteration speed',
        explanation: 'FAISS runs entirely locally with no API roundtrip. During experimentation with different embedding models and index types, eliminating network latency from the feedback loop matters.'
      }
    ],
    tradeoffs: {
      pros: ['Free', 'Sub-10ms search', 'Full index control', 'No API rate limits'],
      cons: ['Manual scaling and sharding', 'No managed infrastructure', 'Requires custom backup strategy']
    },
    productionConsideration: 'For production at scale, would migrate to Qdrant (self-hosted or managed) for better horizontal scaling and built-in filtering support. FAISS is ideal for research but requires significant infrastructure work to scale beyond single-node.'
  },
  {
    id: 'yolov8-over-faster-rcnn',
    title: 'Why YOLOv8 over Faster R-CNN for actor recognition?',
    date: 'Nov 2025',
    context: 'Movie Semantic Search needed real-time actor recognition across 18 actors at video processing scale.',
    decision: 'YOLOv8 with 19x augmentation',
    alternatives: ['Faster R-CNN', 'RetinaNet', 'DETR'],
    reasoning: [
      {
        factor: 'Throughput requirement',
        explanation: 'Processing video at 1fps means needing real-time detection. YOLOv8 achieves 30+ FPS on standard hardware. Faster R-CNN\'s two-stage pipeline is accurate but too slow for this use case.'
      },
      {
        factor: 'Accuracy with augmentation',
        explanation: 'With 19x data augmentation (flips, rotations, color jitter, mosaic), YOLOv8 reached 96% accuracy across 18 actors, which was sufficient. The augmentation strategy compensated for the single-stage accuracy gap.'
      },
      {
        factor: 'Production deployment',
        explanation: 'YOLOv8 exports to ONNX and TensorRT natively. Faster R-CNN requires more effort to optimize for edge or embedded deployment.'
      }
    ],
    tradeoffs: {
      pros: ['30+ FPS real-time inference', '96% accuracy with augmentation', 'Production-ready export formats', 'Efficient memory usage'],
      cons: ['Slightly lower raw accuracy than Faster R-CNN', 'Requires careful augmentation strategy to match two-stage accuracy']
    },
    productionConsideration: 'Would use YOLOv8 for real-time stream processing and Faster R-CNN for offline high-accuracy batch processing on key frames, running both in parallel on different hardware tiers.'
  },
  {
    id: 'cnn-rnn-hybrid',
    title: 'Why CNN-RNN hybrid over a Transformer for driver behavior?',
    date: 'Oct 2025',
    context: 'Driver Behavior Analysis needed to classify risky driving patterns from 100Hz accelerometer and gyroscope sensor streams.',
    decision: 'CNN-RNN Hybrid (spatial + temporal)',
    alternatives: ['Transformer', 'Pure CNN with sliding window', 'Pure LSTM'],
    reasoning: [
      {
        factor: 'Complementary strengths',
        explanation: 'CNNs extract spatial patterns from sensor vectors (acceleration direction, gyroscope orientation at a moment in time). RNNs capture how those patterns evolve as sequences. A Transformer could do both but does not add much value at this sequence length.'
      },
      {
        factor: 'Data efficiency',
        explanation: 'Transformers require significantly more data to train well. The available dataset was sufficient for a CNN-RNN hybrid to reach 94% accuracy, but would likely underfit a Transformer without a much larger corpus.'
      },
      {
        factor: 'Interpretability',
        explanation: 'The spatial features from the CNN layer and the temporal patterns from the RNN layer can be analyzed separately. This made debugging easier and gave clearer explanations of why a specific driving sequence was flagged as risky.'
      }
    ],
    tradeoffs: {
      pros: ['Data efficient', 'Interpretable spatial and temporal features', '94% accuracy', 'Efficient inference under 200ms'],
      cons: ['Less flexible than Transformers for novel patterns', 'Requires manual feature engineering at the window level']
    },
    productionConsideration: 'With more labeled data, would experiment with a Temporal Fusion Transformer (TFT), which handles multi-horizon time series prediction well. Would also add GPS and road condition features as additional input modalities.'
  }
]
