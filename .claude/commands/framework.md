Copy the Salesforce Claude Code framework to the current project directory.

## Actions to Perform:

1. Check if framework source exists at: `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/`

2. If source exists, copy these directories/files to current project:
   - `.claude/hooks/` → Copy all hooks
   - `.claude/agents/` → Copy all agents
   - `.claude/commands/` → Copy all commands (except this one to avoid duplication)
   - `dev/templates/` → Copy all templates
   - `dev/active/.gitkeep` → Create if doesn't exist
   - `CLAUDE.md` → Copy to project root

3. After copying, report:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FRAMEWORK INSTALLED
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Copied:
   • Hooks: userPromptSubmit.ts, stopEvent.ts, skill-rules.json
   • Agents: 4 specialized agents
   • Commands: /dev-docs, /dev-docs-update
   • Templates: 3 dev docs templates
   • CLAUDE.md reference

   Framework is now active in this project!
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

4. If source doesn't exist, report error and suggest running initial setup from DEVTOOLS folder.

## Notes:
- Preserves existing project-specific files
- Creates directories if they don't exist
- Safe to run multiple times (updates to latest framework version)
