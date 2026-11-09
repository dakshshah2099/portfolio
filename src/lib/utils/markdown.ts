import { marked } from 'marked';

// Custom renderer to ensure links open securely in new tab
const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
};

marked.use({
  gfm: true,
  breaks: true,
  renderer
});

/**
 * Parses markdown and auto-detects URLs to render as clickable HTML links.
 * Defaults to inline parsing so list items and sentences aren't wrapped in `<p>`.
 */
export function renderMarkdown(content: string, inline = true): string {
  if (!content) return '';
  if (inline) {
    return marked.parseInline(content) as string;
  }
  return marked.parse(content) as string;
}
