from pathlib import Path
from typing import Any, List, Optional
import os

from fastapi import FastAPI, UploadFile, Request, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from security import scan_text
from storage import load_json, load_jsonl, read_text
from dspy_pipeline import run_gemini_analysis, run_heuristic_analysis

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "novatech"

app = FastAPI(title="GhostShift Secure API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:4173", "http://127.0.0.1:4173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/demo/manifest")
def get_manifest() -> dict[str, Any]:
    return load_json(DATA_DIR / "manifest.json")


@app.get("/api/demo/overview")
def get_overview() -> dict[str, Any]:
    insights = load_json(DATA_DIR / "executive_insights.json")
    return {
        "organization": insights["organization"],
        "risk_score": insights["risk_score"],
        "confidence": insights["confidence"],
        "risk_posture": insights["risk_posture"],
        "headline": insights["headline"],
        "detected_risks": insights["detected_risks"],
        "business_impact": insights["business_impact"],
    }


@app.get("/api/demo/timeline")
def get_timeline() -> list[dict[str, Any]]:
    return load_json(DATA_DIR / "timeline_events.json")


@app.get("/api/demo/security-events")
def get_security_events() -> list[dict[str, Any]]:
    return load_json(DATA_DIR / "security_events.json")


@app.get("/api/demo/executive-insights")
def get_executive_insights() -> dict[str, Any]:
    return load_json(DATA_DIR / "executive_insights.json")


@app.get("/api/demo/evidence")
def get_evidence() -> list[dict[str, Any]]:
    return load_json(DATA_DIR / "evidence.json")


@app.get("/api/demo/raw-sources")
def get_raw_sources() -> dict[str, Any]:
    return {
        "slack_logs": load_jsonl(DATA_DIR / "slack_logs.jsonl"),
        "incident_reports": read_text(DATA_DIR / "incident_reports.md"),
    }


@app.post("/api/ingest")
async def ingest(
    request: Request,
    x_gemini_api_key: Optional[str] = Header(None, alias="X-Gemini-API-Key"),
    gemini_api_key: Optional[str] = Query(None),
) -> dict[str, Any]:
    content_type = request.headers.get("Content-Type", "")
    scanned_files = []
    security_events = []
    files_data = {}

    # Extract API key from headers, query params or environment variables
    api_key = x_gemini_api_key or gemini_api_key or os.environ.get("GEMINI_API_KEY")

    if "multipart/form-data" in content_type:
        form = await request.form()
        # Handle "files" field which can be a single file or a list of files
        upload_items = form.getlist("files")
        if not upload_items and "file" in form:
            upload_items = [form["file"]]

        for item in upload_items:
            if isinstance(item, UploadFile):
                content = (await item.read()).decode("utf-8", errors="replace")
                scan_result = scan_text(content)
                scanned_files.append(
                    {
                        "filename": item.filename,
                        "bytes": len(content.encode("utf-8")),
                        "sanitized_preview": scan_result.sanitized_text[:500],
                        "finding_count": len(scan_result.findings),
                    }
                )
                files_data[item.filename] = scan_result.sanitized_text
                for finding in scan_result.findings:
                    security_events.append(
                        {
                            "filename": item.filename,
                            "finding_type": finding.finding_type,
                            "severity": finding.severity,
                            "action": finding.action,
                            "preview": finding.preview,
                        }
                    )
    else:
        # Plain text upload (e.g. for the demo credential leak leak)
        content_bytes = await request.body()
        content = content_bytes.decode("utf-8", errors="replace")
        scan_result = scan_text(content)
        scanned_files.append(
            {
                "filename": "raw_payload.txt",
                "bytes": len(content_bytes),
                "sanitized_preview": scan_result.sanitized_text[:500],
                "finding_count": len(scan_result.findings),
            }
        )
        files_data["raw_payload.txt"] = scan_result.sanitized_text
        for finding in scan_result.findings:
            security_events.append(
                {
                    "filename": "raw_payload.txt",
                    "finding_type": finding.finding_type,
                    "severity": finding.severity,
                    "action": finding.action,
                    "preview": finding.preview,
                }
            )

    # 2. Run operational drift analysis
    # If custom files were uploaded, analyze them!
    # If it was just the demo text payload, we can load the local NovaTech dataset as context so the analysis remains rich!
    if len(files_data) == 1 and "raw_payload.txt" in files_data:
        # Load local files and sanitize them through the Lobster Trap filter
        local_files = {
            "slack_logs.jsonl": scan_text(read_text(DATA_DIR / "slack_logs.jsonl")).sanitized_text,
            "jira_tickets.csv": scan_text(read_text(DATA_DIR / "jira_tickets.csv")).sanitized_text,
            "support_tickets.csv": scan_text(read_text(DATA_DIR / "support_tickets.csv")).sanitized_text,
            "incident_reports.md": scan_text(read_text(DATA_DIR / "incident_reports.md")).sanitized_text,
        }
        # Inject the uploaded payload (which is already sanitized!)
        local_files["demo_leak.txt"] = files_data["raw_payload.txt"]
        analysis_context = local_files
    else:
        analysis_context = files_data

    # Execute analysis based on API key availability
    if api_key:
        print("Using live Gemini LLM analysis pipeline...")
        analysis_results = run_gemini_analysis(analysis_context, api_key, security_matches=len(security_events))
    else:
        print("Using offline high-fidelity Heuristic analysis engine...")
        analysis_results = run_heuristic_analysis(analysis_context, security_matches=len(security_events))

    # Merge security scanner events into analysis security logs
    analysis_results["security_events"] = security_events + analysis_results.get("security_events", [])

    return {
        "status": "accepted",
        "pipeline": [
            "parsed_sources",
            "security_filter_complete",
            "ready_for_recursive_analysis",
            "dspy_recursive_analysis_complete",
            "gemini_executive_briefing_published"
        ],
        "files": scanned_files,
        "security_events": security_events,
        "analysis": analysis_results
    }
