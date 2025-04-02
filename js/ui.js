// ui.js - Handles rendering views and UI interactions

import { getCommits } from './storage.js';
import { renderDiff } from './utils/diff.js';
import { runCommand } from './commands.js';
import { Commit, isValidCommit } from './commit.js';

const mainView = document.getElementById('main-view');
const newEntryBtn = document.getElementById('new-entry');
const viewLogBtn = document.getElementById('view-log');
const toggleThemeBtn = document.getElementById('toggle-theme');
const commandInput = document.getElementById('command-input');
const commandOutput = document.getElementById('command-output');

let currentTheme = 'default';

function renderSplash() {
  mainView.innerHTML = `
    <section class="splash">
      <pre class="ascii-art">
      _________              .__  .__        __         
     /   _____/ ____   ____ |  | |__| ____ |  | __ ____  
     \_____  \ /  _ \ /  _ \|  | |  |/ __ \|  |/ // __ \ 
     /        (  <_> |  <_> )  |_|  \  ___/|    <\  ___/ 
    /_______  /\____/ \____/|____/__|\___  >__|_ \\___  >
            \/                           \/     \/    \/
      </pre>
      <p class="splash-msg">Booting CommitNote...</p>
    </section>
  `;
  setTimeout(renderHome, 2000);
}

function renderHome() {
  mainView.innerHTML = `
    <section class="welcome">
      <h2>Welcome to CommitNote</h2>
      <p>Start journaling like a developer. Click "New Commit" to begin.</p>
    </section>
  `;
}

function renderNewEntry() {
  mainView.innerHTML = `
    <section class="new-entry">
      <h2>New Commit</h2>
      <input type="text" id="commit-msg" placeholder="Commit message" />
      <textarea id="commit-body" rows="8" placeholder="Write your thoughts here..."></textarea>
      <input type="text" id="commit-tags" placeholder="Tags (comma-separated)" />
      <select id="commit-mood">
        <option value="">Mood</option>
        <option value="calm">Calm</option>
        <option value="focused">Focused</option>
        <option value="stormy">Stormy</option>
      </select>
      <button id="save-commit">Save Commit</button>
    </section>
  `;

  document.getElementById('save-commit').addEventListener('click', () => {
    const msg = document.getElementById('commit-msg').value.trim();
    const body = document.getElementById('commit-body').value.trim();
    const tags = document.getElementById('commit-tags').value.trim().split(',').map(t => t.trim()).filter(Boolean);
    const mood = document.getElementById('commit-mood').value;

    const newCommit = new Commit({ message: msg, body, tags, mood });

    if (isValidCommit(newCommit)) {
      const commits = getCommits();
      commits.push(newCommit);
      localStorage.setItem('commitnote_data', JSON.stringify(commits));
      renderLog();
    }
  });
}

export function renderLog() {
  const commits = getCommits().reverse();
  mainView.innerHTML = `<section class="log"><h2>Commit Log</h2></section>`;
  const section = mainView.querySelector('.log');

  if (commits.length === 0) {
    section.innerHTML += '<p>No commits yet.</p>';
    return;
  }

  commits.forEach(commit => {
    const div = document.createElement('div');
    div.className = 'commit-entry';
    div.innerHTML = `
      <pre><strong>${commit.message}</strong> — ${new Date(commit.timestamp).toLocaleString()}</pre>
      <button data-id="${commit.id}" class="view-diff">View</button>
    `;
    section.appendChild(div);
  });

  document.querySelectorAll('.view-diff').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      const commits = getCommits();
      const index = commits.findIndex(c => c.id === id);
      const current = commits[index];
      const previous = commits[index + 1] || { body: '' };
      const diffHTML = renderDiff(previous.body, current.body);
      mainView.innerHTML = `
        <section class="diff-view">
          <h2>Diff: ${current.message}</h2>
          <div class="diff">${diffHTML}</div>
          <button id="back-to-log">Back</button>
        </section>
      `;
      document.getElementById('back-to-log').addEventListener('click', renderLog);
    });
  });
}

function toggleTheme() {
  const themes = ['default', 'calm', 'focused', 'stormy'];
  const next = (themes.indexOf(currentTheme) + 1) % themes.length;
  currentTheme = themes[next];
  document.body.setAttribute('data-theme', currentTheme);
}

function handleCommandInput(e) {
  if (e.key === 'Enter') {
    const command = commandInput.value;
    runCommand(command, output => {
      commandOutput.innerHTML = `<pre>${output}</pre>`;
    });
    commandInput.value = '';
  }
}

// Initial Render
renderSplash();

// Event Listeners
newEntryBtn.addEventListener('click', renderNewEntry);
viewLogBtn.addEventListener('click', renderLog);
toggleThemeBtn.addEventListener('click', toggleTheme);
commandInput.addEventListener('keydown', handleCommandInput);