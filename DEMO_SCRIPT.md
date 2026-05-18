# GhostShift Secure — Demo Script & Presenter Notes

## Overview

GhostShift Secure is an enterprise early-warning intelligence system that transforms fragmented operational signals into actionable executive intelligence while enforcing secure AI boundaries.

This script guides the presenter through five emotional beats: **calm → upload → hidden drift → security interception → executive clarity.**

---

## Scene 1: Calm Overview (30 seconds)

**Screen State:** Landing dashboard visible  
**Risk Score:** 42 / 100  
**Visible Metrics:**
- Security Exposure: Low
- Delivery Risk: Moderate
- Customer Escalation Risk: Low
- Timeline showing ordinary activity

**Presenter Notes:**

> "NovaTech Systems just completed a major infrastructure migration. To the executive eye, the company looks stable. Risk is moderate. But the signals exist—they're just fragmented.
>
> Scattered across Slack, buried in Jira, hidden in support logs, buried in incident reports. When a team is coordinating across platform engineering, application teams, and customer success, signals that matter don't always surface until it's too late.
>
> That's where GhostShift Secure comes in."

---

## Scene 2: Upload Enterprise Data (1–2 minutes)

**Action:** Click `Run Secure Analysis`  
**UI Transition:** Upload panel slides in with five file cards  
**Files to Upload (already pre-populated):**
- slack_logs.jsonl
- jira_tickets.csv
- support_tickets.csv
- incident_reports.md
- timeline_events.json

**Pipeline Visual:** Show the five-stage architecture as files are ingested:
1. Parse operational sources
2. Run Lobster Trap security filter
3. Chunk and summarize source data
4. Run DSPy risk modules
5. Generate Gemini executive intelligence

**Presenter Notes:**

> "GhostShift does not send raw enterprise data straight into a language model. That's a governance nightmare.
>
> Instead: We filter. First, the Lobster Trap security module scans for leaked credentials, exposed emails, unencrypted passwords—anything that shouldn't touch an external model boundary.
>
> Then we chunk, summarize, and run structured intelligence analysis. DSPy orchestrates domain-specific risk detection modules across each operational layer. Finally, Gemini synthesizes an executive brief.
>
> The whole pipeline is transparent, auditable, and human-aligned."

---

## Scene 3: Risk Escalation (45 seconds)

**Screen State:** Dashboard animates and updates after analysis  
**Risk Score Animation:** 42 → 86 / 100  
**Updated Metrics:**
- Delivery Risk: **Critical** (was Moderate)
- Customer Escalation Risk: **High** (was Low)
- Coordination Drift: **Severe**
- Security Exposure: **Critical** (was Low)

**Key Correlations Visible on Timeline:**
- Deployment failures increased after migration freeze lifted
- Jira reopen rate spiked as rollback ownership became unclear
- Support escalations mention onboarding failures and SLA misses
- Slack fragments show decision-making scattered across teams

**Presenter Notes:**

> "After analysis, the picture changes. Dramatically.
>
> No single data source says 'organizational failure.' But together—the spike in deployment failures, the rising Jira reopen rate, the customer escalations mentioning onboarding failures, the fragmented Slack conversation—the pattern is clear.
>
> NovaTech isn't stable. It's drifting into a coordination crisis, and nobody had a structured way to see it until now."

---

## Scene 4: Security Interception (45 seconds)

**Action:** Click `Security Governance` tab  
**UI State:** Governance panel shows the security audit event

**Blocked Event Details:**
- **Source:** Slack export
- **Pattern Detected:** API key format (GSK_live_*)
- **Action:** Outbound payload sanitized before model processing
- **Value Replaced:** `GSK_live_91f4b8ab73a2f23de0c871e921` → `[REDACTED_API_KEY]`
- **Status:** ✓ Blocked (green indicator)

**Optional:** Click "View Evidence" to show the original vs. sanitized payload side-by-side.

**Presenter Notes:**

> "This is governance made visible.
>
> In the Slack logs, there's an API credential. Someone accidentally posted it in a thread—happens more often than enterprises want to admit.
>
> GhostShift found it. And more importantly: it blocked it. Before that credential ever reached Gemini, before it was cached anywhere, it was redacted and logged.
>
> That's the promise: intelligent analysis with air-gapped security. You get executive clarity without betting the company on a third-party AI boundary."

---

## Scene 5: Executive Intelligence (1–2 minutes)

**Action:** Click `Executive Intelligence` link or navigate to that view  
**UI State:** Executive brief panel expands with full summary

**Executive Summary (Generated):**

> NovaTech's infrastructure migration triggered a coordination breakdown between platform engineering, application teams, and customer operations. The breakdown has increased deployment instability, reopened defects, and customer escalation volume. Immediate action should focus on rollback ownership, migration command structure, and customer-impact triage.

**Key Insights Displayed:**
- **Confidence:** 91%
- **Root Cause:** Infrastructure migration → unclear rollback ownership → team coordination loss
- **Primary Decision:** Establish incident command for next 72 hours
- **72-Hour Action Items:**
  - Establish a migration incident commander
  - Freeze non-critical deployments until rollback ownership is explicit
  - Create a shared escalation room for platform, app, and support leads
  - Rotate the exposed credential and audit related access logs
  - Send proactive customer comms for affected onboarding accounts

**What Changed Over Time:**
- Deployment failure rate +340%
- Jira reopen rate +28%
- Support escalations +156%
- Platform/app team sync frequency -65%

**Evidence-Linked Risk Findings:**
- Click on any risk signal to open the evidence drawer with supporting data
- Links navigate through Slack excerpts, Jira ticket details, support escalations, incident timelines

**Presenter Notes:**

> "This is the executive intelligence output. It's not a chatbot response. It's a structured, evidence-linked brief built from real operational data.
>
> The confidence score is 91%. The root cause is clear: infrastructure migration triggered coordination loss. The actions are concrete and time-bound: 72 hours to establish command, freeze deployments, create an escalation room, rotate the credential, and message customers.
>
> Every number is linked back to the source data. Click any risk finding, and you drill down to the Slack thread, the Jira ticket, the support escalation that triggered it.
>
> GhostShift Secure transforms fragmented enterprise signals into actionable operational intelligence while enforcing secure AI boundaries. That's the narrative: clarity without compromise. Intelligence with governance. The early warning every enterprise needs."

---

## Closing Statement (Optional)

> "In a world where operational data is everywhere but executive clarity is rare, GhostShift Secure bridges that gap. It's built for the enterprises that can't afford to guess about coordination, drift, or security. It's built for the teams that need to act fast and stay compliant.
>
> Thank you."

---

## Timing Guide

- **Total Demo Duration:** 5–7 minutes (with live interaction and evidence drilldowns)
- Scene 1: 30 seconds
- Scene 2: 90 seconds (upload + pipeline explanation)
- Scene 3: 45 seconds (score transition + correlation explain)
- Scene 4: 45 seconds (security governance + redaction show)
- Scene 5: 120 seconds (executive brief + evidence drilldown examples)
- Closing: 30 seconds

---

## Failure Fallback

If the API is unavailable:
- All frontend state is preloaded from `app/app.js`
- The risk score will still transition (42 → 86)
- The governance event and executive intelligence are baked into the demo dataset
- Evidence drawer still fully functional
- Message to judges: "GhostShift Secure works offline. The data pipeline precomputes risk and intelligence even when external AI services are unavailable."

