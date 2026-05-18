import re
from dataclasses import dataclass


@dataclass(frozen=True)
class Finding:
    finding_type: str
    severity: str
    action: str
    preview: str


@dataclass(frozen=True)
class ScanResult:
    sanitized_text: str
    findings: list[Finding]


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


def preview(value: str) -> str:
    if len(value) <= 12:
        return value
    return f"{value[:8]}...{value[-4:]}"


def scan_text(text: str) -> ScanResult:
    sanitized = text
    findings: list[Finding] = []

    for finding_type, severity, action, pattern, replacement in RULES:
        matches = list(pattern.finditer(sanitized))
        for match in matches:
            findings.append(
                Finding(
                    finding_type=finding_type,
                    severity=severity,
                    action=action,
                    preview=preview(match.group(0)),
                )
            )
        sanitized = pattern.sub(replacement, sanitized)

    return ScanResult(sanitized_text=sanitized, findings=findings)
