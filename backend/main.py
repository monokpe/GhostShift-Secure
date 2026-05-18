from pathlib import Path
from typing import Any

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from security import scan_text
from storage import load_json, load_jsonl, read_text


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "novatech"

app = FastAPI(title="GhostShift Secure API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:4173"],
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
async def ingest(files: list[UploadFile]) -> dict[str, Any]:
    scanned_files = []
    security_events = []

    for file in files:
        content = (await file.read()).decode("utf-8", errors="replace")
        scan_result = scan_text(content)
        scanned_files.append(
            {
                "filename": file.filename,
                "bytes": len(content.encode("utf-8")),
                "sanitized_preview": scan_result.sanitized_text[:500],
                "finding_count": len(scan_result.findings),
            }
        )
        security_events.extend(
            {
                "filename": file.filename,
                "finding_type": finding.finding_type,
                "severity": finding.severity,
                "action": finding.action,
                "preview": finding.preview,
            }
            for finding in scan_result.findings
        )

    return {
        "status": "accepted",
        "pipeline": [
            "parsed_sources",
            "security_filter_complete",
            "ready_for_recursive_analysis",
        ],
        "files": scanned_files,
        "security_events": security_events,
    }
