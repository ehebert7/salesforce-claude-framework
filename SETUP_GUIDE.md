# Setup Guide

## Quick Start

1. **Copy framework to your project:**
   ```bash
   cp -r .claude /path/to/your/project/
   cp -r dev /path/to/your/project/
   cp CLAUDE.md /path/to/your/project/
   ```

2. **Start using it:**
   ```
   "Create an Apex trigger for Account that validates email addresses"
   ```

That's it! The framework will automatically suggest relevant skills based on your prompts.

## What You Get

### Skill Auto-Suggestion Hooks

The hooks in `.claude/hooks/` analyze your prompts and suggest skills:

**userPromptSubmit.ts** - Runs before Claude sees your message:
- Scans for keywords like "apex", "trigger", "lwc", "flow"
- Suggests relevant skills if installed

**stopEvent.ts** - Runs after Claude edits files:
- Shows self-check reminders for common patterns
- Example: After editing `.cls` → reminds about bulkification

### Slash Commands

| Command | What It Does |
|---------|--------------|
| `/dev-docs` | Creates implementation docs in `dev/active/[task-name]/` |
| `/dev-docs-update` | Updates progress docs before ending session |

### Specialized Agents

| Agent | When to Use |
|-------|-------------|
| `apex-code-reviewer` | Before deploying Apex code |
| `test-class-generator` | Need test coverage |
| `agentforce-debugger` | Agent not responding correctly |
| `strategic-plan-architect` | Planning large features |

### Dev Docs Templates

Located in `dev/templates/`:
- `plan-template.md` - Implementation roadmap
- `context-template.md` - Key decisions and state
- `tasks-template.md` - Granular task tracking

## Example Workflows

### Apex Development

**Prompt:**
```
"Create a batch class to update account records"
```

**What happens:**
1. Hook detects: "batch", "class", "account"
2. Suggests: `apex-best-practices` skill (if installed)
3. After editing `.cls` file, shows:
   ```
   APEX SELF-CHECK
   - Is the code bulkified for 200+ records?
   - Are SOQL queries outside of loops?
   - Is there a test class with 85%+ coverage?
   ```

### LWC Development

**Prompt:**
```
"Build a Lightning component to search contacts"
```

**What happens:**
1. Detects: "Lightning", "component"
2. Suggests: `lwc-dev-guidelines` skill (if installed)
3. After editing LWC files, shows:
   ```
   LWC SELF-CHECK
   - Is there error handling for Apex calls?
   - Are loading states handled?
   - Are console.log statements removed?
   ```

### Large Feature Development

**Prompt:**
```
"Build a custom approval process for opportunities over $100k"
```

**Workflow:**
1. Claude creates a plan
2. You run `/dev-docs` to create tracking docs
3. Work through the implementation
4. Before ending: `/dev-docs-update`
5. Next session: Claude reads `dev/active/` and continues

## Customization

### Add Skill Triggers

Edit `.claude/hooks/skill-rules.json` to add your own keywords:

```json
{
  "my-custom-skill": {
    "promptTriggers": {
      "keywords": ["my-keyword", "another-keyword"]
    }
  }
}
```

### Create Custom Agent

Add a markdown file to `.claude/agents/`:

```markdown
# My Agent

## Purpose
What it does

## Process
1. Step one
2. Step two
```

### Customize CLAUDE.md

Update `CLAUDE.md` with your org-specific:
- Architecture patterns
- Naming conventions
- Custom object names
- Integration endpoints

## Skill Installation

This framework *suggests* skills but doesn't include them. Install skills separately:

1. **Check Claude Code's built-in skills** - Some may already exist
2. **Create custom skills** - Add markdown files following Claude Code's skill format
3. **Use community skills** - Search for Salesforce-specific skills

### Skill Names Referenced

The `skill-rules.json` references these skill names:
- `apex-best-practices`
- `salesforce-flow-architect`
- `lwc-dev-guidelines`
- `salesforce-cli`
- `salesforce-agent-dx`
- `salesforce-testing-api`
- `salesforce-integration-patterns`
- `salesforce-shield-security`
- `agentforce-service-agent-setup`
- `agentforce-service-agent-topics-actions`
- `agentforce-service-agent-data-knowledge`
- `agentforce-service-agent-testing-optimization`
- `agentforce-service-agent-monitoring-analytics`

If a skill isn't installed, the suggestion simply won't activate.

## Troubleshooting

### Hooks Not Running

1. Verify files exist in `.claude/hooks/`
2. Check `skill-rules.json` is valid JSON:
   ```bash
   python3 -c "import json; json.load(open('.claude/hooks/skill-rules.json'))"
   ```

### Skills Not Suggesting

1. Verify the skill is installed in Claude Code
2. Try explicit activation: `"Use apex-best-practices skill to create a trigger"`

### Slash Commands Not Found

1. Verify `.md` files exist in `.claude/commands/`
2. Restart Claude Code session

## File Reference

| File | Purpose |
|------|---------|
| `.claude/hooks/skill-rules.json` | Keyword → skill mappings |
| `.claude/hooks/userPromptSubmit.ts` | Pre-prompt analyzer |
| `.claude/hooks/stopEvent.ts` | Post-edit reminders |
| `.claude/commands/*.md` | Slash command definitions |
| `.claude/agents/*.md` | Specialized agent prompts |
| `dev/templates/*.md` | Documentation templates |
| `CLAUDE.md` | Project instructions for Claude |
