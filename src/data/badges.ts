export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  unlockCriteria: string;
  trackId?: string;
}

export const badges: Badge[] = [
  { id: 'roi-certified', title: 'ROI & Value Assessment Certified', description: 'Completed all 6 ROI & Value Assessment modules', emoji: '📊', color: '#00E6B9', unlockCriteria: 'Complete all modules in ROI & Value Assessment track', trackId: 'roi-value' },
  { id: 'capability-certified', title: 'Capability & Maturity Certified', description: 'Completed all 6 Capability & Maturity Assessment modules', emoji: '🎯', color: '#8B5CF6', unlockCriteria: 'Complete all modules in Capability & Maturity track', trackId: 'capability-maturity' },
  { id: 've-master', title: 'VE Master Certified', description: 'Completed both tracks — full Value Engineering mastery', emoji: '🏆', color: '#FFD700', unlockCriteria: 'Complete both tracks to earn VE Master status' },
];
