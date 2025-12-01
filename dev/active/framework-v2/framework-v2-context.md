# Framework V2 Context

## Last Updated
2025-12-01

## Project Information
- Repo: https://github.com/ehebert7/salesforce-claude-framework
- Goal: Enterprise-ready Claude Code framework with guided setup

## Key Design Decisions

### 1. No Bundled Skills
**Decision:** Don't include skills in the repo
**Rationale:**
- Users have varying skill sets
- Skills are personal/team configurations
- Keeps repo lightweight and generic
- Avoids maintenance burden of keeping skills updated

### 2. Remove Salesforce-Specific Agents
**Decision:** Remove `agentforce-debugger` and `apex-code-reviewer`
**Rationale:**
- Skills are more efficient for knowledge/guidance
- Agents should be reserved for multi-step workflows
- Keeps framework generic (not locked to Salesforce)

### 3. Guided Setup
**Decision:** Add interactive setup that scans for skills
**Rationale:**
- Better user experience
- Automatically configures skill-rules.json
- Reduces manual configuration errors

### 4. Keep Generic Agents
**Decision:** Keep `strategic-plan-architect` and `test-class-generator`
**Rationale:**
- These are workflow-based (not just knowledge)
- Useful across any Salesforce project
- Don't overlap with skills

## Current State
All major changes implemented:
- Removed broken commands
- Removed Salesforce-specific agents
- Removed skills directory (users bring their own)
- Created /setup command with guided flow
- Enhanced stopEvent.ts with comprehensive checks
- Updated skill-rules.json as configurable template
- Rewrote all documentation

## Files Changed
- Removed: `.claude/commands/framework.md`
- Removed: `.claude/commands/framework-update.md`
- Removed: `.claude/agents/agentforce-debugger.md`
- Removed: `.claude/agents/apex-code-reviewer.md`
- Removed: `.vscode/settings.json`
- Removed: `.claude/skills/` directory
- Removed: `AUDIT.md`
- Created: `.claude/commands/setup.md`
- Updated: `.claude/hooks/stopEvent.ts` (enhanced)
- Updated: `.claude/hooks/skill-rules.json` (template format)
- Updated: `README.md`
- Updated: `SETUP_GUIDE.md`
- Updated: `CLAUDE.md`

## Next Steps
1. Commit and push changes
2. Verify GitHub README displays correctly
3. Test /setup command

## Important Notes
- skill-rules.json should remain as a TEMPLATE showing structure
- Users customize it based on their installed skills
- Setup wizard should help generate this automatically
