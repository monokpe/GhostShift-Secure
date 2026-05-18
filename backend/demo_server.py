import json
import re
import sys
import warnings
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

warnings.simplefilter("ignore", DeprecationWarning)
import cgi
warnings.simplefilter("default", DeprecationWarning)


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "novatech"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

RULES = [
    (
        "api_key",
        "critical",
        "blocked_and_sanitized",
        re.compile(r"\b[A-Z]{2,8}_(?:live|test)_[A-Za-z0-9]{16,}\b"),
        "[REDACTED_API_KEY]",
    ),
    (
        "email",
        "medium",
        "tokenized",
        re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"),
        "[REDACTED_EMAIL]",
    ),
    (
        "password_assignment",
        "high",
        "blocked_and_sanitized",
        re.compile(r"(?i)\b(password|passwd|pwd)\s*[:=]\s*\S+"),
        "[REDACTED_PASSWORD]",
    ),
]


def load_json(name):
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))


def load_jsonl(name):
    return [
        json.loads(line)
        for line in (DATA_DIR / name).read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]


def preview(value):
    return value if len(value) <= 12 else f"{value[:8]}...{value[-4:]}"


def scan_text(text):
    sanitized = text
    findings = []
    for finding_type, severity, action, pattern, replacement in RULES:
        for match in pattern.finditer(sanitized):
            findings.append(
                {
                    "finding_type": finding_type,
                    "severity": severity,
                    "action": action,
                    "preview": preview(match.group(0)),
                }
            )
        sanitized = pattern.sub(replacement, sanitized)
    return sanitized, findings


class Handler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        routes = {
            "/api/demo/manifest": lambda: load_json("manifest.json"),
            "/api/demo/timeline": lambda: load_json("timeline_events.json"),
            "/api/demo/security-events": lambda: load_json("security_events.json"),
            "/api/demo/executive-insights": lambda: load_json("executive_insights.json"),
            "/api/demo/evidence": lambda: load_json("evidence.json"),
            "/api/demo/raw-sources": lambda: {
                "slack_logs": load_jsonl("slack_logs.jsonl"),
                "incident_reports": (DATA_DIR / "incident_reports.md").read_text(encoding="utf-8"),
            },
        }

        if path == "/api/demo/overview":
            insights = load_json("executive_insights.json")
            return self.send_json(
                {
                    "organization": insights["organization"],
                    "risk_score": insights["risk_score"],
                    "confidence": insights["confidence"],
                    "risk_posture": insights["risk_posture"],
                    "headline": insights["headline"],
                    "detected_risks": insights["detected_risks"],
                    "business_impact": insights["business_impact"],
                }
            )

        if path not in routes:
            return self.send_json({"error": "not_found"}, 404)

        self.send_json(routes[path]())

    def do_POST(self):
        if urlparse(self.path).path != "/api/ingest":
            return self.send_json({"error": "not_found"}, 404)

        content_type = self.headers.get("Content-Type", "")
        length = int(self.headers.get("Content-Length", "0"))
        files = []
        security_events = []

        if "multipart/form-data" in content_type:
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={
                    "REQUEST_METHOD": "POST",
                    "CONTENT_TYPE": content_type,
                    "CONTENT_LENGTH": str(length),
                },
            )
            upload_items = form["files"] if "files" in form else []
            if not isinstance(upload_items, list):
                upload_items = [upload_items]

            for item in upload_items:
                content = item.file.read().decode("utf-8", errors="replace")
                sanitized, findings = scan_text(content)
                files.append(
                    {
                        "filename": item.filename,
                        "bytes": len(content.encode("utf-8")),
                        "sanitized_preview": sanitized[:500],
                        "finding_count": len(findings),
                    }
                )
                for finding in findings:
                    security_events.append({"filename": item.filename, **finding})
        else:
            content = self.rfile.read(length).decode("utf-8", errors="replace")
            sanitized, findings = scan_text(content)
            files.append(
                {
                    "filename": "raw_payload.txt",
                    "bytes": len(content.encode("utf-8")),
                    "sanitized_preview": sanitized[:500],
                    "finding_count": len(findings),
                }
            )
            security_events.extend({"filename": "raw_payload.txt", **finding} for finding in findings)

        self.send_json(
            {
                "status": "accepted",
                "pipeline": [
                    "parsed_sources",
                    "security_filter_complete",
                    "ready_for_recursive_analysis",
                ],
                "files": files,
                "security_events": security_events,
            }
        )


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"GhostShift demo API serving http://localhost:{PORT}/")
    server.serve_forever()
