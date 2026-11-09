import { config } from '../data/content'
import type { brandPaths } from './brandPaths'

export type ContactLink = { key: keyof typeof brandPaths; label: string; href: string; external: boolean }

/**
 * The icon links shown in the nav, hero and footer, in display order.
 * Anything without a URL (e.g. X until set) is left out, so no dead links.
 */
export function contactLinks(include: (keyof typeof brandPaths)[] = ['linkedin', 'gmail', 'x', 'github', 'instagram']): ContactLink[] {
  const all: ContactLink[] = [
    { key: 'linkedin', label: 'LinkedIn profile', href: config.socials.linkedin, external: true },
    { key: 'gmail', label: `Email ${config.email}`, href: config.email ? `mailto:${config.email}` : '', external: false },
    { key: 'x', label: 'X (Twitter)', href: config.socials.x, external: true },
    { key: 'github', label: 'GitHub', href: config.socials.github, external: true },
    { key: 'instagram', label: 'Instagram', href: config.socials.instagram, external: true },
  ]
  return all.filter((l) => l.href && include.includes(l.key))
}
