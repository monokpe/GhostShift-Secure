# GhostShift Secure Build Plan

## Build Priority

The fastest winning path is to build the demo around the intelligence reveal, not the upload mechanics.

## Phase 1 - Demo Data and Static Intelligence

Deliverables:

- Seed NovaTech operational dataset
- Precomputed risk scores
- Precomputed executive insight payloads
- Precomputed security audit events

Why:

This gives the frontend a reliable story even before live AI integration is complete.

## Phase 2 - Frontend Experience

Screens:

- Landing Dashboard
- Data Upload
- Executive Intelligence
- Security Governance
- Operational Timeline

Design priorities:

- Dense, premium enterprise UI
- No chatbot-first framing
- Strong first-screen risk posture
- Clear visual escalation after ingestion

## Phase 3 - Backend API

FastAPI routes:

- `GET /api/demo/overview`
- `GET /api/demo/timeline`
- `GET /api/demo/security-events`
- `GET /api/demo/executive-insights`
- `POST /api/ingest`

Implementation stance:

Start with deterministic demo responses from the dataset. Add Gemini and DSPy calls behind the same response shapes so the UI does not churn.

## Phase 4 - DSPy Pipeline

Modules:

- CommunicationDriftDetector
- DeploymentRiskAnalyzer
- EscalationDetector
- SecurityAnomalySummarizer
- ExecutiveBriefGenerator

Pipeline:

Raw sources -> chunking -> local analysis -> intermediate summaries -> aggregate risk model -> executive brief.

## Phase 5 - Security Governance

Minimum viable behavior:

- Detect API keys, tokens, passwords, emails, and phone numbers
- Replace sensitive values with typed placeholders
- Record audit events
- Show blocked outbound model payloads

Demo-critical moment:

The credential leak must be visible, blocked, and logged before AI processing.

## Phase 6 - Integration Polish

Must-have polish:

- Upload progress animation
- Risk score transition from calm to critical
- Timeline event highlighting
- Security audit log reveal
- Executive summary copy that sounds boardroom-ready

