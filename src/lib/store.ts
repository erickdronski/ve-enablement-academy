'use client';

const STORAGE_KEY = 've-academy-v2';

interface AcademyState {
  profile: { name: string };
  completedModules: Record<string, string>;
  quizScores: Record<string, { score: number; total: number; firstAttempt: boolean; date: string }>;
  earnedBadges: Record<string, string>;
}

function getState(): AcademyState {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch { return defaultState(); }
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
  if (!s.completedModules[key]) { s.completedModules[key] = new Date().toISOString(); setState(s); }
}

export function getQuizScore(trackId: string, moduleId: string) {
  return getState().quizScores[`${trackId}/${moduleId}`] || null;
}

export function saveQuizScore(trackId: string, moduleId: string, score: number, total: number) {
  const s = getState();
  const key = `${trackId}/${moduleId}`;
  const existing = s.quizScores[key];
  s.quizScores[key] = { score, total, firstAttempt: !existing, date: new Date().toISOString() };
  setState(s);
}

export function getTrackProgress(trackId: string, moduleCount: number) {
  const s = getState();
  let completed = 0;
  for (const key of Object.keys(s.completedModules)) { if (key.startsWith(trackId + '/')) completed++; }
  return { completed, total: moduleCount, percentage: moduleCount > 0 ? Math.round((completed / moduleCount) * 100) : 0 };
}

export function isBadgeEarned(badgeId: string) { return !!getState().earnedBadges[badgeId]; }
export function earnBadge(badgeId: string) { const s = getState(); if (!s.earnedBadges[badgeId]) { s.earnedBadges[badgeId] = new Date().toISOString(); setState(s); } }
export function getBadgeDate(badgeId: string) { return getState().earnedBadges[badgeId] || null; }

export function getTotalXP(): number {
  const s = getState();
  let xp = 0;
  xp += Object.keys(s.completedModules).length * 10;
  for (const q of Object.values(s.quizScores)) { xp += q.firstAttempt ? 25 : 15; }
  const trackCounts: Record<string, number> = { 'roi-value': 6, 'capability-maturity': 6 };
  for (const [tid, count] of Object.entries(trackCounts)) {
    let c = 0;
    for (const key of Object.keys(s.completedModules)) { if (key.startsWith(tid + '/')) c++; }
    if (c >= count) xp += 100;
  }
  xp += Object.keys(s.earnedBadges).length * 50;
  return xp;
}

export function getLevel(): string {
  const xp = getTotalXP();
  if (xp >= 1000) return 'Expert';
  if (xp >= 600) return 'Advanced';
  if (xp >= 200) return 'Intermediate';
  return 'Beginner';
}

export function getCompletedModuleCount(): number { return Object.keys(getState().completedModules).length; }
export function getPassedQuizCount(): number { return Object.keys(getState().quizScores).length; }

export function getRecentActivity(): { type: string; label: string; date: string }[] {
  const s = getState();
  const a: { type: string; label: string; date: string }[] = [];
  for (const [key, date] of Object.entries(s.completedModules)) a.push({ type: 'module', label: `Completed: ${key.split('/')[1]}`, date });
  for (const [key, data] of Object.entries(s.quizScores)) a.push({ type: 'quiz', label: `Quiz: ${key.split('/')[1]} (${data.score}/${data.total})`, date: data.date });
  for (const [id, date] of Object.entries(s.earnedBadges)) a.push({ type: 'badge', label: `Badge: ${id}`, date });
  return a.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());
}
