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

For large tasks, use `/dev-docs` to create implementation tracking docs in `dev/active/[task-name]/`.

Before ending a session, run `/dev-docs-update` to save progress.

## Testing Requirements
- Minimum 85% code coverage
- All test methods must have System.assert
- Bulk test with 200+ records
- Test positive and negative scenarios
