# Salesforce Claude Code Framework

A development framework that enhances Claude Code for Salesforce development with auto-activating skill suggestions, specialized agents, and session persistence.

## What's Included

| Component | Description | Included? |
|-----------|-------------|-----------|
| **Skill Rules** | Auto-suggests skills based on prompts/files | Yes |
| **Agents** | Specialized AI agents for Apex review, testing, etc. | Yes |
| **Slash Commands** | `/dev-docs`, `/dev-docs-update` | Yes |
| **Templates** | Dev doc templates for task tracking | Yes |
| **Skills** | The actual skill content (apex-best-practices, etc.) | **No** - Install separately |

> **Important:** This framework includes *rules that suggest skills*, but not the skills themselves. You'll need to install skills separately via Claude Code's skill system or create your own.

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

### 1. Skill Auto-Suggestion

The framework detects keywords in your prompts and suggests relevant skills.

**Example:** When you type `"Create an Apex trigger for Account"`:
1. Hook detects keywords: "apex", "trigger"
2. Suggests: `apex-best-practices` skill (if installed)
3. Shows self-check reminders after editing `.cls` files

**Configured skill triggers** (in `skill-rules.json`):

| Skill Name | Triggered By |
|------------|--------------|
| `apex-best-practices` | apex, trigger, batch, soql, governor limits |
| `salesforce-flow-architect` | flow, screen flow, autolaunched |
| `lwc-dev-guidelines` | lwc, lightning web component, wire |
| `salesforce-cli` | sf, sfdx, deploy, retrieve, scratch org |
| `agentforce-*` | agentforce, service agent, topic, action |
| `salesforce-integration-patterns` | callout, rest, api, named credential |
| `salesforce-shield-security` | shield, encryption, hipaa, compliance |

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

## Installing Skills

This framework suggests skills but doesn't include them. Install skills separately:

### Option 1: Use Built-in Anthropic Skills
Some skills like `apex-best-practices` may be available in Claude Code's skill marketplace.

### Option 2: Create Custom Skills
Create your own skills as markdown files. See [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code) for details.

### Option 3: Community Skills
Search for community-created Salesforce skills that match the names in `skill-rules.json`.

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
