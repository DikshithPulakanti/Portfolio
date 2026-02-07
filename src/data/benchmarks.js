export const benchmarks = [
  {
    id: 'vector-db-comparison',
    title: 'Vector DB Performance Comparison',
    date: 'Jan 2026',
    description: 'Comparing FAISS, Pinecone, and Qdrant for RAG pipeline performance',
    experiments: [
      {
        name: 'FAISS (HNSW)',
        metrics: {
          'Search Latency': '< 10ms',
          'Index Build Time': '2.3s',
          'Memory Usage': '512MB',
          'Cost': '$0 (self-hosted)',
          'Max Vectors': '1M+'
        },
        notes: 'Best for development and research. Requires manual scaling.'
      },
      {
        name: 'Pinecone',
        metrics: {
          'Search Latency': '15-30ms',
          'Index Build Time': 'N/A (managed)',
          'Memory Usage': 'N/A',
          'Cost': '$70/month (starter)',
          'Max Vectors': 'Unlimited'
        },
        notes: 'Best for production scale. Higher latency due to API calls.'
      },
      {
        name: 'Qdrant',
        metrics: {
          'Search Latency': '8-15ms',
          'Index Build Time': '1.8s',
          'Memory Usage': '450MB',
          'Cost': '$0 (self-hosted)',
          'Max Vectors': '10M+'
        },
        notes: 'Good balance. Can be self-hosted or managed.'
      }
    ],
    conclusion: 'FAISS chosen for development speed and cost. Qdrant would be production choice for managed infrastructure.'
  },
  {
    id: 'chunk-size-experiment',
    title: 'Chunk Size vs Retrieval Quality',
    date: 'Dec 2025',
    description: 'Empirical testing of chunk sizes for optimal RAG performance',
    experiments: [
      {
        name: '256 tokens',
        metrics: {
          'Retrieval Precision': '0.82',
          'Context Completeness': 'Low',
          'Noise Level': 'Low',
          'Answer Quality': 'Fragmented'
        },
        notes: 'Too small - loses important context'
      },
      {
        name: '512 tokens',
        metrics: {
          'Retrieval Precision': '0.87',
          'Context Completeness': 'Optimal',
          'Noise Level': 'Low',
          'Answer Quality': 'High'
        },
        notes: 'Optimal balance - chosen for production'
      },
      {
        name: '1024 tokens',
        metrics: {
          'Retrieval Precision': '0.79',
          'Context Completeness': 'High',
          'Noise Level': 'High',
          'Answer Quality': 'Diluted'
        },
        notes: 'Too large - dilutes relevance signals'
      }
    ],
    conclusion: '512 tokens provides optimal balance between context preservation and retrieval precision.'
  },
  {
    id: 'embedding-model-comparison',
    title: 'Embedding Model Comparison',
    date: 'Jan 2026',
    description: 'Evaluating OpenAI vs Sentence-Transformers for semantic search',
    experiments: [
      {
        name: 'OpenAI text-embedding-ada-002',
        metrics: {
          'Semantic Understanding': 'Excellent',
          'Generalization': 'High',
          'Latency': '< 200ms',
          'Cost': '$0.0001/1K tokens',
          'Dimensions': '1536'
        },
        notes: 'Best for diverse query types. Higher cost.'
      },
      {
        name: 'Sentence-BERT (all-MiniLM-L6-v2)',
        metrics: {
          'Semantic Understanding': 'Good',
          'Generalization': 'Medium',
          'Latency': '< 50ms',
          'Cost': '$0 (local)',
          'Dimensions': '384'
        },
        notes: 'Faster and free, but less generalizable.'
      },
      {
        name: 'Custom Fine-tuned',
        metrics: {
          'Semantic Understanding': 'Excellent (domain)',
          'Generalization': 'Low (domain-specific)',
          'Latency': '< 100ms',
          'Cost': 'Training cost',
          'Dimensions': '768'
        },
        notes: 'Best for specific domains. Requires training data.'
      }
    ],
    conclusion: 'OpenAI embeddings chosen for superior generalization. Would fine-tune for domain-specific production use.'
  }
]
