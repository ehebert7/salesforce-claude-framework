# Salesforce Claude Code Framework

A development framework that enhances Claude Code for Salesforce projects with auto-detection hooks, guided setup, and session persistence.

## Features

| Feature | Description |
|---------|-------------|
| **Easy Installation** | `/install` command to inject framework into any project |
| **Skill Integration** | Scan your skills directory and auto-configure detection triggers |
| **Code Checks** | Automatic detection of anti-patterns in Apex, LWC, and Flows |
| **Session Persistence** | Dev docs system maintains context across Claude sessions |
| **Workflow Agents** | Specialized agents for planning and test generation |

## Installation

### Option 1: Ask Claude (Easiest)

In Claude Code, simply say:

```
Install the Salesforce framework from https://github.com/ehebert7/salesforce-claude-framework
```

Claude will clone the repo, copy the files, and guide you through setup.

### Option 2: Clone and Use /install

```bash
# Clone the framework once
git clone https://github.com/ehebert7/salesforce-claude-framework.git
cd salesforce-claude-framework
```

Then in Claude Code, run:
```
/install
```

Choose where to install:
1. **Current directory** - Install here
2. **Specify path** - Install to any project folder
3. **Global** - Install to `~/.claude/` for all projects

### Option 3: Manual Copy

```bash
git clone https://github.com/ehebert7/salesforce-claude-framework.git

# Copy to your project
cp -r salesforce-claude-framework/.claude /path/to/your/project/
cp -r salesforce-claude-framework/dev /path/to/your/project/
cp salesforce-claude-framework/CLAUDE.md /path/to/your/project/
```

## Setup

After installation, run:

```
/setup
```

The setup wizard will:

1. **Scan for skills** - Find your existing skill files
   - Scan a custom directory
   - Use `~/.claude/skills/` (global skills)
   - Configure auto-detection triggers

2. **Customize CLAUDE.md** - Set project-specific patterns
   - Project name
   - Org type
   - Testing requirements

## Commands

| Command | Purpose |
|---------|---------|
| `/install` | Install framework to any project directory |
| `/setup` | Configure skills and customize settings |
| `/dev-docs` | Create task documentation for long implementations |
| `/dev-docs-update` | Save progress before ending a session |

## Skill Integration

The framework detects Salesforce keywords in your prompts and suggests relevant skills.

### How It Works

1. You have skill files (e.g., `~/.claude/skills/apex-best-practices.md`)
2. Run `/setup` to scan and configure triggers
3. When you mention "apex" or "trigger", Claude suggests your skill

### Skill Locations

| Location | Scope |
|----------|-------|
| `~/.claude/skills/` | Global - available in all projects |
| `.claude/skills/` | Project-specific |

### Creating Skills

Skills are markdown files containing best practices and patterns:

```markdown
# Apex Best Practices

## Bulkification
- Always handle 200+ records
- Never put SOQL/DML in loops

## Security
- Enforce CRUD/FLS with USER_MODE
- Use bind variables in dynamic SOQL
```

## Code Checks

The framework automatically checks edited files for common issues:

### Apex
- SOQL/DML inside loops (governor limits)
- Dynamic SOQL injection risks
- Hardcoded Salesforce IDs and URLs
- `without sharing` usage
- Empty catch blocks
- Triggers without handler pattern

### LWC
- Console statements
- Missing promise error handling
- Direct DOM manipulation
- innerHTML assignments

### Flow
- Excessive Get Records elements
- Multiple loops (performance)
- Missing fault connectors

## Agents

### `strategic-plan-architect`
Creates implementation plans for large features:
- Gathers requirements
- Analyzes existing codebase
- Creates phased implementation plan

### `test-class-generator`
Generates Apex test classes with:
- `@TestSetup` for shared data
- Positive/negative/bulk tests
- 85%+ coverage target

## Dev Docs System

Prevents context loss during long implementations.

### Workflow

1. Start a task: `"Build opportunity forecasting feature"`
2. Create docs: `/dev-docs`
3. Work on implementation
4. Before ending: `/dev-docs-update`
5. Resume later: Claude reads `dev/active/` and continues

### Generated Files

```
dev/active/[task-name]/
├── [task-name]-plan.md      # Implementation roadmap
├── [task-name]-context.md   # Current state and decisions
└── [task-name]-tasks.md     # Task checklist
```

## Project Structure

```
.claude/
├── agents/
│   ├── strategic-plan-architect.md
│   └── test-class-generator.md
├── commands/
│   ├── install.md           # Install to any project
│   ├── setup.md             # Configure skills and settings
│   ├── dev-docs.md
│   └── dev-docs-update.md
└── hooks/
    ├── skill-rules.json     # Auto-detection configuration
    ├── userPromptSubmit.ts  # Skill suggestion hook
    └── stopEvent.ts         # Code check hook

dev/
├── active/                  # Your task docs (gitignored)
└── templates/               # Doc templates
```

## Configuration Files

### skill-rules.json

Maps keywords to skills. Updated by `/setup` or edit manually:

```json
{
  "skills": {
    "apex-best-practices": {
      "promptTriggers": {
        "keywords": ["apex", "trigger", "soql", "dml"]
      }
    }
  }
}
```

### CLAUDE.md

Project-specific instructions for Claude:
- Architecture patterns
- Naming conventions
- Testing requirements

## Contributing

1. Fork this repository
2. Make your improvements
3. Submit a pull request

## License

MIT
