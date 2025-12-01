// userPromptSubmit.ts
// Analyzes user prompt and injects relevant skill activation reminders

import * as fs from 'fs';
import * as path from 'path';

interface SkillRule {
  type: string;
  enforcement: string;
  priority: string;
  promptTriggers: {
    keywords: string[];
    intentPatterns: string[];
  };
  fileTriggers: {
    pathPatterns: string[];
    contentPatterns: string[];
  };
}

interface SkillRules {
  skills: Record<string, SkillRule>;
}

export async function onUserPromptSubmit(prompt: string, context: any): Promise<string> {
  const rulesPath = path.join(__dirname, 'skill-rules.json');

  if (!fs.existsSync(rulesPath)) {
    return prompt;
  }

  const rules: SkillRules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));
  const matchedSkills: string[] = [];
  const promptLower = prompt.toLowerCase();

  for (const [skillName, rule] of Object.entries(rules.skills)) {
    // Check keywords
    const keywordMatch = rule.promptTriggers.keywords.some(
      keyword => promptLower.includes(keyword.toLowerCase())
    );

    // Check intent patterns
    const intentMatch = rule.promptTriggers.intentPatterns.some(
      pattern => new RegExp(pattern, 'i').test(prompt)
    );

    if (keywordMatch || intentMatch) {
      matchedSkills.push(skillName);
    }
  }

  if (matchedSkills.length > 0) {
    const skillReminder = `
SKILL ACTIVATION CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Relevant skills detected: ${matchedSkills.join(', ')}
Please review these skills before proceeding.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
    return skillReminder + prompt;
  }

  return prompt;
}
