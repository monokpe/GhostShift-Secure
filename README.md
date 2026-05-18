# GhostShift Secure

Enterprise early-warning intelligence for fragmented operational data.

This workspace contains a hackathon-ready demo with production-grade scaffolding:

- `app/` - static GhostShift Secure dashboard UI
- `backend/` - FastAPI scaffold for demo endpoints, security scanning, and DSPy wiring
- `data/novatech/` - fictional enterprise dataset for the NovaTech migration scenario
- `scripts/static-server.ps1` - local-only static server for the demo UI

## 📚 Documentation

**For judges and presenters:**

- **[PITCH_DECK.md](PITCH_DECK.md)** — Judge pitch deck (13 slides, convert to your preferred format)
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** — Presenter narration for the five-scene demo
- **[DEMO_RUNBOOK.md](DEMO_RUNBOOK.md)** — Step-by-step demo execution guide with troubleshooting
- **[FASTAPI_SETUP.md](FASTAPI_SETUP.md)** — Production deployment guide and integration roadmap

---

## Dataset Story

NovaTech Systems recently migrated core infrastructure. After cutover, the organization shows signs of hidden operational drift:

- deployment instability
- unclear rollback ownership
- reopened Jira bugs
- enterprise onboarding SLA breaches
- customer escalation and revenue risk
- a leaked API credential inside incident response chatter

GhostShift Secure should connect those fragments into one executive-level warning while blocking sensitive content before outbound AI processing.

## Suggested App Flow

1. Start with a moderate risk dashboard.
2. Upload the NovaTech dataset.
3. Show security filtering and recursive analysis.
4. Transition the dashboard to critical risk.
5. Reveal the blocked credential event.
6. Present the executive intelligence summary.

## Run The Static Demo

From this workspace:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\static-server.ps1 -Port 4173
```

Then open:

```text
http://localhost:4173/
```

Click `Run Secure Analysis` to move the dashboard from the calm pre-ingestion state to the critical NovaTech risk state.

Use `Start Pitch Mode` and `Next Scene` to advance the judge-facing story:

1. Calm Overview
2. Secure Upload
3. Risk Escalation
4. Security Interception
5. Executive Brief

After analysis, click any risk signal in the dashboard to open the evidence drilldown. Each drilldown shows confidence, severity, source snippets, timeline correlation, and the recommended action behind the AI claim.

The Executive Intel view is structured as a boardroom-ready brief with:

- root cause analysis
- confidence score
- primary decision framing
- 72-hour action plan
- change-over-time summary
- evidence-linked risk findings

## Backend Scaffold

The FastAPI scaffold exposes deterministic demo data first:

- `GET /api/demo/manifest`
- `GET /api/demo/overview`
- `GET /api/demo/timeline`
- `GET /api/demo/security-events`
- `GET /api/demo/executive-insights`
- `GET /api/demo/evidence`
- `POST /api/ingest`

The static app uses these endpoints when available and falls back to embedded demo data when the API is offline.

Install backend dependencies from `backend/requirements.txt` when a Python environment is available.

For immediate local testing without FastAPI, run the dependency-free demo API:

```powershell
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe backend\demo_server.py 8765
```
