// utils/diff.js - Simple line-based text diff viewer

export function renderDiff(prev = '', current = '') {
  const prevLines = prev.split('\n');
  const currLines = current.split('\n');
  let result = '<pre class="diff-block">';

  const max = Math.max(prevLines.length, currLines.length);
  for (let i = 0; i < max; i++) {
    const oldLine = prevLines[i] || '';
    const newLine = currLines[i] || '';

    if (oldLine === newLine) {
      result += `<div class="diff-line neutral">  ${newLine}</div>`;
    } else {
      if (oldLine) result += `<div class="diff-line removed">- ${oldLine}</div>`;
      if (newLine) result += `<div class="diff-line added">+ ${newLine}</div>`;
    }
  }

  result += '</pre>';
  return result;
}