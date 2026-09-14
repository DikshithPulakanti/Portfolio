export const decisionLog = [
  {
    id: 'mcp-over-direct-data-access',
    title: 'Why MCP servers instead of giving agents direct data access?',
    date: 'Jan 2026',
    context: 'APEX has 4 LangGraph agents reading and writing across Neo4j, Weaviate, PostgreSQL, and Redis. The agents needed structured access to real tools without agent logic reaching directly into a database driver.',
    decision: '4 custom MCP servers (Model Context Protocol)',
    alternatives: ['Direct database clients inside each agent', 'LangChain tool wrappers', 'Custom internal RPC layer'],
    reasoning: [
      {
        factor: 'Structured tool access',
        explanation: 'Every capability is declared as a tool with a schema, so Claude calls a typed interface instead of generating a free-text query and hoping it executes. Malformed calls fail at the protocol boundary rather than producing a plausible but wrong answer.'
      },
      {
        factor: 'Testability',
        explanation: 'Mocking 4 MCP servers is tractable. Mocking 4 database clients embedded inside agent code is not, because the coupling means you cannot exercise agent reasoning without standing up the data layer.'
      },
      {
        factor: 'Domain ownership',
        explanation: 'Each server owns one domain: paper-mcp for search, graph-mcp for gaps and hypotheses, sim-mcp for validation, patent-mcp for drafting and novelty. A change to how gaps are computed touches one server, not every agent that asks about gaps.'
      },
      {
        factor: 'One place for cross-cutting concerns',
        explanation: 'All tool calls pass through a single protocol layer, so logging, rate limiting, and tracing are implemented once at the boundary instead of repeated per agent.'
      }
    ],
    tradeoffs: {
      pros: ['Clean agent and data separation', 'Independently testable agents', 'Explicit typed schemas', 'Single place for logging and limits'],
      cons: ['An extra abstraction layer to maintain', 'More upfront design work', 'Small latency overhead per call']
    },
    productionConsideration: 'In production each MCP server would get its own rate limiting, circuit breaker, and retry policy. The protocol boundary is what makes those infrastructure concerns independent of agent business logic, so a failing data source degrades one tool rather than cascading through the pipeline.'
  },
  {
    id: 'confidence-gated-evaluation',
    title: 'Why confidence-gated evaluation instead of always calling the LLM?',
    date: 'Jan 2026',
    context: 'APEX\'s Skeptic agent evaluates dozens of hypotheses per run. Calling Claude for every evaluation is slow and costly, and accepting a single LLM verdict without a check is exactly the failure mode the Skeptic exists to prevent.',
    decision: 'Fine-tuned BERT as a confidence gate, Claude as the escalation path',
    alternatives: ['Claude for every evaluation', 'BERT only, no escalation', 'Rule-based validity heuristics'],
    reasoning: [
      {
        factor: 'Routing, not replacing',
        explanation: 'HypothesisValidityBERT returns a confidence score alongside its classification. High-confidence cases are decided automatically; only uncertain ones escalate to Claude. The small model is a router, not a cheaper substitute for judgment.'
      },
      {
        factor: 'Latency',
        explanation: 'Local BERT inference runs in roughly 20ms against roughly 800ms for a Claude API call. At dozens of hypotheses per run, that difference is the gap between an interactive pipeline and a batch job.'
      },
      {
        factor: 'Cost at volume',
        explanation: 'Gating cuts Claude calls by roughly 80%. The expensive model is spent only on the ambiguous cases where nuanced reasoning actually changes the outcome.'
      },
      {
        factor: 'Never trusting output blindly',
        explanation: 'The architectural point is that model output is checked before it is acted on. Uncertainty is treated as a signal to escalate rather than something to paper over with a confident-sounding answer.'
      }
    ],
    tradeoffs: {
      pros: ['~80% fewer LLM calls', '~40x faster on the common path', 'Explicit uncertainty handling', 'Deterministic on clear-cut cases'],
      cons: ['Upfront training and dataset generation cost', 'Needs retraining as the hypothesis distribution shifts', 'Threshold tuning is an empirical exercise']
    },
    productionConsideration: 'Production would add confidence calibration so the threshold reflects real accuracy rather than raw softmax scores, plus monitoring of the escalation rate. A rising escalation rate is an early signal that the input distribution has drifted away from the training data.'
  },
  {
    id: 'safety-limits-outside-llm',
    title: 'Why keep pricing safety limits outside the LLM instead of in the prompt?',
    date: 'Apr 2026',
    context: 'The AI Dynamic Pricing agent proposes prices for a real Shopify store through the Admin GraphQL API. A price outside its allowed range is a real financial and customer-facing mistake, not a bad demo output.',
    decision: 'Deterministic bounds enforced in code, separate from model reasoning',
    alternatives: ['Bounds described in the system prompt', 'Post-hoc LLM self-check', 'Fine-tuning the model on acceptable ranges'],
    reasoning: [
      {
        factor: 'Prompts are negotiable',
        explanation: 'Anything expressed in natural language can be argued with. A bound stated in a system prompt is a strong suggestion that a confident chain of reasoning can talk its way past, and the failure is silent because the model explains why the exception is justified.'
      },
      {
        factor: 'The guard does not read the argument',
        explanation: 'The validation layer compares numbers and rejects. It has no access to the model\'s rationale, so a more persuasive rationale cannot change the outcome. That asymmetry is the whole point.'
      },
      {
        factor: 'Clear division of authority',
        explanation: 'The model decides what price to suggest and why, which is what it is good at. It has no say in what price is permitted. Creativity and authority are deliberately separated.'
      },
      {
        factor: 'Auditability',
        explanation: 'A rejection is traceable to a specific rule with a specific threshold. With prompt-based limits, explaining why a bad price got through means reconstructing an inference, which is not an audit trail.'
      }
    ],
    tradeoffs: {
      pros: ['Bounds cannot be reasoned around', 'Deterministic and reviewable', 'Failures are traceable to a rule', 'Independent of model or prompt changes'],
      cons: ['Rules must be maintained separately from the agent', 'Less flexible for legitimate edge cases', 'Rejections can look opaque to the model, which cannot see why']
    },
    productionConsideration: 'Production would version the bound definitions and log every rejection with the proposal that triggered it. A high rejection rate is useful signal: either the model is miscalibrated for this catalogue or the bounds are too tight for real pricing conditions.'
  },
  {
    id: 'revalidate-at-approval',
    title: 'Why re-validate pricing bounds at approval time rather than at proposal time?',
    date: 'Apr 2026',
    context: 'Every live price write in the pricing agent waits for human approval. A proposal and its approval are separated by human latency, which can be minutes or hours.',
    decision: 'Re-run bounds validation fresh at the moment approval is granted',
    alternatives: ['Trust the validation done at proposal time', 'Expire proposals after a fixed TTL', 'Skip approval and rely on bounds alone'],
    reasoning: [
      {
        factor: 'The world moves between the two events',
        explanation: 'If bounds are checked only when the proposal is created, an approval granted an hour later applies a decision validated against conditions that no longer hold. The approval click is about now, so the check has to be about now too.'
      },
      {
        factor: 'Stale approvals fail safely',
        explanation: 'Re-checking means an old queue entry simply fails its re-validation instead of quietly writing a price that is no longer valid. A stale queue becomes harmless rather than dangerous.'
      },
      {
        factor: 'A TTL is a weaker version of the same idea',
        explanation: 'Expiring proposals after a fixed window guesses at how fast conditions change. Re-validating measures it directly, and a proposal that is still valid after two hours does not need to be discarded.'
      },
      {
        factor: 'Approval means something specific',
        explanation: 'The human is confirming an irreversible action. Re-validating makes the approval a statement about current conditions rather than a rubber stamp on a past computation.'
      }
    ],
    tradeoffs: {
      pros: ['Stale approvals cannot reach the store', 'No arbitrary expiry window to tune', 'Approval reflects current conditions', 'Queue length becomes a non-issue'],
      cons: ['An approval can be rejected after the human already clicked', 'Requires fetching fresh state on the approval path', 'Slightly more work per approval']
    },
    productionConsideration: 'Production would surface the re-validation failure back to the reviewer with the reason, so a rejected approval is explained rather than looking like a bug. Would also record both the proposal-time and approval-time state to make after-the-fact review possible.'
  },
  {
    id: 'hybrid-retrieval-over-dense',
    title: 'Why hybrid retrieval (dense + BM25) instead of vector search alone?',
    date: 'Feb 2026',
    context: 'APEX retrieves research papers to support gap detection and novelty assessment. Pure embedding similarity was returning conceptually adjacent work while missing the papers that actually named the relevant method.',
    decision: 'Weaviate dense vector search combined with BM25 sparse retrieval',
    alternatives: ['Dense vector search only', 'BM25 keyword search only', 'Dense retrieval with a cross-encoder reranker only'],
    reasoning: [
      {
        factor: 'Embeddings blur exact terminology',
        explanation: 'A query about a specific named method returns generic papers in the same area, because the embedding captures topic rather than the exact token. In research retrieval the method name is often the most important part of the query.'
      },
      {
        factor: 'BM25 handles rare tokens',
        explanation: 'Sparse retrieval scores rare and exact terms highly, which is precisely where dense retrieval is weakest. The two failure modes are complementary rather than overlapping.'
      },
      {
        factor: 'Precision matters downstream',
        explanation: 'The retrieved set feeds novelty assessment. A false semantic neighbour does not just lower a relevance score, it becomes a wrong prior-art claim in a drafted document.'
      },
      {
        factor: 'Semantic recall still needed',
        explanation: 'Dropping dense retrieval for BM25 alone would miss papers describing the same idea in different vocabulary, which is a large fraction of genuine cross-domain gaps. Both directions are load-bearing.'
      }
    ],
    tradeoffs: {
      pros: ['Precision beyond similarity alone', 'Exact method names still retrievable', 'Covers vocabulary mismatch and exact match', 'Native to Weaviate, no extra service'],
      cons: ['Fusion weighting needs tuning per query type', 'Two retrieval paths to reason about when debugging', 'Slightly higher query latency than dense alone']
    },
    productionConsideration: 'Production would add a reranking stage on top of the fused candidate set and evaluate fusion weights against a labelled query set rather than tuning by inspection. Would also track which retrieval path contributed each cited result, so a bad citation can be traced to dense or sparse retrieval.'
  },
  {
    id: 'neo4j-over-relational',
    title: 'Why Neo4j with Graph Data Science instead of PostgreSQL?',
    date: 'Jan 2026',
    context: 'APEX needed to find gaps between research concepts across 780 concept nodes and 3,984 relationships, and to rank which concepts were structurally worth reasoning about.',
    decision: 'Neo4j + GDS (Graph Data Science)',
    alternatives: ['PostgreSQL with recursive CTEs', 'NetworkX in Python', 'Document store with manual relationship tracking'],
    reasoning: [
      {
        factor: 'Gap detection is a traversal problem',
        explanation: 'Finding concept pairs that should be connected but are not requires multi-level self-joins in SQL that degrade sharply as the graph grows. In Cypher it is a single pattern match with a negation.'
      },
      {
        factor: 'Pagerank for relationship-aware reasoning',
        explanation: 'GDS pagerank ranks concepts by structural centrality, so the Reasoner prioritises important nodes rather than treating all 780 as equally interesting. Getting that from a relational store means exporting the graph to a separate library and keeping two copies in sync.'
      },
      {
        factor: 'Schema evolution',
        explanation: 'Research knowledge does not settle into a fixed schema. New node types (Hypothesis, Patent, Agent) were added as new labels without migrations, which would each have been a table and a set of foreign keys in a relational design.'
      },
      {
        factor: 'Paired with vector search rather than replacing it',
        explanation: 'Neo4j answers structural questions and Weaviate answers similarity questions. Keeping both means neither is stretched to do the other badly.'
      }
    ],
    tradeoffs: {
      pros: ['Natural gap and traversal queries', 'Graph algorithms on the same data', 'Schema evolves without migrations', 'Clear split of structural vs semantic retrieval'],
      cons: ['A second database to operate alongside PostgreSQL', 'GDS plugin management overhead when self-hosted', 'Cypher is another query language for contributors to learn']
    },
    productionConsideration: 'Would move from self-hosted Neo4j to a managed deployment to remove GDS plugin management, and materialise pagerank scores on a schedule rather than recomputing them per query, since concept centrality changes slowly relative to how often it is read.'
  },
  {
    id: 'golden-images-over-in-place-deploys',
    title: 'Why golden images with ASG instance refresh instead of deploying to running instances?',
    date: 'Nov 2025',
    context: 'CloudScale runs a multi-tier AWS environment with a CPU-driven autoscaling group. Deployment needed to keep the running fleet consistent with something reviewable and reproducible.',
    decision: 'Packer-baked golden images with an autoscaling group instance refresh',
    alternatives: ['Deploy scripts over SSH to running instances', 'Pull-based config management on boot', 'Containers on ECS or EKS'],
    reasoning: [
      {
        factor: 'Fleet consistency',
        explanation: 'Deploying onto running instances means the fleet diverges from any known artifact immediately, and a newly scaled instance boots from an older image than the one serving traffic. Baking the application in makes every instance provably identical.'
      },
      {
        factor: 'Rollback is a redeploy',
        explanation: 'Reverting means pointing the launch template at the previous image ID rather than reversing a deployment script, which is the difference between a known-good state and hoping the undo path was tested.'
      },
      {
        factor: 'What runs is what was tested',
        explanation: 'The pipeline runs pytest and a Newman/Postman API suite before baking, so the image that reaches the fleet is the artifact the tests passed against.'
      },
      {
        factor: 'Autoscaling correctness',
        explanation: 'CPU-driven scaling only works if a new instance is immediately equivalent to existing ones. Without a golden image, scaling up under load means adding an instance that still has to configure itself.'
      }
    ],
    tradeoffs: {
      pros: ['Immutable, reproducible fleet', 'Rollback by image ID', 'Scaling adds pre-configured instances', 'Tested artifact reaches production'],
      cons: ['Image bake time on every merge', 'Slower deploys than pushing a code change', 'Image sprawl needs a cleanup policy']
    },
    productionConsideration: 'Production would add an image retention and cleanup policy, and use a canary or rolling refresh with health-check gating so a bad image replaces part of the fleet and halts rather than rolling all the way through.'
  },
  {
    id: 'customer-managed-kms',
    title: 'Why customer-managed KMS keys instead of AWS-managed defaults?',
    date: 'Nov 2025',
    context: 'CloudScale encrypts data across several distinct domains (database, object storage, and application secrets). AWS-managed keys would have satisfied "encryption at rest" with no additional Terraform.',
    decision: '4 customer-managed KMS keys with 90-day automatic rotation',
    alternatives: ['AWS-managed default keys', 'A single customer-managed key for everything', 'Application-level encryption'],
    reasoning: [
      {
        factor: 'Rotation becomes a stated policy',
        explanation: 'AWS-managed keys do not let you set the rotation schedule. A 90-day rotation you configure and can point at is a policy; a rotation you do not control is an assumption.'
      },
      {
        factor: 'Per-domain key boundaries',
        explanation: 'Separate keys per encryption domain mean access to one domain does not imply the ability to decrypt another. One shared key collapses those boundaries into a single blast radius.'
      },
      {
        factor: 'Reviewable key policies',
        explanation: 'A customer-managed key has a key policy in Terraform, so who can decrypt what is a diff in a pull request rather than something inferred from IAM at runtime.'
      },
      {
        factor: 'Encryption you can describe',
        explanation: 'The practical difference is being able to answer which key protects which data, how often it rotates, and who can use it. Defaults give encryption without answers.'
      }
    ],
    tradeoffs: {
      pros: ['Controlled rotation schedule', 'Per-domain access boundaries', 'Key policies under version control', 'Auditable answers about encryption'],
      cons: ['More Terraform to maintain', 'Per-key monthly cost', 'Key deletion and recovery need deliberate handling']
    },
    productionConsideration: 'Would add CloudTrail monitoring on key usage so unexpected decrypt calls are visible, and document the recovery path for each key. With customer-managed keys, losing key access is a genuine data-loss scenario, which is the cost of holding the control.'
  },
  {
    id: 'k-anonymity-at-gateway',
    title: 'Why enforce k-anonymity at the gateway instead of inside each hospital node?',
    date: 'Mar 2026',
    context: 'MedFind federates search across 3 independent hospital nodes so patient data never leaves its institution. Aggregate results are not automatically anonymous: a narrow enough query returns a count that describes one person.',
    decision: 'Gateway-level k-anonymity suppression at k=5, paired with role-based aggregation',
    alternatives: ['Per-node enforcement', 'Differential privacy noise on counts', 'Rounding small counts instead of suppressing'],
    reasoning: [
      {
        factor: 'Only the gateway sees the combination',
        explanation: 'A node can apply a threshold to its own slice, but three nodes each returning a legally-sized group can still combine into something describing a single patient, and no individual node has the information to notice.'
      },
      {
        factor: 'The guarantee should not depend on node configuration',
        explanation: 'With independently operated nodes, per-node enforcement is only as strong as the least carefully configured node. One enforcement point at the merge means the property holds for the network.'
      },
      {
        factor: 'Suppression over perturbation',
        explanation: 'Rounding a count of one still reveals that a matching record exists, and per-query noise can be averaged away by repeating similar queries. Suppression returns an absence of data, so a narrowing attack gets nothing rather than a noisy signal.'
      },
      {
        factor: 'k=5 is a usable threshold',
        explanation: 'Large enough that a returned aggregate cannot be pinned to one person even with outside knowledge, small enough that genuine research queries still return results. A much higher k suppresses so aggressively the federated search stops answering real questions.'
      }
    ],
    tradeoffs: {
      pros: ['Covers cross-node re-identification', 'One place to audit the guarantee', 'Independent of per-node config', 'Honest primitive: withholds rather than distorts'],
      cons: ['Gateway becomes a trusted component', 'Legitimate small-cohort research queries return nothing', 'Does not defend against a compromised gateway']
    },
    productionConsideration: 'Production would log suppressed queries so a pattern of narrowing attempts by one caller is visible, and pair suppression with query budgets per identity. A single suppressed query is normal; hundreds of increasingly narrow ones from the same caller is a signal worth acting on.'
  },
  {
    id: 'jwt-over-sessions',
    title: 'Why stateless JWT instead of server-side sessions?',
    date: 'Sep 2025',
    context: 'EventEase runs its Express API as multiple containerized replicas on Kubernetes across AWS and Azure, with role-based access control across User, Organizer, and Admin roles.',
    decision: 'Signed JWT (with bcrypt-hashed credentials) carrying identity and role',
    alternatives: ['Server-side sessions with a shared store', 'Sticky session routing', 'OAuth via an external identity provider'],
    reasoning: [
      {
        factor: 'No shared state between replicas',
        explanation: 'A self-contained signed token lets any replica verify a request independently. Server-side sessions would require either a shared session store or sticky routing, both of which add a stateful dependency to an otherwise stateless API.'
      },
      {
        factor: 'Role travels with the request',
        explanation: 'The role claim is in the token, so authorization middleware evaluates the same value on every route without a lookup. That keeps a single source of truth for permission decisions.'
      },
      {
        factor: 'Portability across clouds',
        explanation: 'Running the same containers on AWS and Azure meant avoiding anything that assumed a particular managed session or cache service.'
      },
      {
        factor: 'Enforcement stays server-side',
        explanation: 'The token makes the role available to the API, which is where the boundary is actually enforced. The frontend decides what to show; it never decides what is allowed.'
      }
    ],
    tradeoffs: {
      pros: ['Stateless horizontal scaling', 'No session store to operate', 'Same behaviour on both clouds', 'Role available on every request'],
      cons: ['Revocation before expiry needs deliberate handling', 'Token size grows with claims', 'A leaked token is valid until it expires']
    },
    productionConsideration: 'Production would use short-lived access tokens with refresh tokens so revocation has a bounded window, and maintain a denylist for compromised tokens. Stateless auth trades instant revocation for scalability, and short expiry is how you buy back most of that.'
  }
]
