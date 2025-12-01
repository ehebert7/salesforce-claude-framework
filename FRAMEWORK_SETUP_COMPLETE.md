# Framework Setup Complete! 🚀

## What Was Created

You now have **TWO** setups:

### 1. Master Framework Repository
**Location:** `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/`

This is your **source of truth** for the framework.

```
claude-framework-master/
├── setup-global.sh          # Run this to install globally (Mac/Linux)
├── setup-global.bat         # Run this to install globally (Windows)
├── QUICKSTART.md           # 2-minute getting started guide
├── README.md               # Full documentation
├── SETUP_GUIDE.md          # Complete workflow examples
├── CLAUDE.md               # Salesforce patterns reference
├── .claude/
│   ├── hooks/
│   │   ├── skill-rules.json        # 13 skill triggers
│   │   ├── userPromptSubmit.ts     # Pre-prompt analyzer
│   │   └── stopEvent.ts            # Post-edit checker
│   ├── agents/
│   │   ├── apex-code-reviewer.md
│   │   ├── test-class-generator.md
│   │   ├── agentforce-debugger.md
│   │   └── strategic-plan-architect.md
│   └── commands/
│       ├── dev-docs.md
│       ├── dev-docs-update.md
│       ├── framework.md
│       └── framework-update.md
└── dev/
    ├── active/
    └── templates/
```

### 2. DEVTOOLS Project (This Folder)
**Location:** `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/DEVTOOLS/`

Already has the framework installed and **ready to use**.

---

## Quick Start - Choose Your Path

### Path A: Use Framework Globally (RECOMMENDED)

**Step 1: Run Global Setup**

Windows:
```bash
cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master"
setup-global.bat
```

Mac/Linux:
```bash
cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master"
./setup-global.sh
```

**Step 2: Use in ANY Project**

Navigate to any Salesforce project in Claude Code and type:
```
/framework
```

✅ Framework instantly installed!

---

### Path B: Use Framework Per-Project Only

In any project via Claude Code:
```
/framework
```

This copies framework from master repository to current project.

---

## New Slash Commands Available

### `/framework`
**What:** Installs framework in current project from master repository
**When:** First time in a new project
**Example:**
```
User: /framework
Claude: [copies hooks, agents, commands, templates]
```

### `/framework-update`
**What:** Syncs changes FROM current project TO master repository
**When:** You improved hooks/agents and want to share with other projects
**Example:**
```
# After editing .claude/hooks/skill-rules.json with better triggers
User: /framework-update
Claude: [updates master repository with your changes]
```

### `/dev-docs`
**What:** Creates implementation tracking docs
**When:** Starting a large/complex feature
**Example:**
```
User: Build opportunity forecasting system
Claude: [creates plan]
User: /dev-docs
Claude: [creates dev/active/opportunity-forecasting/ with tracking files]
```

### `/dev-docs-update`
**What:** Updates context before ending session
**When:** Before closing Claude or switching tasks
**Example:**
```
User: /dev-docs-update
Claude: [updates context with progress, next steps]
```

---

## Test It Right Now in DEVTOOLS

The framework is **already active** in this folder. Try:

```
"Create an Apex trigger for Account that validates email addresses before insert"
```

**Expected behavior:**
1. Hook detects "apex", "trigger", "account"
2. Suggests `apex-best-practices` skill
3. Generates bulkified code
4. After edit, shows self-check reminder

---

## Framework Features

### Auto-Activation Hooks

**Before Claude sees your prompt:**
- Analyzes keywords: "apex", "trigger", "lwc", "flow", etc.
- Suggests relevant skills automatically
- Example: "build lightning component" → suggests `lwc-dev-guidelines`

**After Claude edits files:**
- Scans for anti-patterns (SOQL in loops, hardcoded IDs, etc.)
- Shows self-check reminders:
  ```
  APEX SELF-CHECK
  ? Is code bulkified for 200+ records?
  ? Are SOQL queries outside loops?
  ? Is there a test class with 85%+ coverage?
  ```

### Specialized Agents

| Agent | Use Case |
|-------|----------|
| **apex-code-reviewer** | Pre-deployment review of Apex code |
| **test-class-generator** | Generate comprehensive test classes (85%+ coverage) |
| **agentforce-debugger** | Troubleshoot Agentforce agent issues |
| **strategic-plan-architect** | Plan large features before coding |

### Dev Docs System

Prevents context loss during long implementations.

**Templates:**
- `plan-template.md` - Implementation roadmap
- `context-template.md` - Key decisions, current state, next steps
- `tasks-template.md` - Granular task tracking

**Workflow:**
1. Start large task
2. Run `/dev-docs` → creates tracking files
3. Claude updates docs as work progresses
4. Run `/dev-docs-update` before ending session
5. Next session: Claude reads context and resumes

---

## Supported Skills (13 Total)

### Agentforce (5)
- ✅ agentforce-service-agent-setup
- ✅ agentforce-service-agent-topics-actions
- ✅ agentforce-service-agent-data-knowledge
- ✅ agentforce-service-agent-testing-optimization
- ✅ agentforce-service-agent-monitoring-analytics

### Salesforce Development (5)
- ✅ apex-best-practices
- ✅ salesforce-flow-architect
- ✅ salesforce-cli
- ✅ salesforce-agent-dx
- ✅ salesforce-testing-api

### Additional Skills (3)
**NOTE: Require manual creation via Skill Seekers**

- ⚠️ lwc-dev-guidelines (triggers configured, skill needs creation)
- ⚠️ salesforce-shield-security (triggers configured, skill needs creation)
- ⚠️ salesforce-integration-patterns (triggers configured, skill needs creation)

**To create these skills:**
```bash
cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/Skill_Seekers"

# Create LWC skill
python3 doc_scraper.py --name lwc-dev-guidelines \
  --url https://developer.salesforce.com/docs/component-library/documentation/en/lwc \
  --enhance-local

# Create Shield skill
python3 doc_scraper.py --name salesforce-shield-security \
  --url https://help.salesforce.com/s/articleView?id=sf.security_pe_overview.htm \
  --enhance-local

# Create Integration skill
python3 doc_scraper.py --name salesforce-integration-patterns \
  --url https://developer.salesforce.com/docs/atlas.en-us.integration_patterns_and_practices.meta/integration_patterns_and_practices/ \
  --enhance-local
```

---

## Complete Workflow Example

### Scenario: Build Custom Opportunity Management System

**1. Setup Project**
```bash
cd /path/to/salesforce-project
```

In Claude Code:
```
/framework
```

**2. Start Feature**
```
User: "Build a custom opportunity management system with:
- Apex trigger for validation
- LWC component for opportunity dashboard
- Screen Flow for approval process
- Test coverage for all components"
```

**3. Plan It**
```
Claude: "This is a large task. Let me create implementation docs."
User: /dev-docs
Claude: [Creates dev/active/opp-management/]
```

**4. Build - Phase 1: Apex Trigger**
```
User: "Start with the opportunity trigger"
Claude: [apex-best-practices auto-suggested]
        [Creates OpportunityTrigger.trigger with bulkified code]
        [Shows Apex self-check after edit]
```

**5. Build - Phase 2: Test Class**
```
User: "Generate test class"
Claude: [test-class-generator agent activates]
        [Creates OpportunityTriggerTest.cls with 200+ record tests]
```

**6. Build - Phase 3: LWC Component**
```
User: "Create the dashboard component"
Claude: [lwc-dev-guidelines auto-suggested]
        [Creates opportunityDashboard component]
        [Shows LWC self-check after edit]
```

**7. Build - Phase 4: Flow**
```
User: "Build the approval screen flow"
Claude: [salesforce-flow-architect auto-suggested]
        [Creates Opportunity_Approval flow with best practices]
        [Shows Flow self-check]
```

**8. Pre-Deployment Review**
```
User: "Review all code before deployment"
Claude: [apex-code-reviewer agent activates]
        [Checks bulkification, governor limits, security, test coverage]
```

**9. End of Day**
```
User: /dev-docs-update
Claude: [Updates dev/active/opp-management/context.md with:
        - What's completed
        - Current state
        - Next steps: Deploy to sandbox, run tests]
```

**10. Next Day**
```
User: "Let's continue the opportunity management work"
Claude: [Reads dev/active/opp-management/]
        "I see we completed Apex, tests, LWC, and Flow.
         Next: Deploy to sandbox and run full test suite."
```

**11. Deployment**
```
User: "Deploy to dev sandbox"
Claude: [salesforce-cli skill auto-suggested]
        [Provides deployment commands]
```

---

## Customization

### Add Org-Specific Patterns

Edit `.claude/hooks/skill-rules.json` in any project:

```json
{
  "apex-best-practices": {
    "promptTriggers": {
      "keywords": [
        "apex",
        "trigger",
        "MyCompanyFramework",    // Add your framework
        "MyOrgNamingPattern"     // Add org patterns
      ]
    }
  }
}
```

Save changes, then:
```
/framework-update
```

Now all future projects will have your customizations!

### Create Custom Agent

Create `.claude/agents/my-deployment-checker.md`:

```markdown
# Deployment Checker Agent

## Purpose
Pre-deployment validation for my org

## Activation
Before deploying to production

## Process
1. Check all test classes run
2. Verify CRUD/FLS on all new fields
3. Check org-specific patterns
4. Validate against naming conventions

## Output
Go/No-Go decision with issues list
```

Then:
```
/framework-update
```

---

## File Locations Reference

| What | Where |
|------|-------|
| **Master Framework** | `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/` |
| **Global Install (after setup)** | `~/.claude-global/` or `%USERPROFILE%\.claude-global\` |
| **DEVTOOLS (this folder)** | `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/DEVTOOLS/` |
| **Any Project (after /framework)** | `.claude/`, `dev/`, `CLAUDE.md` in project root |

---

## Documentation

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | 2-minute getting started (in master repo) |
| **README.md** | Full framework documentation (in master repo) |
| **SETUP_GUIDE.md** | Complete workflow examples (in master repo) |
| **CLAUDE.md** | Salesforce patterns quick reference (in all projects) |
| **This File** | Setup completion summary |

---

## Next Steps

### Immediate (5 minutes)

1. ✅ Run global setup:
   ```bash
   cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master"
   ./setup-global.sh  # or setup-global.bat on Windows
   ```

2. ✅ Test in DEVTOOLS (already has framework):
   ```
   "Create an Apex trigger for Account"
   ```

3. ✅ Try `/framework` in another Salesforce project

### Short-term (1 hour)

4. ✅ Create the 3 missing skills via Skill Seekers

5. ✅ Customize skill-rules.json with org-specific terms

6. ✅ Test `/dev-docs` workflow with a real feature

### Long-term

7. ✅ Share framework with team

8. ✅ Create custom agents for org patterns

9. ✅ Version control master repository

---

## Troubleshooting

### `/framework` command not found

**Solution 1:** Manual copy
```bash
cd /your/project
~/.claude-global/apply-framework.sh  # Mac/Linux
%USERPROFILE%\.claude-global\apply-framework.bat  # Windows
```

**Solution 2:** Direct copy from master
```bash
cd /your/project
cp -r "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/.claude" .
cp -r "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/dev" .
cp "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/CLAUDE.md" .
```

### Hooks not running

**Check:**
```bash
# Verify files exist
ls -la .claude/hooks/

# Validate JSON
python3 -c "import json; json.load(open('.claude/hooks/skill-rules.json'))"

# Check permissions
chmod +x .claude/hooks/*.ts
```

### Skills not auto-suggesting

**Workaround:** Explicit activation
```
"I want to use apex-best-practices skill to create a trigger"
```

---

## Support & Updates

**Update master framework:**
```bash
cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master"
git pull  # if version controlled
```

**Sync improvements from projects:**
```
# In any project after making improvements
/framework-update
```

**Get latest framework in a project:**
```
/framework
```

---

## Summary

✅ **Master repository created** at `claude-framework-master/`
✅ **Global setup scripts ready** (`setup-global.sh` and `.bat`)
✅ **Slash commands created** (`/framework`, `/framework-update`, `/dev-docs`)
✅ **DEVTOOLS already has framework** (ready to test)
✅ **13 skills configured** (10 active, 3 need manual creation)
✅ **Documentation complete** (QUICKSTART, README, SETUP_GUIDE)

**You're ready to go! 🚀**

Start with:
```bash
cd "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master"
./setup-global.sh  # or setup-global.bat
```

Then in any project:
```
/framework
```
