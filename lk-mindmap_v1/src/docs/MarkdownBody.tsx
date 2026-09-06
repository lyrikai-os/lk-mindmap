import React from 'react';

/** Minimal offline Markdown → React (headings, lists, paragraphs, inline code/bold). */
export function MarkdownBody({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);
  return (
    <div className="md-body">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every(l => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+\.\s+/, ''))}</li>
              ))}
            </ol>
          );
        }
        if (lines.every(l => /^[-*]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^[-*]\s+/, ''))}</li>
              ))}
            </ul>
          );
        }
        const first = lines[0] ?? '';
        if (first.startsWith('### ')) return <h3 key={i}>{inline(first.slice(4))}</h3>;
        if (first.startsWith('## ')) return <h2 key={i}>{inline(first.slice(3))}</h2>;
        if (first.startsWith('# ')) return <h1 key={i}>{inline(first.slice(2))}</h1>;
        return <p key={i}>{lines.map((l, j) => <React.Fragment key={j}>{j > 0 && <br />}{inline(l)}</React.Fragment>)}</p>;
      })}
    </div>
  );
}

function inline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith('**')) parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    else parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : parts;
}
