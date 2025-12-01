# Framework Setup

Guide the user through setting up the Salesforce Claude Code Framework.

## Setup Steps

### Step 1: Welcome & Installation Check
Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SALESFORCE CLAUDE CODE FRAMEWORK SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Check if framework files exist in the current directory:
- `.claude/hooks/skill-rules.json`
- `.claude/commands/dev-docs.md`
- `dev/templates/`

**If files are missing**, ask:
```
Framework files not found in current directory.

Would you like to:
1. Install to current project directory
2. Install globally (~/.claude/)
3. Specify a different directory
4. Cancel setup
```

**If option 1 (current directory):**
- Clone/copy framework files from https://github.com/ehebert7/salesforce-claude-framework
- Copy `.claude/`, `dev/`, and `CLAUDE.md` to current directory
- Continue with setup

**If option 2 (global):**
- Copy `.claude/` to `~/.claude/`
- Copy `dev/` to `~/dev/`
- Note: CLAUDE.md should be per-project, so create a template or skip
- Continue with setup

**If option 3 (specify directory):**
- Ask: "Enter the target directory path:"
- Copy framework files to specified directory
- Continue with setup

**If files exist**, continue to Step 2.

### Step 2: Verify Structure
Check that these directories exist:
- `.claude/hooks/`
- `.claude/agents/`
- `.claude/commands/`
- `dev/templates/`
- `dev/active/`

If any are missing, create them.

Display:
```
✓ Framework structure verified
```

### Step 3: Skill Detection
Ask the user:
```
Do you have Claude Code skills you'd like to integrate?

Skills are markdown files that provide domain knowledge
(e.g., apex-best-practices, lwc-guidelines).

Options:
1. Yes - scan for my skills
2. No - I'll configure manually later
3. Show me how skills work
```

### If Option 1 (Scan for skills):
Ask: "Where are your skills located?"

Suggest common locations:
- `~/.claude/skills/`
- `.claude/skills/` (current project)
- Custom path

Scan the directory for `.md` files. For each file found:
1. Extract the filename (without .md) as the skill name
2. Display what was found:
   ```
   Found skills:
   • apex-best-practices
   • lwc-dev-guidelines
   • agentforce-setup
   ```
3. Ask if they want to configure triggers for each skill

For each skill, ask for keywords or use defaults based on skill name.

Update `skill-rules.json` with entries for found skills.

### If Option 2 (Manual):
Display:
```
You can configure skills later by editing:
.claude/hooks/skill-rules.json

The file includes example configurations for common Salesforce skills.
See SETUP_GUIDE.md for the full configuration format.
```

### If Option 3 (How skills work):
Display:
```
HOW SKILLS WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skills are markdown files containing domain knowledge that Claude
can reference when helping you code.

CREATING SKILLS:
1. Create a file like: ~/.claude/skills/apex-best-practices.md
2. Add content with best practices, patterns, examples
3. Run /setup again to integrate

SKILL DETECTION:
The framework's skill-rules.json maps keywords to skills.
When you mention "apex" or "trigger", it suggests your
apex-best-practices skill.

Example skill-rules.json entry:
{
  "apex-best-practices": {
    "promptTriggers": {
      "keywords": ["apex", "trigger", "soql"]
    }
  }
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: CLAUDE.md Configuration
Ask: "Would you like to customize CLAUDE.md for your project?"

If yes, ask for:
- Project name (optional)
- Org type: Scratch / Sandbox / Production
- Custom naming conventions (or use defaults)
- Test coverage requirement (default: 85%)

Update CLAUDE.md with their responses.

If no, keep the default CLAUDE.md.

### Step 5: Confirmation
Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SETUP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework installed to: [location]

AVAILABLE COMMANDS:
• /setup        - Run this setup again
• /dev-docs     - Create implementation tracking docs
• /dev-docs-update - Update progress before ending session

AVAILABLE AGENTS:
• strategic-plan-architect - Plan large features
• test-class-generator     - Generate test classes

ACTIVE FEATURES:
• Auto-detection for Salesforce keywords
• Code checks after editing (Apex, LWC, Flow)
• Self-check reminders

NEXT STEPS:
1. Start coding! Ask Claude to help with a Salesforce task
2. Use /dev-docs when starting large features
3. Configure skill triggers in .claude/hooks/skill-rules.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
