/** Routes shown under the main nav "Pages" menu (no standalone /pages view). */
export const PAGES_NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/team', label: 'Team' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/reservation', label: 'Reservation' },
]

export function isPathUnderPagesMenu(pathname, links = PAGES_NAV_LINKS) {
  return links.some(
    ({ to }) => pathname === to || (to.length > 1 && pathname.startsWith(`${to}/`))
  )
}
