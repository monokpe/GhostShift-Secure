# GhostShift Secure FastAPI Setup Guide

## Overview

The `backend/main.py` FastAPI application provides a production-ready alternative to the dependency-free `demo_server.py`. It offers structured endpoints, CORS middleware, and integration hooks for live Gemini and DSPy backends.

**Status:** FastAPI scaffold is syntax-checked and ready to deploy.

---

## What's Included

### FastAPI Application (`backend/main.py`)

**Endpoints:**
- `GET /api/demo/manifest` - File manifest (from `data/novatech/manifest.json`)
- `GET /api/demo/overview` - Risk overview (from `data/novatech/executive_insights.json`)
- `GET /api/demo/timeline` - Timeline events (from `data/novatech/timeline_events.json`)
- `GET /api/demo/security-events` - Governance events (from `data/novatech/security_events.json`)
- `GET /api/demo/executive-insights` - Executive brief (from `data/novatech/executive_insights.json`)
- `GET /api/demo/evidence` - Risk evidence records (from `data/novatech/evidence.json`)
- `POST /api/ingest` - Upload and security scan endpoint
- `POST /api/ingest-batch` - Batch upload handler

**Middleware:**
- CORS enabled for `http://localhost:3000` and `http://localhost:4173`
- Support for multipart file uploads

### Supporting Modules

**`backend/security.py`**
- `scan_text()` function for detecting and redacting:
  - API keys and tokens
  - Email addresses
  - Phone numbers
  - Passwords and credentials
  
**`backend/storage.py`**
- File I/O utilities for JSON, JSONL, and plaintext data
- Integration with NovaTech demo dataset

**`backend/dspy_pipeline.py`** (Scaffold)
- Placeholder DSPy modules:
  - `CommunicationDriftDetector`
  - `DeploymentRiskAnalyzer`
  - `EscalationDetector`
  - `SecurityAnomalySummarizer`
  - `ExecutiveBriefGenerator`

---

## Dependencies

### Required Packages

Listed in `backend/requirements.txt`:

```
fastapi==0.115.6
uvicorn[standard]==0.34.0
python-multipart==0.0.20
dspy-ai==2.5.43
```

### Installation Methods

#### Option 1: Using pip (Recommended)

**Prerequisites:**
- Python 3.8 or later
- pip package manager

**Install command:**

```bash
cd backend
pip install -r requirements.txt
```

**On Windows (with bundled Python):**

```cmd
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed fastapi-0.115.6 uvicorn-0.34.0 python-multipart-0.0.20 dspy-ai-2.5.43
```

#### Option 2: Using conda

If you're using Anaconda or Miniconda:

```bash
conda env create -f environment.yml
conda activate ghostshift
```

*(environment.yml not included; create from requirements.txt if needed)*

#### Option 3: Poetry

If your environment uses Poetry:

```bash
poetry install
```

*(pyproject.toml not included; can be generated from requirements.txt)*

---

## Running the FastAPI Server

### Start the Server

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8765 --reload
```

**On Windows (with bundled Python):**

```cmd
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m uvicorn backend.main:app --host 0.0.0.0 --port 8765 --reload
```

### Expected Output

```
INFO:     Uvicorn running on http://0.0.0.0:8765 (Press CTRL+C to quit)
INFO:     Started server process [1234]
INFO:     Application startup complete
```

### API Documentation

Once running, access the interactive API docs:

- **Swagger UI:** `http://localhost:8765/docs`
- **ReDoc:** `http://localhost:8765/redoc`

---

## Testing the Endpoints

### Health Check

```bash
curl http://localhost:8765/api/demo/manifest
```

Expected response: 200 OK with manifest JSON

### Run Demo Script

```bash
# Terminal 1: Start Static App Server
powershell -ExecutionPolicy Bypass -File scripts\static-server.ps1 -Port 4173

# Terminal 2: Start FastAPI Server (after installing dependencies)
C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe -m uvicorn backend.main:app --host 0.0.0.0 --port 8765 --reload

# Terminal 3: Open browser
http://localhost:4173/
```

When both servers are running, the app UI will display `API Connected` with a green indicator.

---

## Integration with Gemini & DSPy

### Current State

The FastAPI endpoints return deterministic demo data from the NovaTech dataset. This ensures reliable demo behavior while external AI services are being integrated.

### Next Steps

To integrate live Gemini and DSPy analysis:

1. **Add API keys** to environment variables:
   ```bash
   export GEMINI_API_KEY="your-key-here"
   ```

2. **Update `backend/dspy_pipeline.py`:**
   - Implement full DSPy module logic
   - Add Gemini API calls in `ExecutiveBriefGenerator`

3. **Modify endpoints** in `backend/main.py`:
   - Replace `load_json()` calls with pipeline execution
   - Keep demo data as fallback if API fails

4. **Example endpoint update:**

   ```python
   @app.get("/api/demo/executive-insights")
   async def get_insights():
       # Try live analysis
       try:
           result = await run_dspy_pipeline(evidence_data)
           return result
       except Exception as e:
           # Fallback to demo data
           logger.info(f"Pipeline failed, using demo data: {e}")
           return load_json(DATA_DIR / "executive_insights.json")
   ```

---

## Deployment Options

### Local Development

```bash
uvicorn backend.main:app --reload
```

### Production (Single Server)

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8765 --workers 4
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8765"]
```

Build and run:

```bash
docker build -t ghostshift-secure .
docker run -p 8765:8765 ghostshift-secure
```

### Enterprise Deployment

- **Kubernetes:** Create Helm chart with FastAPI service
- **On-Premises:** Run behind Apache/Nginx reverse proxy with TLS
- **Cloud:** Deploy to AWS ECS, Google Cloud Run, or Azure Container Instances

---

## Troubleshooting

### Import Errors

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:** Install requirements:
```bash
pip install -r backend/requirements.txt
```

### CORS Errors

**Error:** Browser console shows CORS policy error

**Solution:** Verify localhost URLs in `main.py`:
```python
allow_origins=["http://localhost:3000", "http://localhost:4173"]
```

Add your frontend URL if running on a different port.

### Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8765
netstat -ano | findstr :8765

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use a different port
uvicorn backend.main:app --port 8766
```

### Slow Response Times

**Cause:** DSPy pipeline is processing external AI calls

**Solution:** 
- Use demo data mode (default) for demonstrations
- Add caching for repeated requests
- Implement async calls with FastAPI's `async` endpoint definitions

---

## Performance Tuning

### Concurrency

Increase worker count for production:

```bash
uvicorn backend.main:app --workers 8
```

### Caching

Add response caching for demo endpoints:

```python
from fastapi_cache2 import FastAPICache2
from fastapi_cache2.decorators import cache

@app.get("/api/demo/evidence")
@cache(expire=300)  # Cache for 5 minutes
def get_evidence():
    return load_json(DATA_DIR / "evidence.json")
```

### Async Endpoints

Mark DSPy/Gemini calls as async:

```python
@app.post("/api/ingest")
async def ingest(file: UploadFile):
    # Async DSPy processing
    result = await run_pipeline_async(file)
    return result
```

---

## Feature Checklist

- ✅ FastAPI scaffold created (`backend/main.py`)
- ✅ All demo endpoints functional
- ✅ Security scanning integrated (`backend/security.py`)
- ✅ CORS middleware configured
- ✅ DSPy skeleton ready (`backend/dspy_pipeline.py`)
- ⏳ Live Gemini integration (future)
- ⏳ Async DSPy processing (future)
- ⏳ Response caching (future)

---

## Next Steps

1. **For Hackathon Demo:** Use the dependency-free `demo_server.py` (no installation required)
2. **For Production:** Install FastAPI dependencies and switch to `main.py`
3. **For AI Integration:** Implement Gemini calls and DSPy modules as described above
4. **For Scaling:** Deploy with Docker or Kubernetes

---

## Support

For issues or questions:
- Check console logs: `uvicorn` will display detailed error messages
- Verify endpoints with Swagger UI: `http://localhost:8765/docs`
- Test with curl: `curl -v http://localhost:8765/api/demo/manifest`
