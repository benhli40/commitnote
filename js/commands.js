// commands.js - Easter egg command system for CommitNote

import { getCommits, clearCommits, getRandomCommit } from './storage.js';
import { overwriteCommits } from './storage.js';
import { renderDiff } from './utils/diff.js';
import { renderLog } from './ui.js';

export function runCommand(input, outputCallback) {
  const cmd = input.trim();

  if (cmd === ':help') {
    return outputCallback(`Available commands:
:git log - View all commit messages
:revert - Remove latest commit
:random - View a random commit
:clear - Clear all commits
:export json - Export data as .json
:export md - Export data as .md
:theme [name] - Change theme (default, calm, focused, stormy)
:fortune - Get a random dev fortune
:echo [msg] - Echo back your message`);
  }

  if (cmd === ':git log') {
    const commits = getCommits();
    if (commits.length === 0) return outputCallback('No commits found.');
    const log = commits
      .map(c => `commit ${c.id}\nDate: ${new Date(c.timestamp).toLocaleString()}\nMessage: ${c.message}\nTags: ${c.tags?.join(', ') || 'none'}\nMood: ${c.mood || 'none'}\n---`)
      .join('\n');
    return outputCallback(log);
  }

  if (cmd === ':revert') {
    const commits = getCommits();
    if (commits.length === 0) return outputCallback('Nothing to revert.');
    commits.pop();
    overwriteCommits(commits);
    return outputCallback('Last commit reverted.');
  }

  if (cmd === ':clear') {
    clearCommits();
    return outputCallback('All commits cleared.');
  }

  if (cmd === ':random') {
    const commit = getRandomCommit();
    if (!commit) return outputCallback('No commits available.');
    const diff = renderDiff('', commit.body);
    return outputCallback(`Random commit: ${commit.message}\n${diff}`);
  }

  if (cmd === ':export json') {
    const data = JSON.stringify(getCommits(), null, 2);
    downloadFile(data, 'commitnote_export.json', 'application/json');
    return outputCallback('Exported as JSON.');
  }

  if (cmd === ':export md') {
    const commits = getCommits();
    const md = commits.map(c => `## ${c.message}\n*${new Date(c.timestamp).toLocaleString()}*\n\n${c.body}\n\n---`).join('\n');
    downloadFile(md, 'commitnote_export.md', 'text/markdown');
    return outputCallback('Exported as Markdown.');
  }

  if (cmd.startsWith(':theme ')) {
    const theme = cmd.split(' ')[1];
    document.body.setAttribute('data-theme', theme);
    return outputCallback(`Theme changed to: ${theme}`);
  }

  if (cmd === ':fortune') {
    const fortunes = [
      "Merge conflicts build character.",
      "You're just one semicolon away from greatness.",
      "When in doubt, clear the cache.",
      "Refactor now, cry less later.",
      "Your commit messages are poetry."
    ];
    const f = fortunes[Math.floor(Math.random() * fortunes.length)];
    return outputCallback(f);
  }

  if (cmd.startsWith(':echo ')) {
    return outputCallback(cmd.slice(6));
  }

  return outputCallback('Unknown command. Type :help for list.');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}