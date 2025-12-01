# Salesforce Project

## Quick Commands

### SFDX CLI
```bash
sf org login web --alias [alias]
sf project deploy start --source-dir force-app --target-org [alias]
sf project retrieve start --target-org [alias]
sf apex run test --target-org [alias] --code-coverage
sf org open --target-org [alias]
```

### Local Development
```bash
npm run test:lwc
npm run lint
```

## Project Structure
```
force-app/
├── main/
│   └── default/
│       ├── classes/
│       ├── triggers/
│       ├── lwc/
│       ├── flows/
│       ├── objects/
│       ├── permissionsets/
│       └── bots/
```

## Architecture Patterns

### Apex Layers
- **Triggers** → Call Handler classes only
- **Handlers** → Orchestrate Domain and Service calls
- **Services** → Business logic
- **Selectors** → All SOQL queries centralized
- **Domains** → Object-specific logic

### Naming Conventions
- Triggers: `[Object]Trigger`
- Handlers: `[Object]TriggerHandler`
- Services: `[Feature]Service`
- Selectors: `[Object]Selector`
- Test Classes: `[ClassName]Test`
- LWC: `camelCase`

## Task Management
For large tasks, create dev docs: `dev/active/[task-name]/`

## Skill Auto-Suggestion

This framework suggests skills based on keywords. The following skills are referenced in `.claude/hooks/skill-rules.json`:

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

### Additional
- `lwc-dev-guidelines`
- `salesforce-shield-security`
- `salesforce-integration-patterns`

> **Note:** Skills must be installed separately. The framework only suggests them based on prompt keywords.

## Testing Requirements
- Minimum 85% code coverage
- All test methods must have System.assert
- Bulk test with 200+ records
- Test positive and negative scenarios
