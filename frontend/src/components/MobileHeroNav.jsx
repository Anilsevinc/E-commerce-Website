import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ChevronDown, Heart, Search, ShoppingCart, User } from 'lucide-react'

import { isPathUnderPagesMenu, PAGES_NAV_LINKS } from '../lib/pagesNavLinks'

const linkClass = ({ isActive }) =>
  [
    'block w-full text-center font-sans text-[30px] font-semibold leading-[45px] tracking-[0.2px] transition-colors',
    isActive ? 'text-neutral-900' : 'text-[#737373]',
  ].join(' ')

export default function MobileHeroNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showAccountBlock = pathname === '/shop' || pathname.startsWith('/product/')
  const from = pathname
  const cart = useSelector((s) => s.shoppingCart.cart)
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, ci) => sum + Number(ci?.count || 0), 0)
    : 0
  const wishlistCount = useSelector(
    (s) => (Array.isArray(s.wishlist?.items) ? s.wishlist.items.length : 0)
  )
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [pagesOpen, setPagesOpen] = useState(false)
  const pagesMenuActive = isPathUnderPagesMenu(pathname)

  function onSubmitSearch(e) {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <nav
      className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-6 px-4 pt-6 pb-8 lg:hidden"
      aria-label="Primary"
    >
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/shop" className={linkClass}>
        Product
      </NavLink>
      <NavLink to="/pricing" className={linkClass}>
        Pricing
      </NavLink>
      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>

      {showAccountBlock && (
        <div className="flex w-full flex-col items-center gap-6 border-t border-neutral-200 pt-6">
          <div className="flex w-full flex-col items-center gap-3">
            <button
              type="button"
              className={`inline-flex items-center gap-1 text-center text-base font-normal leading-normal transition-colors ${
                pagesMenuActive ? 'text-neutral-900' : 'text-muted'
              }`}
              aria-expanded={pagesOpen}
              onClick={() => setPagesOpen((o) => !o)}
            >
              Pages
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${pagesOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {pagesOpen ? (
              <nav
                aria-label="Pages"
                className="flex w-full max-w-xs flex-col items-center gap-4 border-t border-neutral-200 pt-4"
              >
                {PAGES_NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      [
                        'text-center text-base font-normal leading-normal transition-colors',
                        isActive ? 'text-neutral-900' : 'text-muted',
                      ].join(' ')
                    }
                    onClick={() => setPagesOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            ) : null}
          </div>

          <Link
            to="/login"
            state={{ from }}
            className="inline-flex items-center justify-center gap-2 text-brand transition-opacity hover:opacity-80"
          >
            <User className="h-6 w-6 shrink-0" strokeWidth={2} aria-hidden />
            <span className="text-base font-semibold">Login / Register</span>
          </Link>

          <Link
            to="/signup"
            className="text-center text-base font-semibold leading-normal text-brand transition-opacity hover:opacity-80"
          >
            Sign Up
          </Link>

          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-brand transition-opacity hover:opacity-80"
              aria-expanded={searchOpen}
              aria-label="Search products"
              onClick={() => setSearchOpen((o) => !o)}
            >
              <Search className="h-6 w-6" strokeWidth={2} />
              <span className="text-sm font-semibold">Search</span>
            </button>
            {searchOpen ? (
              <form onSubmit={onSubmitSearch} className="flex w-full flex-col gap-2 px-1">
                <label htmlFor="mobile-hero-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="mobile-hero-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="min-h-[44px] w-full rounded-md border border-neutral-300 px-3 text-sm font-semibold text-neutral-900 outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  className="min-h-[44px] rounded-md bg-brand text-sm font-bold text-white"
                >
                  Search
                </button>
              </form>
            ) : null}
          </div>

          <div className="flex items-center justify-center gap-1 text-brand">
            <Link
              to="/cart"
              className="relative flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={2} />
              {cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <span className="text-sm font-semibold leading-none">{cartCount}</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-brand">
            <span className="relative flex items-center justify-center" aria-label="Wishlist">
              <Heart className="h-6 w-6" strokeWidth={2} />
              {wishlistCount > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              ) : null}
            </span>
            <span className="text-sm font-semibold leading-none">{wishlistCount}</span>
          </div>
        </div>
      )}
    </nav>
  )
}
