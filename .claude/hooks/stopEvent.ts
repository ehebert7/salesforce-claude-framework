// stopEvent.ts
// Post-response validation for Salesforce best practices

import * as fs from 'fs';
import * as path from 'path';

interface EditedFile {
  path: string;
  content: string;
}

const APEX_ANTIPATTERNS = [
  { pattern: /for\s*\([^)]*\)\s*\{[^}]*\[SELECT/gi, message: 'SOQL query inside loop detected' },
  { pattern: /for\s*\([^)]*\)\s*\{[^}]*(insert|update|delete|upsert)\s/gi, message: 'DML inside loop detected' },
  { pattern: /['"][0-9a-zA-Z]{15,18}['"]/g, message: 'Possible hardcoded Record ID detected' },
];

const LWC_CHECKS = [
  { pattern: /import\s+\w+\s+from\s+['"]@salesforce\/apex/g, hasErrorHandling: /\.catch\s*\(|try\s*\{/g, message: 'Apex import without visible error handling' },
  { pattern: /console\.(log|warn|error)/g, message: 'Console statement detected (remove for production)' },
];

export async function onStop(editedFiles: EditedFile[]): Promise<void> {
  const issues: string[] = [];
  let apexFilesEdited = 0;
  let lwcFilesEdited = 0;
  let flowFilesEdited = 0;

  for (const file of editedFiles) {
    const ext = path.extname(file.path).toLowerCase();

    // Check Apex files
    if (ext === '.cls' || ext === '.trigger') {
      apexFilesEdited++;
      for (const check of APEX_ANTIPATTERNS) {
        if (check.pattern.test(file.content)) {
          issues.push(`⚠️ ${file.path}: ${check.message}`);
        }
      }
    }

    // Check LWC files
    if (ext === '.js' && file.path.includes('/lwc/')) {
      lwcFilesEdited++;
      for (const check of LWC_CHECKS) {
        if (check.pattern.test(file.content)) {
          issues.push(`⚠️ ${file.path}: ${check.message}`);
        }
      }
    }

    // Check Flow files
    if (file.path.includes('.flow-meta.xml')) {
      flowFilesEdited++;
    }
  }

  // Generate self-check reminder
  let reminder = '';

  if (apexFilesEdited > 0) {
    reminder += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APEX SELF-CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${apexFilesEdited} Apex file(s) edited

? Is the code bulkified for 200+ records?
? Are SOQL queries outside of loops?
? Is there a test class with 85%+ coverage?
? Did you handle null scenarios?
? Are CRUD/FLS checks in place?
`;
  }

  if (lwcFilesEdited > 0) {
    reminder += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LWC SELF-CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${lwcFilesEdited} LWC file(s) edited

? Is there error handling for Apex calls?
? Are loading states handled?
? Is the component accessible (ARIA labels)?
? Are console.log statements removed?
`;
  }

  if (flowFilesEdited > 0) {
    reminder += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOW SELF-CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${flowFilesEdited} Flow file(s) edited

? Is there a fault path for error handling?
? Are loops optimized (no SOQL/DML inside)?
? Is the flow well-documented?
`;
  }

  if (issues.length > 0) {
    reminder += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISSUES DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${issues.join('\n')}
`;
  }

  if (reminder) {
    console.log(reminder);
  }
}
