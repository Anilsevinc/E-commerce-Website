import { useLocation } from 'react-router-dom'

import InnerPagesHeader from './InnerPagesHeader'
import MainPageHeader from './MainPageHeader'

/** Inner pages: 1050px content @ 1440 — same horizontal inset as Contact hero (logo aligns with copy) */
const SIMPLE_HEADER_PATHS = ['/contact', '/pricing', '/about']

function matchesSimpleHeader(pathname) {
  if (SIMPLE_HEADER_PATHS.includes(pathname)) return true
  if (pathname.startsWith('/team')) return true
  return false
}

export default function Header() {
  const { pathname } = useLocation()
  const isInnerPagesHeader = matchesSimpleHeader(pathname)

  return isInnerPagesHeader ? <InnerPagesHeader /> : <MainPageHeader />
}
