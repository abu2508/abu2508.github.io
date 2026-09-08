/* ==========================================================================
   ABDULLAH B — 12-STAGE TECHNICAL CASE STUDY MODAL DRAWER
   ========================================================================== */

const CASE_STUDIES_SPEC_DATA = {
  "kt-onboarding": {
    title: "Knowledge Transfer & Onboarding Platform",
    category: "RAG / MULTI-TENANCY / ENTERPRISE AI",
    summary: "A multi-tenant GenAI platform for enterprise knowledge transfer, combining RAG-based assistance, role-specific learning workflows, automated assessments, and document consistency checks.",
    stack: ["AWS Bedrock", "ChromaDB", "FastAPI", "AWS Transcribe", "Python", "React"],
    sections: {
      context: "In an enterprise aviation IT service desk environment, team onboarding requires mastering hundreds of operational runbooks, client SLAs, and software escalation workflows across multi-country operations.",
      problem: "Traditional onboarding relied on manual job shadowing and unstructured document reading. Senior agents spent 30%+ of working hours answering basic workflow questions, while outdated documentation created compliance risks.",
      constraints: "Multi-tenant strict data isolation across client teams, zero cross-team document leaks, support for audio/video meeting transcripts alongside PDF/DOCX manuals, low latency during live operational shifts.",
      role: "Lead AI/ML Engineer. Architected the multi-tenant RAG pipeline, vector storage partitioning in ChromaDB, persona-specific system prompts, and automated document conflict verification logic.",
      thinking: "Decoupled raw document ingestion from persona consumption. Built dedicated persona views: Manager (analytics & quiz management), Senior Agent (content validation), and New Hire (guided learning co-pilot).",
      architecture: "Document Ingestion (Multi-format & AWS Transcribe) → Tenant-Tagged Chunking → ChromaDB Multi-Tenant Vector Store → Persona-Aware RAG Engine (FastAPI) → AWS Bedrock Claude → Citation & Contradiction Resolver → React UI.",
      ragFlow: "Ingestion: Multi-format parsing + AWS Transcribe for audio onboarding sessions. Chunking: 512-token chunks with tenant_id, persona_access, and source metadata. Retrieval: Hybrid dense vector search filtered by tenant namespace. Validation: Automated cross-chunk contradiction scoring before generation. Generation: Persona-constrained system prompts delivering step-by-step guidance with exact document citations.",
      solution: "Engineered an end-to-end multi-tenant AI platform providing new hires with an intelligent Q&A co-pilot, auto-generating verification quizzes from newly uploaded operational manuals, and alerting senior agents to contradictory instructions between legacy and updated runbooks.",
      responsibleAi: "Deterministic document citation pointers on every answer; conflict detection engine flags contradictory statements between policy documents instead of hallucination; strict tenant data isolation enforced at the vector query layer.",
      outcome: "Accelerated new hire onboarding, dramatically reduced repetitive query load on senior agents, and identified 40+ contradictory procedures in enterprise operational documentation.",
      learned: "Security in enterprise RAG must be enforced at the vector storage index level via tenant namespace isolation, not relying solely on LLM prompt instructions.",
      nextSteps: "Integrating GraphRAG to model multi-hop policy dependencies across departmental operations."
    }
  },
  "it-support-chatbot": {
    title: "Multi-Tenant IT Support AI Accelerator",
    category: "BEDROCK AGENTCORE / MCP / SERVICE AUTOMATION",
    summary: "An enterprise AI accelerator platform for IT support desk automation, leveraging AWS Bedrock AgentCore and Model Context Protocol (MCP) for ServiceNow ticket resolution.",
    stack: ["Bedrock AgentCore", "OpenSearch", "MCP Protocol", "Titan Embeddings v2", "ServiceNow", "FastAPI"],
    sections: {
      context: "Enterprise IT support desks process thousands of recurring incident tickets daily, ranging from password resets and VPN configurations to application access requests.",
      problem: "Initial support chatbots were built as single-tenant scripts tied to specific teams, creating massive codebase duplication and high maintenance overhead when expanding to new departments.",
      constraints: "Must interface directly with ServiceNow ITSM via strict API rules, support multi-tenant team configurations without codebase changes, and maintain sub-second response times.",
      role: "AI Solution Architect & Engineer. Redesigned standalone chatbot into an enterprise multi-tenant accelerator framework using AWS Bedrock AgentCore and standardizing tool invocation via MCP.",
      thinking: "Extracted all IT service actions into standardized Model Context Protocol (MCP) servers. Abstracted tenant configuration into metadata schemas so new teams onboard via configuration rather than custom code.",
      architecture: "ServiceNow Trigger / Chat UI → Multi-Tenant Router → AWS Bedrock AgentCore → OpenSearch Vector Store (Titan Embeddings v2) → MCP Tool Server (ServiceNow / Active Directory) → Automated Resolution.",
      ragFlow: "Knowledge Base items indexed in OpenSearch with Titan Embeddings v2. Bedrock AgentCore orchestrates multi-step plan: (1) Retrieve relevant KB article, (2) Validate user credentials, (3) Invoke MCP tool for automated resolution or ticket escalation.",
      solution: "Delivered a multi-tenant AI accelerator platform that allows any enterprise IT team to deploy a specialized support agent in hours by registering their KB articles and configuring pre-built MCP tools.",
      responsibleAi: "Human-in-the-loop safeguards: high-impact operations (e.g. system reboots, permission changes) require explicit manager approval via ServiceNow workflow before MCP tool execution.",
      outcome: "Reduced per-team agent deployment time from 3 weeks to 2 hours; automated routine tier-1 ticket resolution across multiple departments.",
      learned: "Model Context Protocol (MCP) provides an essential abstraction layer that prevents LLM agent code from becoming tightly coupled to specific enterprise API implementations.",
      nextSteps: "Implementing semantic caching for common IT support queries to optimize token utilization."
    }
  },
  "cv-sorting": {
    title: "LLM-Assisted Candidate Screening",
    category: "RESPONSIBLE AI / HYBRID EVALUATION / DETERMINISTIC GATING",
    summary: "A hybrid candidate ranking system combining deterministic requirement gating, local embeddings, and LLM reasoning to evaluate candidates without black-box opacity or numeric blindness.",
    stack: ["Groq (Llama 8B / GPT-OSS 120B)", "Sentence-Transformers", "Python", "FastAPI", "React"],
    sections: {
      context: "IIT Kharagpur AI4ICPS HAAI++ Capstone Project addressing recruiter efficiency and ATS limitations.",
      problem: "Keyword-matching ATS systems miss qualified candidates with equivalent experience phrasing, while single-call LLM screeners suffer from 'numeric blindness' (overriding a 5-year requirement based on general resume tone) and black-box opacity.",
      constraints: "Free-tier Groq API rate limits, strict machine-verifiable requirement enforcement, PII-redacted LLM reasoning, 100% reproducible aggregation formula.",
      role: "Project Architect & Engineer. Designed hybrid scoring architecture, date-based experience calculation engine, PII redaction layer, and lexical evidence verification check.",
      thinking: "Established core engineering principle: 'Use deterministic rules where determinism is possible. Use LLM reasoning where reasoning adds value.' Eligibility must be a gate (pass/fail/unknown), not a weighted score, ensuring hard requirements can never be overridden by a high 'vibe' score.",
      architecture: "Resume + JD → Groq Llama 8B Extraction → [Parallel: Local Sentence-Transformers Embedding & Deterministic Python Eligibility Gate] → Groq GPT-OSS 120B PII-Redacted Reasoning → Fixed Weighted Aggregator → Ranked Shortlist + Ineligible List + Evidence Ledger.",
      ragFlow: "Extraction: Date-based career experience computed deterministically (latest end date - earliest start date from parsed dates). Eligibility Gate: 4 checks (Experience, Certifications, Must-Have Skills, Education) resolving to pass/fail/unknown. Embedding: Local all-MiniLM-L6-v2 cosine similarity (0-100). Reasoning: Groq gpt-oss-120b (PII redacted) evaluating 4 sub-dimensions + 1-sentence evidence string per dimension. Aggregator: final_score = (embedding * 0.25) + (eligibility * 0.30) + (llm * 0.45) for eligible candidates.",
      solution: "Engineered a candidate ranking platform providing recruiters with transparent, evidence-backed decision support while excluding candidates who fail hard requirements to a separate, fully-explained ineligible list.",
      responsibleAi: "Deterministic eligibility gating prevents LLM override; PII redaction (name/contact removed) for the reasoning call; lexical evidence verification (evidence_verified flag); explicit recruiter decision-support framing.",
      outcome: "Proved in controlled evaluations that hard requirement failures (e.g. 3 yrs vs 5 yrs required) are caught 100% reliably by the eligibility gate while ungated LLM scoring frequently fails on numeric thresholds.",
      learned: "Constraining LLM judgment to qualitative fit while leaving factual verification to deterministic code eliminates the primary source of hallucination in enterprise screening.",
      nextSteps: "Adding an entity normalization vocabulary for skills and certifications; enabling local Ollama inference swap for complete data privacy."
    }
  },
  "patch-orchestration": {
    title: "AI-Powered Patch Orchestration",
    category: "SERVERLESS AUTOMATION / INFRASTRUCTURE AI",
    summary: "A serverless automation platform orchestrating Linux/Windows fleet patching across Ansible and SCCM, featuring automated pre-checks, state tracking, and PagerDuty escalation.",
    stack: ["AWS Lambda", "AWS Step Functions", "DynamoDB", "PagerDuty", "Ansible", "Python"],
    sections: {
      context: "Enterprise IT infrastructure managing hundreds of on-premise Linux and Windows servers requiring monthly security vulnerability patching.",
      problem: "Patch deployment was manually orchestrated across Ansible Automation Platform and SCCM scripts, resulting in manual tracking errors, extended maintenance windows, and delayed incident escalation.",
      constraints: "High operational reliability, zero unvetted server reboots, strict audit logging of patch status, seamless integration with PagerDuty for failed pre-checks.",
      role: "Lead Systems Engineer. Designed full serverless High-Level Architecture (HLD) and built an interactive clickable prototype.",
      thinking: "Modeled server patching as a deterministic state machine using AWS Step Functions, ensuring every server transition (pre-check, patch download, installation, post-check, reboot) is explicitly governed and logged.",
      architecture: "Maintenance Event Webhook → AWS Step Functions Orchestrator → AWS Lambda Pre-Check → Ansible / SCCM Execution → Post-Check Verification → DynamoDB State Store → PagerDuty Alerting.",
      solution: "Created a serverless patch orchestration architecture that automates fleet patching schedules, runs health pre-checks, executes patch scripts via Ansible, verifies service status, and triggers PagerDuty alerts on anomalies.",
      responsibleAi: "Deterministic execution state machine guarantees no unauthorized reboot occurs without passing automated health checks and manual approval gates for production critical servers.",
      outcome: "Delivered architectural HLD and interactive prototype that eliminates manual patching coordination overhead and provides complete compliance audit trails.",
      learned: "Infrastructure automation requires zero-ambiguity state machines where fallback paths and emergency rollbacks are designed before happy-path automation.",
      nextSteps: "Integrating LLM log analysis to automatically diagnose post-patch service startup failures."
    }
  },
  "incident-management": {
    title: "Major Incident Management Assistant",
    category: "ARCHITECTURE REFACTORING / FEDERATED SYSTEMS",
    summary: "A federated AI assistant for major incident response, refactored to decouple infrastructure dependency graph traversal from LLM reasoning, achieving a ~46% codebase reduction.",
    stack: ["AWS Bedrock Claude 3.5", "FAISS", "FastAPI", "React", "Python"],
    sections: {
      context: "Enterprise IT service desk handling critical P1/P2 major incidents across complex multi-service application landscapes.",
      problem: "Monolithic AI assistant attempted to handle both infrastructure dependency graph traversal and incident root-cause reasoning in a single codebase, causing slow response times, high token costs, and fragile maintainability.",
      constraints: "Sub-second incident triage latency, high accuracy in service dependency mapping, strict token cost budget.",
      role: "AI/ML Engineer. Led the architectural refactoring of the monolithic assistant into a decoupled, federated architecture.",
      thinking: "Recognized that graph dependency traversal is a deterministic database lookup, not an LLM reasoning problem. Separated dependency resolution from AI reasoning.",
      architecture: "Incident Alert → Deterministic Dependency Graph Service → FAISS Vector Search → AWS Bedrock Claude 3.5 Reasoning → FastAPI Backend → React Dashboard.",
      solution: "Decoupled the architecture: a fast deterministic service maps application-to-infrastructure dependencies first, passing only the relevant graph subset to Claude 3.5 for contextual root-cause synthesis.",
      responsibleAi: "Separating deterministic graph data from LLM reasoning prevents the model from hallucinating non-existent infrastructure dependencies during critical major incidents.",
      outcome: "Achieved a ~46% reduction in codebase size, reduced LLM token costs per incident, and improved incident triage response speeds.",
      learned: "Do not overload the LLM context window with raw structural data that can be queried deterministically at zero token cost.",
      nextSteps: "Automating post-mortem report draft generation linked directly to ServiceNow incident timelines."
    }
  },
  "atics": {
    title: "ATICS — Document Verification Engine",
    category: "TRUST ARCHITECTURE / RESPONSIBLE AI / HACKATHON RECOGNITION",
    summary: "A trust-by-construction document verification platform combining LLM claim extraction with SQL database cross-validation and authority-tier conflict resolution.",
    stack: ["RAG", "SQL Validation", "LLM Reasoning", "Python", "React"],
    sections: {
      context: "TCS AI Fridays Chennai Regional Round hackathon project addressing enterprise document compliance and factual verification.",
      problem: "Unstructured enterprise contracts, compliance filings, and technical specifications frequently contain internal contradictions or outdated factual claims that lead to costly legal and operational risks.",
      constraints: "Real-time document verification, multi-tier document authority hierarchy, zero unverified claim approvals.",
      role: "AI Developer & Team Lead. Architected the trust-by-construction verification framework, SQL cross-validation rules, and approval workflow dashboard.",
      thinking: "Formulated 'Trust-by-Construction': No extracted claim is presented as verified unless it has a matching, verifiable data pointer from an authoritative database or RAG store.",
      architecture: "Document Input → LLM Claim Extractor → SQL Database Cross-Check & RAG Search → Authority-Tier Conflict Engine → Approval Workflow Dashboard.",
      solution: "Built ATICS, a platform that parses enterprise documents, extracts factual claims, cross-references them against authoritative SQL databases and RAG stores, resolves conflicts based on document authority tiers, and presents reviewers with a clear verification ledger.",
      responsibleAi: "Trust-by-construction model: Every verified claim displays its exact SQL or RAG source citation; conflicting claims trigger explicit authority-tier alerts for human reviewer resolution.",
      outcome: "Recognized at the TCS AI Fridays Chennai regional round for innovation in Responsible AI architecture and enterprise verification.",
      learned: "Combining structured SQL database checks with unstructured RAG retrieval provides a far stronger verification foundation than relying on RAG alone.",
      nextSteps: "Expanding ATICS to perform automated semantic legal clause alignment across contract revisions."
    }
  }
};

let lastActiveElement = null;

function openCaseStudyModal(projectId) {
  const project = CASE_STUDIES_SPEC_DATA[projectId];
  if (!project) return;

  lastActiveElement = document.activeElement;

  const modalOverlay = document.getElementById("caseStudyModal");
  const modalBody = document.getElementById("modalContentArea");
  const appContent = document.getElementById("app-content");

  let stackChipsHtml = project.stack.map(s => `<span class="tech-badge-chip">${s}</span>`).join(" ");

  modalBody.innerHTML = `
    <div style="margin-bottom:32px;">
      <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-blue-soft); text-transform:uppercase; margin-bottom:8px;">${project.category}</div>
      <h2 id="modalTitle" style="font-family:var(--font-display); font-size:2.1rem; font-weight:800; color:var(--text-primary); line-height:1.2;">${project.title}</h2>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:16px;">${stackChipsHtml}</div>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">01 — CONTEXT</div>
      <h3 class="modal-section-heading">Why did this system need to exist?</h3>
      <p class="modal-section-body">${project.sections.context}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">02 — PROBLEM</div>
      <h3 class="modal-section-heading">What problem was being solved?</h3>
      <p class="modal-section-body">${project.sections.problem}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">03 — CONSTRAINTS</div>
      <h3 class="modal-section-heading">What constraints existed?</h3>
      <p class="modal-section-body">${project.sections.constraints}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">04 — MY ROLE</div>
      <h3 class="modal-section-heading">Contribution & Ownership</h3>
      <p class="modal-section-body">${project.sections.role}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">05 — THINKING</div>
      <h3 class="modal-section-heading">Architectural Decisions</h3>
      <p class="modal-section-body">${project.sections.thinking}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">06 — ARCHITECTURE</div>
      <h3 class="modal-section-heading">System Design Blueprint</h3>
      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); padding:16px; border-radius:8px; font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-blue-soft); white-space:pre-wrap;">${project.sections.architecture}</div>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">07 — AI / RAG FLOW</div>
      <h3 class="modal-section-heading">Ingestion, Retrieval, Generation & Validation</h3>
      <p class="modal-section-body">${project.sections.ragFlow}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">08 — SOLUTION</div>
      <h3 class="modal-section-heading">What was built</h3>
      <p class="modal-section-body">${project.sections.solution}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">09 — RESPONSIBLE AI</div>
      <h3 class="modal-section-heading">Safety, Transparency & Human Decision Support</h3>
      <p class="modal-section-body">${project.sections.responsibleAi}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">10 — OUTCOME</div>
      <h3 class="modal-section-heading">Verified System Outcomes</h3>
      <p class="modal-section-body">${project.sections.outcome}</p>
    </div>

    <div class="modal-section-block">
      <div class="modal-section-num">11 — WHAT I LEARNED</div>
      <h3 class="modal-section-heading">Engineering Insights</h3>
      <p class="modal-section-body">${project.sections.learned}</p>
    </div>

    <div class="modal-section-block" style="border-bottom:none;">
      <div class="modal-section-num">12 — NEXT STEPS</div>
      <h3 class="modal-section-heading">Future Directions (Proposed)</h3>
      <p class="modal-section-body">${project.sections.nextSteps}</p>
    </div>
  `;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  if (appContent) appContent.setAttribute("aria-hidden", "true");

  const closeBtn = document.getElementById("modalCloseBtn");
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 60);
  }
}

function closeCaseStudyModal() {
  const modalOverlay = document.getElementById("caseStudyModal");
  const appContent = document.getElementById("app-content");

  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    if (appContent) appContent.removeAttribute("aria-hidden");

    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
      lastActiveElement = null;
    }
  }
}

function initModalEvents() {
  const modalOverlay = document.getElementById("caseStudyModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeCaseStudyModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeCaseStudyModal();
    });

    // Keyboard Focus Trap & Escape Handler
    modalOverlay.addEventListener("keydown", (e) => {
      if (!modalOverlay.classList.contains("active")) return;

      if (e.key === "Escape") {
        closeCaseStudyModal();
        return;
      }

      if (e.key === "Tab") {
        const focusables = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalEvents);
} else {
  initModalEvents();
}
