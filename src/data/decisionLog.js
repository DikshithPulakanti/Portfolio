export const decisionLog = [
  {
    id: 'faiss-vs-pinecone',
    title: 'Why FAISS over Pinecone?',
    date: 'Jan 2026',
    context: 'Choosing vector database for RAG pipeline and Movie Semantic Search',
    decision: 'FAISS',
    alternatives: ['Pinecone', 'Qdrant', 'Weaviate'],
    reasoning: [
      {
        factor: 'Cost',
        explanation: 'FAISS is free and open-source. Pinecone charges per query and storage, which adds up quickly during development and experimentation.'
      },
      {
        factor: 'Local Development Speed',
        explanation: 'FAISS runs locally, eliminating API latency. This speeds up iteration cycles significantly during R&D phase.'
      },
      {
        factor: 'Index Control',
        explanation: 'FAISS provides granular control over indexing strategies (IVF, HNSW, quantization). This flexibility is crucial for optimizing retrieval performance.'
      },
      {
        factor: 'Experimentation',
        explanation: 'Easy to test different index types, parameters, and quantization methods without API constraints or additional costs.'
      }
    ],
    tradeoffs: {
      pros: ['Free', 'Fast local iteration', 'Full control', 'No API limits'],
      cons: ['Requires manual scaling', 'No managed infrastructure', 'Need to handle sharding']
    },
    productionConsideration: 'For production at scale, would consider Pinecone or Qdrant for managed infrastructure, but FAISS is perfect for research and development.'
  },
  {
    id: 'clip-vs-blip',
    title: 'Why CLIP vs BLIP?',
    date: 'Dec 2025',
    context: 'Selecting vision-language model for Movie Semantic Search',
    decision: 'CLIP',
    alternatives: ['BLIP', 'BLIP-2', 'Flamingo'],
    reasoning: [
      {
        factor: 'Zero-shot Capabilities',
        explanation: 'CLIP excels at zero-shot visual-text alignment without task-specific fine-tuning. Perfect for semantic search across diverse movie content.'
      },
      {
        factor: 'Joint Embedding Space',
        explanation: 'CLIP\'s shared embedding space enables direct similarity search between images and text queries, which is exactly what we need.'
      },
      {
        factor: 'Pre-trained Knowledge',
        explanation: 'CLIP\'s training on web-scale data gives it strong understanding of visual concepts (actors, scenes, emotions) relevant to movies.'
      },
      {
        factor: 'Inference Speed',
        explanation: 'CLIP is faster at inference compared to generative models like BLIP, which is critical for real-time search.'
      }
    ],
    tradeoffs: {
      pros: ['Zero-shot works out of the box', 'Fast inference', 'Great for retrieval', 'No fine-tuning needed'],
      cons: ['Less detailed captions', 'May miss nuanced scene descriptions', 'Limited to pre-trained concepts']
    },
    productionConsideration: 'For production, might use CLIP for retrieval + BLIP for detailed captioning in a hybrid approach.'
  },
  {
    id: 'chunk-size-512',
    title: 'Why chunk size = 512?',
    date: 'Jan 2026',
    context: 'Determining optimal chunk size for RAG pipeline',
    decision: '512 tokens',
    alternatives: ['256 tokens', '1024 tokens', 'Variable chunking'],
    reasoning: [
      {
        factor: 'Context Preservation',
        explanation: 'Most answers require 300-500 tokens of context. 512 balances having enough context without diluting relevance signals.'
      },
      {
        factor: 'Retrieval Precision',
        explanation: 'Smaller chunks (256) fragment important context. Larger chunks (1024) dilute relevance and increase noise in retrieval.'
      },
      {
        factor: 'Model Alignment',
        explanation: '512 aligns with GPT-2\'s optimal context window for caption generation and GPT-3.5\'s efficient processing for RAG.'
      },
      {
        factor: 'Empirical Testing',
        explanation: 'Tested 256, 512, 1024. 512 showed best balance of retrieval precision (0.87) and answer quality in evaluations.'
      }
    ],
    tradeoffs: {
      pros: ['Optimal context length', 'Good retrieval precision', 'Efficient processing'],
      cons: ['May split some long documents', 'Fixed size doesn\'t respect document structure']
    },
    productionConsideration: 'Would implement semantic chunking using sentence transformers to preserve document structure while maintaining optimal chunk sizes.'
  },
  {
    id: 'yolov8-vs-faster-rcnn',
    title: 'Why YOLOv8 over Faster R-CNN?',
    date: 'Nov 2025',
    context: 'Actor recognition in Movie Semantic Search',
    decision: 'YOLOv8',
    alternatives: ['Faster R-CNN', 'RetinaNet', 'DETR'],
    reasoning: [
      {
        factor: 'Real-time Performance',
        explanation: 'YOLOv8 provides 30+ FPS inference vs Faster R-CNN\'s slower but more accurate detection. For video processing at scale, speed is critical.'
      },
      {
        factor: 'Accuracy Tradeoff',
        explanation: 'YOLOv8 with proper augmentation (19x) achieved 96% accuracy, which was sufficient for our use case while maintaining throughput.'
      },
      {
        factor: 'Resource Efficiency',
        explanation: 'YOLOv8 is more efficient in terms of memory and compute, allowing processing of longer video sequences.'
      },
      {
        factor: 'Deployment',
        explanation: 'Easier to deploy in production environments with lower latency requirements.'
      }
    ],
    tradeoffs: {
      pros: ['Fast inference', 'Good accuracy with augmentation', 'Efficient', 'Production-ready'],
      cons: ['Slightly lower accuracy than Faster R-CNN', 'Requires careful augmentation strategy']
    },
    productionConsideration: 'For production, might use YOLOv8 for real-time processing + Faster R-CNN for offline high-accuracy batch processing.'
  },
  {
    id: 'cnn-rnn-hybrid',
    title: 'Why CNN-RNN Hybrid vs Transformer?',
    date: 'Oct 2025',
    context: 'Driver Behavior Analysis model architecture',
    decision: 'CNN-RNN Hybrid',
    alternatives: ['Transformer', 'Pure CNN', 'Pure RNN'],
    reasoning: [
      {
        factor: 'Spatial Patterns',
        explanation: 'CNNs excel at extracting spatial patterns from sensor data (acceleration vectors, gyroscope orientations). This is crucial for detecting driving maneuvers.'
      },
      {
        factor: 'Temporal Dependencies',
        explanation: 'RNNs capture temporal dependencies - how driving patterns evolve over time. Essential for detecting risky behavior sequences.'
      },
      {
        factor: 'Data Efficiency',
        explanation: 'Hybrid approach requires less data than Transformers while achieving 94% accuracy. Transformers would need more training data.'
      },
      {
        factor: 'Interpretability',
        explanation: 'CNN-RNN hybrid is more interpretable - can visualize spatial features and temporal patterns separately.'
      }
    ],
    tradeoffs: {
      pros: ['Data efficient', 'Interpretable', 'Good accuracy', 'Efficient inference'],
      cons: ['Less flexible than Transformers', 'May miss long-range dependencies']
    },
    productionConsideration: 'With more data, would experiment with Transformer architecture. Current hybrid approach is optimal for available dataset size.'
  }
]
