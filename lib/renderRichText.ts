// Inline Prosemirror → HTML renderer — zero browser-API dependencies, safe in RSC.
// Used by PressArticle and LegalPage. Do not import @storyblok/richtext here.

export function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTextContent(node: Record<string, any>): string {
  if (node.type === 'text') return node.text ?? '';
  return (node.content ?? []).map(getTextContent).join('');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractToc(doc: Record<string, any>): Array<{ id: string; label: string }> {
  return (doc?.content ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((n: any) => n.type === 'heading' && (n.attrs?.level ?? 2) === 2)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((n: any) => {
      const label = getTextContent(n);
      return { id: slugify(label), label };
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderNode(node: Record<string, any>): string {
  if (!node || typeof node !== 'object') return '';
  const children = () => (node.content ?? []).map(renderNode).join('');
  switch (node.type) {
    case 'doc':        return children();
    case 'paragraph':  return `<p>${children()}</p>`;
    case 'heading': {
      const l = node.attrs?.level ?? 2;
      const id = l === 2 ? ` id="${slugify(getTextContent(node))}"` : '';
      return `<h${l}${id}>${children()}</h${l}>`;
    }
    case 'blockquote': return `<blockquote>${children()}</blockquote>`;
    case 'bullet_list':  return `<ul>${children()}</ul>`;
    case 'ordered_list': return `<ol>${children()}</ol>`;
    case 'list_item':    return `<li>${children()}</li>`;
    case 'hard_break':   return '<br>';
    case 'image': {
      const { src = '', alt = '', title = '' } = node.attrs ?? {};
      return `<img src="${escHtml(src)}" alt="${escHtml(alt)}"${title ? ` title="${escHtml(title)}"` : ''}>`;
    }
    case 'text': {
      let t = escHtml(node.text ?? '');
      for (const m of (node.marks ?? [])) {
        if (m.type === 'bold')        t = `<strong>${t}</strong>`;
        else if (m.type === 'italic') t = `<em>${t}</em>`;
        else if (m.type === 'link') {
          const href   = escHtml(m.attrs?.href ?? '#');
          const target = m.attrs?.target ? ` target="${escHtml(m.attrs.target)}"` : '';
          t = `<a href="${href}"${target}>${t}</a>`;
        }
      }
      return t;
    }
    default: return children();
  }
}
