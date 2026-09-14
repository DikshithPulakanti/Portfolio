export const projects = [
  {
    "id": "apex",
    "title": "APEX: Autonomous AI Research Scientist",
    "slug": "apex",
    "links": [
      { "label": "GitHub", "url": "https://github.com/DikshithPulakanti/Apex" }
    ],
    "technologies": [
      "LangGraph",
      "Claude API",
      "MCP",
      "Neo4j + GDS",
      "Weaviate",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Hugging Face",
      "FastAPI",
      "Next.js 14",
      "Docker",
      "MLflow",
      "arXiv API"
    ],
    "description": "A 4-agent LangGraph pipeline that gives Claude structured access to real tools through 4 custom MCP servers, mining arXiv papers into a Neo4j knowledge graph, stress-testing hypotheses through adversarial agent debate, and routing evaluation by model confidence rather than trusting output blindly.",
    "highlights": [
      "4-Agent LangGraph Pipeline",
      "4 Custom MCP Servers",
      "Confidence-Gated Evaluation",
      "Hybrid RAG (Dense + BM25)",
      "Neo4j Graph Data Science",
      "Kafka Observability Bus"
    ],
    "problem": {
      "title": "The Problem",
      "description": "Scientific research moves faster than any human researcher can track. Thousands of papers are published on arXiv every week, and the most valuable insights (gaps between fields, untested hypotheses, patentable combinations of existing ideas) are invisible to anyone reading papers one by one. No tool automates the full loop: ingest → structure → reason → validate → draft.",
      "existingSolutions": [
        "Semantic Scholar and connected-papers tools show citation graphs but don't reason about gaps or generate hypotheses",
        "LLM-based summarizers read papers but can't cross-reference a structured knowledge graph of 780+ concepts",
        "Patent tools require human-written claims, and no system autonomously identifies novelty from a research corpus",
        "Research assistants like Elicit answer questions but don't run an adversarial debate to stress-test a hypothesis before committing to it"
      ]
    },
    "architecture": {
      "title": "Architecture",
      "description": "A five-layer system: arXiv scrapers feed a multi-database knowledge layer (Neo4j + Weaviate + PostgreSQL + Redis), four LangGraph agents communicate exclusively through four custom MCP servers, and Kafka streams every event to the Next.js dashboard for live observability. One command triggers the full hypothesis-to-patent pipeline in ~55 seconds.",
      "flow": [
        {
          "step": "arXiv Ingestion",
          "description": "Async aiohttp scraper queries the arXiv export API across 20 domain queries covering cs.AI, cs.LG, cs.CL, GNN + drug discovery, LLM + biology and more. Rate-limited to 0.5 req/s in pipeline mode. Papers are deduplicated via Redis (an \"already processed\" ID cache) before any downstream work.",
          "technologies": [
            "aiohttp",
            "arXiv API",
            "Redis",
            "XML parsing"
          ],
          "metrics": [
            "20 domain queries",
            "0.5 req/s rate limit",
            "100+ papers ingested",
            "Redis dedup cache"
          ]
        },
        {
          "step": "Knowledge Graph Build",
          "description": "Papers, authors, and extracted concepts are batch-upserted into Neo4j with the Graph Data Science plugin. Pagerank centrality ranks concepts so the Reasoner can prioritise structurally important nodes for relationship-aware reasoning. Concepts are embedded with all-MiniLM-L6-v2 and loaded into Weaviate. Result: 368 authors, 780 concepts, 3984 relationships.",
          "technologies": [
            "Neo4j + GDS",
            "Pagerank",
            "Weaviate",
            "PostgreSQL",
            "sentence-transformers (MiniLM)"
          ],
          "metrics": [
            "780 concepts",
            "368 authors",
            "3984 relationships",
            "Pagerank concept ranking"
          ]
        },
        {
          "step": "Hybrid RAG Retrieval",
          "description": "Retrieval combines Weaviate dense vector search with BM25 sparse keyword retrieval rather than relying on embedding similarity alone. Dense search finds semantic neighbours that use different terminology; BM25 anchors on exact technical terms and rare tokens that embeddings tend to smooth over. Combining both improves precision on research queries where exact method names matter.",
          "technologies": [
            "Weaviate",
            "BM25",
            "Hybrid search",
            "MiniLM embeddings"
          ],
          "metrics": [
            "Dense + sparse fusion",
            "Precision beyond similarity alone",
            "Exact-term recall preserved"
          ]
        },
        {
          "step": "4 Custom MCP Servers",
          "description": "Agents access all data exclusively through four stdio MCP servers: paper-mcp (search papers, concept neighbours, papers-by-year), graph-mcp (find gaps, create hypothesis, top concepts, list hypotheses), sim-mcp (simulation, synthetic data, validation), and patent-mcp (draft patent, prior art, novelty score). This is a clean contract between agent logic and the data layer, and it is what gives Claude structured access to real tools rather than free-text guesses.",
          "technologies": [
            "MCP Protocol",
            "Anthropic SDK",
            "Neo4j driver",
            "Weaviate client"
          ],
          "metrics": [
            "4 servers",
            "stdio MCP protocol",
            "Full data layer abstraction"
          ]
        },
        {
          "step": "4 LangGraph Agents",
          "description": "Harvester ingests and structures papers. Reasoner finds gaps in the knowledge graph and generates hypotheses. Skeptic runs adversarial debate, challenging every hypothesis with counter-evidence from the graph. Inventor takes validated hypotheses and drafts patent-style documents with prior art and novelty scores.",
          "technologies": [
            "LangGraph",
            "Claude API",
            "StateGraph",
            "Conditional edges"
          ],
          "metrics": [
            "4 specialized agents",
            "Adversarial debate loop",
            "~55s end-to-end",
            "6 hypotheses generated"
          ]
        },
        {
          "step": "Confidence-Gated Evaluation",
          "description": "A fine-tuned BERT model (HypothesisValidityBERT) classifies whether a hypothesis is supported by its evidence, and the pipeline routes on its confidence: high-confidence outputs are accepted or rejected automatically, while uncertain cases escalate to Claude for nuanced analysis. The point is that output is never trusted blindly. Tracked with MLflow, published on HuggingFace as DikshithPulakanti/HypothesisValidityBERT.",
          "technologies": [
            "BERT",
            "Hugging Face",
            "MLflow",
            "DVC",
            "Synthetic data generation"
          ],
          "metrics": [
            "~98% F1 score",
            "Confidence-based routing",
            "~80% fewer Claude calls",
            "HuggingFace deployed"
          ]
        },
        {
          "step": "Kafka Observability Bus",
          "description": "Every agent action publishes to a Kafka topic: papers.ingested, hypothesis.created, hypothesis.validated, hypothesis.rejected, patent.drafted, agent.status. This gives full tracing and monitoring of agent behavior across the pipeline without tight coupling between agents. Zookeeper + Confluent Kafka 7.5 in Docker.",
          "technologies": [
            "Kafka",
            "Zookeeper",
            "Confluent 7.5",
            "Docker"
          ],
          "metrics": [
            "6 event topics",
            "Full agent observability",
            "Replayable audit trail"
          ]
        },
        {
          "step": "Next.js Dashboard",
          "description": "App Router dashboard fetches /api/stats, /api/hypotheses, and /api/events in parallel from FastAPI. Neo4j Cypher queries power counts, hypothesis lists, and event feeds. A graph view renders the live knowledge graph, and agent status updates stream via SSE.",
          "technologies": [
            "Next.js 14",
            "Neo4j driver",
            "Cypher",
            "Tailwind CSS"
          ],
          "metrics": [
            "Live knowledge graph viz",
            "Real-time agent status",
            "Hypothesis + patent tracker"
          ]
        }
      ],
      "diagram": "apex"
    },
    "techDecisions": [
      {
        "decision": "Why MCP servers instead of giving agents direct database access?",
        "reasoning": "MCP turns every capability into an explicitly declared tool with a schema, which means Claude gets structured access to real tools instead of generating free-text queries and hoping they run. Each of the four servers owns one domain (papers, graph, simulation, patents), so agent logic never touches a Neo4j driver or a Weaviate client directly. That boundary is what makes agents independently testable: mocking four MCP servers is tractable, mocking four database clients embedded in agent code is not."
      },
      {
        "decision": "Why confidence-gated evaluation instead of always calling Claude?",
        "reasoning": "The Skeptic agent evaluates dozens of hypotheses per run, and trusting an LLM verdict blindly is exactly the failure mode the agent exists to prevent. HypothesisValidityBERT runs locally in ~20ms versus ~800ms for a Claude call, so it handles the clear-cut cases and returns a confidence score. Only low-confidence hypotheses escalate to Claude. This keeps quality where it matters (ambiguous cases get the stronger model) while cutting Claude API calls by roughly 80%. The pattern generalises: a small fine-tuned model as a fast gate, a large model as the escalation path."
      },
      {
        "decision": "Why hybrid retrieval (dense + BM25) instead of vector search alone?",
        "reasoning": "Embedding similarity is good at finding conceptually related work but blurs exact technical terminology. A query about \"GraphSAGE\" will happily return generic GNN papers while missing the ones that actually name the method. BM25 handles that: rare tokens and exact method names score highly. Combining Weaviate dense search with BM25 sparse retrieval gives precision that neither achieves alone, which matters when the downstream task is novelty assessment and a false semantic neighbour becomes a wrong prior-art claim."
      },
      {
        "decision": "Why Neo4j + Graph Data Science over a relational DB?",
        "reasoning": "Research knowledge is fundamentally a graph: papers cite papers, authors co-author, concepts co-occur. Finding gaps (pairs of concepts that should be connected but are not) is a graph traversal problem that in SQL requires multi-level self-joins which become exponentially slow as the graph grows. Cypher expresses \"find all concept pairs with no connecting hypothesis\" naturally. GDS adds pagerank and community detection on the same data, so the Reasoner can prioritise structurally central concepts instead of treating all 780 nodes as equally interesting."
      },
      {
        "decision": "Why Kafka instead of direct agent-to-agent calls?",
        "reasoning": "Kafka gives persistent, replayable event logs, which is what you need to audit exactly what every agent did and when. Direct calls between agents create tight coupling (the Reasoner would have to know about the Skeptic's interface), and an in-memory queue loses events on restart. Topic-per-stage means the dashboard subscribes independently and the agents never need to know a frontend exists."
      },
      {
        "decision": "Why adversarial debate (Reasoner + Skeptic) instead of one reasoning agent?",
        "reasoning": "Single-agent hypothesis generation suffers from confirmation bias: the same model that generated a hypothesis tends to validate it. The adversarial architecture forces quality through conflict. The Reasoner generates from graph gaps, the Skeptic is explicitly prompted to find counter-evidence, and only hypotheses that survive reach the Inventor. This mirrors peer review, and it measurably beats asking a single agent to \"critically evaluate your own hypothesis\"."
      }
    ],
    "metrics": [
      {
        "metric": "Knowledge Graph Scale",
        "value": "780 concepts, 3984 relationships",
        "improvement": "From 100+ arXiv papers"
      },
      {
        "metric": "HypothesisValidityBERT",
        "value": "~98% F1",
        "improvement": "On held-out validation set"
      },
      {
        "metric": "Claude Call Reduction",
        "value": "~80% fewer",
        "improvement": "Confidence gating: BERT handles clear cases"
      },
      {
        "metric": "End-to-End Pipeline",
        "value": "~55 seconds",
        "improvement": "Hypothesis → patent draft (data pre-loaded)"
      },
      {
        "metric": "Hypotheses Generated",
        "value": "6 validated hypotheses",
        "improvement": "2 advanced to patent drafts"
      },
      {
        "metric": "Agent Observability",
        "value": "6 Kafka topics",
        "improvement": "Full pipeline audit trail, replayable"
      }
    ],
    "tradeoffs": [
      {
        "whatDidntWork": "The first Skeptic agent was simply prompted to \"evaluate this hypothesis critically\", using the same Claude model that generated the hypothesis with no structural separation. It consistently agreed with the Reasoner, which made the debate loop pointless. Fixing it meant separating the agents properly: different system prompts, different context windows (the Skeptic sees only the hypothesis plus graph evidence, never the Reasoner's chain of thought), and different temperature settings.",
        "whatWouldChange": "Would build a proper adversarial training setup: generate a dataset of hypothesis-counterargument pairs and fine-tune a dedicated Skeptic model rather than relying on prompt engineering alone. Would also add a debate round limit, since the agents can currently loop if no consensus is reached. Three rounds with forced escalation to human review prevents that.",
        "productionConsideration": "Production would need a human-in-the-loop step before patent drafting. The Inventor's output is good enough for prior art search and novelty scoring, but not for actual filing without expert review. Would integrate the USPTO patent search API for real prior art validation, store hypotheses versioned across debate rounds, and add confidence calibration so the system knows when to defer to human judgment."
      },
      {
        "whatDidntWork": "arXiv rate limiting caused silent failures in early versions. The standalone scraper defaulted to 3.0 req/s, which got the IP temporarily blocked by the export API. Batch runs would return empty results after the first few hundred papers with no error at all, just nothing. I only found it by checking Redis and noticing the processed-paper count had stopped growing.",
        "whatWouldChange": "Would implement explicit HTTP 429 detection with exponential backoff rather than a fixed rate limit, and publish a papers-per-minute metric to Kafka so ingestion stalls surface in the dashboard immediately instead of silently corrupting the dataset. For production scale, would distribute scraping across multiple IPs with proper attribution.",
        "productionConsideration": "Production ingestion would use the Semantic Scholar API as the primary source (higher rate limits, better structured data) with arXiv as fallback. Would add incremental ingestion by date filter rather than re-scraping the full corpus, and deduplicate by DOI across sources instead of by arXiv ID alone."
      },
      {
        "whatDidntWork": "The docker-compose setup with 7 services (Neo4j, Weaviate, Postgres, Redis, Kafka, Zookeeper, app) had startup ordering issues. The app container would start before Neo4j was accepting connections, so the pipeline failed on first run. Because the Dockerfile entrypoint only verifies environment variables rather than exercising the pipeline, this stayed invisible to new contributors.",
        "whatWouldChange": "Would add explicit health checks and depends_on conditions so the app waits for every database to be healthy, and replace the entrypoint with an init script that runs schema migrations, seeds the Agent nodes, and confirms connectivity before declaring the container ready. Would also ship a fully pinned requirements.txt generated from the actual runtime rather than the minimal one currently checked in.",
        "productionConsideration": "Production would run on Kubernetes with separate deployments for agent workers and the API server, using init containers for DB readiness. Would move from docker-compose Kafka to AWS MSK and from self-hosted Neo4j to AuraDB to eliminate GDS plugin management overhead."
      }
    ]
  },
  {
    "id": "ai-dynamic-pricing",
    "title": "AI Dynamic Pricing: Shopify Agent",
    "slug": "ai-dynamic-pricing",
    "links": [
      { "label": "GitHub", "url": "https://github.com/DikshithPulakanti/ai-dynamic-pricing" }
    ],
    "technologies": [
      "LangGraph.js",
      "Gemini",
      "Next.js",
      "TypeScript",
      "Vercel",
      "BullMQ",
      "Railway",
      "Shopify Admin GraphQL API",
      "Shopify OAuth",
      "Vitest",
      "Playwright"
    ],
    "description": "An AI pricing agent wired into a real Shopify store through OAuth and the Admin GraphQL API, where deterministic safety limits sit outside the LLM so pricing bounds can't be reasoned around, and every live price write waits for human approval that is re-validated at the moment it is granted.",
    "highlights": [
      "Real Shopify OAuth Integration",
      "Deterministic Safety Limits",
      "Human-in-the-Loop Writes",
      "Stale-Approval Protection",
      "Background Job Workers",
      "Tested Against Live Infra"
    ],
    "problem": {
      "title": "The Problem",
      "description": "An AI agent that changes prices on a live storefront is one bad inference away from real financial damage. Most demos avoid that problem by never touching a real store: they mock the commerce API, skip OAuth, and show an agent \"deciding\" a price with nothing at stake. The interesting engineering problem is the opposite one, which is how you let an LLM propose prices against a real Shopify store while making it structurally impossible for it to set a price outside its allowed bounds.",
      "existingSolutions": [
        "Mocked integrations prove the prompt works but never exercise OAuth, scopes, rate limits, or the failures that only appear against a real Admin API",
        "Putting pricing bounds in the system prompt makes them a suggestion, because anything expressed in natural language can be argued with",
        "Fully autonomous pricing agents have no approval gate, so a single bad inference reaches the storefront",
        "Approval flows that validate bounds only at proposal time will happily apply a stale approval after the underlying conditions have changed"
      ]
    },
    "architecture": {
      "title": "Architecture",
      "description": "A LangGraph.js agent runs on a Next.js app deployed to Vercel, authenticated against a real Shopify store via OAuth and reading and writing through the Admin GraphQL API. Pricing decisions pass through a deterministic guard layer that lives outside the model, then queue for human approval. A BullMQ worker on Railway handles background processing, and the whole flow is verified with Vitest and Playwright against live infrastructure rather than mocks.",
      "flow": [
        {
          "step": "Shopify OAuth",
          "description": "A real Shopify OAuth flow installs the app on a merchant store and exchanges the grant for an access token with explicitly scoped permissions. This is not a mocked connection: the agent operates against an actual store, which means scopes, token handling, and install/uninstall lifecycle all have to be correct before any pricing logic matters.",
          "technologies": [
            "Shopify OAuth",
            "Next.js API routes",
            "Scoped access tokens"
          ],
          "metrics": [
            "Real store install flow",
            "Explicitly scoped permissions",
            "No mocked connection"
          ]
        },
        {
          "step": "Admin GraphQL API",
          "description": "Product, variant, and price data is read and written through the Shopify Admin GraphQL API. Using GraphQL rather than REST keeps reads tightly scoped to the fields the agent actually reasons over, which matters both for Shopify's cost-based rate limiting and for keeping the model's context small and relevant.",
          "technologies": [
            "Shopify Admin GraphQL API",
            "TypeScript",
            "Cost-based rate limiting"
          ],
          "metrics": [
            "Field-scoped reads",
            "Mutation-based price writes",
            "Rate-limit aware"
          ]
        },
        {
          "step": "LangGraph.js Reasoning",
          "description": "A LangGraph.js graph orchestrates the pricing agent with Gemini as the reasoning model. The agent analyses product and pricing context and proposes a price change with its rationale. Everything it produces is treated as a proposal, never as an action: the graph has no path that writes directly to the store.",
          "technologies": [
            "LangGraph.js",
            "Gemini",
            "TypeScript"
          ],
          "metrics": [
            "Proposals, never direct writes",
            "Stateful graph execution",
            "Rationale attached to each proposal"
          ]
        },
        {
          "step": "Deterministic Safety Limits",
          "description": "Pricing bounds are enforced in plain code outside the LLM, not described to it in a prompt. A proposal that falls outside the allowed range is rejected by the guard layer regardless of how convincing the model's reasoning is. This separation is the core design choice: the model gets to be creative about what price to suggest, and it gets no say in what price is permitted.",
          "technologies": [
            "TypeScript validators",
            "Bounds enforcement",
            "Guard layer"
          ],
          "metrics": [
            "Bounds enforced in code",
            "Not promptable or negotiable",
            "Rejection independent of model output"
          ]
        },
        {
          "step": "Human Approval Gate",
          "description": "No price reaches the live store without explicit human approval. Critically, the bounds are re-validated fresh at the moment approval is granted rather than trusting the validation done when the proposal was created. That closes the stale-approval hole where a proposal sits in a queue, the underlying conditions shift, and an approval click applies a price that is no longer valid.",
          "technologies": [
            "Approval queue",
            "Re-validation at approval time",
            "Next.js UI"
          ],
          "metrics": [
            "Human approval before every write",
            "Bounds re-checked at approval",
            "Stale approvals blocked"
          ]
        },
        {
          "step": "BullMQ Worker on Railway",
          "description": "Background work (pricing analysis runs, queued jobs, and post-approval writes) is handled by a BullMQ worker deployed on Railway, separate from the Vercel-hosted app. Keeping the worker off the request path means a long analysis run never blocks a user request, and job state survives a redeploy of the frontend.",
          "technologies": [
            "BullMQ",
            "Redis",
            "Railway"
          ],
          "metrics": [
            "Off-request-path processing",
            "Durable job queue",
            "Independent worker deploys"
          ]
        },
        {
          "step": "Live-Infrastructure Testing",
          "description": "Vitest covers unit and integration behavior and Playwright drives the end-to-end flow, both run against live infrastructure rather than mocks. That is deliberate: the failures that actually break this system (OAuth scope gaps, rate-limit responses, GraphQL mutation rejections) only reproduce against the real Admin API and surfaced exactly because the tests were not mocked.",
          "technologies": [
            "Vitest",
            "Playwright",
            "Live Shopify store"
          ],
          "metrics": [
            "E2E against real infra",
            "Catches production-only failures",
            "No mocked commerce layer"
          ]
        }
      ],
      "diagram": "ai-dynamic-pricing"
    },
    "techDecisions": [
      {
        "decision": "Why keep safety limits outside the LLM instead of in the prompt?",
        "reasoning": "Anything expressed in natural language is negotiable. A bound stated in a system prompt is a strong suggestion that a sufficiently confident chain of reasoning can talk its way past, and the failure is silent because the model will explain why the exception is justified. Implementing bounds as deterministic code means the guard layer does not read the model's argument at all: it compares numbers and rejects. The model stays useful for the part it is good at, which is proposing a price and explaining why, and has no authority over what is permitted."
      },
      {
        "decision": "Why re-validate bounds at approval time rather than at proposal time?",
        "reasoning": "A proposal and its approval are separated by human latency, and the world moves in between. If bounds are checked only when the proposal is created, an approval granted an hour later applies a decision that was validated against conditions that no longer hold. Re-running the check fresh at the moment of approval makes the approval a statement about now rather than about when the queue entry was written. It also means a stale queue is harmless: old proposals simply fail their re-check instead of quietly writing bad prices."
      },
      {
        "decision": "Why require human approval at all for an \"autonomous\" agent?",
        "reasoning": "Price is a financial commitment to a customer, and an incorrect one is visible publicly and immediately. The approval gate is not a hedge against the model being weak, it is an acknowledgement that the blast radius of a wrong write is larger than the convenience of a fully automatic one. The agent still does all the work: it monitors, analyses, proposes, and explains. A human only confirms the irreversible step, which is the correct division of labour for any agent whose actions are hard to undo."
      },
      {
        "decision": "Why real Shopify OAuth and the Admin GraphQL API instead of a mock?",
        "reasoning": "A mocked commerce layer validates the prompt and nothing else. The problems that actually matter here are integration problems: which OAuth scopes the mutation requires, how Shopify's cost-based rate limiting behaves under a batch of reads, what a rejected price mutation returns, and how token lifecycle interacts with an uninstall. None of those reproduce against a mock. Building on the real API from the start meant those failures showed up during development instead of after deployment."
      },
      {
        "decision": "Why a BullMQ worker on Railway alongside a Vercel-hosted app?",
        "reasoning": "Pricing analysis is bursty and slow relative to a web request, and it should not share a lifecycle with the frontend. BullMQ gives a durable Redis-backed queue with retries, so a job survives a failed attempt or a redeploy. Running the worker on Railway rather than as a Vercel function keeps it a long-lived process with its own scaling and logs, while the Next.js app on Vercel stays a thin, fast surface for OAuth callbacks, the dashboard, and the approval UI."
      },
      {
        "decision": "Why LangGraph.js instead of a single Gemini call?",
        "reasoning": "The pricing flow is multi-step with explicit state: gather product context, analyse, propose, hand off to the guard layer, queue for approval. A single call collapses all of that into one opaque inference with no inspectable intermediate state. LangGraph.js makes each stage a node with typed state between them, which means a proposal can be traced back through exactly what the agent saw. Staying in TypeScript also keeps the agent in the same codebase and type system as the Shopify client and the guard layer, so the bounds the guard enforces and the bounds the UI displays are the same types."
      }
    ],
    "metrics": [
      {
        "metric": "Live Price Writes Without Approval",
        "value": "Zero",
        "improvement": "Human approval gate on every write"
      },
      {
        "metric": "Bounds Enforcement",
        "value": "Deterministic code",
        "improvement": "Outside the LLM, not promptable"
      },
      {
        "metric": "Approval Validation",
        "value": "Re-checked at approval",
        "improvement": "Stale approvals blocked"
      },
      {
        "metric": "Shopify Integration",
        "value": "Real OAuth + Admin GraphQL",
        "improvement": "No mocked commerce layer"
      },
      {
        "metric": "Test Coverage Surface",
        "value": "Vitest + Playwright",
        "improvement": "Run against live infrastructure"
      },
      {
        "metric": "Background Processing",
        "value": "BullMQ on Railway",
        "improvement": "Durable queue, off the request path"
      }
    ]
  },
  {
    "id": "cloudscale",
    "title": "CloudScale: Multi-Cloud Infrastructure as Code",
    "slug": "cloudscale",
    "links": [
      { "label": "Application Repo", "url": "https://github.com/DikshithPulakanti/webapp_for" },
      { "label": "Infrastructure Repo", "url": "https://github.com/DikshithPulakanti/tf-infra" }
    ],
    "technologies": [
      "Terraform",
      "AWS",
      "GCP",
      "GitHub Actions",
      "Packer",
      "FastAPI",
      "SQLAlchemy 2.0",
      "Pydantic",
      "PostgreSQL (RDS)",
      "Lambda",
      "SNS",
      "SES",
      "DynamoDB",
      "KMS",
      "CloudWatch",
      "StatsD",
      "Newman/Postman",
      "pytest"
    ],
    "description": "A highly available, multi-tier cloud environment defined entirely as code across 70+ Terraform resources on AWS with a parallel GCP stack, fronted by a FastAPI service and shipped by a CI/CD pipeline that bakes golden images and refreshes the autoscaling group on every merge.",
    "highlights": [
      "70+ Terraform Resources",
      "Multi-Cloud (AWS + GCP)",
      "Golden Image CI/CD",
      "Customer-Managed KMS Keys",
      "Event-Driven Email Pipeline",
      "Custom CloudWatch Metrics"
    ],
    "problem": {
      "title": "The Problem",
      "description": "Most application projects treat infrastructure as a deployment detail: a hand-clicked EC2 instance, a security group opened wider than it should be, and a database whose configuration exists only in someone's console history. That works until you need a second environment, an audit trail, or a rebuild after something breaks. This project inverts the priority and treats the infrastructure itself as the deliverable: every network boundary, key, alarm, and scaling policy is code, reviewable and reproducible from scratch.",
      "existingSolutions": [
        "Console-provisioned infrastructure has no version history, so there is no way to review a change or roll one back",
        "A single-tier deployment puts the application and database in the same blast radius with no private subnet isolation",
        "Default AWS-managed encryption keys give no control over rotation policy or key-level access boundaries",
        "Deploying by SSHing into a running instance means the running fleet and the image it came from drift apart immediately"
      ]
    },
    "architecture": {
      "title": "Architecture",
      "description": "A multi-tier AWS environment provisioned as code across 70+ Terraform resources: a custom VPC with public and private subnets, an application load balancer fronting a CPU-driven autoscaling group, RDS in private subnets, and S3, SNS, SES, Lambda, DynamoDB, Route 53, and ACM wired in around it. A parallel GCP stack runs alongside. GitHub Actions tests, bakes a Packer golden image, applies Terraform, and triggers an ASG instance refresh on every merge.",
      "flow": [
        {
          "step": "Network Foundation",
          "description": "A custom VPC with public and private subnets across availability zones, route tables, internet and NAT egress, and security groups scoped per tier. The load balancer sits in public subnets, application instances and RDS sit private, and each security group allows only the specific port and source it needs rather than a shared permissive group.",
          "technologies": [
            "Terraform",
            "AWS VPC",
            "Subnets",
            "Route tables",
            "Security groups"
          ],
          "metrics": [
            "Multi-AZ subnets",
            "Private data tier",
            "Per-tier security groups"
          ]
        },
        {
          "step": "Compute and Autoscaling",
          "description": "An application load balancer distributes traffic to an autoscaling group with CPU-driven scaling policies, so the fleet grows and shrinks with load instead of being sized for a guess at peak. Health checks let the ASG replace unhealthy instances without manual intervention, which is what makes the tier genuinely highly available rather than just redundant on paper.",
          "technologies": [
            "AWS ALB",
            "Auto Scaling Group",
            "CloudWatch alarms",
            "Launch templates"
          ],
          "metrics": [
            "CPU-driven autoscaling",
            "Health-check replacement",
            "Multi-AZ distribution"
          ]
        },
        {
          "step": "FastAPI Application",
          "description": "A REST API of roughly 2,200 lines built on FastAPI with SQLAlchemy 2.0 for persistence against RDS, Pydantic models for request and response validation at the boundary, and bcrypt-hashed basic authentication. Validation lives in the schema layer rather than scattered through handlers, so a malformed request is rejected before it reaches business logic.",
          "technologies": [
            "FastAPI",
            "SQLAlchemy 2.0",
            "Pydantic",
            "bcrypt",
            "PostgreSQL (RDS)"
          ],
          "metrics": [
            "~2,200 lines of code",
            "Schema-level validation",
            "bcrypt password hashing"
          ]
        },
        {
          "step": "Encryption and Key Management",
          "description": "Four customer-managed KMS keys with 90-day automatic rotation cover the separate encryption domains rather than relying on AWS-managed defaults. Customer-managed keys are the difference between \"the data is encrypted\" and being able to state and enforce a rotation policy and key-level access boundary per domain.",
          "technologies": [
            "AWS KMS",
            "Customer-managed keys",
            "Key rotation policies",
            "Terraform"
          ],
          "metrics": [
            "4 customer-managed keys",
            "90-day auto-rotation",
            "Per-domain key separation"
          ]
        },
        {
          "step": "Event-Driven Email Pipeline",
          "description": "User-facing email is decoupled from the request path: the API publishes to SNS, a Lambda function consumes the topic, and SES sends the message, with DynamoDB tracking delivery state. The API never waits on an email provider, so a slow or failing SES call degrades notifications rather than the request that triggered them.",
          "technologies": [
            "AWS SNS",
            "AWS Lambda",
            "AWS SES",
            "DynamoDB"
          ],
          "metrics": [
            "API → SNS → Lambda → SES",
            "Async, off the request path",
            "Delivery state tracked"
          ]
        },
        {
          "step": "CI/CD with Golden Images",
          "description": "GitHub Actions runs pytest and a Newman/Postman API suite, then Packer bakes a golden machine image with the application already installed, Terraform applies the infrastructure change, and the autoscaling group performs an instance refresh onto the new image. Deployment is therefore a fleet replacement rather than an in-place update, which keeps the running instances identical to a versioned artifact.",
          "technologies": [
            "GitHub Actions",
            "Packer",
            "Terraform",
            "pytest",
            "Newman/Postman"
          ],
          "metrics": [
            "Fully automated pipeline",
            "Golden image per release",
            "ASG instance refresh"
          ]
        },
        {
          "step": "Observability",
          "description": "Custom application metrics are emitted through StatsD into CloudWatch alongside the infrastructure metrics AWS provides by default. That means API-level signals (endpoint timing and call counts) sit next to CPU and ALB metrics in the same place the autoscaling alarms read from, instead of application behavior being invisible to the layer that scales it.",
          "technologies": [
            "StatsD",
            "CloudWatch",
            "Custom metrics",
            "CloudWatch alarms"
          ],
          "metrics": [
            "Custom app metrics via StatsD",
            "Unified with infra metrics",
            "Alarm-driven scaling"
          ]
        },
        {
          "step": "DNS, TLS and Parallel GCP Stack",
          "description": "Route 53 handles DNS and ACM provisions and renews TLS certificates for the load balancer, both managed in Terraform so a domain change is a reviewable commit. A parallel stack on GCP runs alongside the AWS environment, which forced the Terraform to be structured around provider-agnostic module boundaries rather than assuming AWS primitives everywhere.",
          "technologies": [
            "Route 53",
            "AWS ACM",
            "GCP",
            "Terraform modules"
          ],
          "metrics": [
            "TLS provisioned as code",
            "Parallel GCP environment",
            "Provider-agnostic module design"
          ]
        }
      ],
      "diagram": "cloudscale"
    },
    "techDecisions": [
      {
        "decision": "Why customer-managed KMS keys instead of AWS-managed defaults?",
        "reasoning": "AWS-managed keys encrypt the data but leave no room to state a policy. You cannot control the rotation schedule, you cannot scope key usage per domain, and you cannot point at a key policy during a review and show who is allowed to decrypt what. Four customer-managed keys with 90-day rotation give each encryption domain its own key, its own policy, and its own rotation guarantee. It is more Terraform to maintain, and it is the difference between encryption as a checkbox and encryption as something you can actually describe and enforce."
      },
      {
        "decision": "Why golden images with ASG instance refresh instead of deploying to running instances?",
        "reasoning": "Deploying onto running instances means the fleet immediately diverges from any known artifact, and a newly scaled instance boots from an older image than the one serving traffic. Baking the application into a Packer image makes the image the unit of release: every instance in the group is provably identical, an instance refresh rolls the fleet forward, and a rollback is redeploying the previous image ID rather than reversing a script. It costs bake time on every merge, which buys the guarantee that what is running is exactly what was tested."
      },
      {
        "decision": "Why SNS → Lambda → SES instead of sending email from the API?",
        "reasoning": "Sending email inline couples request latency to a third-party service and makes a transient SES failure into a failed user request. Publishing to SNS hands off in milliseconds and lets a Lambda consumer own the actual delivery, with retries handled outside the request lifecycle and DynamoDB tracking state. The API's job is to record that an email should be sent; making sure it arrives is a separate concern with a separate failure mode."
      },
      {
        "decision": "Why a parallel GCP stack rather than AWS only?",
        "reasoning": "Building the same environment twice on different providers is the only way to find out which parts of the Terraform were genuinely infrastructure and which were AWS-shaped assumptions leaking into module interfaces. The second stack forced the module boundaries to be about roles (network, compute, data, secrets) rather than about specific AWS resource types. It also means the architecture is described in a way that survives a provider decision changing, which is a different property from just having a backup cloud."
      },
      {
        "decision": "Why custom StatsD metrics when CloudWatch already provides infrastructure metrics?",
        "reasoning": "CloudWatch's default metrics describe the machines, not the application. CPU utilisation tells you the instance is busy; it does not tell you which endpoint got slow or whether request volume shifted. Emitting application counters and timers through StatsD into CloudWatch puts both layers in one place, so the autoscaling alarms and the application signals are queried from the same source. Without that, you end up diagnosing an API regression from infrastructure graphs, which is guesswork."
      },
      {
        "decision": "Why Pydantic validation at the boundary instead of checks inside handlers?",
        "reasoning": "Validation scattered across handlers drifts: one endpoint checks a field, the next forgets, and the contract exists only in whichever code path you happen to read. Pydantic models make the request and response shape a declaration that FastAPI enforces before a handler runs, so a malformed request never reaches business logic and the same models generate the API documentation. Combined with SQLAlchemy 2.0's typed queries, the data shape is checked at the HTTP boundary and at the database boundary rather than trusted in between."
      }
    ],
    "metrics": [
      {
        "metric": "Terraform Resources",
        "value": "70+",
        "improvement": "Entire environment defined as code"
      },
      {
        "metric": "KMS Keys",
        "value": "4 customer-managed",
        "improvement": "90-day automatic rotation"
      },
      {
        "metric": "FastAPI Service",
        "value": "~2,200 lines",
        "improvement": "SQLAlchemy 2.0 + Pydantic validation"
      },
      {
        "metric": "Cloud Providers",
        "value": "AWS + GCP",
        "improvement": "Parallel stacks, shared module design"
      },
      {
        "metric": "Deployment",
        "value": "Golden image + ASG refresh",
        "improvement": "Fleet matches a versioned artifact"
      },
      {
        "metric": "Pipeline Gates",
        "value": "pytest + Newman",
        "improvement": "API suite runs before every apply"
      }
    ]
  },
  {
    "id": "eventease",
    "title": "EventEase: Event Booking Platform",
    "slug": "eventease",
    "links": [
      { "label": "GitHub", "url": "https://github.com/pavan-garlapati/EventEase-V1" }
    ],
    "technologies": [
      "React 18",
      "Bootstrap 5",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Bcrypt",
      "Docker",
      "Kubernetes",
      "AWS EC2",
      "Azure"
    ],
    "description": "A full-stack event management and ticket booking platform with JWT authentication and role-based access control across User, Organizer, and Admin roles, deployed as containerized microservices on both AWS and Azure.",
    "highlights": [
      "Full-Stack MERN",
      "Role-Based Access Control",
      "JWT Authentication",
      "Containerized Microservices",
      "Multi-Cloud Deployment"
    ],
    "problem": {
      "title": "The Problem",
      "description": "An event platform has three fundamentally different users sharing one dataset. Attendees browse and book, organizers create and manage their own events, and admins oversee everything. Getting that wrong is not a UI problem, it is an authorization problem: an organizer must not edit another organizer's event, and an attendee must not reach organizer endpoints by guessing a URL. The interesting work is enforcing those boundaries in the API rather than only hiding buttons in the frontend.",
      "existingSolutions": [
        "Hiding controls in the UI without enforcing roles server-side leaves every endpoint reachable by a direct request",
        "A single user type forces organizer tooling and attendee browsing into the same permission surface",
        "Session-based auth complicates horizontal scaling once the API runs as multiple containerized replicas",
        "Storing credentials without a proper hash makes a database read equivalent to a full account compromise"
      ]
    },
    "architecture": {
      "title": "Architecture",
      "description": "A React 18 single-page frontend consumes a REST API built on Node.js and Express, backed by MongoDB through Mongoose. Authentication is stateless via JWT with bcrypt-hashed credentials, and authorization middleware enforces the User, Organizer, and Admin boundary on every protected route. The services are containerized with Docker and orchestrated with Kubernetes across AWS EC2 and Azure.",
      "flow": [
        {
          "step": "React Frontend",
          "description": "A React 18 single-page application styled with Bootstrap 5, handling event browsing, filtering, and the booking flow. State for the authenticated session drives which views and controls are available, while the actual permission decision always belongs to the API.",
          "technologies": [
            "React 18",
            "Bootstrap 5",
            "REST client"
          ],
          "metrics": [
            "Event browsing and filtering",
            "Ticket booking flow",
            "Role-aware UI"
          ]
        },
        {
          "step": "Express REST API",
          "description": "Node.js and Express expose the REST endpoints the frontend consumes: event CRUD, search and filtering, and booking operations. Routes are grouped by resource with authentication and authorization applied as middleware, so a new endpoint inherits the protection of its route group rather than re-implementing checks.",
          "technologies": [
            "Node.js",
            "Express",
            "REST"
          ],
          "metrics": [
            "Resource-grouped routes",
            "Middleware-applied auth",
            "JSON API contract"
          ]
        },
        {
          "step": "JWT Authentication",
          "description": "Login issues a signed JWT carrying the user's identity and role, and passwords are stored as bcrypt hashes rather than recoverable values. Because the token is self-contained, any API replica can verify a request without shared session state, which is what makes running multiple containerized instances behind a load balancer straightforward.",
          "technologies": [
            "JWT",
            "Bcrypt",
            "Stateless auth"
          ],
          "metrics": [
            "Stateless token verification",
            "bcrypt-hashed credentials",
            "Role carried in claims"
          ]
        },
        {
          "step": "Role-Based Access Control",
          "description": "Three roles with distinct scopes: a User browses and books, an Organizer creates and manages their own events, and an Admin oversees the platform. Authorization middleware checks the role claim and, where relevant, ownership of the target resource, so the boundary is enforced server-side on every protected route instead of relying on the frontend to hide actions.",
          "technologies": [
            "Express middleware",
            "Role claims",
            "Ownership checks"
          ],
          "metrics": [
            "3 roles: User / Organizer / Admin",
            "Enforced server-side",
            "Ownership-scoped writes"
          ]
        },
        {
          "step": "MongoDB Data Layer",
          "description": "MongoDB with Mongoose models the events, users, and bookings. Mongoose schemas add structure and validation on top of a document store, which keeps event documents flexible (varying metadata per event type) while still rejecting malformed writes at the model layer.",
          "technologies": [
            "MongoDB",
            "Mongoose",
            "Schema validation"
          ],
          "metrics": [
            "Schema-validated documents",
            "Flexible event metadata",
            "Indexed lookups for filtering"
          ]
        },
        {
          "step": "Containerized Deployment",
          "description": "The services are packaged as Docker containers and orchestrated with Kubernetes, deployed across AWS EC2 and Azure. Containerizing the API and frontend separately means each scales and redeploys on its own, and running the same manifests on two providers keeps the deployment from depending on provider-specific glue.",
          "technologies": [
            "Docker",
            "Kubernetes",
            "AWS EC2",
            "Azure"
          ],
          "metrics": [
            "Independently scalable services",
            "Same manifests on two clouds",
            "Stateless replicas"
          ]
        }
      ],
      "diagram": "eventease"
    },
    "techDecisions": [
      {
        "decision": "Why JWT instead of server-side sessions?",
        "reasoning": "The deployment target was multiple containerized replicas behind a load balancer, and server-side sessions would have required either sticky routing or a shared session store, both of which add a stateful dependency to an otherwise stateless API. A signed JWT carries identity and role in the token itself, so any replica can verify a request independently. The tradeoff is that revoking a token before expiry needs deliberate handling rather than deleting a session row, which is the cost of buying horizontal scalability."
      },
      {
        "decision": "Why enforce roles in API middleware rather than in the frontend?",
        "reasoning": "The frontend decides what to show; it cannot decide what is allowed. Any endpoint is reachable with a direct HTTP request regardless of which buttons the UI renders, so role checks that live only in React are cosmetic. Putting authorization in Express middleware means the boundary is enforced at the one place every request must pass, and grouping routes by resource lets a new endpoint inherit the protection of its group instead of depending on someone remembering to add a check."
      },
      {
        "decision": "Why MongoDB with Mongoose rather than a relational database?",
        "reasoning": "Event documents vary in shape: different event types carry different metadata, and forcing that into a fixed relational schema means either sparse columns or a join-heavy attribute table. A document store fits the data naturally. Mongoose then adds back the part a bare document store lacks, which is structure: schemas validate writes at the model layer so flexibility does not become a licence for malformed documents. The relationships here (bookings referencing events and users) are shallow enough that losing relational joins was not a meaningful constraint."
      },
      {
        "decision": "Why bcrypt for password storage?",
        "reasoning": "Bcrypt is deliberately slow and salted per password, which is exactly what a credential hash needs to be. A fast general-purpose hash like SHA-256 lets an attacker with a stolen database test billions of candidates cheaply, and an unsalted hash makes precomputed tables viable across accounts. Bcrypt's tunable work factor means the cost of verifying one login stays negligible while the cost of a large offline attack stays high."
      },
      {
        "decision": "Why Docker and Kubernetes for a project this size?",
        "reasoning": "Containerizing forced the services to be genuinely stateless and configuration-driven, which is what made the JWT decision pay off and what allowed the same artifacts to run on both AWS and Azure without provider-specific changes. Kubernetes is more orchestration than a small platform strictly needs, and the reason to use it here was that the deployment target was two different clouds: declarative manifests describe the desired state once rather than being reimplemented per provider."
      }
    ],
    "metrics": [
      {
        "metric": "Access Control Roles",
        "value": "3 roles",
        "improvement": "User / Organizer / Admin, enforced server-side"
      },
      {
        "metric": "Authentication",
        "value": "Stateless JWT",
        "improvement": "Any replica verifies without shared state"
      },
      {
        "metric": "Credential Storage",
        "value": "bcrypt hashed",
        "improvement": "Salted, tunable work factor"
      },
      {
        "metric": "Deployment Targets",
        "value": "AWS EC2 + Azure",
        "improvement": "Same containers and manifests on both"
      }
    ]
  },
  {
    "id": "medfind",
    "title": "MedFind: Federated Medical Imaging Search Network",
    "slug": "medfind",
    "links": [
      { "label": "GitHub", "url": "https://github.com/pjsk02/TOA-HealthHack-MedFind" }
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "JWT (HS256)",
      "k-anonymity",
      "httpx (async)",
      "Role-based access control"
    ],
    "description": "A federated search network that lets three independent hospital nodes answer medical imaging queries without pooling patient data, built at the Red Hat-sponsored TOA Health Hack where it took 1st place. My individual contribution was the gateway-level privacy module: k-anonymity suppression and role-based aggregation that prevent re-identification across nodes.",
    "context": "Built at TOA Health Hack, a Red Hat-sponsored healthcare hackathon, where the project won 1st place. This was a team project. The gateway-level privacy module (k-anonymity suppression and role-based aggregation) was my individual contribution; the broader distributed search gateway spanning three hospital nodes was a team effort.",
    "highlights": [
      "1st Place, TOA Health Hack",
      "Gateway-Level Privacy Module",
      "k-Anonymity Suppression (k=5)",
      "Role-Based Aggregation",
      "Federated Across 3 Nodes",
      "Async Inter-Node Search"
    ],
    "problem": {
      "title": "The Problem",
      "description": "Hospitals hold imaging data that is far more useful in aggregate than in isolation, and they cannot legally or ethically pool it. Federated search is the obvious answer: query each institution in place and combine the answers. The hard part is that aggregate results are not automatically anonymous. A count small enough to describe a single patient re-identifies them, and a researcher who can query across three nodes can triangulate with a series of narrow queries that each look harmless on their own.",
      "existingSolutions": [
        "Centralising imaging data into one warehouse is the approach federation exists specifically to avoid",
        "Returning raw aggregate counts leaks identity whenever a cohort is small enough to describe one person",
        "Per-node access control alone does not stop cross-node triangulation, because each node only sees its own slice of the query pattern",
        "Enforcing privacy inside each hospital node separately means the guarantee is only as strong as the least carefully configured node"
      ]
    },
    "architecture": {
      "title": "Architecture",
      "description": "A FastAPI gateway fans a single query out to three independent hospital nodes over async httpx, then passes every response through a privacy layer before anything reaches the caller. JWT (HS256) carries identity and role, and the gateway applies k-anonymity suppression and role-based aggregation so results are scoped and de-identified at the boundary rather than trusted from the nodes. The privacy module was my individual contribution; the surrounding distributed gateway was a team effort.",
      "flow": [
        {
          "step": "Distributed Search Gateway",
          "description": "A single FastAPI gateway accepts a query and fans it out to three independent hospital nodes using async httpx, so the round trip is bounded by the slowest node rather than their sum. Each node searches its own data in place and returns only aggregates. This layer was built collaboratively as a team; I contributed to the gateway and inter-node communication design.",
          "technologies": [
            "FastAPI",
            "httpx (async)",
            "Federated fan-out"
          ],
          "metrics": [
            "3 independent hospital nodes",
            "Concurrent async fan-out",
            "No raw data leaves a node"
          ]
        },
        {
          "step": "Authentication and Identity",
          "description": "JWT signed with HS256 carries the caller's identity and role through the gateway to every downstream request. Because the role travels with the token, the privacy layer and the nodes evaluate the same claim rather than inferring permission from network position or a separate lookup.",
          "technologies": [
            "JWT (HS256)",
            "FastAPI dependencies"
          ],
          "metrics": [
            "Signed role claims",
            "Identity propagated to nodes",
            "Single source of permission truth"
          ]
        },
        {
          "step": "k-Anonymity Suppression (my contribution)",
          "description": "The privacy module I implemented enforces k-anonymity with k=5 at the gateway: any result group describing fewer than five individuals is suppressed rather than returned. This is what stops re-identification across federated nodes, because the attack is not reading one record, it is narrowing a query until the aggregate describes exactly one person. Suppressing below the threshold makes that narrowing return nothing instead of an answer.",
          "technologies": [
            "k-anonymity",
            "Suppression thresholds",
            "Python"
          ],
          "metrics": [
            "k = 5 threshold",
            "Small groups suppressed, not rounded",
            "Applied before any response leaves the gateway"
          ]
        },
        {
          "step": "Role-Based Aggregation (my contribution)",
          "description": "Also part of the privacy module: role-based access control paired with role-based aggregation, so the granularity of a result depends on the caller's role and each hospital node's visibility is limited to its own authorized scope. A caller does not simply get fewer rows, they get results aggregated at a coarser level, which keeps the boundary meaningful rather than something a differently-shaped query can work around.",
          "technologies": [
            "RBAC",
            "Role-based aggregation",
            "Scope enforcement"
          ],
          "metrics": [
            "Granularity scoped by role",
            "Per-node visibility limited to own scope",
            "Coarser aggregation, not just filtered rows"
          ]
        },
        {
          "step": "Gateway-Level Enforcement",
          "description": "Both privacy mechanisms run at the gateway, on the merged response, rather than inside each node. That placement is the design point: a node can only reason about its own slice, so per-node enforcement cannot see the cross-node combination that actually enables triangulation. Enforcing at the single point where all three responses meet makes the guarantee hold for the network, not just per institution.",
          "technologies": [
            "FastAPI middleware",
            "Response post-processing"
          ],
          "metrics": [
            "One enforcement point",
            "Covers cross-node combination",
            "Guarantee independent of node config"
          ]
        }
      ],
      "diagram": "medfind"
    },
    "techDecisions": [
      {
        "decision": "Why enforce k-anonymity at the gateway instead of inside each hospital node?",
        "reasoning": "A node can only apply a threshold to its own slice of the answer. Three nodes each returning a legally-sized group can still combine into something that describes a single patient, and no individual node has the information to notice. The gateway is the one place the full merged result exists, so it is the only place a network-wide guarantee can actually be enforced. It also means the privacy property does not depend on every institution configuring its node correctly, which matters when nodes are independently operated."
      },
      {
        "decision": "Why k=5 as the suppression threshold?",
        "reasoning": "k-anonymity guarantees that any returned group is indistinguishable among at least k individuals, so k directly sets how small a cohort a query can resolve. k=5 is a standard threshold in health data release practice: large enough that a returned aggregate cannot be pinned to one person even with outside knowledge, small enough that genuine research queries still return useful results. A lower k makes narrow queries re-identifying, and a much higher k suppresses so aggressively that the federated search stops answering real questions."
      },
      {
        "decision": "Why suppress small groups rather than round or perturb the counts?",
        "reasoning": "Rounding a count of one to zero or five still tells the caller a matching record exists, and noise added independently per query can be averaged away by repeating similar queries. Suppression removes the group from the response entirely, so a narrowing attack gets an absence of data rather than a noisy signal to triangulate against. For this threat model, where the adversary is a legitimate authenticated user issuing many narrow queries, withholding is the honest primitive: a perturbed answer is still an answer."
      },
      {
        "decision": "Why role-based aggregation rather than only role-based filtering?",
        "reasoning": "Filtering rows by role controls what a caller sees but not what they can infer. A caller restricted to a subset of records can still combine permitted narrow queries to reconstruct detail they were never meant to reach. Tying aggregation granularity to role means a lower-privilege caller receives genuinely coarser results, so the detail simply is not present in the response to be recombined. Pairing it with per-node scope limits keeps each hospital's visibility to its own authorized data at the same time."
      },
      {
        "decision": "Why async httpx for inter-node communication?",
        "reasoning": "A federated query is three independent network calls whose latency is dominated by waiting. Issuing them concurrently with async httpx bounds the response time by the slowest node instead of the sum of all three, which is the difference between a usable search and one that gets slower with every institution that joins. It also fits FastAPI's async model directly, so the gateway is not blocking an event loop thread per outstanding node request. This was part of the team-built gateway layer."
      }
    ],
    "metrics": [
      {
        "metric": "Hackathon Result",
        "value": "1st place",
        "improvement": "Red Hat-sponsored TOA Health Hack"
      },
      {
        "metric": "Anonymity Threshold",
        "value": "k = 5",
        "improvement": "Groups below threshold suppressed entirely"
      },
      {
        "metric": "Federated Nodes",
        "value": "3 hospitals",
        "improvement": "Searched in place, no data pooling"
      },
      {
        "metric": "Enforcement Point",
        "value": "Gateway-level",
        "improvement": "Covers cross-node re-identification"
      },
      {
        "metric": "Authentication",
        "value": "JWT HS256",
        "improvement": "Signed role claims propagated to nodes"
      }
    ]
  }
]

export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug)
}
