import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Search, ShoppingCart, User } from 'lucide-react'

const linkClass = ({ isActive }) =>
  [
    'block w-full text-center font-sans text-[30px] font-semibold leading-[45px] tracking-[0.2px] transition-colors',
    isActive ? 'text-neutral-900' : 'text-[#737373]',
  ].join(' ')

export default function MobileHeroNav() {
  const { pathname } = useLocation()
  const showAccountBlock = pathname === '/shop' || pathname.startsWith('/product/')

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
          <NavLink
            to="/pages"
            className={({ isActive }) =>
              [
                'text-center text-base font-normal leading-normal transition-colors',
                isActive ? 'text-neutral-900' : 'text-muted',
              ].join(' ')
            }
          >
            Pages
          </NavLink>

          <Link
            to="/login"
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

          <button
            type="button"
            className="flex items-center justify-center text-brand transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <Search className="h-6 w-6" strokeWidth={2} />
          </button>

          <div className="flex items-center justify-center gap-1 text-brand">
            <button
              type="button"
              className="relative flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Cart, 1 item"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={2} />
            </button>
            <span className="text-sm font-semibold leading-none">1</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-brand">
            <button
              type="button"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Wishlist, 1 item"
            >
              <Heart className="h-6 w-6" strokeWidth={2} />
            </button>
            <span className="text-sm font-semibold leading-none">1</span>
          </div>
        </div>
      )}
    </nav>
  )
}
