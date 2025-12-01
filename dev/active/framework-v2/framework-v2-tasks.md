# Framework V2 Tasks

## Last Updated
2025-12-01

## Completed
- [x] Remove framework.md command (hardcoded paths)
- [x] Remove framework-update.md command (hardcoded paths)
- [x] Remove .vscode/settings.json (user-specific)
- [x] Create dev docs for this project

## In Progress
- [ ] Remove Salesforce-specific agents

## Remaining

### Cleanup
- [ ] Remove `agentforce-debugger.md`
- [ ] Remove `apex-code-reviewer.md`
- [ ] Remove `.claude/skills/` directory entirely
- [ ] Remove `AUDIT.md` from repo (keep locally for reference)

### Setup System
- [ ] Create `setup.md` command with guided flow
- [ ] Update `skill-rules.json` to be a customizable template
- [ ] Add skill scanning instructions to setup

### Hook Enhancement
- [ ] Add more Apex anti-patterns to stopEvent.ts
- [ ] Add more LWC checks to stopEvent.ts
- [ ] Add Flow checks to stopEvent.ts
- [ ] Test hook functionality

### Documentation
- [ ] Rewrite README.md for guided setup
- [ ] Update SETUP_GUIDE.md
- [ ] Update CLAUDE.md (remove skill references as "installed")
- [ ] Update project structure in docs

### Git/GitHub
- [ ] Stage all changes
- [ ] Commit with clear message
- [ ] Push to repository
- [ ] Verify README displays correctly on GitHub

## Blocked
(none)

## Notes
- Keep test-class-generator.md (generic, workflow-based)
- Keep strategic-plan-architect.md (generic, workflow-based)
- skill-rules.json stays but becomes a template/example
