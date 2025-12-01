# Framework V2 Implementation Plan

## Executive Summary
Rebuild the Salesforce Claude Code Framework as a clean, installable package with guided setup. Remove all Salesforce-specific sub-agents (skills are more efficient), remove bundled skills (user brings their own), and add an interactive setup flow that scans for existing skills.

## Goals
1. Clean, portable framework with no hardcoded paths
2. Guided setup experience for new users
3. No bundled skills - detect and integrate user's existing skills
4. Keep only generic, reusable agents (strategic-plan-architect, test-class-generator)
5. Enhanced hook detection for Salesforce development
6. Professional documentation for enterprise teams

## Components to Remove

### Sub-Agents (Salesforce-specific)
- [ ] `agentforce-debugger.md` - Remove (skills handle this better)
- [ ] `apex-code-reviewer.md` - Remove (skills handle this better)

### Commands (Broken)
- [x] `framework.md` - Already removed (had hardcoded paths)
- [x] `framework-update.md` - Already removed (had hardcoded paths)

### Other Files
- [x] `.vscode/settings.json` - Already removed (user-specific)
- [ ] `.claude/skills/apex-best-practices.md` - Remove (was just created, shouldn't bundle skills)

## Components to Create

### Setup System
- [ ] `setup.md` - Interactive setup command/guide
- [ ] `setup-wizard.ts` - Hook or script for guided setup
- [ ] Skill scanner - Detect existing skills in user's environment

### Documentation
- [ ] `README.md` - Rewrite for guided setup flow
- [ ] `SETUP_GUIDE.md` - Update for new setup process
- [ ] Remove `AUDIT.md` from final repo (internal doc)

## Components to Modify

### Hooks
- [ ] `stopEvent.ts` - Enhance anti-pattern detection
- [ ] `userPromptSubmit.ts` - Update to work without bundled skills
- [ ] `skill-rules.json` - Make it a template users customize

### Agents to Keep (Generic)
- [ ] `strategic-plan-architect.md` - Keep (generic planning)
- [ ] `test-class-generator.md` - Keep (useful utility)

### Templates
- [ ] Keep all dev doc templates (they're generic)

## Technical Approach

### Guided Setup Flow
1. User clones/copies repo to project
2. User runs setup (command or manual steps)
3. Setup asks: "Scan for existing skills? (Y/n)"
4. If yes, scans common skill locations:
   - `~/.claude/skills/`
   - `.claude/skills/` in project
   - User-specified paths
5. Generates customized `skill-rules.json` based on found skills
6. Reports what was configured

### Skill Detection Logic
```
Scan directories for *.md files
Parse each for skill-like structure (# Title, ## sections)
Extract skill name from filename or title
Add to skill-rules.json with default triggers
```

## Project Structure (Final)
```
.
├── .claude/
│   ├── agents/
│   │   ├── strategic-plan-architect.md
│   │   └── test-class-generator.md
│   ├── commands/
│   │   ├── dev-docs.md
│   │   ├── dev-docs-update.md
│   │   └── setup.md (NEW)
│   └── hooks/
│       ├── skill-rules.json (template)
│       ├── stopEvent.ts (enhanced)
│       └── userPromptSubmit.ts
├── dev/
│   ├── active/
│   └── templates/
├── CLAUDE.md
├── README.md
└── SETUP_GUIDE.md
```

## Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Users don't have skills | Document where to get/create them |
| Skill scanner misses skills | Allow manual configuration |
| Too complex setup | Keep it simple, single command |

## Success Criteria
- [ ] Framework installs cleanly on any machine
- [ ] Setup guides user through configuration
- [ ] No Salesforce-specific agents bundled
- [ ] No skills bundled
- [ ] Enhanced hook detection working
- [ ] Documentation is clear and complete
