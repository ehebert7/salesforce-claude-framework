Update the master framework repository with changes from current project.

## Actions to Perform:

1. Check if current project has `.claude/` directory

2. If yes, copy FROM current project TO master framework:
   - `.claude/hooks/*` → `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/.claude/hooks/`
   - `.claude/agents/*` → `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/.claude/agents/`
   - `.claude/commands/*` → `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/.claude/commands/`
   - `dev/templates/*` → `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/dev/templates/`
   - `CLAUDE.md` → `c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/CLAUDE.md`

3. After updating, report:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MASTER FRAMEWORK UPDATED
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Synced changes from current project to:
   c:/Users/ellio/Desktop/Consulting/Cloud Beacon/Keynode/claude-framework-master/

   Other projects can now use /framework to get latest version.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

## Use Case:
Run this after making improvements to hooks, agents, or templates in one project.
Those improvements will then be available to all future projects via /framework.
