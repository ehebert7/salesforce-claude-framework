# Claude Code Framework - Setup Guide

## Quick Start (This Project)

The framework is **already active** in this DEVTOOLS folder. Just start coding!

### Test It Out

Try one of these prompts to see the framework in action:

1. **Apex Development:**
   ```
   "Create an Apex trigger for the Account object that validates email addresses"
   ```
   Watch: `apex-best-practices` skill auto-suggested

2. **LWC Development:**
   ```
   "Create a Lightning Web Component to display account details"
   ```
   Watch: `lwc-dev-guidelines` skill auto-suggested

3. **Flow Design:**
   ```
   "Design a screen flow for case creation"
   ```
   Watch: `salesforce-flow-architect` skill auto-suggested

4. **Large Task:**
   ```
   "Help me implement a full opportunity management feature with custom objects, triggers, and LWC components"
   ```
   Use: `/dev-docs` command to create implementation tracking docs

---

## Copy to Another Project

### Quick Copy Command

```bash
# From another project directory, run:
cp -r "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/DEVTOOLS/.claude" .
cp -r "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/DEVTOOLS/dev" .
cp "c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/DEVTOOLS/CLAUDE.md" .
```

### What Gets Copied
- `.claude/` - Hooks, agents, commands
- `dev/` - Documentation templates
- `CLAUDE.md` - Project reference

---

## Create Global Setup (Recommended)

For framework across ALL projects without copying:

### Step 1: Create Global Config Location

```bash
# Windows
mkdir -p ~/.claude-global/hooks
mkdir -p ~/.claude-global/agents
mkdir -p ~/.claude-global/commands

# Copy files
cp .claude/hooks/* ~/.claude-global/hooks/
cp .claude/agents/* ~/.claude-global/agents/
cp .claude/commands/* ~/.claude-global/commands/
```

### Step 2: Update Claude Code Settings

Add to your Claude Code `settings.json`:

```json
{
  "claude.globalHooksPath": "~/.claude-global/hooks",
  "claude.globalAgentsPath": "~/.claude-global/agents",
  "claude.globalCommandsPath": "~/.claude-global/commands"
}
```

**Note:** Check Claude Code docs for exact setting names (this is conceptual)

---

## Framework Components

### 1. Auto-Activation Hooks

**userPromptSubmit.ts** (runs BEFORE Claude sees your message)
- Analyzes your prompt for keywords
- Suggests relevant skills automatically
- Example: "apex trigger" → suggests `apex-best-practices`

**stopEvent.ts** (runs AFTER Claude responds)
- Checks edited files for anti-patterns
- Shows self-check reminders
- Example: Edited `.cls` file → reminds about bulkification

### 2. Slash Commands

| Command | Purpose |
|---------|---------|
| `/dev-docs` | Create implementation tracking docs |
| `/dev-docs-update` | Update progress before session ends |

**Usage:**
```
User: "Create inventory management system"
Claude: [creates plan]
User: "/dev-docs"
Claude: [creates dev/active/inventory-mgmt/ with tracking files]
```

### 3. Specialized Agents

| Agent | When to Use |
|-------|-------------|
| `apex-code-reviewer` | Before deploying Apex code |
| `test-class-generator` | Need comprehensive test coverage |
| `agentforce-debugger` | Agentforce agent not responding correctly |
| `strategic-plan-architect` | Planning large features |

**Usage:**
```
User: "Review this Apex class for governor limits"
[Agent: apex-code-reviewer activates]
```

### 4. Dev Docs System

Prevents context loss during long implementations.

**Templates:**
- `plan-template.md` - Implementation roadmap
- `context-template.md` - Key decisions and state
- `tasks-template.md` - Granular task tracking

**Example Flow:**
1. Start: "Build opportunity forecasting feature"
2. Use: `/dev-docs` to create tracking
3. Work: Claude updates docs as you go
4. Resume: Next session, read `dev/active/opportunity-forecasting/` to restore context

---

## Skill Auto-Activation Examples

### Example 1: Apex Development

**Your prompt:**
```
"Create a batch class to update account records"
```

**What happens:**
1. `userPromptSubmit.ts` detects keywords: "batch", "class", "account"
2. Suggests: `apex-best-practices` skill
3. Claude uses skill guidance for bulkification patterns
4. You edit the `.cls` file
5. `stopEvent.ts` runs self-check:
   ```
   APEX SELF-CHECK
   ? Is the code bulkified for 200+ records?
   ? Are SOQL queries outside of loops?
   ? Is there a test class with 85%+ coverage?
   ```

### Example 2: LWC Development

**Your prompt:**
```
"Build a Lightning component to search contacts"
```

**What happens:**
1. Detects: "Lightning", "component"
2. Suggests: `lwc-dev-guidelines` skill
3. Claude follows LWC best practices
4. After editing `.js` file in `/lwc/`:
   ```
   LWC SELF-CHECK
   ? Is there error handling for Apex calls?
   ? Are loading states handled?
   ? Are console.log statements removed?
   ```

### Example 3: Integration Work

**Your prompt:**
```
"Create a REST callout to external API"
```

**What happens:**
1. Detects: "REST", "callout", "api"
2. Suggests: `salesforce-integration-patterns` skill
3. Guides on Named Credentials, async patterns
4. Checks for `@future(callout=true)` patterns

---

## Complete Workflow Example

### Scenario: Build Custom Approval Process

**Step 1: Initial Request**
```
User: "Help me build a custom approval process for opportunities over $100k with Apex and LWC"
```

**Step 2: Planning**
```
Claude: "This is a large task. Let me create implementation docs."
[Uses /dev-docs to create dev/active/custom-approval/]

Created:
- custom-approval-plan.md (what to build)
- custom-approval-context.md (decisions made)
- custom-approval-tasks.md (task tracking)
```

**Step 3: Development**
```
User: "Let's start with the Apex trigger"
Claude: [Uses apex-best-practices skill]
[Creates OpportunityTrigger.trigger]
[stopEvent.ts shows Apex self-check]
```

**Step 4: Testing**
```
User: "Generate test class"
Claude: [Uses test-class-generator agent]
[Creates OpportunityTriggerTest.cls with 200+ record bulk tests]
```

**Step 5: LWC Component**
```
User: "Create the approval UI component"
Claude: [Uses lwc-dev-guidelines skill]
[Creates approvalManager component]
[stopEvent.ts shows LWC self-check]
```

**Step 6: Session End**
```
User: "/dev-docs-update"
Claude: [Updates context with progress, next steps]
```

**Step 7: Resume Next Day**
```
User: "Let's continue the approval process work"
Claude: [Reads dev/active/custom-approval/custom-approval-context.md]
"I see we completed the trigger and LWC. Next: Create approval Flow"
```

---

## Advanced: Customize for Your Org

### Add Custom Keywords

Edit `.claude/hooks/skill-rules.json`:

```json
{
  "apex-best-practices": {
    "promptTriggers": {
      "keywords": [
        "apex", "trigger",
        "myCustomFramework",  // Add your framework name
        "myOrgPattern"        // Add org-specific terms
      ]
    }
  }
}
```

### Create Custom Agent

Create `.claude/agents/my-custom-agent.md`:

```markdown
# My Custom Agent

## Purpose
[What it does]

## Activation
[When to use it]

## Process
1. [Step 1]
2. [Step 2]

## Output
[What it produces]
```

---

## Troubleshooting

### Hooks Not Running

**Check:**
1. Are `.ts` files in `.claude/hooks/`?
2. Is `skill-rules.json` valid JSON?
   ```bash
   python3 -c "import json; json.load(open('.claude/hooks/skill-rules.json'))"
   ```

### Skills Not Activating

**Check:**
1. Are skill names in `skill-rules.json` exact matches?
2. Try explicit keyword: "I want to use apex-best-practices skill"

### Slash Commands Not Found

**Check:**
1. Are `.md` files in `.claude/commands/`?
2. Try: `/help` to see available commands

---

## Next Steps

### Immediate Actions

1. **Test the framework** with a simple prompt
2. **Create the 3 missing skills** (see CLAUDE.md)
3. **Customize skill-rules.json** for your org-specific terms

### Long-term Setup

1. **Copy to active Salesforce projects**
2. **Train team** on `/dev-docs` workflow
3. **Extend agents** for org-specific patterns

---

## Reference

| File | Purpose |
|------|---------|
| `.claude/hooks/skill-rules.json` | Auto-activation triggers |
| `.claude/hooks/userPromptSubmit.ts` | Pre-prompt analyzer |
| `.claude/hooks/stopEvent.ts` | Post-edit self-checker |
| `.claude/commands/*.md` | Slash commands |
| `.claude/agents/*.md` | Specialized agents |
| `dev/templates/*.md` | Documentation templates |
| `CLAUDE.md` | Quick reference |

---

## Support

**Documentation:**
- Claude Code: /help
- Skills: Check individual SKILL.md files
- Framework: This guide

**Common Issues:**
- Hooks not running → Check file permissions
- Skills not suggesting → Check skill-rules.json syntax
- Commands not found → Check .claude/commands/ location
