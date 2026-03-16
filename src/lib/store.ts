'use client';

const STORAGE_KEY = 've-academy-state';

interface AcademyState {
  profile: { name: string };
  completedModules: Record<string, string>;
  quizScores: Record<string, { score: number; total: number; firstAttempt: boolean; date: string }>;
  earnedBadges: Record<string, string>;
}

function getState(): AcademyState {
  if (typeof window === 'undefined') return defaultState();
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : defaultState();
}

function setState(state: AcademyState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function defaultState(): AcademyState {
  return { profile: { name: '' }, completedModules: {}, quizScores: {}, earnedBadges: {} };
}

export function getProfile() { return getState().profile; }
export function setProfile(name: string) { const s = getState(); s.profile.name = name; setState(s); }

export function isModuleCompleted(trackId: string, moduleId: string) {
  return !!getState().completedModules[`${trackId}/${moduleId}`];
}

export function completeModule(trackId: string, moduleId: string) {
  const s = getState();
  const key = `${trackId}/${moduleId}`;
  if (!s.completedModules[key]) {
    s.completedModules[key] = new Date().toISOString();
    setState(s);
  }
}

export function getQuizScore(trackId: string, moduleId: string) {
  return getState().quizScores[`${trackId}/${moduleId}`] || null;
}

export function saveQuizScore(trackId: string, moduleId: string, score: number, total: number) {
  const s = getState();
  const key = `${trackId}/${moduleId}`;
  const existing = s.quizScores[key];
  s.quizScores[key] = {
    score, total,
    firstAttempt: !existing,
    date: new Date().toISOString()
  };
  setState(s);
}

export function getTrackProgress(trackId: string, moduleCount: number) {
  const s = getState();
  let completed = 0;
  for (const key of Object.keys(s.completedModules)) {
    if (key.startsWith(trackId + '/')) completed++;
  }
  return { completed, total: moduleCount, percentage: moduleCount > 0 ? Math.round((completed / moduleCount) * 100) : 0 };
}

export function isBadgeEarned(badgeId: string) { return !!getState().earnedBadges[badgeId]; }

export function earnBadge(badgeId: string) {
  const s = getState();
  if (!s.earnedBadges[badgeId]) {
    s.earnedBadges[badgeId] = new Date().toISOString();
    setState(s);
  }
}

export function getBadgeDate(badgeId: string) { return getState().earnedBadges[badgeId] || null; }

export function getTotalPoints(): number {
  const s = getState();
  let points = 0;
  points += Object.keys(s.completedModules).length * 10;
  for (const q of Object.values(s.quizScores)) {
    points += q.firstAttempt ? 25 : 15;
  }
  const trackModuleCounts: Record<string, number> = { foundations: 5, practitioner: 5, expert: 5 };
  for (const [trackId, count] of Object.entries(trackModuleCounts)) {
    let completed = 0;
    for (const key of Object.keys(s.completedModules)) {
      if (key.startsWith(trackId + '/')) completed++;
    }
    if (completed >= count) points += 100;
  }
  points += Object.keys(s.earnedBadges).length * 50;
  return points;
}

export function getRecentActivity(): { type: string; label: string; date: string }[] {
  const s = getState();
  const activities: { type: string; label: string; date: string }[] = [];
  for (const [key, date] of Object.entries(s.completedModules)) {
    activities.push({ type: 'module', label: `Completed: ${key.split('/')[1]}`, date });
  }
  for (const [key, data] of Object.entries(s.quizScores)) {
    activities.push({ type: 'quiz', label: `Quiz: ${key.split('/')[1]} (${data.score}/${data.total})`, date: data.date });
  }
  for (const [badgeId, date] of Object.entries(s.earnedBadges)) {
    activities.push({ type: 'badge', label: `Badge earned: ${badgeId}`, date });
  }
  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCompletedModuleCount(): number { return Object.keys(getState().completedModules).length; }
export function getPassedQuizCount(): number { return Object.keys(getState().quizScores).length; }
