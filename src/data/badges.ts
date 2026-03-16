export interface Badge {
  id: string;
  title: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'domain';
  emoji: string;
  color: string;
  unlockCriteria: string;
}

export const badges: Badge[] = [
  { id: 'foundation-certified', title: 'Foundation Certified', description: 'Completed all 5 Foundation modules', tier: 'bronze', emoji: '🥉', color: '#CD7F32', unlockCriteria: 'Complete Track 1: Foundations' },
  { id: 'practitioner-certified', title: 'Practitioner Certified', description: 'Completed all 5 Practitioner modules', tier: 'silver', emoji: '🥈', color: '#C0C0C0', unlockCriteria: 'Complete Track 2: Practitioner' },
  { id: 'expert-certified', title: 'Expert Certified', description: 'Completed all 5 Expert modules', tier: 'gold', emoji: '🥇', color: '#FFD700', unlockCriteria: 'Complete Track 3: Expert' },
  { id: 'esm-specialist', title: 'ESM Specialist', description: 'Deep knowledge of Enterprise Service Management capabilities', tier: 'domain', emoji: '🔧', color: '#00E6B9', unlockCriteria: 'Pass ESM-related quizzes with 90%+' },
  { id: 'exposure-specialist', title: 'Exposure Specialist', description: 'Deep knowledge of Exposure Management capabilities', tier: 'domain', emoji: '🛡️', color: '#8B5CF6', unlockCriteria: 'Pass Exposure-related quizzes with 90%+' },
  { id: 'endpoint-specialist', title: 'Endpoint Specialist', description: 'Deep knowledge of Endpoint Management & Security capabilities', tier: 'domain', emoji: '💻', color: '#3B82F6', unlockCriteria: 'Pass Endpoint-related quizzes with 90%+' },
  { id: 'foundations-specialist', title: 'Foundations Specialist', description: 'Deep knowledge of Foundations capabilities', tier: 'domain', emoji: '🏗️', color: '#F59E0B', unlockCriteria: 'Pass Foundations-related quizzes with 90%+' },
];
