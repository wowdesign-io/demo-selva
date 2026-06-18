export interface SbLink {
  id?: string
  cached_url?: string
  url?: string
  email?: string
  anchor?: string
  linktype?: 'story' | 'url' | 'email' | 'asset'
  target?: '_blank' | ''
  fieldtype?: 'multilink'
}

export interface ResolvedLink {
  href: string
  target?: '_blank'
  rel?: 'noopener noreferrer'
}

export function resolveLink(link: SbLink | string | undefined, fallback = '/'): ResolvedLink {
  if (!link) return { href: fallback }
  // backward compat: existing stories may have a plain text string
  if (typeof link === 'string') return { href: link || fallback }
  if (link.linktype === 'email') return { href: `mailto:${link.email ?? ''}` }
  const anchor = link.anchor ? `#${link.anchor}` : ''
  const raw = link.cached_url ?? link.url ?? ''
  const href = raw ? (raw.startsWith('/') || raw.startsWith('http') || raw.startsWith('mailto') ? raw : `/${raw}`) + anchor : fallback
  return link.target === '_blank'
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }
}
