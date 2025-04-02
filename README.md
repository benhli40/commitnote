# 📝 CommitNote

**Commit your thoughts like code.**  
A retro-inspired journaling app for developers who think in commits.

![screenshot](assets/commitnote-preview.png) <!-- Optional preview image -->

---

## 🚀 Features

- 📜 **Git-style journaling** — every entry is a "commit" with a message, body, mood, and tags
- 🔍 **Diff viewer** — compare your thoughts side-by-side, like a code change
- 🎨 **Mood-based themes** — calm, focused, stormy, and more
- 🧪 **Terminal command bar** — unlock hidden tools with `:commands`
- 💾 **LocalStorage-powered** — your data stays on your device
- 📤 **Export to Markdown or JSON** — take your commits anywhere
- 🃏 **Easter egg commands** — `:git log`, `:fortune`, `:revert`, and more

---

## 🖼️ Screenshots

<details>
  <summary>📓 Entry Editor</summary>
  <img src="assets/screenshot-editor.png" alt="New Commit screen" />
</details>

<details>
  <summary>🧾 Diff Viewer</summary>
  <img src="assets/screenshot-diff.png" alt="Diff view" />
</details>

<details>
  <summary>🧪 Command Line</summary>
  <img src="assets/screenshot-command.png" alt="Command line interface" />
</details>

---

## 🧰 Tech Stack

- HTML + CSS3 (terminal aesthetic, theme support)
- Vanilla JavaScript (modular SPA-style structure)
- LocalStorage (for journaling data)
- No frameworks, no build tools — just fast, clean code

---

## 💡 Easter Egg Commands

| Command | Description |
|---------|-------------|
| `:git log` | View commit history |
| `:revert` | Undo your latest commit |
| `:random` | Jump to a random commit |
| `:export md` | Download your journal as Markdown |
| `:export json` | Download your journal as JSON |
| `:theme calm` | Switch mood-based themes |
| `:fortune` | Get a random dev wisdom |
| `:echo hello` | Echo back text |
| `:help` | List all commands |

---

## 🛠️ Local Setup

```bash
git clone https://github.com/your-username/commitnote.git
cd commitnote
open index.html
