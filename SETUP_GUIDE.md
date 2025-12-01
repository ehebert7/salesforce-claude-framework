# Setup Guide

## Quick Start

1. **Copy framework to your project:**
   ```bash
   cp -r .claude /path/to/your/project/
   cp -r dev /path/to/your/project/
   cp CLAUDE.md /path/to/your/project/
   ```

2. **Run setup:**
   ```
   /setup
   ```

3. **Start developing** - the framework is now active.

## The Setup Wizard

Running `/setup` walks you through:

### 1. Structure Verification
Ensures all framework directories exist:
- `.claude/hooks/`
- `.claude/agents/`
- `.claude/commands/`
- `dev/templates/`
- `dev/active/`

### 2. Skill Detection (Optional)
If you have Claude Code skills installed, setup can:
- Scan your skills directory
- Identify available skills
- Configure triggers in `skill-rules.json`

### 3. Project Customization
Optionally customize `CLAUDE.md` with:
- Project name
- Org type
- Naming conventions
- Testing requirements

## Manual Configuration

### Skill Triggers

Edit `.claude/hooks/skill-rules.json` to map keywords to your skills:

```json
{
  "skills": {
    "my-skill-name": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "high",
      "promptTriggers": {
        "keywords": ["keyword1", "keyword2"],
        "intentPatterns": ["(create|build).*keyword"]
      },
      "fileTriggers": {
        "pathPatterns": ["**/*.cls"],
        "contentPatterns": ["ClassName"]
      }
    }
  }
}
```

### Trigger Types

| Field | Purpose |
|-------|---------|
| `promptTriggers.keywords` | Words in user prompt that trigger skill |
| `promptTriggers.intentPatterns` | Regex patterns for intent matching |
| `fileTriggers.pathPatterns` | Glob patterns for file paths |
| `fileTriggers.contentPatterns` | Regex patterns for file content |

## Available Commands

| Command | Description |
|---------|-------------|
| `/setup` | Run the setup wizard |
| `/dev-docs` | Create task documentation |
| `/dev-docs-update` | Update progress before ending session |

## Available Agents

| Agent | Use Case |
|-------|----------|
| `strategic-plan-architect` | Plan large feature implementations |
| `test-class-generator` | Generate comprehensive test classes |

## Code Checks

The framework automatically checks edited files for issues:

### Apex
- SOQL/DML in loops
- Dynamic SOQL injection risks
- Hardcoded IDs and URLs
- `without sharing` usage
- Empty catch blocks
- Missing trigger handler pattern

### LWC
- Console statements
- Missing promise error handling
- Direct DOM manipulation
- innerHTML usage

### Flow
- Too many Get Records elements
- Multiple loops
- Missing fault connectors

## Dev Docs Workflow

### Creating Docs
```
/dev-docs
```

Creates:
```
dev/active/[task-name]/
├── [task-name]-plan.md
├── [task-name]-context.md
└── [task-name]-tasks.md
```

### Updating Before Session End
```
/dev-docs-update
```

Updates:
- Current state
- Next steps
- Task completion status

### Resuming Work
Claude automatically reads `dev/active/` to restore context.

## Troubleshooting

### Hooks Not Running
1. Verify files exist in `.claude/hooks/`
2. Check JSON syntax: `python -c "import json; json.load(open('.claude/hooks/skill-rules.json'))"`

### Skills Not Suggesting
1. Verify skill name matches in `skill-rules.json`
2. Check keywords match your prompt
3. Try explicit: `"Use [skill-name] to..."`

### Commands Not Found
1. Verify `.md` files exist in `.claude/commands/`
2. Restart Claude Code session
