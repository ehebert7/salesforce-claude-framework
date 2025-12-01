# Salesforce Claude Code Framework

A development framework that enhances Claude Code for Salesforce development with auto-activating skills, specialized agents, and session persistence.

## Features

- **Auto-Activation Hooks** - Automatically suggests relevant skills based on your prompts
- **Specialized Agents** - Pre-configured agents for Apex review, test generation, and Agentforce debugging
- **Dev Docs System** - Prevents context loss during long implementations
- **Slash Commands** - Quick commands for common workflows

## Quick Start

### Use in Any Project

Copy the framework to your Salesforce project:

```bash
# Copy to your project
cp -r .claude /path/to/your/project/
cp -r dev /path/to/your/project/
cp CLAUDE.md /path/to/your/project/
```

### Test It Out

Try one of these prompts:

```
"Create an Apex trigger for Account that validates email addresses"
```

The framework will:
1. Detect keywords ("apex", "trigger")
2. Suggest the `apex-best-practices` skill
3. Generate bulkified code
4. Show a self-check reminder after editing

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
│   └── hooks/                     # Auto-activation hooks
│       ├── skill-rules.json
│       ├── stopEvent.ts
│       └── userPromptSubmit.ts
├── dev/
│   ├── active/                    # Active implementation docs
│   └── templates/                 # Doc templates
│       ├── context-template.md
│       ├── plan-template.md
│       └── tasks-template.md
├── CLAUDE.md                      # Project instructions
├── SETUP_GUIDE.md                 # Detailed setup guide
└── FRAMEWORK_SETUP_COMPLETE.md    # Setup completion summary
```

## Slash Commands

| Command | Description |
|---------|-------------|
| `/dev-docs` | Create implementation tracking docs for a large task |
| `/dev-docs-update` | Update progress before ending a session |
| `/framework` | Install framework in current project |
| `/framework-update` | Sync improvements back to master |

## Specialized Agents

| Agent | Use Case |
|-------|----------|
| `apex-code-reviewer` | Pre-deployment review of Apex code |
| `test-class-generator` | Generate comprehensive test classes (85%+ coverage) |
| `agentforce-debugger` | Troubleshoot Agentforce agent issues |
| `strategic-plan-architect` | Plan large features before coding |

## Supported Skills (13 Total)

### Agentforce
- `agentforce-service-agent-setup`
- `agentforce-service-agent-topics-actions`
- `agentforce-service-agent-data-knowledge`
- `agentforce-service-agent-testing-optimization`
- `agentforce-service-agent-monitoring-analytics`

### Salesforce Development
- `apex-best-practices`
- `salesforce-flow-architect`
- `salesforce-cli`
- `salesforce-agent-dx`
- `salesforce-testing-api`

### Additional (require manual creation)
- `lwc-dev-guidelines`
- `salesforce-shield-security`
- `salesforce-integration-patterns`

## Dev Docs Workflow

Prevents context loss during long implementations:

1. **Start** - Begin a large task
2. **Create docs** - Run `/dev-docs` to create tracking files
3. **Work** - Claude updates docs as progress is made
4. **End session** - Run `/dev-docs-update` before closing
5. **Resume** - Next session reads context and continues

## Auto-Activation Examples

### Apex Development

**Prompt:** `"Create a batch class to update account records"`

**What happens:**
1. Hook detects keywords: "batch", "class", "account"
2. Suggests: `apex-best-practices` skill
3. Generates bulkified code
4. After edit, shows self-check reminder

### LWC Development

**Prompt:** `"Build a Lightning component to search contacts"`

**What happens:**
1. Detects: "Lightning", "component"
2. Suggests: `lwc-dev-guidelines` skill
3. Follows LWC best practices
4. Shows LWC self-check after edit

## Customization

### Add Custom Keywords

Edit `.claude/hooks/skill-rules.json`:

```json
{
  "apex-best-practices": {
    "promptTriggers": {
      "keywords": [
        "apex",
        "trigger",
        "YourCustomFramework",
        "YourOrgPattern"
      ]
    }
  }
}
```

### Create Custom Agent

Create `.claude/agents/your-agent.md`:

```markdown
# Your Custom Agent

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

## Documentation

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete workflow examples
- [FRAMEWORK_SETUP_COMPLETE.md](FRAMEWORK_SETUP_COMPLETE.md) - Setup summary
- [CLAUDE.md](CLAUDE.md) - Salesforce patterns reference

## License

MIT
