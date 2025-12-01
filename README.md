# Salesforce Claude Code Framework

A development framework that enhances Claude Code for Salesforce development with specialized agents, auto-detection hooks, and session persistence.

## What's Included

| Component | Description |
|-----------|-------------|
| **Agents** | Specialized AI agents for Apex review, test generation, Agentforce debugging |
| **Slash Commands** | `/dev-docs` and `/dev-docs-update` for task tracking |
| **Templates** | Dev doc templates for maintaining context across sessions |
| **Auto-Detection Hooks** | Detects Salesforce keywords and file patterns in your prompts |

### Optional: Skill Integration

The framework includes hooks that detect Salesforce-related keywords (apex, trigger, lwc, flow, etc.) and can automatically suggest relevant skills if you have them installed. Skills are optional—the framework works without them.

## Installation

Clone or copy this repo to your Salesforce project:

```bash
git clone https://github.com/YOUR_USERNAME/salesforce-claude-framework.git
cd salesforce-claude-framework

# Copy to your project
cp -r .claude /path/to/your/salesforce-project/
cp -r dev /path/to/your/salesforce-project/
cp CLAUDE.md /path/to/your/salesforce-project/
```

Or copy directly into an existing project:

```bash
cd /path/to/your/salesforce-project
cp -r /path/to/salesforce-claude-framework/.claude .
cp -r /path/to/salesforce-claude-framework/dev .
cp /path/to/salesforce-claude-framework/CLAUDE.md .
```

## Project Structure

```
.
├── .claude/
│   ├── agents/                    # Specialized AI agents
│   │   ├── agentforce-debugger.md
│   │   ├── apex-code-reviewer.md
│   │   ├── strategic-plan-architect.md
│   │   └── test-class-generator.md
│   ├── commands/                  # Slash commands
│   │   ├── dev-docs.md
│   │   ├── dev-docs-update.md
│   │   ├── framework.md
│   │   └── framework-update.md
│   └── hooks/                     # Auto-suggestion hooks
│       ├── skill-rules.json       # Keyword → skill mappings
│       ├── stopEvent.ts           # Post-edit reminders
│       └── userPromptSubmit.ts    # Pre-prompt analyzer
├── dev/
│   ├── active/                    # Active task documentation
│   └── templates/                 # Doc templates
├── CLAUDE.md                      # Project instructions for Claude
└── SETUP_GUIDE.md                 # Detailed setup guide
```

## Features

### 1. Auto-Detection Hooks

The framework detects Salesforce keywords in your prompts and shows contextual reminders.

**Example:** When you type `"Create an Apex trigger for Account"`:
1. Hook detects keywords: "apex", "trigger"
2. Suggests relevant skills (if installed)
3. Shows self-check reminders after editing `.cls` files

**Keywords detected:** apex, trigger, batch, soql, flow, lwc, lightning component, agentforce, callout, deploy, and more. See `skill-rules.json` for the full list.

### 2. Specialized Agents

Pre-built agents for common Salesforce tasks:

| Agent | Use Case |
|-------|----------|
| `apex-code-reviewer` | Review Apex for bulkification, governor limits, security |
| `test-class-generator` | Generate test classes with 85%+ coverage |
| `agentforce-debugger` | Troubleshoot Agentforce agent issues |
| `strategic-plan-architect` | Plan large features before coding |

### 3. Slash Commands

| Command | Description |
|---------|-------------|
| `/dev-docs` | Create implementation tracking docs for a task |
| `/dev-docs-update` | Update progress before ending a session |

### 4. Dev Docs System

Prevents context loss during long implementations:

1. **Start task** - `"Build opportunity forecasting feature"`
2. **Create docs** - Run `/dev-docs`
3. **Work** - Claude updates docs as you progress
4. **End session** - Run `/dev-docs-update`
5. **Resume** - Next session reads `dev/active/` and continues

## Customization

### Add Custom Skill Triggers

Edit `.claude/hooks/skill-rules.json`:

```json
{
  "your-custom-skill": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": ["your", "keywords", "here"],
      "intentPatterns": ["(create|build).*?(your pattern)"]
    },
    "fileTriggers": {
      "pathPatterns": ["**/*.your-extension"],
      "contentPatterns": ["YourClassName"]
    }
  }
}
```

### Create Custom Agent

Create `.claude/agents/your-agent.md`:

```markdown
# Your Agent Name

## Purpose
What this agent does

## Activation
When to use it

## Process
1. Step one
2. Step two

## Output
What it produces
```

### Modify CLAUDE.md

Update `CLAUDE.md` with your project-specific:
- Architecture patterns
- Naming conventions
- Testing requirements
- Custom commands

## Salesforce Architecture Reference

The included `CLAUDE.md` defines standard Salesforce patterns:

**Apex Layers:**
- Triggers → Handler classes only
- Handlers → Orchestrate Domain and Service
- Services → Business logic
- Selectors → SOQL queries
- Domains → Object-specific logic

**Naming Conventions:**
- Triggers: `[Object]Trigger`
- Handlers: `[Object]TriggerHandler`
- Services: `[Feature]Service`
- Test Classes: `[ClassName]Test`
- LWC: `camelCase`

## Contributing

1. Fork this repository
2. Add your improvements
3. Submit a pull request

## License

MIT
