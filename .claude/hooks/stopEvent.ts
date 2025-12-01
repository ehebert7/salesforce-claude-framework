// stopEvent.ts
// Post-response validation for Salesforce best practices

import * as fs from 'fs';
import * as path from 'path';

interface EditedFile {
  path: string;
  content: string;
}

// Apex anti-patterns and issues
const APEX_CHECKS = [
  // Governor Limit Violations
  { pattern: /for\s*\([^)]*\)\s*\{[^}]*\[SELECT/gi, message: 'SOQL query inside loop detected', severity: 'error' },
  { pattern: /for\s*\([^)]*\)\s*\{[^}]*(insert|update|delete|upsert)\s/gi, message: 'DML inside loop detected', severity: 'error' },
  { pattern: /while\s*\([^)]*\)\s*\{[^}]*\[SELECT/gi, message: 'SOQL query inside while loop detected', severity: 'error' },

  // Security Issues
  { pattern: /Database\.query\s*\([^)]*\+/g, message: 'Dynamic SOQL with string concatenation (potential injection)', severity: 'error' },
  { pattern: /Database\.query\s*\([^:)]*\)/g, message: 'Dynamic SOQL without bind variables', severity: 'warning' },
  { pattern: /without\s+sharing/gi, message: 'Class uses "without sharing" - ensure this is intentional and documented', severity: 'warning' },

  // Hardcoded Values
  { pattern: /['"][0-9a-zA-Z]{15}['"]/g, message: 'Possible hardcoded 15-character Salesforce ID', severity: 'warning' },
  { pattern: /['"][0-9a-zA-Z]{18}['"]/g, message: 'Possible hardcoded 18-character Salesforce ID', severity: 'warning' },
  { pattern: /['"]https?:\/\/[^'"]*\.salesforce\.com[^'"]*['"]/gi, message: 'Hardcoded Salesforce URL detected', severity: 'warning' },
  { pattern: /['"]https?:\/\/[^'"]*\.force\.com[^'"]*['"]/gi, message: 'Hardcoded Force.com URL detected', severity: 'warning' },

  // Code Quality
  { pattern: /System\.debug\s*\(/g, message: 'System.debug statement (remove or use proper logging)', severity: 'info' },
  { pattern: /catch\s*\(\s*Exception\s+\w+\s*\)\s*\{\s*\}/g, message: 'Empty catch block detected', severity: 'warning' },
  { pattern: /TODO|FIXME|HACK|XXX/gi, message: 'TODO/FIXME comment found', severity: 'info' },

  // Trigger Patterns
  { pattern: /trigger\s+\w+\s+on\s+\w+[^{]*\{(?![^}]*Handler)/gi, message: 'Trigger without handler pattern detected', severity: 'warning' },

  // Null Safety
  { pattern: /\.size\(\)\s*[><=]/g, message: 'Check for null before calling .size()', severity: 'info' },
  { pattern: /\.isEmpty\(\)/g, message: 'Good: Using isEmpty() check', severity: 'ok' },
];

// LWC checks
const LWC_CHECKS = [
  // Console statements
  { pattern: /console\.(log|warn|error|info|debug)\s*\(/g, message: 'Console statement detected (remove for production)', severity: 'warning' },

  // Error handling
  { pattern: /\.then\s*\([^)]*\)(?!\s*\.catch)/g, message: 'Promise without .catch() error handling', severity: 'warning' },
  { pattern: /async\s+\w+\s*\([^)]*\)\s*\{(?![^}]*catch)/g, message: 'Async function may need try-catch', severity: 'info' },

  // Anti-patterns
  { pattern: /document\.(getElementById|querySelector|querySelectorAll)/g, message: 'Direct DOM manipulation (use this.template.querySelector instead)', severity: 'error' },
  { pattern: /innerHTML\s*=/g, message: 'innerHTML assignment (security risk, use lwc:dom="manual" if needed)', severity: 'error' },

  // Best practices
  { pattern: /@api\s+\w+\s*;(?!\s*\/\/)/g, message: 'Public @api property without JSDoc comment', severity: 'info' },
  { pattern: /this\.dispatchEvent\s*\(\s*new\s+CustomEvent/g, message: 'Good: Using CustomEvent for component communication', severity: 'ok' },
];

// Flow checks (XML content)
const FLOW_CHECKS = [
  { pattern: /<recordLookups>/g, count: true, threshold: 5, message: 'Flow has many Get Records elements (consider optimization)', severity: 'warning' },
  { pattern: /<loops>/g, count: true, threshold: 3, message: 'Flow has multiple loops (watch for performance)', severity: 'info' },
  { pattern: /<decisions>/g, count: true, threshold: 10, message: 'Flow has many decision elements (consider simplification)', severity: 'info' },
  { pattern: /<connector>(?![\s\S]*<faultConnector>)/g, message: 'Flow element may be missing fault connector', severity: 'info' },
];

export async function onStop(editedFiles: EditedFile[]): Promise<void> {
  const issues: { file: string; message: string; severity: string }[] = [];
  const okMessages: string[] = [];
  let apexFilesEdited = 0;
  let lwcFilesEdited = 0;
  let flowFilesEdited = 0;

  for (const file of editedFiles) {
    const ext = path.extname(file.path).toLowerCase();

    // Check Apex files
    if (ext === '.cls' || ext === '.trigger') {
      apexFilesEdited++;
      for (const check of APEX_CHECKS) {
        const matches = file.content.match(check.pattern);
        if (matches && check.severity !== 'ok') {
          issues.push({
            file: file.path,
            message: check.message,
            severity: check.severity
          });
        } else if (matches && check.severity === 'ok') {
          okMessages.push(check.message);
        }
      }
    }

    // Check LWC files
    if (ext === '.js' && file.path.includes('/lwc/')) {
      lwcFilesEdited++;
      for (const check of LWC_CHECKS) {
        const matches = file.content.match(check.pattern);
        if (matches && check.severity !== 'ok') {
          issues.push({
            file: file.path,
            message: check.message,
            severity: check.severity
          });
        } else if (matches && check.severity === 'ok') {
          okMessages.push(check.message);
        }
      }
    }

    // Check Flow files
    if (file.path.includes('.flow-meta.xml')) {
      flowFilesEdited++;
      for (const check of FLOW_CHECKS) {
        if ((check as any).count) {
          const matches = file.content.match(check.pattern);
          const count = matches ? matches.length : 0;
          if (count >= (check as any).threshold) {
            issues.push({
              file: file.path,
              message: `${check.message} (found ${count})`,
              severity: check.severity
            });
          }
        } else {
          if (check.pattern.test(file.content)) {
            issues.push({
              file: file.path,
              message: check.message,
              severity: check.severity
            });
          }
        }
      }
    }
  }

  // Generate output
  let output = '';

  // Show self-check reminders based on file types
  if (apexFilesEdited > 0) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APEX SELF-CHECK (${apexFilesEdited} file${apexFilesEdited > 1 ? 's' : ''})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Bulkified for 200+ records?
□ SOQL/DML outside of loops?
□ CRUD/FLS enforced (WITH USER_MODE)?
□ Null checks before .size() or iterations?
□ Test class with 85%+ coverage?
□ Meaningful assertions in tests?
`;
  }

  if (lwcFilesEdited > 0) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LWC SELF-CHECK (${lwcFilesEdited} file${lwcFilesEdited > 1 ? 's' : ''})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Error handling for Apex calls?
□ Loading states displayed?
□ Accessibility (ARIA labels)?
□ Console.log removed?
□ Jest tests written?
`;
  }

  if (flowFilesEdited > 0) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW SELF-CHECK (${flowFilesEdited} file${flowFilesEdited > 1 ? 's' : ''})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Fault paths for error handling?
□ Bulkified (no SOQL/DML in loops)?
□ Entry conditions optimized?
□ Flow documented with descriptions?
`;
  }

  // Show detected issues
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  if (errors.length > 0) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ ERRORS (${errors.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${errors.map(e => `${path.basename(e.file)}: ${e.message}`).join('\n')}
`;
  }

  if (warnings.length > 0) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ WARNINGS (${warnings.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${warnings.map(w => `${path.basename(w.file)}: ${w.message}`).join('\n')}
`;
  }

  if (infos.length > 0 && infos.length <= 5) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ INFO (${infos.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${infos.map(i => `${path.basename(i.file)}: ${i.message}`).join('\n')}
`;
  } else if (infos.length > 5) {
    output += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ INFO (${infos.length} items - showing first 5)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${infos.slice(0, 5).map(i => `${path.basename(i.file)}: ${i.message}`).join('\n')}
`;
  }

  if (output) {
    console.log(output);
  }
}
