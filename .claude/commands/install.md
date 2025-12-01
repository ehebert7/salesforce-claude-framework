# Install Framework

Install the Salesforce Claude Code Framework into a project directory.

## Usage

This command can be run from anywhere. It will install the framework to a target directory.

## Process

### Step 1: Determine Target Directory

Ask the user:
```
Where would you like to install the framework?

1. Current directory (.)
2. Specify a path
3. Install globally (~/.claude/)
```

If option 2, ask: "Enter the target directory path:"

### Step 2: Check for Existing Installation

Check if the target directory already has `.claude/hooks/skill-rules.json`.

**If exists**, ask:
```
Framework already installed in this directory.

Would you like to:
1. Update/overwrite with latest version
2. Cancel
```

### Step 3: Clone or Copy Framework

**Option A: If running from the framework repo directory:**
Copy these to target:
- `.claude/` directory (agents, commands, hooks)
- `dev/` directory (templates, active placeholder)
- `CLAUDE.md`

**Option B: If running from elsewhere:**
Clone from https://github.com/ehebert7/salesforce-claude-framework and copy files to target.

### Step 4: Preserve User Customizations

When updating an existing installation:
- **Preserve** `.claude/hooks/skill-rules.json` (user's skill config)
- **Preserve** `CLAUDE.md` if it has been customized
- **Update** agents, commands, and hook scripts

### Step 5: Confirmation

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAMEWORK INSTALLED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: [target path]

Installed:
• .claude/agents/      (2 agents)
• .claude/commands/    (4 commands)
• .claude/hooks/       (3 hook files)
• dev/templates/       (3 templates)
• CLAUDE.md

NEXT STEPS:
1. Navigate to the project: cd [target path]
2. Run /setup to configure skills and customize CLAUDE.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Examples

**Install to current directory:**
```
/install
> Select option 1
```

**Install to specific project:**
```
/install
> Select option 2
> Enter: /path/to/my/salesforce-project
```

**Install globally:**
```
/install
> Select option 3
```

**Update existing installation:**
```
/install
> Framework detected, select "Update"
```
