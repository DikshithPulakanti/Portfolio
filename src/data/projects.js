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
  }
]

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug)
}
