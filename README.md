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

#### `apex-code-reviewer`
Deep code review for Apex classes, triggers, and tests. Checks for:
- Bulkification (handles 200+ records)
- Governor limits (SOQL/DML outside loops)
- Security (CRUD/FLS checks, no SOQL injection)
- Error handling and logging
- Test coverage (85%+ with meaningful assertions)
- Architecture patterns (trigger handler, service layer, selector)

#### `test-class-generator`
Generates comprehensive Apex test classes with:
- `@TestSetup` method with test data
- Positive and negative scenario tests
- Bulk tests (200+ records)
- Trigger recursion prevention tests
- `System.assert` in every test method
- 85%+ coverage target

#### `agentforce-debugger`
Troubleshoots Agentforce Service Agent issues by checking:
- Topic matching and classification
- Action configuration
- Knowledge grounding / RAG retrieval
- Prompt template effectiveness
- Channel-specific formatting
- Conversation context handling

#### `strategic-plan-architect`
Creates implementation plans for large features:
- Gathers requirements and analyzes existing codebase
- Identifies affected objects, fields, and components
- Creates phased implementation plan with risks/mitigations
- Generates dev docs files for tracking

### 3. Dev Docs System

Prevents context loss during long implementations by creating persistent documentation.

#### `/dev-docs` command
Creates a documentation folder for your current task:
```
dev/active/[task-name]/
├── [task-name]-plan.md      # Implementation roadmap
├── [task-name]-context.md   # Current state, decisions, next steps
└── [task-name]-tasks.md     # Granular task checklist
```

#### `/dev-docs-update` command
Updates documentation before ending a session:
- Sets "Last Updated" timestamp
- Updates "Current State" with progress
- Updates "Next Steps" for the next session
- Records important decisions made
- Moves completed tasks to "Completed" section

#### Workflow
1. **Start task** - `"Build opportunity forecasting feature"`
2. **Create docs** - Run `/dev-docs`
3. **Work** - Claude updates docs as you progress
4. **End session** - Run `/dev-docs-update`
5. **Resume** - Next session reads `dev/active/` and continues where you left off

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
