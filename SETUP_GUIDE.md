# Setup Guide

## Quick Start

1. **Install the framework:**
   ```
   /install
   ```
   Choose: current directory, specific path, or global (`~/.claude/`)

2. **Configure skills and settings:**
   ```
   /setup
   ```

3. **Start developing!**

## The /install Command

Use `/install` to inject the framework into any project.

### Options

| Option | Description |
|--------|-------------|
| Current directory | Install to `.` |
| Specify path | Enter any project path |
| Global | Install to `~/.claude/` for all projects |

### What Gets Installed

```
.claude/
├── agents/        (2 workflow agents)
├── commands/      (4 commands)
└── hooks/         (3 hook files)

dev/
├── active/        (your task docs)
└── templates/     (doc templates)

CLAUDE.md          (project instructions)
```

### Updating an Existing Installation

Running `/install` on a directory with an existing installation will:
- **Preserve** your `skill-rules.json` configuration
- **Preserve** customized `CLAUDE.md`
- **Update** agents, commands, and hook scripts

## The /setup Command

Use `/setup` to configure skills and customize settings.

### Skill Configuration

Setup offers several ways to integrate your skills:

1. **Scan a directory** - Enter path to your skills folder
2. **Use home directory** - Scan `~/.claude/skills/`
3. **Skip** - Configure manually later

### Skill Directory Locations

| Location | When to Use |
|----------|-------------|
| `~/.claude/skills/` | Global skills for all projects |
| `.claude/skills/` | Project-specific skills |
| Custom path | Your own organization |

### Auto-Detection Triggers

After scanning, setup offers:

1. **Configure each** - Set keywords for each skill manually
2. **Smart defaults** - Auto-generate keywords from skill names
3. **No triggers** - Just register skills without auto-detection

**Smart defaults example:**
- `apex-best-practices.md` → keywords: ["apex", "trigger", "class", "soql"]
- `lwc-dev-guidelines.md` → keywords: ["lwc", "lightning", "component"]

### CLAUDE.md Customization

Optionally configure project-specific settings:
- Project name
- Org type (Scratch/Sandbox/Production)
- Test coverage requirement
- Custom naming conventions

## Creating Skills

Skills are markdown files with domain knowledge.

### Basic Structure

```markdown
# Skill Name

## Section 1
- Point 1
- Point 2

## Section 2
Content here...
```

### Example: Apex Best Practices

```markdown
# Apex Best Practices

## Bulkification
- Always handle 200+ records
- Use collections (List, Set, Map)
- Never assume single record

## Governor Limits
- SOQL: 100 queries per transaction
- DML: 150 statements per transaction
- Never put SOQL/DML in loops

## Security
- Enforce CRUD/FLS with USER_MODE
- Use bind variables in dynamic SOQL
- Document "without sharing" usage
```

### Where to Save

| Location | Availability |
|----------|--------------|
| `~/.claude/skills/` | All projects |
| `[project]/.claude/skills/` | This project only |

## Manual Configuration

### skill-rules.json

Edit `.claude/hooks/skill-rules.json` directly:

```json
{
  "skills": {
    "my-skill": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "high",
      "promptTriggers": {
        "keywords": ["keyword1", "keyword2"],
        "intentPatterns": ["(create|build).*pattern"]
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
| `promptTriggers.keywords` | Words in prompts that trigger skill |
| `promptTriggers.intentPatterns` | Regex patterns for intent matching |
| `fileTriggers.pathPatterns` | Glob patterns for file paths |
| `fileTriggers.contentPatterns` | Regex patterns for file content |

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/install` | Install framework to a directory |
| `/setup` | Configure skills and settings |
| `/dev-docs` | Create task documentation |
| `/dev-docs-update` | Save progress before ending |

## Agents Reference

| Agent | Use Case |
|-------|----------|
| `strategic-plan-architect` | Plan large features |
| `test-class-generator` | Generate Apex test classes |

## Troubleshooting

### Framework Not Found

```
Framework not found in current directory.
Run /install first to install the framework.
```

**Solution:** Run `/install` and choose a target directory.

### Skills Not Detected

1. Verify skill files exist in the scanned directory
2. Files must have `.md` extension
3. Try running `/setup` again

### Hooks Not Running

1. Check `.claude/hooks/` exists
2. Verify JSON syntax in skill-rules.json:
   ```bash
   python -c "import json; json.load(open('.claude/hooks/skill-rules.json'))"
   ```

### Commands Not Found

1. Verify `.claude/commands/` exists
2. Check files have `.md` extension
3. Restart Claude Code session
