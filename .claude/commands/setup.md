# Framework Setup

Configure the Salesforce Claude Code Framework for your environment.

**Note:** If the framework isn't installed yet, use `/install` first.

## Process

### Step 1: Verify Installation

Check if framework files exist:
- `.claude/hooks/skill-rules.json`
- `.claude/commands/dev-docs.md`

**If missing**, display:
```
Framework not found in current directory.

Run /install first to install the framework, then run /setup to configure it.
```
And stop.

**If found**, continue.

### Step 2: Skill Configuration

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKILL CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skills are markdown files containing domain knowledge that Claude
can reference when helping you code.

The framework can auto-detect keywords in your prompts and suggest
relevant skills.
```

Ask:
```
Do you have skills you'd like to integrate?

1. Scan a directory for skills
2. Use skills from my home directory (~/.claude/skills/)
3. Skip - I'll configure manually later
4. Show me how skills work
```

### If Option 1 (Scan directory):

Ask: "Enter the path to your skills directory:"

Scan the directory for `.md` files recursively. For each file:
1. Read the filename (without .md) as skill name
2. Optionally read the first heading as display name

Display found skills:
```
Found X skills:
• apex-best-practices
• lwc-dev-guidelines
• agentforce-setup
• salesforce-flow-architect
[...]

Would you like to configure auto-detection triggers for these skills?
1. Yes - configure each one
2. Yes - use smart defaults based on skill names
3. No - just register them without triggers
```

**If "smart defaults":**
Generate triggers based on skill name:
- `apex-best-practices` → keywords: ["apex", "trigger", "class", "soql", "dml"]
- `lwc-dev-guidelines` → keywords: ["lwc", "lightning", "component", "wire"]
- `agentforce-*` → keywords: ["agentforce", "agent", "bot", "topic", "action"]
- etc.

**If "configure each":**
For each skill, ask:
```
Skill: [skill-name]
Enter keywords (comma-separated) that should trigger this skill:
>
```

Update `.claude/hooks/skill-rules.json` with the configured skills.

### If Option 2 (Home directory):

Scan `~/.claude/skills/` (or `%USERPROFILE%\.claude\skills\` on Windows).

If directory doesn't exist:
```
No skills directory found at ~/.claude/skills/

Would you like to:
1. Create it and continue
2. Specify a different location
3. Skip skill configuration
```

If found, proceed same as Option 1.

### If Option 3 (Skip):

Display:
```
Skill configuration skipped.

You can configure skills later by:
1. Editing .claude/hooks/skill-rules.json directly
2. Running /setup again
```

### If Option 4 (Show how):

Display:
```
HOW SKILLS WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT ARE SKILLS?
Skills are markdown files containing best practices, patterns,
and examples for specific domains (Apex, LWC, Flows, etc.).

WHERE TO PUT SKILLS:
• Global: ~/.claude/skills/ (available in all projects)
• Project: .claude/skills/ (project-specific)

CREATING A SKILL:
Create a file like: apex-best-practices.md

# Apex Best Practices

## Bulkification
- Always handle 200+ records
- Never put SOQL/DML in loops

## Security
- Enforce CRUD/FLS
- Use bind variables in SOQL

[Add as much detail as you want]

HOW AUTO-DETECTION WORKS:
The framework's skill-rules.json maps keywords to skills.
When you mention "apex" or "trigger", it suggests your skill.

Example entry in skill-rules.json:
{
  "apex-best-practices": {
    "promptTriggers": {
      "keywords": ["apex", "trigger", "soql"]
    }
  }
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then return to Step 2 menu.

### Step 3: CLAUDE.md Customization

Ask:
```
Would you like to customize CLAUDE.md for this project?

1. Yes - customize now
2. No - keep defaults
```

**If yes**, ask:
- Project name (optional):
- Org type (Scratch/Sandbox/Production):
- Test coverage requirement (default 85%):
- Any custom naming conventions?

Update CLAUDE.md with responses.

### Step 4: Summary

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SETUP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SKILLS CONFIGURED: [X skills]
• [skill-1]
• [skill-2]
[...]

CLAUDE.MD: [Customized / Default]

AVAILABLE COMMANDS:
• /install     - Install framework to another project
• /setup       - Run this setup again
• /dev-docs    - Create task documentation
• /dev-docs-update - Save progress before ending session

AVAILABLE AGENTS:
• strategic-plan-architect - Plan large features
• test-class-generator     - Generate test classes

You're ready to go! Try asking Claude to help with a Salesforce task.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
