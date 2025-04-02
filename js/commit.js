// commit.js - Commit data structure, helpers (optional for expansion)

export class Commit {
  constructor({ id, timestamp, message, body, tags = [], mood = '' }) {
    this.id = id || Date.now();
    this.timestamp = timestamp || new Date().toISOString();
    this.message = message;
    this.body = body;
    this.tags = tags;
    this.mood = mood;
  }
}

// Helper: Format commit log line
export function formatCommitLine(commit) {
  return `commit ${commit.id}\nDate: ${new Date(commit.timestamp).toLocaleString()}\nMessage: ${commit.message}\nTags: ${commit.tags.join(', ') || 'none'}\nMood: ${commit.mood || 'none'}`;
}

// Helper: Basic validation
export function isValidCommit(commit) {
  return commit && commit.message && commit.body;
}