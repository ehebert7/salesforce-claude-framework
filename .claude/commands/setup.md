# Framework Setup

Guide the user through setting up the Salesforce Claude Code Framework.

## Setup Steps

### Step 1: Welcome
Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SALESFORCE CLAUDE CODE FRAMEWORK SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This will configure the framework for your project.
```

### Step 2: Verify Structure
Check that these directories exist:
- `.claude/hooks/`
- `.claude/agents/`
- `.claude/commands/`
- `dev/templates/`
- `dev/active/`

If any are missing, create them.

### Step 3: Skill Detection
Ask the user:
```
Do you have Claude Code skills installed that you'd like to integrate?

Skills are markdown files that provide domain knowledge (e.g., apex-best-practices, lwc-guidelines).

Options:
1. Yes - scan for my skills
2. No - I'll configure manually later
3. Show me how to create skills
```

### If Option 1 (Scan for skills):
Ask: "Where are your skills located? (Enter path or press Enter for default ~/.claude/skills/)"

Scan the directory for `.md` files. For each file found:
1. Extract the filename (without .md) as the skill name
2. Show the user what was found
3. Ask if they want to add triggers for each skill

Generate/update `skill-rules.json` with entries for found skills using this template:
```json
{
  "skill-name": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "medium",
    "promptTriggers": {
      "keywords": ["keyword1", "keyword2"],
      "intentPatterns": []
    },
    "fileTriggers": {
      "pathPatterns": [],
      "contentPatterns": []
    }
  }
}
```

Ask the user to provide keywords for each skill, or suggest defaults based on the skill name.

### If Option 2 (Manual):
Display:
```
You can configure skills later by editing:
.claude/hooks/skill-rules.json

See SETUP_GUIDE.md for the configuration format.
```

### If Option 3 (Show how):
Display:
```
CREATING SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skills are markdown files containing domain knowledge.

1. Create a directory: ~/.claude/skills/ (or .claude/skills/ in your project)

2. Create a markdown file (e.g., apex-best-practices.md):

   # Apex Best Practices

   ## Bulkification
   - Always handle 200+ records
   - Never put SOQL/DML in loops

   ## Security
   - Enforce CRUD/FLS
   - Use bind variables

3. Run /setup again to scan and integrate your skills.

You can also find community skills or create them from documentation.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: CLAUDE.md Configuration
Ask: "Would you like to customize CLAUDE.md with your project details?"

If yes, ask for:
- Project name
- Org type (Scratch/Sandbox/Production)
- Any custom naming conventions
- Testing requirements

Update CLAUDE.md with their responses.

### Step 5: Confirmation
Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SETUP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework is ready!

Available commands:
• /dev-docs - Create implementation tracking docs
• /dev-docs-update - Update progress before ending session
• /setup - Run this setup again

Available agents:
• strategic-plan-architect - Plan large features
• test-class-generator - Generate test classes

Hooks installed:
• Auto-detection for Salesforce keywords
• Self-check reminders after editing code

Next: Try asking Claude to help with a Salesforce task!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
