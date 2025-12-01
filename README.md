# Salesforce Claude Code Framework

A development framework that enhances Claude Code for Salesforce projects with auto-detection hooks, guided setup, and session persistence.

## Features

| Feature | Description |
|---------|-------------|
| **Guided Setup** | Interactive `/setup` command configures the framework for your environment |
| **Auto-Detection** | Hooks detect Salesforce keywords and suggest relevant skills |
| **Code Checks** | Automatic detection of anti-patterns in Apex, LWC, and Flows |
| **Session Persistence** | Dev docs system maintains context across Claude sessions |
| **Workflow Agents** | Specialized agents for planning and test generation |

## Quick Start

### 1. Copy to Your Project

```bash
git clone https://github.com/ehebert7/salesforce-claude-framework.git
cd salesforce-claude-framework

# Copy to your Salesforce project
cp -r .claude /path/to/your/project/
cp -r dev /path/to/your/project/
cp CLAUDE.md /path/to/your/project/
```

### 2. Run Setup

In Claude Code, run:
```
/setup
```

The setup wizard will:
- Verify the framework structure
- Optionally scan for your existing skills
- Configure skill detection triggers
- Customize CLAUDE.md for your project

### 3. Start Developing

The framework is now active. Try:
```
"Create an Apex trigger for Account that validates email addresses"
```

## What's Included

```
.claude/
├── agents/
│   ├── strategic-plan-architect.md    # Plan large features
│   └── test-class-generator.md        # Generate test classes
├── commands/
│   ├── setup.md                       # Guided setup wizard
│   ├── dev-docs.md                    # Create task documentation
│   └── dev-docs-update.md             # Update before ending session
└── hooks/
    ├── skill-rules.json               # Skill trigger configuration
    ├── userPromptSubmit.ts            # Pre-prompt skill detection
    └── stopEvent.ts                   # Post-edit code checks

dev/
├── active/                            # Your active task docs
└── templates/                         # Doc templates
```

## Skill Integration

This framework detects keywords and suggests skills, but **does not include skills**. You bring your own.

### How It Works

1. You have skills installed (e.g., `apex-best-practices.md`)
2. The framework's `skill-rules.json` maps keywords to skill names
3. When you mention "apex" or "trigger", it suggests your skill

### Configuring Skills

Run `/setup` to scan for skills, or manually edit `.claude/hooks/skill-rules.json`:

```json
{
  "skills": {
    "your-skill-name": {
      "type": "domain",
      "enforcement": "suggest",
      "priority": "high",
      "promptTriggers": {
        "keywords": ["keyword1", "keyword2"]
      }
    }
  }
}
```

## Code Checks

The `stopEvent.ts` hook automatically checks edited files for issues:

### Apex Checks
- SOQL/DML inside loops (governor limits)
- Dynamic SOQL without bind variables (injection risk)
- Hardcoded Salesforce IDs and URLs
- `without sharing` usage
- Empty catch blocks
- Triggers without handler pattern

### LWC Checks
- Console statements
- Missing error handling on promises
- Direct DOM manipulation
- innerHTML assignments

### Flow Checks
- Excessive Get Records elements
- Multiple loops (performance)
- Missing fault connectors

## Agents

### `strategic-plan-architect`
Creates implementation plans for large features:
- Gathers requirements
- Analyzes existing codebase
- Identifies components to create/modify
- Creates phased implementation plan

### `test-class-generator`
Generates Apex test classes with:
- `@TestSetup` for shared data
- Positive and negative tests
- Bulk tests (200+ records)
- 85%+ coverage target

## Dev Docs System

Prevents context loss during long implementations.

### Commands

| Command | Description |
|---------|-------------|
| `/dev-docs` | Create task documentation folder |
| `/dev-docs-update` | Update progress before ending session |

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

## Configuration

### CLAUDE.md

The `CLAUDE.md` file provides project-specific instructions to Claude:
- CLI commands
- Architecture patterns
- Naming conventions
- Testing requirements

Customize it for your project during `/setup` or edit manually.

### skill-rules.json

Maps keywords to skill names. Includes example configurations for common Salesforce skills:
- `apex-best-practices`
- `lwc-dev-guidelines`
- `salesforce-flow-architect`
- `salesforce-cli`
- `agentforce`
- `salesforce-integration-patterns`

## Customization

### Add Your Own Agent

Create `.claude/agents/your-agent.md`:

```markdown
# Your Agent Name

## Purpose
What this agent does

## Process
1. Step one
2. Step two

## Output
What it produces
```

### Add Skill Triggers

Edit `.claude/hooks/skill-rules.json` to add triggers for your skills.

## Contributing

1. Fork this repository
2. Make your improvements
3. Submit a pull request

## License

MIT
