# NovaTech Incident Reports

## INC-2026-0501-A - Migration Cutover Service Degradation

Start: 2026-05-01 09:52 UTC

End: 2026-05-01 13:18 UTC

Severity: SEV-1

Affected systems:

- Payment retry service
- Enterprise onboarding workflow
- Admin provisioning console

Summary:

After the infrastructure migration cutover, eu-west queue latency increased sharply. Payment retry service began returning intermittent 502 errors. Enterprise onboarding workflows stalled when account provisioning waited on retry confirmation.

Contributing factors:

- Retry policy changed during the migration window.
- Rollback ownership was unclear between platform and application teams.
- Migration flag was promoted globally before rollback validation completed.
- Customer operations did not receive a consolidated impact summary until after executive escalations began.

Resolution:

Emergency hotfix restored partial retry behavior. Full rollback was deferred because migration flag dependencies had already propagated.

Residual risk:

Additional customer onboarding failures are likely until retry patch and migration flag behavior are tested together under production-like load.

## INC-2026-0502-B - Enterprise Onboarding SLA Breach

Start: 2026-05-02 07:40 UTC

End: Ongoing

Severity: SEV-2

Affected customers:

- ArdentBank
- BlueRidge Health
- CedarWorks

Summary:

Three enterprise customers breached onboarding SLA commitments after provisioning workflows repeatedly stalled. Support volume rose above baseline and multiple customers requested executive-facing incident explanations.

Contributing factors:

- Support updates were split across customer operations, release coordination, and platform migration channels.
- QA could not certify the hotfix while queue behavior remained unstable.
- Reopened Jira defects created uncertainty about whether the release train could resume.

Resolution:

Manual provisioning workaround started for the highest-value accounts. Customer communications remain reactive.

Residual risk:

Revenue exposure is increasing because at least one customer requested refunds and another raised churn risk.

