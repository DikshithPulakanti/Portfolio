export const projects = [
  {
    id: 'movie-semantic-search',
    title: 'Movie Semantic Search',
    slug: 'movie-semantic-search',
    technologies: ['Yolov8', 'OpenCV', 'AWS Rekognition', 'GPT-2', 'PyTorch', 'Hugging Face', 'MMAction2'],
    description: 'An AI-powered video search system that enables semantic search through movie content using computer vision and NLP.',
    highlights: ['Computer Vision', 'NLP Integration', 'Real-time Processing', 'High Accuracy Models'],
    problem: {
      title: 'The Problem',
      description: 'Traditional video search systems rely on metadata tags and manual annotations, making it impossible to find specific scenes, actors, or emotional moments within movies.',
      existingSolutions: [
        'Metadata-based search only works if content is manually tagged',
        'Keyword search fails for visual concepts (e.g., "sad sunset scene")',
        'No way to search by actor appearance without IMDb-style databases',
        'Emotion-based search was non-existent'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: 'End-to-end pipeline combining computer vision, NLP, and vector search for semantic video retrieval.',
      flow: [
        { 
          step: 'Input', 
          description: 'Raw video frames extracted at 1fps. Preprocessing includes frame extraction, resolution normalization, and quality filtering.',
          technologies: ['OpenCV', 'FFmpeg'],
          metrics: ['1fps extraction rate', '1080p resolution']
        },
        { 
          step: 'Scene Segmentation', 
          description: 'OpenCV + similarity metrics (92% accuracy). Uses histogram comparison and feature matching to detect scene boundaries.',
          technologies: ['OpenCV', 'Histogram Comparison'],
          metrics: ['92% accuracy', '< 50ms per frame']
        },
        { 
          step: 'Actor Recognition', 
          description: 'YOLOv8 CNN with 19x augmentation (96% accuracy). Real-time detection across 18 actors with high precision.',
          technologies: ['YOLOv8', 'PyTorch', 'Data Augmentation'],
          metrics: ['96% accuracy', '30+ FPS', '18 actors']
        },
        { 
          step: 'Caption Generation', 
          description: 'GPT-2 fine-tuned on movie scripts. Generates contextual captions for each scene segment.',
          technologies: ['GPT-2', 'Hugging Face', 'Fine-tuning'],
          metrics: ['BLEU score: 0.42', '512 token context']
        },
        { 
          step: 'Emotion Detection', 
          description: 'AWS Rekognition facial analysis. Detects emotions, expressions, and scene mood.',
          technologies: ['AWS Rekognition', 'Facial Analysis'],
          metrics: ['7 emotion classes', 'Real-time processing']
        },
        { 
          step: 'Embeddings', 
          description: 'CLIP embeddings for visual-text alignment. Creates joint embedding space for semantic search.',
          technologies: ['CLIP', 'OpenAI', 'Embeddings'],
          metrics: ['768-dim vectors', 'Zero-shot capability']
        },
        { 
          step: 'Vector DB', 
          description: 'FAISS index for similarity search. HNSW index type for fast approximate nearest neighbor search.',
          technologies: ['FAISS', 'HNSW Index'],
          metrics: ['< 10ms search', '1M+ vectors']
        },
        { 
          step: 'Output', 
          description: 'Ranked results with relevance scores. Combines multiple signals (visual, text, emotion) for final ranking.',
          technologies: ['Ranking Algorithm', 'Score Fusion'],
          metrics: ['Top-10 results', 'Relevance score > 0.8']
        }
      ],
      diagram: 'movie-semantic-search'
    },
    techDecisions: [
      {
        decision: 'Why FAISS over Pinecone?',
        reasoning: 'FAISS provides better control over indexing strategies (IVF, HNSW) and allows local deployment. Pinecone is great for production but adds latency and cost. For research, FAISS offers more flexibility to experiment with different index types and quantization methods.'
      },
      {
        decision: 'Why CLIP vs BLIP?',
        reasoning: 'CLIP excels at zero-shot visual-text alignment without requiring task-specific fine-tuning. BLIP is better for detailed captioning but CLIP\'s joint embedding space enables semantic search across modalities. For movie search, CLIP\'s pre-trained knowledge of visual concepts (actors, scenes, emotions) was more valuable than BLIP\'s generative capabilities.'
      },
      {
        decision: 'Why chunk size = 512?',
        reasoning: 'Empirically tested chunk sizes (256, 512, 1024). 512 tokens balances context preservation (scene descriptions need ~400-500 tokens) with retrieval precision. Smaller chunks lose context, larger chunks dilute relevance signals. 512 aligns with GPT-2\'s optimal context window for caption generation.'
      },
      {
        decision: 'Why YOLOv8 over Faster R-CNN?',
        reasoning: 'YOLOv8 provides real-time inference (30+ FPS) vs Faster R-CNN\'s slower but more accurate detection. For video processing at scale, speed matters. YOLOv8 with proper augmentation achieved 96% accuracy, which was sufficient for our use case while maintaining throughput.'
      }
    ],
    metrics: [
      { metric: 'Scene Segmentation Accuracy', value: '92%', improvement: '+15% vs baseline' },
      { metric: 'Actor Recognition Accuracy', value: '96%', improvement: 'Across 18 actors' },
      { metric: 'Semantic Retrieval Precision', value: '40% improvement', improvement: 'vs keyword search' },
      { metric: 'Query Latency', value: '< 500ms', improvement: 'End-to-end search' },
      { metric: 'False Positive Rate', value: '8%', improvement: 'Down from 25%' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'Initial approach used BLIP for captioning, but it was too slow for real-time search. Switched to GPT-2 with pre-computed captions.',
        whatWouldChange: 'With more time, I\'d implement a hybrid retrieval system combining dense (CLIP) and sparse (BM25) retrieval for better recall. Also, fine-tuning CLIP on movie-specific data would improve domain adaptation.',
        productionConsideration: 'Production would require distributed processing pipeline (Apache Airflow), Redis caching for frequent queries, and CDN for video frame storage. Would implement A/B testing framework for continuous model improvement.'
      },
      {
        whatDidntWork: 'First version used Pinecone, but the API rate limits became a bottleneck during development. Local FAISS was more suitable for iteration.',
        whatWouldChange: 'For production, I\'d use a managed vector DB (Pinecone/Qdrant) with proper caching layers. The current FAISS setup requires manual sharding for scale.',
        productionConsideration: 'Would migrate to managed vector DB (Qdrant Cloud) with automatic scaling, implement Redis cache layer for hot queries, and add monitoring (Prometheus/Grafana) for latency tracking.'
      },
      {
        whatDidntWork: 'Emotion detection using AWS Rekognition had inconsistent results for non-frontal faces. Had to add fallback logic.',
        whatWouldChange: 'Would train a custom emotion detection model on movie frames with better handling of profile/side views. Current AWS solution is a compromise for speed.',
        productionConsideration: 'Would deploy custom emotion model via TensorFlow Serving on GPU instances, implement batch processing for cost efficiency, and add confidence thresholds for quality control.'
      }
    ]
  },
  {
    id: 'rag-chatbot',
    title: 'RAG Chatbot',
    slug: 'rag-chatbot',
    technologies: ['LangChain', 'Hugging Face', 'FAISS', 'OpenAI API', 'FastAPI', 'Docker'],
    description: 'A Retrieval-Augmented Generation chatbot that improves retrieval accuracy by 25% using advanced RAG techniques.',
    highlights: ['LLM Integration', 'Vector Search', 'RAG Pipeline', 'Production Ready'],
    problem: {
      title: 'The Problem',
      description: 'Standard chatbots hallucinate when asked about information not in their training data. For domain-specific knowledge (e.g., internal documentation), we need accurate, grounded responses without fine-tuning large models.',
      existingSolutions: [
        'Fine-tuning LLMs is expensive and requires constant updates',
        'Simple keyword search returns irrelevant documents',
        'Direct LLM responses lack source citations',
        'No way to combine multiple documents for comprehensive answers'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: 'RAG pipeline that retrieves relevant context and generates grounded responses.',
      flow: [
        { 
          step: 'Input', 
          description: 'User query received via API endpoint. Query preprocessing includes normalization and intent detection.',
          technologies: ['FastAPI', 'Query Processing'],
          metrics: ['< 5ms preprocessing']
        },
        { 
          step: 'Query Embedding', 
          description: 'OpenAI text-embedding-ada-002 converts query to 1536-dim vector. Chosen for superior semantic understanding.',
          technologies: ['OpenAI API', 'text-embedding-ada-002'],
          metrics: ['1536 dimensions', '< 200ms latency']
        },
        { 
          step: 'Vector Search', 
          description: 'FAISS similarity search (top-k=5). HNSW index provides fast approximate nearest neighbor search.',
          technologies: ['FAISS', 'HNSW Index'],
          metrics: ['Top-5 retrieval', '< 10ms search']
        },
        { 
          step: 'Reranking', 
          description: 'Cross-encoder reranking for precision. Improves relevance by 15% over cosine similarity alone.',
          technologies: ['Cross-encoder', 'BERT'],
          metrics: ['15% precision boost', '< 50ms rerank']
        },
        { 
          step: 'Context Assembly', 
          description: 'Retrieved chunks + metadata assembled. Includes source documents, timestamps, and confidence scores.',
          technologies: ['Context Builder'],
          metrics: ['5 chunks', '~2500 tokens']
        },
        { 
          step: 'LLM Generation', 
          description: 'GPT-3.5-turbo with prompt engineering. RAG prompt template ensures grounded responses with citations.',
          technologies: ['GPT-3.5-turbo', 'LangChain', 'Prompt Engineering'],
          metrics: ['< 2s generation', '28% hallucination reduction']
        },
        { 
          step: 'Output', 
          description: 'Answer + source citations. Formatted response with inline citations and source links.',
          technologies: ['Response Formatter'],
          metrics: ['Source citations', 'Structured JSON']
        }
      ],
      diagram: 'rag-chatbot'
    },
    techDecisions: [
      {
        decision: 'Why FAISS over Pinecone?',
        reasoning: 'FAISS allows experimentation with different indexing strategies (IVF, HNSW) without API costs. For R&D, local FAISS is faster to iterate on. Pinecone would be better for production scale, but FAISS gives more control over index parameters and allows custom quantization.'
      },
      {
        decision: 'Why OpenAI embeddings vs sentence-transformers?',
        reasoning: 'OpenAI\'s text-embedding-ada-002 provides better semantic understanding for diverse query types. Sentence-transformers are great for specific domains, but OpenAI embeddings generalize better across different document types. The tradeoff is cost vs. quality - for production, might use both.'
      },
      {
        decision: 'Why chunk size = 512?',
        reasoning: 'Tested 256, 512, 1024 tokens. 512 balances context (most answers need 300-500 tokens) with retrieval precision. Smaller chunks fragment context, larger chunks dilute relevance. 512 aligns with GPT-3.5\'s optimal context window for RAG.'
      },
      {
        decision: 'Why LangChain?',
        reasoning: 'LangChain provides abstractions for RAG pipelines (loaders, splitters, retrievers) but we use it selectively. Custom retrieval logic for better control. LangChain\'s value is in prompt templates and chain orchestration, not necessarily the retrieval components.'
      }
    ],
    metrics: [
      { metric: 'Retrieval Accuracy', value: '25% improvement', improvement: 'vs baseline keyword search' },
      { metric: 'Hallucination Rate', value: '28% reduction', improvement: 'vs direct LLM responses' },
      { metric: 'Response Latency', value: '< 2s', improvement: 'End-to-end query' },
      { metric: 'Relevance Score', value: '0.87 avg', improvement: 'Top-5 retrieved docs' },
      { metric: 'User Satisfaction', value: '4.2/5', improvement: 'Based on feedback' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'Initial implementation used simple cosine similarity without reranking. Low precision for ambiguous queries.',
        whatWouldChange: 'Would add query expansion (synonyms, related terms) and implement hybrid search combining dense and sparse retrieval. Also, fine-tuning embeddings on domain-specific data would improve retrieval quality.',
        productionConsideration: 'Production deployment would include: API rate limiting, request queuing (Celery), monitoring (DataDog), and cost optimization via query routing. Would implement circuit breakers for LLM API calls.'
      },
      {
        whatDidntWork: 'First version chunked documents at fixed sizes, breaking up important context. Lost semantic coherence.',
        whatWouldChange: 'Would implement semantic chunking using sentence transformers to preserve document structure. Also, add metadata filtering (date ranges, document types) for better retrieval.',
        productionConsideration: 'Would use LangChain\'s semantic chunking, implement document versioning, and add metadata indexing (Elasticsearch) for fast filtering. Would cache chunk embeddings to reduce compute costs.'
      },
      {
        whatDidntWork: 'Using GPT-3.5-turbo for all queries was expensive. Simple questions don\'t need LLM generation.',
        whatWouldChange: 'Would implement a routing layer: simple queries → direct retrieval, complex queries → RAG. Also, add caching for frequent queries to reduce costs and latency.',
        productionConsideration: 'Would implement intelligent routing (simple vs complex queries), Redis caching layer (TTL-based), and cost tracking dashboard. Would use GPT-4 only for complex queries requiring reasoning.'
      }
    ]
  },
  {
    id: 'driver-behavior-analysis',
    title: 'Driver Behaviour Analysis',
    slug: 'driver-behavior-analysis',
    technologies: ['CNN', 'RNN', 'Signal Processing', 'Spark ML', 'TensorFlow Serving', 'PyTorch Lightning', 'AWS/GCP'],
    description: 'A comprehensive system for analyzing driver behavior using sensor data and deep learning models.',
    highlights: ['Hybrid Deep Learning', 'Real-time Inference', 'Big Data Processing', 'Anomaly Detection'],
    problem: {
      title: 'The Problem',
      description: 'Traditional telematics systems only detect hard braking or acceleration events. They miss subtle patterns of risky driving (aggressive cornering, rapid lane changes) that don\'t trigger threshold-based alerts.',
      existingSolutions: [
        'Threshold-based systems miss nuanced risky behaviors',
        'Rule-based approaches can\'t detect complex patterns',
        'No way to predict risky behavior before it happens',
        'Existing ML solutions don\'t handle temporal sequences well'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: 'Hybrid CNN-RNN architecture processing accelerometer and gyroscope streams for real-time behavior classification.',
      flow: [
        { 
          step: 'Input', 
          description: 'Accelerometer/Gyroscope streams (100Hz). Real-time sensor data from mobile devices or IoT sensors.',
          technologies: ['Sensor Data', 'IoT'],
          metrics: ['100Hz sampling', '6-axis data']
        },
        { 
          step: 'Preprocessing', 
          description: 'Noise filtering, normalization. Kalman filtering for noise reduction and standardization.',
          technologies: ['Kalman Filter', 'Signal Processing'],
          metrics: ['Noise reduction: 40%', '< 5ms processing']
        },
        { 
          step: 'Feature Extraction', 
          description: 'CNN for spatial patterns. Extracts features from acceleration/gyroscope vectors.',
          technologies: ['CNN', 'PyTorch'],
          metrics: ['128-dim features', 'Spatial patterns']
        },
        { 
          step: 'Sequence Modeling', 
          description: 'LSTM/GRU for temporal dependencies. Captures driving pattern evolution over time.',
          technologies: ['LSTM', 'GRU', 'RNN'],
          metrics: ['Sequence length: 50', 'Temporal patterns']
        },
        { 
          step: 'Anomaly Detection', 
          description: 'Autoencoder for outlier detection. Identifies unusual driving behaviors not in training data.',
          technologies: ['Autoencoder', 'Anomaly Detection'],
          metrics: ['F1 score: 0.89', 'Unseen patterns']
        },
        { 
          step: 'Classification', 
          description: 'Hybrid CNN-RNN model. Combines spatial and temporal features for final risk classification.',
          technologies: ['Hybrid Model', 'CNN-RNN'],
          metrics: ['94% accuracy', '5 risk categories']
        },
        { 
          step: 'Output', 
          description: 'Risk score + behavior category. Real-time inference with sub-200ms latency.',
          technologies: ['TensorFlow Serving'],
          metrics: ['< 200ms latency', 'Risk score 0-1']
        }
      ],
      diagram: 'driver-behavior-analysis'
    },
    techDecisions: [
      {
        decision: 'Why CNN-RNN hybrid vs Transformer?',
        reasoning: 'CNNs excel at extracting spatial patterns from sensor data (acceleration vectors, gyroscope orientations). RNNs capture temporal dependencies (how driving patterns evolve). Transformers would work but require more data and compute. CNN-RNN hybrid is more interpretable and efficient for this use case.'
      },
      {
        decision: 'Why PyTorch Lightning vs raw PyTorch?',
        reasoning: 'Lightning provides structure for training loops, logging, and distributed training. For this project, it accelerated development and made hyperparameter tuning easier. The abstraction doesn\'t hide important details but reduces boilerplate.'
      },
      {
        decision: 'Why TensorFlow Serving vs TorchServe?',
        reasoning: 'TensorFlow Serving has better production tooling (monitoring, versioning, A/B testing). For deployment on AWS/GCP, TF Serving integrates better with existing infrastructure. Model conversion was straightforward.'
      },
      {
        decision: 'Why Spark ML for preprocessing?',
        reasoning: 'Processing millions of sensor readings requires distributed computing. Spark ML handles feature engineering at scale. For real-time inference, we use lightweight preprocessing, but Spark is essential for batch processing and model training on large datasets.'
      }
    ],
    metrics: [
      { metric: 'Detection Accuracy', value: '94%', improvement: 'Risky driving classification' },
      { metric: 'Inference Latency', value: '< 200ms', improvement: 'Real-time processing' },
      { metric: 'Training Time Reduction', value: '35% faster', improvement: 'vs baseline' },
      { metric: 'False Positive Rate', value: '6%', improvement: 'Down from 18%' },
      { metric: 'Anomaly Detection F1', value: '0.89', improvement: 'Unseen behavior patterns' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'Initial model used only accelerometer data. Missed cornering patterns that gyroscope captures better.',
        whatWouldChange: 'Would add GPS data for context (highway vs city driving) and implement multi-modal fusion more effectively. Also, add weather/road condition features for better context.',
        productionConsideration: 'Production would require real-time sensor data ingestion (Kafka), feature store (Feast), and edge deployment (TensorFlow Lite). Would implement A/B testing for model variants and real-time alerting for risky behavior.'
      },
      {
        whatDidntWork: 'First version processed data in 1-second windows. Too short for detecting aggressive lane changes.',
        whatWouldChange: 'Would implement adaptive window sizing based on driving context. Also, add attention mechanisms to focus on critical time segments rather than fixed windows.',
        productionConsideration: 'Would use sliding window approach with overlap, implement streaming processing (Apache Flink), and add anomaly detection for edge cases. Would deploy models via TensorFlow Serving with auto-scaling.'
      },
      {
        whatDidntWork: 'Deployed model had higher latency than expected due to preprocessing overhead.',
        whatWouldChange: 'Would optimize preprocessing pipeline and consider model quantization for edge deployment. Also, implement model ensembling for better accuracy at the cost of latency.',
        productionConsideration: 'Would implement model quantization (INT8), use TensorRT for GPU acceleration, and add preprocessing caching. Would deploy lightweight model on edge devices and heavy model in cloud for batch processing.'
      }
    ]
  },
  {
    id: 'foresight',
    title: 'Foresight — Proactive AI Financial OS',
    slug: 'foresight',
    technologies: ['LangGraph', 'Claude API (Anthropic)', 'FastAPI', 'Next.js 14', 'Neo4j', 'Qdrant', 'Terraform', 'AWS (ECS Fargate)', 'Plaid API', 'Whisper STT', 'gTTS', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions', 'Hugging Face'],
    description: 'A proactive AI financial operating system with 12 specialized LangGraph agents and 6 custom MCP servers that predicts cashflow, detects anomalies, and delivers weekly audio financial briefings — before problems cost you money.',
    highlights: ['Multi-Agent Architecture', 'Custom MCP Servers', 'Cashflow Prediction', 'Voice AI', 'Computer Vision', 'Custom ML Model'],
    problem: {
      title: 'The Problem',
      description: 'Personal finance tools are reactive — they show you what happened after it already hurt you. Overdraft fees, forgotten subscriptions, and missed bills cost people thousands per year because no system proactively monitors, predicts, and alerts before problems occur.',
      existingSolutions: [
        'Mint/YNAB only show historical data — no prediction or proactive alerts',
        'Bank alerts are threshold-based and miss subtle anomalies (duplicate charges, creeping subscriptions)',
        'No existing tool scans your inbox for upcoming renewals before they charge',
        'Zero tools deliver personalized audio briefings with forward-looking cashflow forecasts'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: '12 LangGraph agents communicate exclusively through 6 custom MCP servers (Anthropic\'s Model Context Protocol) over a multi-database backend — Neo4j for graph patterns, PostgreSQL for audit trails, Redis for caching, and Qdrant for semantic search.',
      flow: [
        {
          step: 'User Interface',
          description: 'Next.js 14 Progressive Web App with offline capability. Supports natural language voice queries and real-time dashboard updates via WebSockets.',
          technologies: ['Next.js 14', 'Tailwind CSS', 'Chart.js', 'PWA'],
          metrics: ['Installable PWA', 'Offline capability', 'Real-time WebSockets']
        },
        {
          step: 'LangGraph Orchestrator',
          description: '12 specialized agents managed by a central orchestrator. Uses asyncio.gather for parallel fan-out (Advisor agent runs 4 sub-agents concurrently). Each agent has a defined role and communicates only via MCP tool calls.',
          technologies: ['LangGraph', 'Claude API', 'asyncio'],
          metrics: ['12 agents', 'Parallel fan-out', '< 3s orchestration']
        },
        {
          step: '6 Custom MCP Servers',
          description: 'Anthropic\'s Model Context Protocol as a clean abstraction layer. 20 tools total across: Plaid MCP (bank data), Gmail MCP (financial signals), Calendar MCP (event sync), Graph MCP (Neo4j queries), Vision MCP (receipt OCR), Voice MCP (Whisper + gTTS).',
          technologies: ['MCP Protocol', 'Plaid API', 'Gmail API', 'Claude Vision', 'Whisper STT', 'gTTS'],
          metrics: ['6 servers', '20 tools', 'Protocol-based isolation']
        },
        {
          step: 'SpendingCategoryBERT',
          description: 'Custom fine-tuned BERT model classifying raw bank transaction strings into 8 spending categories. Trained on 50,000 synthetic examples generated with Claude Haiku. Published on HuggingFace: DikshithPulakanti/SpendingCategoryBERT.',
          technologies: ['BERT', 'Hugging Face', 'PyTorch', 'Claude Haiku'],
          metrics: ['8 categories', '50K training examples', 'HuggingFace deployed']
        },
        {
          step: 'Data Layer',
          description: 'Dual-database architecture: PostgreSQL for relational audit/alerts, Neo4j for graph-based spending patterns and subscription detection, Redis for caching hot queries, Qdrant for semantic vector search over financial documents.',
          technologies: ['PostgreSQL', 'Neo4j', 'Redis', 'Qdrant'],
          metrics: ['4 databases', 'Graph + relational', '< 10ms cache hits']
        },
        {
          step: 'Cloud Infrastructure',
          description: 'Full IaC with modular Terraform — 5 modules, separate dev/prod environments, S3 remote state, DynamoDB locking. Deployed on AWS ECS Fargate with GitHub Actions CI/CD pipeline.',
          technologies: ['Terraform', 'AWS ECS Fargate', 'GitHub Actions', 'Docker'],
          metrics: ['5 Terraform modules', 'Dev + prod environments', 'Automated CI/CD']
        },
        {
          step: 'Observability',
          description: 'LangSmith for agent trace monitoring, MLflow for model experiment tracking, CloudWatch for infrastructure metrics. Full end-to-end visibility across agent calls, tool invocations, and model performance.',
          technologies: ['LangSmith', 'MLflow', 'CloudWatch'],
          metrics: ['Agent trace monitoring', 'Model experiment tracking', 'Full observability stack']
        }
      ],
      diagram: 'foresight'
    },
    techDecisions: [
      {
        decision: 'Why MCP (Model Context Protocol) over direct API calls?',
        reasoning: 'MCP provides a clean abstraction layer between agents and external services. Each tool is explicitly declared with schemas, making the system auditable and testable. Direct API calls would tightly couple agent logic to service implementations — MCP allows swapping services (e.g., switching from Plaid to Stripe) without touching agent code. It also enforces clear contracts on what data agents can access.'
      },
      {
        decision: 'Why LangGraph over LangChain or AutoGen?',
        reasoning: 'LangGraph\'s stateful graph execution gives explicit control over agent state transitions — critical for financial workflows where you need deterministic behavior. AutoGen\'s conversation-based model is too unpredictable for financial decisions. LangChain is great for chains but lacks LangGraph\'s first-class support for branching, parallel fan-out, and cycle detection. For complex multi-agent orchestration with parallel sub-tasks, LangGraph was the only real option.'
      },
      {
        decision: 'Why Neo4j for subscription detection?',
        reasoning: 'Subscription detection is fundamentally a graph problem — finding recurring patterns across transactions linked to the same merchant over time. Relational SQL requires complex self-joins and window functions that become slow at scale. Neo4j\'s Cypher queries express "find all transactions from merchant X that repeat every 30 days" naturally and run 10x faster on graph traversals. The dual-DB architecture (PostgreSQL + Neo4j) gives us the best of both worlds.'
      },
      {
        decision: 'Why fine-tune BERT instead of prompting Claude?',
        reasoning: 'Prompting Claude for every single transaction classification would cost ~$0.003 per transaction — at 1000 transactions/month per user, that\'s $3/month/user just for categorization. SpendingCategoryBERT runs inference at essentially zero cost after the initial training. Fine-tuning also achieves better consistency — LLM prompting can be inconsistent for structured classification tasks. The custom model also runs locally, reducing latency from ~500ms (API call) to ~5ms (local inference).'
      },
      {
        decision: 'Why Terraform IaC over manual AWS setup?',
        reasoning: 'Financial applications require reproducible, auditable infrastructure. Manual AWS setup is error-prone and impossible to version control. Terraform\'s modular design (separate modules for networking, compute, databases, monitoring) allows spinning up identical dev/prod environments with a single command. Remote state in S3 with DynamoDB locking prevents concurrent modifications. For a production financial system, IaC is not optional.'
      }
    ],
    metrics: [
      { metric: 'Cashflow Prediction Horizon', value: '30/60 days', improvement: 'Exact balance forecasting' },
      { metric: 'Subscription Detection', value: '94% recall', improvement: 'Catches forgotten/duplicate subs' },
      { metric: 'Transaction Categorization', value: '~97% accuracy', improvement: 'SpendingCategoryBERT vs GPT baseline' },
      { metric: 'Categorization Cost Reduction', value: '99.8% cheaper', improvement: 'Local BERT vs Claude API per transaction' },
      { metric: 'Agent Orchestration', value: '< 3s', improvement: 'Full 12-agent pipeline with parallel fan-out' },
      { metric: 'Voice Query Response', value: '< 5s', improvement: 'End-to-end: STT → agents → TTS' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'First version used LangChain agents with direct API calls to each service. The coupling made testing nearly impossible — mocking 6 external services in unit tests was a nightmare. Refactoring to MCP servers took 2 weeks but made every agent independently testable.',
        whatWouldChange: 'Would design the MCP layer from day one rather than retrofitting it. Would also invest earlier in a proper test harness for multi-agent workflows — testing emergent agent behavior is genuinely hard.',
        productionConsideration: 'Production would need rate limiting per MCP server (Plaid has strict API limits), circuit breakers for external service failures, and message queuing (SQS) for async agent tasks. Would also implement agent sandboxing to prevent one failing agent from cascading.'
      },
      {
        whatDidntWork: 'Initial cashflow prediction used simple linear regression on transaction history. Completely failed for irregular income (freelancers, variable pay). Needed to model income uncertainty explicitly.',
        whatWouldChange: 'Would implement probabilistic forecasting (Monte Carlo simulation or Prophet) instead of point estimates. The "30-day balance = $X" output should be "30-day balance = $X ± $Y with 80% confidence" — uncertainty quantification matters for financial decisions.',
        productionConsideration: 'Would add user-specific model fine-tuning (personalized models per user), implement anomaly-adjusted forecasting (exclude one-time expenses from baseline), and add scenario analysis ("what if I cancel subscription X?"). Would also add model drift detection as spending patterns change over time.'
      },
      {
        whatDidntWork: 'The Advisor agent\'s weekly briefing initially ran all 4 sub-agents sequentially — taking 45 seconds. Parallelizing with asyncio.gather cut this to ~12 seconds, but the final synthesis prompt sometimes lost coherence when sub-agent outputs conflicted.',
        whatWouldChange: 'Would implement a structured output schema for each sub-agent to prevent synthesis issues. Would also add a "confidence score" to each sub-agent\'s output so the Advisor can weight findings appropriately when they conflict.',
        productionConsideration: 'Production briefings would be pre-generated overnight (cron job) rather than on-demand, cached in Redis, and delivered via push notification. Would add user preferences (briefing length, focus areas, delivery time). For scale, would shard users across multiple agent workers with a job queue.'
      }
    ]
  }
  ,
  {
    id: 'jobpilot',
    title: 'JobPilot — Autonomous Job Application Agent',
    slug: 'jobpilot',
    technologies: ['LangGraph', 'GPT-4o Vision', 'Claude API', 'Playwright', 'FastAPI', 'Next.js 14', 'PostgreSQL', 'Python 3.11', 'TypeScript', 'Tailwind CSS', 'Recharts', 'SSE (Server-Sent Events)'],
    description: 'An autonomous AI agent that takes your resume and job preferences and handles the entire application loop — from Indeed scraping to form-filling — using GPT-4o Vision to read any ATS form the way a human would.',
    highlights: ['Computer Use Agent', 'Vision AI (GPT-4o)', 'Multi-Agent Pipeline', 'Browser Automation', 'Real-time Dashboard', '5-Dimension Fit Scoring'],
    problem: {
      title: 'The Problem',
      description: 'Job hunting is one of the most time-consuming and repetitive tasks a person faces. A typical job seeker spends 3–5 hours per application — searching boards, tailoring resumes, writing cover letters, filling forms field by field. Multiply by 50–100 applications and you\'re looking at hundreds of hours of largely mechanical work.',
      existingSolutions: [
        'LinkedIn Easy Apply only works on LinkedIn — most companies use their own ATS (Workday, Greenhouse, Lever)',
        'Browser autofill tools are brittle — every ATS form has a different structure and field layout',
        'No existing tool reads and understands arbitrary web forms without custom code per site',
        'Zero tools combine job search + fit scoring + form-filling + cover letter generation in one autonomous pipeline'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: 'LangGraph StateGraph orchestrates 8 specialized agents through a sequential pipeline. Each agent is a discrete, independently testable node with a single responsibility. A shared AgentState TypedDict accumulates results as the pipeline progresses. Conditional edges handle errors — if profile building fails, the pipeline routes directly to END.',
      flow: [
        {
          step: 'Profile Builder',
          description: 'Claude extracts a structured candidate profile from raw resume text — name, skills, visa status, seniority, salary expectations, target roles. Saves to PostgreSQL candidates table with JSONB columns for skills arrays.',
          technologies: ['Claude API', 'PostgreSQL', 'JSONB'],
          metrics: ['~2s extraction', 'Structured candidate profile', 'JSONB skill arrays']
        },
        {
          step: 'Job Finder',
          description: 'Playwright opens a real browser, navigates Indeed search for the candidate\'s target roles and location, scrapes job postings extracting title, company, URL, description, and location. Filters out pagead tracking URLs to get only real job links.',
          technologies: ['Playwright', 'Indeed', 'GPT-4o Vision (fallback)'],
          metrics: ['19 real jobs scraped', 'Zero pagead URLs', 'Async browser session']
        },
        {
          step: 'Fit Scorer',
          description: 'Claude scores each job across 5 weighted dimensions: skills_match (35%), experience_level (25%), location_fit (20%), visa_compatible (10%), salary_likely (10%). Score >= 7.0 → auto-apply, >= 5.0 → flag for review, < 5.0 → skip.',
          technologies: ['Claude API', 'Weighted Scoring', 'asyncio batch'],
          metrics: ['5 scoring dimensions', '0–10 weighted score', '14 review / 5 skip in test run']
        },
        {
          step: 'Apply Navigator',
          description: 'Playwright clicks the "Apply Now" button on each qualified job\'s Indeed listing page, handles cookie consent banners, follows redirects, and lands on the actual ATS application form (Workday, Greenhouse, Lever, or custom).',
          technologies: ['Playwright', 'Cookie handling', 'Multi-step navigation'],
          metrics: ['Handles any ATS', 'Cookie consent automation', 'Error-captured screenshots']
        },
        {
          step: 'Form Reader',
          description: 'GPT-4o Vision takes a screenshot of the application form and identifies every field — name, email, work auth, experience, custom questions. Vision-first approach handles dynamic SPAs perfectly; a DOM fallback catches cases where Vision returns empty results.',
          technologies: ['GPT-4o Vision', 'Playwright screenshots', 'DOM fallback'],
          metrics: ['Handles any ATS form', 'Vision + DOM fallback', 'No per-site custom code']
        },
        {
          step: 'Form Filler',
          description: 'Maps candidate profile data to detected form fields via a field_mapper. Playwright fills each field programmatically. Tracks fields_filled vs fields_skipped per application — a low fill rate flags when the navigator landed on the wrong page.',
          technologies: ['Playwright', 'Field mapper logic', 'Quality tracking'],
          metrics: ['Fields filled per app tracked', 'Low fill rate = quality flag', 'All field types supported']
        },
        {
          step: 'Cover Letter Agent',
          description: 'Claude writes a tailored 200-word cover letter per company, referencing specific job requirements and company details. Explicitly prompted to avoid "passionate", "excited", and generic AI-sounding openers that recruiters flag.',
          technologies: ['Claude API', 'Prompt engineering'],
          metrics: ['200-word target', 'Company-specific content', 'Anti-AI-tell prompting']
        },
        {
          step: 'Live Dashboard',
          description: 'Next.js 14 App Router frontend connects to the FastAPI backend via Server-Sent Events. MetricCards (jobs found, applied, response rate), LiveFeed (scrolling agent event log), ApplicationTable (sortable by fit score), FitScoreChart (Recharts distribution). Updates in real time without page refresh.',
          technologies: ['Next.js 14', 'SSE (EventSource API)', 'Recharts', 'Tailwind CSS'],
          metrics: ['Real-time SSE updates', 'Live event feed', 'Fit score distribution chart']
        }
      ],
      diagram: 'jobpilot'
    },
    techDecisions: [
      {
        decision: 'Why GPT-4o Vision for form reading instead of a DOM parser?',
        reasoning: 'Application forms vary wildly across ATS providers — Workday, Greenhouse, Lever, and custom forms all have completely different DOM structures. A DOM parser would require custom scraping logic per ATS, meaning constant maintenance as sites update. GPT-4o Vision reads any form the way a human does — one model handles every ATS equally. The Vision-first approach with DOM fallback gives us resilience: Vision handles dynamic SPAs and rendered content; the DOM fallback catches edge cases where Vision returns empty results.'
      },
      {
        decision: 'Why LangGraph over plain LangChain for orchestration?',
        reasoning: 'LangGraph\'s StateGraph gives explicit control over agent execution order, state persistence between nodes, and conditional routing on errors. For JobPilot, conditional edges are critical — if profile building fails, we route directly to END rather than attempting downstream steps with invalid data. Plain LangChain chains don\'t give you this kind of branching and error recovery. The shared AgentState TypedDict also makes the pipeline\'s data flow explicit and inspectable at every stage.'
      },
      {
        decision: 'Why Playwright over Selenium?',
        reasoning: 'Playwright is async-native — essential for running concurrent browser sessions in a FastAPI async backend. It\'s also significantly more reliable with modern SPAs than Selenium: better screenshot APIs, network request interception, and built-in waiting for elements to be ready. Selenium\'s synchronous model would block the entire FastAPI event loop. For a production agent doing real browser automation in 2024, Playwright is simply the right tool.'
      },
      {
        decision: 'Why FastAPI with SSE instead of WebSockets?',
        reasoning: 'Server-Sent Events (SSE) are one-directional (server → client), which is exactly what a pipeline dashboard needs. The agent pushes events; the dashboard consumes them. WebSockets add bidirectional complexity we don\'t need. SSE also works over standard HTTP (no protocol upgrade), making it more compatible with proxies and CDNs. FastAPI\'s sse-starlette integration is clean, and the browser\'s native EventSource API needs zero additional libraries on the frontend.'
      },
      {
        decision: 'Why PostgreSQL with JSONB over SQLite or MongoDB?',
        reasoning: 'JSONB columns give us the flexibility of document storage (skills arrays, target_roles arrays) without abandoning relational structure. The jobs and applications tables have clear relational relationships (applications.job_id → jobs.id) that would be awkward in a pure document DB. SQLite lacks JSONB support and is not suitable for a multi-connection async backend. PostgreSQL also makes the migration to AWS RDS trivial when moving to production.'
      }
    ],
    metrics: [
      { metric: 'Jobs Scraped per Run', value: '19 real jobs', improvement: 'From a single Indeed search session' },
      { metric: 'Fit Scoring Coverage', value: '100% of jobs scored', improvement: '14 review, 5 skip in first test run' },
      { metric: 'Form Field Detection', value: 'Any ATS supported', improvement: 'GPT-4o Vision: zero per-site custom code' },
      { metric: 'Cover Letter Quality', value: '200-word tailored', improvement: 'Company-specific, anti-AI-tell prompting' },
      { metric: 'Dashboard Latency', value: '< 100ms', improvement: 'SSE events appear in real time' },
      { metric: 'Pipeline Stages', value: '8 agents', improvement: 'Each independently testable' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'First version used a DOM parser to detect form fields. Worked fine on simple HTML forms but completely failed on Workday and Greenhouse — both render fields dynamically with JavaScript, and the DOM structure had nothing resembling a standard input label pattern. Spent two days writing custom selectors before switching to Vision.',
        whatWouldChange: 'Would start Vision-first from day one rather than trying DOM parsing as the primary approach. The lesson: web scraping strategies from 2015 don\'t work on modern ATS platforms. Would also invest earlier in a screenshot-based test suite — making it easy to replay form reading against saved screenshots without needing a live browser session.',
        productionConsideration: 'Production would need a screenshot caching layer (store screenshots per application for debugging), headless browser pooling (spin up N Playwright instances for concurrent applications), and rate limiting per job board to avoid IP bans. Would also implement CAPTCHA detection to pause and alert the user rather than failing silently.'
      },
      {
        whatDidntWork: 'The apply navigator initially tried to handle the full navigation (Indeed listing → Apply → ATS form) in a single Playwright session without checkpointing. When the ATS form took too long to load or showed a cookie banner, the whole navigation failed with no way to resume. Had to rebuild it with explicit state checkpoints at each navigation step.',
        whatWouldChange: 'Would implement resumable navigation from the start — checkpoint the browser state after each successful navigation step and retry individual steps rather than restarting the full flow. Would also add explicit support for multi-page application forms (many ATS platforms spread the form across 3–5 pages).',
        productionConsideration: 'Production navigation would need a distributed job queue (Celery + Redis) to handle concurrent applications across multiple companies, browser session persistence across retries, and a human-in-the-loop escalation path for applications that require manual steps (CAPTCHA, 2FA, employer-specific login). Would also build a "sandbox mode" that fills forms but doesn\'t submit — for user review before final submission.'
      },
      {
        whatDidntWork: 'The cover letter agent initially produced generic outputs because the prompt was too open-ended. The agent would write openers like "I am passionate about AI and excited to contribute to your team" — exactly what recruiters flag as AI-generated. Needed several prompt iterations to get company-specific, human-sounding output.',
        whatWouldChange: 'Would implement a cover letter evaluation loop: generate → score against anti-AI-tell criteria → regenerate if score is too low. Would also fine-tune a small classifier to detect "AI-sounding" phrases and add it to the generation feedback loop. Additionally, would personalize based on the candidate\'s actual experience rather than just the job description.',
        productionConsideration: 'Production would A/B test cover letter templates against response rates — track which writing styles get more callbacks. Would implement a feedback loop where users mark applications that got responses, training a reward model on which cover letters performed best. Would also add a human review step for high-priority applications (score >= 9.0) where the user can edit before submission.'
      }
    ]
  }
  ,
  {
    id: 'apex',
    title: 'APEX — Autonomous Research Scientist',
    slug: 'apex',
    technologies: ['LangGraph', 'Claude API', 'Neo4j + GDS', 'Weaviate', 'Kafka', 'PostgreSQL', 'Redis', 'Next.js 14', 'FastAPI', 'Hugging Face', 'aiohttp', 'Docker', 'MLflow', 'arXiv API'],
    description: 'A multi-agent research scientist that autonomously mines arXiv papers, maps knowledge gaps in a Neo4j graph, debates hypotheses through adversarial agent dialogue, and drafts patent-style documents — wired through 4 custom MCP servers and Kafka for full observability.',
    highlights: ['Multi-Agent Research Pipeline', 'Knowledge Graph (Neo4j + GDS)', 'Adversarial Hypothesis Debate', 'Custom BERT (HypothesisValidityBERT)', 'Kafka Event Bus', 'Patent Drafting Agent'],
    problem: {
      title: 'The Problem',
      description: 'Scientific research moves faster than any human researcher can track. Thousands of papers are published on arXiv every week, and the most valuable insights — gaps between fields, untested hypotheses, patentable combinations of existing ideas — are invisible to anyone reading papers one by one. No tool automates the full loop: ingest → structure → reason → validate → draft.',
      existingSolutions: [
        'Semantic Scholar / connected papers show citation graphs but don\'t reason about gaps or generate hypotheses',
        'LLM-based summarizers read papers but can\'t cross-reference a structured knowledge graph of 780+ concepts',
        'Patent tools require human-written claims — no system autonomously identifies novelty from a research corpus',
        'Research assistants like Elicit answer questions but don\'t run an adversarial debate to stress-test a hypothesis before committing to it'
      ]
    },
    architecture: {
      title: 'Architecture',
      description: 'A five-layer system: arXiv scrapers feed a multi-database knowledge layer (Neo4j + Weaviate + PostgreSQL + Redis), four LangGraph agents communicate exclusively through four custom MCP servers, Kafka streams every event to the Next.js dashboard for live observability. One command triggers the full hypothesis-to-patent pipeline in ~55 seconds.',
      flow: [
        {
          step: 'arXiv Ingestion',
          description: 'Async aiohttp scraper queries arXiv export API across 20 APEX_QUERIES covering cs.AI, cs.LG, cs.CL, GNN+drug discovery, LLM+biology and more. Rate-limited to 0.5 req/s in pipeline mode. Papers are deduplicated via Redis ("already processed" ID cache) before any downstream work.',
          technologies: ['aiohttp', 'arXiv API', 'Redis', 'XML parsing'],
          metrics: ['20 domain queries', '0.5 req/s rate limit', '100+ papers ingested', 'Redis dedup cache']
        },
        {
          step: 'Knowledge Graph Build',
          description: 'Papers, authors, and extracted concepts are batch-upserted into Neo4j with GDS (Graph Data Science) plugins. Concepts are embedded with all-MiniLM-L6-v2 and loaded into Weaviate for vector search. Pipeline run metadata is logged to PostgreSQL. Result: 368 authors, 780 concepts, 3984 relationships.',
          technologies: ['Neo4j + GDS', 'Weaviate', 'PostgreSQL', 'sentence-transformers (MiniLM)'],
          metrics: ['780 concepts', '368 authors', '3984 relationships', 'Vector + graph dual retrieval']
        },
        {
          step: '4 Custom MCP Servers',
          description: 'Agents access all data exclusively through four stdio MCP servers: paper-mcp (search papers, concept neighbors, papers-by-year), graph-mcp (find gaps, create hypothesis, top concepts, list hypotheses), sim-mcp (simulation, synthetic data, validation), patent-mcp (draft patent, prior art, novelty score). Clean contract between agent logic and data layer.',
          technologies: ['MCP Protocol', 'Anthropic SDK', 'Neo4j driver', 'Weaviate client'],
          metrics: ['4 servers', 'stdio MCP protocol', 'Full data layer abstraction']
        },
        {
          step: '4 LangGraph Agents',
          description: 'Harvester ingests and structures papers. Reasoner finds gaps in the knowledge graph and generates hypotheses. Skeptic runs adversarial debate — challenges every hypothesis with counter-evidence from the graph. Inventor takes validated hypotheses and drafts patent-style documents with prior art and novelty scores.',
          technologies: ['LangGraph', 'Claude API', 'StateGraph', 'Conditional edges'],
          metrics: ['4 specialized agents', 'Adversarial debate loop', '~55s end-to-end', '6 hypotheses generated']
        },
        {
          step: 'HypothesisValidityBERT',
          description: 'Custom fine-tuned BERT model that classifies whether a hypothesis is valid or invalid based on supporting evidence. Trained on synthetic dataset generated from the knowledge graph, tracked with MLflow, published on HuggingFace: DikshithPulakanti/HypothesisValidityBERT. Used by the Skeptic agent as a fast first-pass before invoking Claude.',
          technologies: ['BERT', 'Hugging Face', 'MLflow', 'DVC', 'Synthetic data generation'],
          metrics: ['~98% F1 score', 'HuggingFace deployed', 'MLflow experiment tracking']
        },
        {
          step: 'Kafka Event Bus',
          description: 'Every agent action publishes to a Kafka topic: papers.ingested, hypothesis.created, hypothesis.validated, hypothesis.rejected, patent.drafted, agent.status. This gives full observability into the pipeline without tight coupling between agents. Zookeeper + Confluent Kafka 7.5 in Docker.',
          technologies: ['Kafka', 'Zookeeper', 'Confluent 7.5', 'Docker'],
          metrics: ['6 event topics', 'Full agent observability', 'Decoupled architecture']
        },
        {
          step: 'Next.js Dashboard',
          description: 'App Router dashboard fetches /api/stats, /api/hypotheses, and /api/events in parallel from FastAPI. Neo4j Cypher queries power counts, hypothesis lists, and event feeds. graph.tsx renders the live knowledge graph visualization. Real-time agent status updates stream via SSE.',
          technologies: ['Next.js 14', 'Neo4j driver', 'Cypher', 'Tailwind CSS'],
          metrics: ['Live knowledge graph viz', 'Real-time agent status', 'Hypothesis + patent tracker']
        }
      ],
      diagram: 'apex'
    },
    techDecisions: [
      {
        decision: 'Why Neo4j + GDS over a relational DB for the knowledge graph?',
        reasoning: 'Research knowledge is fundamentally a graph: papers cite papers, authors co-author, concepts co-occur. Finding "gaps" — pairs of concepts that should be connected but aren\'t — is a graph traversal problem. In SQL, this requires multi-level self-joins that become exponentially slow as the graph grows. Neo4j\'s Cypher expresses "find all concept pairs with no connecting hypothesis" naturally. GDS adds graph analytics (centrality, community detection, path finding) that would require separate libraries in a relational setup. The combination gives us both structural queries and analytical algorithms on the same data.'
      },
      {
        decision: 'Why dual retrieval — Neo4j + Weaviate — instead of just one?',
        reasoning: 'Neo4j excels at structural/relational queries: "which concepts are neighbors of X?", "which papers share authors with Y?", "what hypotheses exist between concept A and B?". Weaviate handles semantic similarity: "find papers conceptually similar to this hypothesis". These are different retrieval modes — graph traversal vs vector proximity. Using only Neo4j would miss semantic neighbors with different terminology. Using only Weaviate would lose the structural relationships (citation chains, author networks, concept co-occurrence counts) that make gap detection possible.'
      },
      {
        decision: 'Why Kafka instead of direct agent-to-agent calls or a simple event queue?',
        reasoning: 'Kafka gives us persistent, replayable event logs — critical for a research pipeline where you want to audit exactly what every agent did and when. Direct calls between agents create tight coupling (Reasoner must know about Skeptic\'s API). A simple in-memory queue (like asyncio.Queue) loses events on restart. Kafka topics (papers.ingested, hypothesis.validated, etc.) give each pipeline stage its own observable stream. This also means the dashboard can subscribe independently without the agents needing to know about the frontend.'
      },
      {
        decision: 'Why train HypothesisValidityBERT instead of always using Claude?',
        reasoning: 'The Skeptic agent needs to evaluate potentially dozens of hypotheses per run. Using Claude for every evaluation would cost ~$0.01 per hypothesis — at scale across thousands of hypotheses, this becomes significant. HypothesisValidityBERT runs locally in ~20ms vs ~800ms for a Claude API call. It serves as a fast first-pass filter: hypotheses that fail the BERT classifier (low confidence) are skipped or queued for human review; only borderline cases escalate to Claude for nuanced analysis. This tiered approach reduces Claude API cost by ~80% while maintaining quality.'
      },
      {
        decision: 'Why adversarial debate (Reasoner + Skeptic) instead of a single reasoning agent?',
        reasoning: 'Single-agent hypothesis generation suffers from confirmation bias — the same model that generated the hypothesis tends to validate it. The adversarial architecture forces hypothesis quality through conflict: Reasoner generates the hypothesis using graph gaps, Skeptic is explicitly prompted to find counter-evidence and weaknesses, and only hypotheses that survive the Skeptic\'s challenge advance to the Inventor. This mirrors peer review in science. The approach measurably improves hypothesis quality vs a single agent asked to "critically evaluate your own hypothesis".'
      }
    ],
    metrics: [
      { metric: 'Knowledge Graph Scale', value: '780 concepts, 3984 relationships', improvement: 'From 100+ arXiv papers' },
      { metric: 'HypothesisValidityBERT', value: '~98% F1', improvement: 'On held-out validation set' },
      { metric: 'End-to-End Pipeline', value: '~55 seconds', improvement: 'Hypothesis → patent draft (data pre-loaded)' },
      { metric: 'arXiv Coverage', value: '20 domain queries', improvement: 'cs.AI, cs.LG, cs.CL + cross-domain (GNN+biology, LLM+drug discovery)' },
      { metric: 'Hypotheses Generated', value: '6 validated hypotheses', improvement: '2 advanced to patent drafts' },
      { metric: 'Agent Observability', value: '6 Kafka topics', improvement: 'Full pipeline audit trail, replayable' }
    ],
    tradeoffs: [
      {
        whatDidntWork: 'First version of the Skeptic agent was prompted with "evaluate this hypothesis critically" — but it was using the same Claude model that generated the hypothesis, with no structural separation. The Skeptic consistently agreed with the Reasoner, making the debate loop pointless. Had to separate the agents with different system prompts, different context windows (Skeptic gets only the hypothesis + graph evidence, not the Reasoner\'s chain of thought), and different temperature settings.',
        whatWouldChange: 'Would implement a proper adversarial training setup: generate a dataset of hypothesis-counterargument pairs, fine-tune a dedicated Skeptic model rather than relying on prompt engineering alone. Would also add a "debate round limit" — currently the agents can loop indefinitely if no consensus is reached. A maximum of 3 debate rounds with forced escalation to human review prevents infinite loops.',
        productionConsideration: 'Production would need a human-in-the-loop step before patent drafting — the Inventor\'s output is good enough for prior art search and novelty scoring, but not for actual patent filing without expert review. Would integrate with USPTO patent search API for real prior art validation, implement versioned hypothesis storage (hypotheses evolve across debate rounds), and add a "confidence calibration" layer so the system knows when to defer to human judgment.'
      },
      {
        whatDidntWork: 'arXiv rate limiting caused silent failures in early versions. The standalone scraper defaulted to 3.0 req/s, which got the IP temporarily blocked by the export API. Batch runs would silently return empty results after the first few hundred papers — no error, just nothing. Only discovered the issue by checking Redis and noticing the processed-paper count stopped growing.',
        whatWouldChange: 'Would implement explicit HTTP 429 detection with exponential backoff rather than a fixed rate limit. Would also add scraping health monitoring (papers-per-minute metric to Kafka) so rate limit issues surface immediately in the dashboard instead of silently corrupting the dataset. For production scale, would distribute scraping across multiple IPs/proxies with proper attribution.',
        productionConsideration: 'Production ingestion would use the official Semantic Scholar API (which has higher rate limits and better structured data than the arXiv export API) as the primary source, with arXiv as a fallback. Would add incremental ingestion (only new papers since last run via date filtering) rather than re-scraping the full corpus each time. Would also implement paper deduplication by DOI across multiple sources, not just by arXiv ID.'
      },
      {
        whatDidntWork: 'The docker-compose setup with 7 services (Neo4j, Weaviate, Postgres, Redis, Kafka, Zookeeper, app) had startup ordering issues — the app container would start before Neo4j was ready to accept connections, causing the pipeline to fail on first run. The Dockerfile CMD points to main.py which only verifies environment, not the actual LangGraph pipeline, so this was a silent issue for new contributors.',
        whatWouldChange: 'Would add explicit health checks and depends_on conditions in docker-compose so the app container waits for all DBs to be healthy before starting. Would also replace main.py as the Dockerfile entrypoint with a proper init script that runs schema migrations, seeds the Agent nodes, and confirms connectivity to all services before declaring the container ready. The current requirements.txt (only python-dotenv) is also misleading — would add a full pinned requirements.txt generated from the actual runtime.',
        productionConsideration: 'Production would deploy on Kubernetes with separate deployments for the agent workers and the API server, using init containers for DB readiness checks. Would migrate from docker-compose Kafka to AWS MSK (managed Kafka) to avoid operational overhead. Would use AWS Neptune or AuraDB (managed Neo4j) instead of self-hosted Neo4j to eliminate the GDS plugin management burden.'
      }
    ]
  }
]

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug)
}
