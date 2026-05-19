const API_BASE = "http://localhost:8765";
const DEMO_LEAK = "Incident note: temporary key GSK_live_91f4b8ab73a2f23de0c871e921 was pasted during hotfix.";

const state = {
  analyzed: false,
  apiConnected: false,
  pitchIndex: 0,
  before: {
    score: 42,
    posture: "Moderate",
    summary: "Fragmented early signals detected across migration readiness, support, and release coordination.",
    metrics: [54, 31, 47, 18],
    signals: [
      ["Migration readiness", "No blockers reported; observability still catching up.", "Moderate"],
      ["Release coordination", "Rollback notes exist but ownership is not stress-tested.", "Moderate"],
      ["Customer operations", "Two onboarding complaints tagged to migration.", "Low"]
    ]
  },
  after: {
    score: 86,
    posture: "Critical",
    summary: "Cross-source analysis shows migration-driven coordination drift, customer escalation, delivery delay, and contained credential exposure.",
    metrics: [89, 84, 92, 96],
    signals: [
      ["Coordination breakdown", "Rollback ownership split between platform and app teams.", "Critical"],
      ["Customer escalation spike", "SLA, refund, service credit, and churn indicators detected.", "Critical"],
      ["Delivery delay", "Release train slipped while reopened defects blocked QA certification.", "High"],
      ["Security exposure", "Credential-like token blocked before outbound AI processing.", "Critical"]
    ]
  }
};

let files = [
  ["slack_logs.jsonl", "Slack export", "15 records", "coordination breakdown, credential leak"],
  ["jira_tickets.csv", "Jira export", "12 records", "blocked dependencies, reopened bugs"],
  ["support_tickets.csv", "Support export", "9 records", "SLA risk, refund requests, churn risk"],
  ["incident_reports.md", "Incident reports", "2 reports", "rollback failure, residual risk"],
  ["timeline_events.json", "Timeline events", "8 events", "causal sequence"],
  ["security_events.json", "Governance events", "3 events", "blocked payload, audit log"]
];

let timeline = [
  ["Apr 28 09:12", "low", "Migration readiness green", "Platform reports no blockers, with observability still catching up."],
  ["May 01 09:52", "critical", "Queue latency spike after cutover", "eu-west queues degrade after migration flag rollout."],
  ["May 01 10:33", "high", "Rollback ownership unclear", "Platform and app teams disagree on migration rollback settings."],
  ["May 01 11:34", "critical", "Credential posted in incident room", "Temporary payment retry service key appears in Slack incident channel."],
  ["May 02 07:40", "critical", "Enterprise onboarding SLA breach", "Three enterprise customers exceed onboarding SLA commitments."],
  ["May 02 16:48", "high", "Critical defect reopened", "Retry patch conflict resurfaces when migration flag is active."],
  ["May 03 09:22", "high", "COO requests single owner", "Leadership cannot determine whether customer impact is stabilizing."],
  ["May 04 08:09", "high", "Release train slips", "Three dependencies remain blocked and QA cannot certify release."]
];

let pipeline = [
  ["Parse operational sources", "Slack, Jira, support tickets, incidents, and timeline records normalized."],
  ["Run security filter", "Credential-like token intercepted and sanitized before model boundary."],
  ["Recursive DSPy summarization", "Source chunks reduced into intermediate risk summaries."],
  ["Gemini executive intelligence", "Root cause, business impact, and recommended actions generated."],
  ["Publish governance audit", "Blocked payload and sanitization events logged for review."]
];

let auditEvents = [
  ["SEC-001", "Credential-like token removed before outbound AI processing.", "blocked_and_sanitized"],
  ["SEC-002", "Security engineer acknowledged exposed credential and requested rotation.", "logged"],
  ["SEC-003", "Customer account names tokenized for aggregate model analysis.", "tokenized"]
];

let recommendations = [
  "Assign a single migration incident commander for the next 72 hours.",
  "Freeze non-critical deployments until rollback ownership is explicit.",
  "Create a shared customer-impact room with platform, app, release, and support leads.",
  "Rotate the exposed credential and audit payment retry service access logs.",
  "Send proactive remediation timelines to affected enterprise customers."
];

let evidenceRecords = [
  {
    id: "coordination-breakdown",
    risk_name: "Coordination breakdown",
    confidence: 0.94,
    severity: "critical",
    timeline_correlation: "Rollback ownership became unclear shortly after queue latency spiked.",
    why: "Platform and application teams disagreed on rollback ownership while release management lacked a current runbook.",
    recommended_action: "Assign a single migration incident commander and publish explicit rollback ownership.",
    evidence: [
      {
        source: "slack_logs.jsonl",
        timestamp: "2026-05-01T10:33:00Z",
        quote: "Rollback owner unclear. Platform says app owns config. App says platform owns queue settings."
      }
    ]
  }
];

let executiveBrief = {
  confidence: 0.91,
  headline: "Infrastructure migration triggered coordination drift, customer escalation, and security exposure.",
  summary: "NovaTech's infrastructure migration appears to have created a coordination breakdown between platform engineering, application teams, release management, and customer operations.",
  rootCause: "The migration shifted ownership boundaries faster than NovaTech's operating model could absorb.",
  whatChanged: [
    "Operational state moved from normal migration readiness to SEV-1 service degradation within one business day.",
    "Customer signals shifted from isolated onboarding complaints to SLA, refund, service credit, and churn indicators.",
    "Delivery signals shifted from planned release coordination to blocked QA certification and slipped release train.",
    "Incident pressure created a security boundary event when a credential-like token appeared in Slack."
  ],
  decisionBrief: {
    primary_decision: "Treat the migration as an active business-risk incident, not only an engineering defect.",
    next_72_hours: "Centralize incident command, freeze non-critical deployments, rotate the exposed credential, and send proactive remediation timelines to affected enterprise customers.",
    owner_recommendation: "COO-owned customer-impact command with platform, application, release, support, and security leads."
  },
  detectedRisks: []
};

const pitchScenes = [
  {
    view: "dashboard",
    title: "Calm Overview",
    copy: "NovaTech looks stable at the executive layer, but early signals are scattered across operational systems.",
    analyzed: false
  },
  {
    view: "upload",
    title: "Secure Upload",
    copy: "Operational data is staged for analysis, but sensitive content is filtered before any model boundary.",
    analyzed: false
  },
  {
    view: "dashboard",
    title: "Risk Escalation",
    copy: "GhostShift connects the migration, rollback confusion, delivery delay, and customer escalation into one critical pattern.",
    analyzed: true
  },
  {
    view: "governance",
    title: "Security Interception",
    copy: "A credential-like token is blocked and sanitized before outbound AI processing.",
    analyzed: true
  },
  {
    view: "intelligence",
    title: "Executive Brief",
    copy: "Gemini turns the structured risk signals into a boardroom-ready root cause and action plan.",
    analyzed: true
  }
];

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response.json();
}

function formatTime(isoTimestamp) {
  const date = new Date(isoTimestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function severityLabel(severity) {
  if (!severity) return "Moderate";
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function selectView(viewId) {
  const button = document.querySelector(`[data-view="${viewId}"]`);
  if (!button) return;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  button.classList.add("active");
  document.getElementById(viewId).classList.add("active");
}

function applyApiData({ manifest, overview, timelineEvents, securityEvents, insights, evidence }) {
  state.apiConnected = true;
  files = manifest.files.map((file) => [
    file.path,
    file.source,
    `${file.records} records`,
    file.primary_signals.join(", ")
  ]);

  state.after.score = overview.risk_score;
  state.after.posture = severityLabel(overview.risk_posture);
  state.after.summary = overview.headline;
  state.after.signals = overview.detected_risks.map((risk) => [
    risk.name,
    risk.evidence,
    severityLabel(risk.severity)
  ]);

  timeline = timelineEvents.map((event) => [
    formatTime(event.timestamp),
    event.severity,
    event.title,
    event.description
  ]);

  auditEvents = securityEvents.map((event) => [
    event.id,
    event.governance_note,
    event.action
  ]);

  recommendations = insights.recommended_actions;
  evidenceRecords = evidence;
  executiveBrief = {
    confidence: insights.confidence,
    headline: insights.headline,
    summary: insights.executive_summary,
    rootCause: insights.root_cause,
    whatChanged: insights.what_changed,
    decisionBrief: insights.decision_brief,
    detectedRisks: insights.detected_risks
  };
  document.querySelector("#governance .panel-header .status-pill").textContent = `${securityEvents.length} events`;
}

async function loadApiData() {
  try {
    const [manifest, overview, timelineEvents, securityEvents, insights, evidence] = await Promise.all([
      fetchJson("/api/demo/manifest"),
      fetchJson("/api/demo/overview"),
      fetchJson("/api/demo/timeline"),
      fetchJson("/api/demo/security-events"),
      fetchJson("/api/demo/executive-insights"),
      fetchJson("/api/demo/evidence")
    ]);
    applyApiData({ manifest, overview, timelineEvents, securityEvents, insights, evidence });
  } catch (error) {
    state.apiConnected = false;
    console.info("Using static fallback data:", error.message);
  } finally {
    renderAll();
  }
}

state.selectedFiles = [];

function applyDynamicAnalysis(analysis) {
  state.analyzed = true;
  state.apiConnected = true;

  // 1. Update dashboard metrics
  state.after.score = analysis.risk_score;
  state.after.posture = severityLabel(analysis.risk_posture);
  state.after.summary = analysis.headline;

  if (analysis.metrics) {
    state.after.metrics = analysis.metrics;
  }

  // 2. Map signals
  if (analysis.detected_risks) {
    state.after.signals = analysis.detected_risks.map((risk) => [
      risk.name,
      risk.evidence,
      severityLabel(risk.severity)
    ]);
  }

  // 3. Map timeline
  if (analysis.timeline) {
    timeline = analysis.timeline.map((event) => [
      formatTime(event.timestamp),
      event.severity,
      event.title,
      event.description
    ]);
  }

  // 4. Map recommendations
  if (analysis.recommendations) {
    recommendations = analysis.recommendations;
  }

  // 5. Map evidence
  if (analysis.evidence) {
    evidenceRecords = analysis.evidence;
  }

  // 6. Map audit events
  if (analysis.security_events) {
    auditEvents = analysis.security_events.map((event) => [
      event.id || "LIVE-SEC",
      event.governance_note || "Secrets blocked and sanitized.",
      event.action || "blocked_and_sanitized"
    ]);
    document.querySelector("#governance .panel-header .status-pill").textContent = `${auditEvents.length} events`;
  }

  // 7. Map executive brief
  if (analysis.executive_summary || analysis.headline) {
    executiveBrief = {
      confidence: analysis.confidence || 0.94,
      headline: analysis.headline,
      summary: analysis.executive_summary,
      rootCause: analysis.root_cause || "Migration configuration boundary shift.",
      whatChanged: analysis.what_changed || [],
      decisionBrief: analysis.decision_brief || {
        primary_decision: "Centralize migration boundaries.",
        next_72_hours: "Freeze deployments and inspect retry logs.",
        owner_recommendation: "Unified command."
      },
      detectedRisks: analysis.detected_risks || []
    };
  }
}

async function postCustomPayload() {
  pipeline = [
    ["Parse custom upload", `Staging ${state.selectedFiles.length} operational files for ingestion...`],
    ["Run security filter", "Scanning files for API keys, email addresses, and passwords..."],
    ["Recursive DSPy summarization", "Queued for deep multi-document contextual summarization..."],
    ["Gemini executive intelligence", "Waiting for executive brief formulation..."],
    ["Publish governance audit", "Audit trail generation pending..."]
  ];
  renderPipeline();

  const formData = new FormData();
  state.selectedFiles.forEach((file) => {
    formData.append("files", file);
  });

  const headers = {};
  const keyInput = document.getElementById("gemini-key-input");
  const key = keyInput ? keyInput.value.trim() : localStorage.getItem("gemini_api_key");
  if (key) {
    headers["X-Gemini-API-Key"] = key;
  }

  try {
    const response = await fetch(`${API_BASE}/api/ingest`, {
      method: "POST",
      headers: headers,
      body: formData
    });
    if (!response.ok) throw new Error(`Analysis failed with status ${response.status}`);
    const result = await response.json();

    // Render preview
    if (result.files && result.files.length > 0) {
      document.getElementById("original-payload").textContent =
        "CUSTOM INGESTION\nActive files:\n" + state.selectedFiles.map((f) => `- ${f.name}`).join("\n");
      document.getElementById("sanitized-payload").textContent =
        result.files[0].sanitized_preview || "Files successfully processed and scanned.";
    }

    if (result.analysis) {
      applyDynamicAnalysis(result.analysis);
    }

    pipeline = [
      ["Parse custom upload", `${result.files.length} custom file(s) ingested and mapped.`],
      ["Run security filter", `${result.security_events.length} credential compliance items handled.`],
      ["Recursive DSPy summarization", "Context parsed and summarized into dynamic operational vectors."],
      ["Gemini executive intelligence", "Headline, root cause, and 72-hour decision briefing completed."],
      ["Publish governance audit", "Audits logged to risk database and evidence drawer mapped."]
    ];
  } catch (error) {
    console.error("Custom analysis failed:", error);
    alert("Operational Analysis Error: " + error.message);
  }
}

async function postDemoPayload() {
  document.getElementById("original-payload").textContent = DEMO_LEAK;
  
  const headers = {};
  const keyInput = document.getElementById("gemini-key-input");
  const key = keyInput ? keyInput.value.trim() : localStorage.getItem("gemini_api_key");
  if (key) {
    headers["X-Gemini-API-Key"] = key;
  }
  
  try {
    const response = await fetch(`${API_BASE}/api/ingest`, {
      method: "POST",
      headers: headers,
      body: DEMO_LEAK
    });
    if (!response.ok) throw new Error(`ingest returned ${response.status}`);
    const result = await response.json();
    const sanitized = result.files[0]?.sanitized_preview || "Payload sanitized.";
    document.getElementById("sanitized-payload").textContent = sanitized;

    if (result.analysis) {
      applyDynamicAnalysis(result.analysis);
    }

    pipeline = [
      ["Parse uploaded payload", `${result.files.length} source payload accepted by ingestion API.`],
      ["Run security filter", `${result.security_events.length} sensitive finding intercepted before AI processing.`],
      ["Sanitize outbound context", sanitized],
      ["Recursive DSPy summarization", "Source is ready for structured intelligence modules."],
      ["Publish governance audit", "Security findings returned to the governance dashboard."]
    ];
    if (result.security_events.length > 0) {
      auditEvents = result.security_events.map((event, index) => [
        `LIVE-${String(index + 1).padStart(3, "0")}`,
        `${event.finding_type} detected in ${event.filename}; preview ${event.preview}.`,
        event.action
      ]);
      document.querySelector("#governance .panel-header .status-pill").textContent = `${auditEvents.length} live event`;
    }
  } catch (error) {
    document.getElementById("sanitized-payload").textContent = DEMO_LEAK.replace(
      /GSK_live_[A-Za-z0-9]+/,
      "[REDACTED_API_KEY]"
    );
    console.info("Ingest API unavailable; preserving deterministic demo flow:", error.message);
  }
}

function renderFiles() {
  document.getElementById("file-grid").innerHTML = files
    .map(([path, source, count, signals]) => `
      <article class="file-card">
        <span>${source}</span>
        <strong>${path}</strong>
        <span>${count}</span>
        <span>${signals}</span>
      </article>
    `)
    .join("");
}

function renderSignals() {
  const data = state.analyzed ? state.after : state.before;
  document.getElementById("signal-list").innerHTML = data.signals
    .map(([title, description, severity]) => `
      <button class="signal" data-evidence-id="${slugify(title)}">
        <div>
          <strong>${escapeHtml(title)}</strong>
          <span>${escapeHtml(description)}</span>
        </div>
        <span class="status-pill ${severity === "Critical" ? "critical" : "moderate"}">${escapeHtml(severity)}</span>
      </button>
    `)
    .join("");
  document.querySelectorAll(".signal").forEach((button) => {
    button.addEventListener("click", () => openEvidence(button.dataset.evidenceId));
  });
}

function renderTimeline(targetId) {
  document.getElementById(targetId).innerHTML = timeline
    .map(([time, severity, title, description]) => `
      <article class="timeline-item ${severity}">
        <time>${time}</time>
        <div class="timeline-marker"><div class="timeline-dot"></div></div>
        <div class="timeline-content">
          <strong>${title}</strong>
          <p>${description}</p>
        </div>
      </article>
    `)
    .join("");
}

function renderPipeline() {
  document.getElementById("pipeline").innerHTML = pipeline
    .map(([title, description], index) => `
      <article class="pipeline-step ${state.analyzed ? "done" : ""}">
        <span class="step-index">${index + 1}</span>
        <div>
          <strong>${title}</strong>
          <p class="muted">${description}</p>
        </div>
        <span class="step-state">${state.analyzed ? "Complete" : "Ready"}</span>
      </article>
    `)
    .join("");
}

function renderAudit() {
  document.getElementById("audit-log").innerHTML = auditEvents
    .map(([id, note, action]) => `
      <article class="audit-row">
        <strong>${id}</strong>
        <p>${note}</p>
        <span class="status-pill ${action === "blocked_and_sanitized" ? "critical" : "moderate"}">${action}</span>
      </article>
    `)
    .join("");
}

function renderRecommendations() {
  document.getElementById("recommendations").innerHTML = recommendations
    .map((item, index) => `
      <article class="recommendation">
        <span class="rec-num">${String(index + 1).padStart(2, "0")}</span>
        <strong>${item}</strong>
      </article>
    `)
    .join("");
}

function renderExecutiveBrief() {
  document.getElementById("brief-headline").textContent = executiveBrief.headline;
  document.getElementById("brief-summary").textContent = executiveBrief.summary;
  document.getElementById("brief-confidence").textContent = `${Math.round(executiveBrief.confidence * 100)}%`;
  document.getElementById("brief-root-cause").textContent = executiveBrief.rootCause;
  document.getElementById("brief-primary-decision").textContent = executiveBrief.decisionBrief.primary_decision;
  document.getElementById("brief-next-action").textContent = executiveBrief.decisionBrief.next_72_hours;
  document.getElementById("change-list").innerHTML = executiveBrief.whatChanged
    .map((item, index) => `
      <article class="change-item">
        <strong>${index + 1}</strong>
        <p>${escapeHtml(item)}</p>
      </article>
    `)
    .join("");
  document.getElementById("brief-risk-list").innerHTML = executiveBrief.detectedRisks
    .map((risk) => `
      <article class="brief-risk">
        <div>
          <strong>${escapeHtml(risk.name)}</strong>
          <p>${escapeHtml(risk.evidence)}</p>
        </div>
        <span class="status-pill ${risk.severity === "critical" ? "critical" : "moderate"}">${severityLabel(risk.severity)}</span>
        <button class="secondary-action evidence-link" data-evidence-id="${slugify(risk.name)}">View Evidence</button>
      </article>
    `)
    .join("");
  document.querySelectorAll(".evidence-link").forEach((button) => {
    button.addEventListener("click", () => openEvidence(button.dataset.evidenceId));
  });
}

function openEvidence(evidenceId) {
  const record =
    evidenceRecords.find((item) => item.id === evidenceId) ||
    evidenceRecords.find((item) => slugify(item.risk_name) === evidenceId);
  if (!record) return;

  document.querySelectorAll(".signal").forEach((button) => {
    button.classList.toggle("active", button.dataset.evidenceId === evidenceId);
  });

  document.getElementById("evidence-title").textContent = record.risk_name;
  document.getElementById("evidence-confidence").textContent = `${Math.round(record.confidence * 100)}%`;
  document.getElementById("evidence-severity").textContent = severityLabel(record.severity);
  document.getElementById("evidence-why").textContent = record.why;
  document.getElementById("evidence-correlation").textContent = record.timeline_correlation;
  document.getElementById("evidence-action").textContent = record.recommended_action;
  document.getElementById("evidence-sources").innerHTML = record.evidence
    .map((item) => `
      <article class="source-item">
        <header>
          <strong>${escapeHtml(item.source)}</strong>
          <time>${escapeHtml(item.timestamp)}</time>
        </header>
        <p>${escapeHtml(item.quote)}</p>
      </article>
    `)
    .join("");

  const drawer = document.getElementById("evidence-drawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeEvidence() {
  const drawer = document.getElementById("evidence-drawer");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.querySelectorAll(".signal").forEach((button) => button.classList.remove("active"));
}

function updateDashboard() {
  const data = state.analyzed ? state.after : state.before;
  const posture = document.getElementById("risk-posture");
  document.getElementById("risk-score").textContent = data.score;
  document.getElementById("risk-summary").textContent = data.summary;
  document.getElementById("score-fill").style.width = `${data.score}%`;
  document.getElementById("score-fill").style.background = state.analyzed ? "var(--red)" : "var(--amber)";
  posture.textContent = data.posture;
  posture.className = `status-pill ${state.analyzed ? "critical" : "moderate"}`;

  const ids = ["delivery-risk", "customer-risk", "coordination-risk", "security-risk"];
  ids.forEach((id, index) => {
    const el = document.getElementById(id);
    el.textContent = `${data.metrics[index]}%`;
    el.nextElementSibling.firstElementChild.style.width = `${data.metrics[index]}%`;
    el.nextElementSibling.firstElementChild.style.background = data.metrics[index] > 85 ? "var(--red)" : "var(--amber)";
  });
  renderSignals();
  renderPipeline();
}

function renderPitch() {
  const scene = pitchScenes[state.pitchIndex];
  document.getElementById("pitch-kicker").textContent = `Scene ${state.pitchIndex + 1} of ${pitchScenes.length}`;
  document.getElementById("pitch-title").textContent = scene.title;
  document.getElementById("pitch-copy").textContent = scene.copy;
  document.getElementById("next-scene").textContent =
    state.pitchIndex === pitchScenes.length - 1 ? "Restart Pitch" : "Next Scene";
}

function updateApiStatus() {
  const statusEl = document.getElementById("api-status");
  if (!statusEl) return;
  
  const indicator = statusEl.querySelector(".status-indicator");
  const text = statusEl.querySelector(".status-text");
  
  if (state.apiConnected) {
    indicator.classList.remove("disconnected");
    indicator.classList.add("connected");
    text.textContent = "API Connected";
  } else {
    indicator.classList.remove("connected");
    indicator.classList.add("disconnected");
    text.textContent = "Static Fallback";
  }
}

function renderAll() {
  renderFiles();
  renderTimeline("dashboard-timeline");
  renderTimeline("full-timeline");
  renderAudit();
  renderRecommendations();
  renderExecutiveBrief();
  renderPitch();
  updateDashboard();
  updateApiStatus();
}

async function runAnalysis(keepView = false) {
  state.analyzed = true;
  if (state.selectedFiles && state.selectedFiles.length > 0) {
    await postCustomPayload();
  } else {
    await postDemoPayload();
  }
  renderAll();
  if (!keepView) selectView("dashboard");
}

async function showPitchScene(index) {
  state.pitchIndex = index;
  const scene = pitchScenes[state.pitchIndex];
  if (scene.analyzed && !state.analyzed) {
    await runAnalysis(true);
  } else if (!scene.analyzed && state.pitchIndex === 0) {
    state.analyzed = false;
    renderAll();
  }
  renderPitch();
  selectView(scene.view);
}

function initUploader() {
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-uploader");
  const listContainer = document.getElementById("selected-files-list");
  const keyInput = document.getElementById("gemini-key-input");
  const saveKeyBtn = document.getElementById("save-key-btn");
  const statusMsg = document.getElementById("key-status-msg");
  
  if (!dropZone || !fileInput) return;
  
  // 1. Drag & Drop events
  dropZone.addEventListener("click", () => fileInput.click());
  
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--cyan)";
    dropZone.style.background = "rgba(107, 187, 216, 0.05)";
  });
  
  dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "var(--line)";
    dropZone.style.background = "rgba(255, 255, 255, 0.01)";
  });
  
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "var(--line)";
    dropZone.style.background = "rgba(255, 255, 255, 0.01)";
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectedFiles(e.dataTransfer.files);
    }
  });
  
  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSelectedFiles(e.target.files);
    }
  });
  
  function handleSelectedFiles(fileList) {
    state.selectedFiles = Array.from(fileList);
    listContainer.textContent = `${state.selectedFiles.length} file(s) selected: ` + state.selectedFiles.map(f => f.name).join(", ");
    
    // Dynamically update staged list
    files = state.selectedFiles.map(f => {
      const sizeKB = (f.size / 1024).toFixed(1);
      return [
        f.name,
        "User Export",
        `${sizeKB} KB`,
        "Ingestion & Compliance pending..."
      ];
    });
    renderFiles();
  }
  
  // 2. API Key storage events
  const savedKey = localStorage.getItem("gemini_api_key");
  if (savedKey) {
    keyInput.value = savedKey;
    statusMsg.textContent = "API Key loaded (configured locally).";
    statusMsg.style.color = "var(--green)";
  }
  
  saveKeyBtn.addEventListener("click", () => {
    const key = keyInput.value.trim();
    if (key) {
      localStorage.setItem("gemini_api_key", key);
      statusMsg.textContent = "API Key saved locally!";
      statusMsg.style.color = "var(--green)";
    } else {
      localStorage.removeItem("gemini_api_key");
      statusMsg.textContent = "API Key cleared. High-fidelity heuristics will be used.";
      statusMsg.style.color = "var(--amber)";
    }
  });
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => selectView(button.dataset.view));
});

document.getElementById("run-analysis").addEventListener("click", () => runAnalysis(false));
document.getElementById("upload-analysis").addEventListener("click", () => runAnalysis(false));
document.getElementById("start-pitch").addEventListener("click", () => showPitchScene(0));
document.getElementById("close-evidence").addEventListener("click", closeEvidence);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeEvidence();
});
document.getElementById("next-scene").addEventListener("click", () => {
  const nextIndex = state.pitchIndex === pitchScenes.length - 1 ? 0 : state.pitchIndex + 1;
  showPitchScene(nextIndex);
});

loadApiData();
initUploader();
