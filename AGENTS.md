# GhostShift Secure Agent Handoff

## Project State

Workspace:

`C:/Users/USER/Documents/Codex/2026-05-16/this-here-ghostshift-secure-product-requirements`

Product:

**GhostShift Secure** is a hackathon demo for enterprise operational drift detection plus secure AI governance.

Current live demo:

- Static app: `http://localhost:4173/`
- Demo API: `http://localhost:8765/`
- Static server: `scripts/static-server.ps1`
- Dependency-free API: `backend/demo_server.py`
- FastAPI scaffold also exists in `backend/main.py`, but bundled Python did not have FastAPI installed.

## Important: Do Not Revert

Do not remove, simplify, or replace these demo-critical pieces:

- `data/novatech/*`
- pitch mode
- evidence drilldowns
- governance reveal
- architecture screen
- enriched Executive Intel view
- dependency-free API server

These are intentional, tested features that support the hackathon narrative.

## Current Architecture

Key folders:

- `app/`
  - `index.html`: main static UI
  - `styles.css`: full responsive styling
  - `app.js`: frontend state, API loading, pitch mode, evidence drawer, ingestion POST
- `backend/`
  - `demo_server.py`: no-dependency HTTP API on port `8765`
  - `main.py`: FastAPI scaffold
  - `security.py`: scanner for API keys, emails, password assignments
  - `dspy_pipeline.py`: DSPy signature/module sketch
  - `requirements.txt`
- `data/novatech/`
  - `manifest.json`
  - `slack_logs.jsonl`
  - `jira_tickets.csv`
  - `support_tickets.csv`
  - `incident_reports.md`
  - `timeline_events.json`
  - `security_events.json`
  - `executive_insights.json`
  - `evidence.json`
- `docs/`
  - `demo-flow.md`
  - `build-plan.md`

## What Works Now

The app has:

- dashboard risk score transition `42 -> 86`
- `Run Secure Analysis`
- `Start Pitch Mode` / `Next Scene`
- five pitch scenes:
  1. Calm Overview
  2. Secure Upload
  3. Risk Escalation
  4. Security Interception
  5. Executive Brief
- upload screen with file cards from `manifest.json`
- governance screen with original payload vs sanitized model context
- `/api/ingest` live demo POST that detects:
  `GSK_live_91f4b8ab73a2f23de0c871e921`
  and replaces it with:
  `[REDACTED_API_KEY]`
- architecture screen:
  `Enterprise Data -> Lobster Trap Filter -> DSPy Recursive Analysis -> Gemini Briefing -> Executive Dashboard`
- evidence drawer:
  click risk signals or Executive `View Evidence`
- Executive Intel screen:
  - confidence
  - root cause
  - primary decision
  - 72-hour action
  - what changed over time
  - evidence-linked risk findings

## Recently Verified

Browser checks passed:

- score escalates to `86`
- governance sanitized payload appears
- evidence drawer opens and closes
- Executive Intel shows:
  - confidence `91%`
  - four change items
  - four risk findings
- evidence links open correct drawer records
- no console errors during last smoke tests
- no horizontal overflow on tested narrow viewport

Backend checks passed:

- `python -m compileall backend`
- `/api/demo/evidence` returns 4 records
- `/api/demo/executive-insights` returns enriched brief fields

## How To Run

Static app server:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\static-server.ps1 -Port 4173
```

API server:

```powershell
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe backend\demo_server.py 8765
```

The API server binding needed escalation once; prefix was approved for:

```text
["C:\\Users\\USER\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe", "backend\\demo_server.py"]
```

## Next Natural Tasks

Best next steps, in order:

1. **Final demo script / presenter notes**
   Create concise narration tied to the five pitch scenes.

2. **Demo runbook**
   Add a `DEMO_RUNBOOK.md` with commands, expected URLs, fallback path if the API is down, and exact click sequence.

3. **Pitch deck**
   Use app screenshots and the existing PRD/demo flow to build a judge-facing deck.

4. **Optional visual polish**
   Add subtle status labels such as `API connected` / `Static fallback`.

5. **Optional FastAPI dependency setup**
   Only if network/dependency install is approved. Do not block the demo on this.

## Product Integrity Rules

Keep the product narrative:

- This is not a chatbot.
- This is not a generic dashboard.
- It is an enterprise early-warning intelligence system.
- The emotional arc matters:
  calm -> upload -> hidden drift -> security interception -> executive clarity.
- Security/governance must remain visible and sponsor-aligned.
- DSPy/Gemini/Lobster Trap must remain part of the story even when mocked.
- Prefer deterministic demo reliability over live AI fragility.

