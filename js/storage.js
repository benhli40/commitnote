// storage.js - LocalStorage interface for CommitNote

const STORAGE_KEY = 'commitnote_data';

export function getCommits() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCommit(commit) {
  const commits = getCommits();
  commits.push(commit);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commits));
}

export function overwriteCommits(commits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commits));
}

export function getRandomCommit() {
  const commits = getCommits();
  if (commits.length === 0) return null;
  const index = Math.floor(Math.random() * commits.length);
  return commits[index];
}

export function clearCommits() {
  localStorage.removeItem(STORAGE_KEY);
}