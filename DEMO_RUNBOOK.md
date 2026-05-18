# GhostShift Secure: Demo Runbook

This document provides the exact sequence, commands, and narration points for the **GhostShift Secure** hackathon demo.

## Quick Start

### Step 1: Start the Servers

**Terminal 1 — Static App Server:**
```powershell
powershell -ExecutionPolicy Bypass -File scripts\static-server.ps1 -Port 4173
```

**Terminal 2 — API Server:**
```powershell
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe backend\demo_server.py 8765
```

Expected output:
- Static: `Server listening on port 4173`
- API: `Demo API server listening on http://localhost:8765`

### Step 2: Open the Demo

Open a browser and navigate to:
```
http://localhost:4173/
```

### Verify Connectivity

```powershell
curl http://localhost:4173/ -UseBasicParsing
curl http://localhost:8765/api/demo/evidence -UseBasicParsing
```

Both should return HTTP 200.

---

## URLs & Health Checks

| Service | URL | Purpose |
|---------|-----|---------|
| Main App | [http://localhost:4173/](http://localhost:4173/) | Demo dashboard |
| Demo Evidence API | [http://localhost:8765/api/demo/evidence](http://localhost:8765/api/demo/evidence) | Evidence data |
| Demo Executive Insights | [http://localhost:8765/api/demo/executive-insights](http://localhost:8765/api/demo/executive-insights) | Brief data |
| Ingest Endpoint | [http://localhost:8765/api/ingest](http://localhost:8765/api/ingest) | Demo POST endpoint |

---

## Demo Script: The Five Scenes

GhostShift Secure is designed around a 5-scene emotional arc: **calm → upload → hidden drift → security interception → executive clarity.**

Detailed narration is in **DEMO_SCRIPT.md**. This runbook provides the click sequence.

### Total Demo Duration: 5–7 minutes

---

## Complete Click Sequence

### Scene 1: Calm Overview (30 seconds)

**Screen:** Landing dashboard loads automatically  
**Initial State:**
- Risk Score: **42 / 100**
- Security Exposure: Low
- Delivery Risk: Moderate
- Customer Escalation Risk: Low

**Action:** No clicks. Narrate.

**Narration:** See DEMO_SCRIPT.md, Scene 1  
*(Explain fragmented signals across Slack, Jira, support logs.)*

---

### Scene 2: Upload & Pipeline (90 seconds)

#### Step 2.1: Click "Run Secure Analysis" Button

```
Click: "Run Secure Analysis" button (blue, center of screen)
```

**Expected:** Upload panel slides in with five pre-populated file cards:
- slack_logs.jsonl
- jira_tickets.csv
- support_tickets.csv
- incident_reports.md
- timeline_events.json

#### Step 2.2: Click "Upload Files" or "Start Analysis"

```
Click: Upload button within the panel
```

**Expected:**
- Files show "uploading..." state
- Pipeline visualization appears (5 stages: Parse → Filter → Summarize → DSPy → Gemini)
- Each stage animates
- Upload completes within 5 seconds

**Narration:** See DEMO_SCRIPT.md, Scene 2  
*(Explain Lobster Trap filter, DSPy modules, Gemini integration.)*

#### Step 2.3: Wait for Completion

Once complete, the upload panel closes automatically.

---

### Scene 3: Risk Escalation (45 seconds)

**Action:** No clicks. Watch the dashboard update automatically.

**Expected Changes:**
- Risk Score animates: **42 → 86**
- Delivery Risk: **Critical** (red)
- Customer Escalation Risk: **High** (orange)
- Coordination Drift: **Severe** (red)
- Security Exposure: **Critical** (red)
- Timeline highlights key events

**Narration:** See DEMO_SCRIPT.md, Scene 3  
*(Explain the correlation detected without a single smoking gun.)*

---

### Scene 4: Security Interception (45 seconds)

#### Step 4.1: Click "Security Governance" Tab

```
Click: "Security Governance" tab (top navigation or sidebar)
```

**Expected:** Governance panel shows the blocked event:
- **Source:** Slack export
- **Pattern:** API key format
- **Detected:** `GSK_live_91f4b8ab73a2f23de0c871e921`
- **Sanitized To:** `[REDACTED_API_KEY]`
- **Status:** ✓ Blocked (green)

#### Step 4.2 (Optional): Click "View Evidence"

```
Click: "View Evidence" or "Show Original Payload" link
```

**Expected:** Evidence drawer opens (right panel) showing:
- Original Slack excerpt with visible API key
- Sanitized version with redacted key

#### Step 4.3: Close Evidence Drawer (Optional)

```
Press: ESC key or click X button
```

**Narration:** See DEMO_SCRIPT.md, Scene 4  
*(Explain governance, credential detection, and secure AI boundaries.)*

---

### Scene 5: Executive Intelligence (120 seconds)

#### Step 5.1: Click "Executive Intelligence"

```
Click: "Executive Intelligence" button or link
```

**Expected:** Panel opens or view loads with:
- **Summary:** "NovaTech's infrastructure migration triggered a coordination breakdown..."
- **Confidence:** 91%
- **Root Cause:** "Migration → unclear rollback ownership → team coordination loss"
- **Primary Decision:** "Establish incident commander for next 72 hours"
- **What Changed:** Four metrics (deployment failures +340%, Jira reopens +28%, escalations +156%, sync frequency -65%)
- **Risk Findings:** Four linked, clickable findings

#### Step 5.2: Click a Risk Finding to Drill Down

```
Click: Any risk finding (e.g., "Deployment failures increased 340%")
```

**Expected:** Evidence drawer opens showing:
- Supporting Slack excerpts
- Related Jira tickets
- Support escalations
- Timeline events

#### Step 5.3: Explore Additional Findings (Optional)

```
Click: Another risk finding to show data linkage
```

Demonstrate the depth and breadth of evidence supporting the brief.

#### Step 5.4: Close Evidence Drawer

```
Press: ESC key or click X button
```

**Narration:** See DEMO_SCRIPT.md, Scene 5  
*(Deliver the executive intelligence narrative and closing statement.)*

---

## Timing Checklist

| Scene | Duration | Clicks | Status |
|-------|----------|--------|--------|
| Scene 1: Calm Overview | 30 sec | 0 | ✓ Auto-loaded |
| Scene 2: Upload & Pipeline | 90 sec | 2 | ✓ Upload + Start |
| Scene 3: Risk Escalation | 45 sec | 0 | ✓ Auto-update |
| Scene 4: Security Governance | 45 sec | 1–2 | ✓ Gov tab + optional evidence |
| Scene 5: Executive Intelligence | 120 sec | 1–3 | ✓ Main + optional drill-downs |
| **TOTAL** | **~330 sec (5–7 min)** | **4–8** | ✓ Full demo |

---

## Fallback: API Unavailable

If the API (`localhost:8765`) is unreachable:

### Signs of Failure
- Upload hangs or shows error
- Evidence drawer displays "Unable to load data"
- Console shows failed fetch requests

### Fallback Procedure

1. **Acknowledge to judges:**  
   > "GhostShift Secure is designed with offline resilience. All demo risk analysis and executive intelligence are precomputed. Even without the live API, the intelligence remains accessible."

2. **Proceed with narration:**
   - Scene 1: Full functionality (already loaded)
   - Scene 2: Narrate the pipeline; skip the upload click if API is down
   - Scene 3: Risk score transition should still work (precomputed in `app.js`)
   - Scene 4: Security Governance data is cached in frontend
   - Scene 5: Executive Intelligence is preloaded; narrate the brief

3. **Message:**
   > "The production system integrates with live Gemini and DSPy backends, but the demo is built with deterministic intelligence for reliability at presentation time."

---

## 2. Post-Pitch Deep Dive (Optional)

If judges ask technical questions:

1. **Evidence Linking:** Click any risk finding in Executive Intel to show how evidence is traced back to source data (Slack, Jira, support, timeline).
2. **Architecture Flow:** Explain the "Lobster Trap" security filter and DSPy recursive analysis stack.
3. **Timeline Visualization:** Show the Timeline tab to demonstrate the causal sequence of the migration failure.
4. **Governance Audit:** Return to Security Governance to show the redacted event log and explain why the credential block matters.

---

## 3. Presenter Checklist

Before you demo:

- [ ] Both servers running (static on 4173, API on 8765)
- [ ] Browser on `http://localhost:4173/`
- [ ] Dashboard shows Risk Score: 42 / 100
- [ ] No console errors (F12 → Console)
- [ ] "Run Secure Analysis" button visible and clickable
- [ ] Upload panel opens and closes smoothly
- [ ] Risk score animates to 86 after upload
- [ ] Security Governance tab loads and shows redacted event
- [ ] Executive Intelligence displays summary and findings
- [ ] Evidence drawer opens and closes
- [ ] DEMO_SCRIPT.md is available for narration reference

---

## 4. Troubleshooting

### Static Server Won't Start

**Error:** "Address already in use" or "Port 4173 blocked"

**Fix:**
```powershell
# Try a different port
powershell -ExecutionPolicy Bypass -File scripts\static-server.ps1 -Port 4174
# Then open http://localhost:4174/
```

### API Server Won't Start

**Error:** "ModuleNotFoundError" or "Connection refused"

**Fix:**
```powershell
# Verify Python path
Test-Path "C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

# Try running demo_server.py directly
cd backend
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe demo_server.py 8765

# Check for syntax errors
python -m compileall backend
```

### Upload Doesn't Work / Evidence Empty

**Cause:** API not responding.

**Check:**
```powershell
curl http://localhost:8765/api/demo/evidence -UseBasicParsing
```

**Fix:** Restart API server or use fallback mode (above).

### Risk Score Doesn't Animate

**Cause:** `app.js` didn't load correctly.

**Fix:**
```
1. Hard refresh: Ctrl+Shift+R
2. Check DevTools Console (F12) for errors
3. Check Network tab to verify app/app.js loaded
```

### Console Errors or CORS Issues

**Check:**
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors mentioning localhost:8765
```

**Fix:**
- Verify API is running: `curl http://localhost:8765/`
- Verify ports: 4173 (static), 8765 (API)
- If CORS fails, the API may need header updates in `backend/demo_server.py`

---

## 5. Success Indicators

You'll know the demo is working when:

✓ Dashboard loads instantly  
✓ Risk score animates 42 → 86  
✓ Security Governance shows redacted event  
✓ Executive Intelligence displays confidence, root cause, actions  
✓ Evidence drawer opens and shows linked data  
✓ No red errors in console  
✓ All scenes flow without awkward pauses

---

## Quick Reference: TL;DR

1. Start both servers (4173 static, 8765 API)
2. Open `http://localhost:4173/`
3. Scene 1: Narrate (no clicks)
4. Scene 2: Click "Run Secure Analysis" → Click "Upload" → Wait
5. Scene 3: Narrate the score animation (no clicks)
6. Scene 4: Click "Security Governance" → Optionally click "View Evidence"
7. Scene 5: Click "Executive Intelligence" → Optionally click risk findings
8. **Total time:** 5–7 minutes
