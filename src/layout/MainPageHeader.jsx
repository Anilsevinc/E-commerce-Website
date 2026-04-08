import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  User,
  X,
  Youtube,
} from 'lucide-react'

import MenuBarsRightIcon from '../components/icons/MenuBarsRightIcon'
import Gravatar from '../components/Gravatar'
import { logoutUser } from '../store/client/client.thunks'
import { removeFromWishlist } from '../store/wishlist/wishlist.actions'
import { categoryRoute, genderPath, productRoute } from '../lib/category'
import { isPathUnderPagesMenu, PAGES_NAV_LINKS } from '../lib/pagesNavLinks'

const navLinkClass = ({ isActive }) =>
  [
    'text-sm font-semibold transition-colors',
    isActive ? 'text-brand' : 'text-brand-dark hover:text-brand',
  ].join(' ')

function MobileTopBarPanel() {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 bg-brand-dark px-4 py-3 text-sm text-white">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2">
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span className="text-sm font-semibold leading-none">(225) 555-0118</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          <span className="text-sm font-semibold leading-none">
            michelle.rivera@example.com
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-semibold leading-snug">
        Follow Us and get a chance to win 80% off
      </p>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-white transition-opacity hover:opacity-80"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="text-white transition-opacity hover:opacity-80"
          aria-label="YouTube"
        >
          <Youtube className="h-4 w-4" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-white transition-opacity hover:opacity-80"
          aria-label="Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="text-white transition-opacity hover:opacity-80"
          aria-label="Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default function MainPageHeader() {
  const dispatch = useDispatch()
  const [mobileTopOpen, setMobileTopOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const user = useSelector((s) => s.client.user)
  const isLoggedIn = Boolean(user?.token || user?.email)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.pathname + location.search
  const pagesMenuActive = isPathUnderPagesMenu(location.pathname)
  const categories = useSelector((s) => s.product.categories)
  const cart = useSelector((s) => s.shoppingCart.cart)
  const cartCount = useMemo(
    () => (Array.isArray(cart) ? cart.reduce((sum, ci) => sum + Number(ci?.count || 0), 0) : 0),
    [cart]
  )
  const wishlistItems = useSelector((s) =>
    Array.isArray(s.wishlist?.items) ? s.wishlist.items : []
  )
  const wishlistCount = wishlistItems.length

  const categoryById = useMemo(() => {
    const m = new Map()
    const list = Array.isArray(categories) ? categories : []
    list.forEach((c) => m.set(String(c.id), c))
    return m
  }, [categories])

  const groupedCategories = useMemo(() => {
    const list = Array.isArray(categories) ? categories : []
    const kadin = list.filter((c) => String(c.gender).toLowerCase() === 'k')
    const erkek = list.filter((c) => String(c.gender).toLowerCase() === 'e')
    const byTitle = (a, b) => String(a.title).localeCompare(String(b.title), 'tr')
    kadin.sort(byTitle)
    erkek.sort(byTitle)
    return { kadin, erkek }
  }, [categories])

  async function onLogout() {
    await dispatch(logoutUser())
    navigate('/')
  }

  function onSubmitSearch(e) {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
    setSearchQuery('')
  }

  useEffect(() => {
    if (!userMenuOpen) return
    function handlePointerDown(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [userMenuOpen])

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col bg-white shadow-sm">
      <div className="hidden flex-col gap-3 bg-brand-dark px-4 py-3 text-sm text-white md:px-8 lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-[11%]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-sm font-semibold leading-none">(225) 555-0118</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-sm font-semibold leading-none">
              michelle.rivera@example.com
            </span>
          </div>
        </div>
        <p className="text-center text-sm font-semibold leading-snug">
          Follow Us and get a chance to win 80% off
        </p>
        <div className="flex items-center justify-center gap-4 sm:justify-end">
          <span className="text-sm font-semibold leading-snug text-white">
            Follow Us :
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-white transition-opacity hover:opacity-80"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-white transition-opacity hover:opacity-80"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-white transition-opacity hover:opacity-80"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-white transition-opacity hover:opacity-80"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col px-4 py-4 md:px-8 lg:px-[11%]">
        <div className="flex flex-col lg:hidden">
          <div className="flex w-full items-center justify-between gap-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-neutral-900"
            >
              Bandage
            </Link>
            <div className="flex shrink-0 items-center gap-0.5 text-neutral-900">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setSearchOpen((o) => !o)
                  setWishlistOpen(false)
                  setCartOpen(false)
                }}
              >
                <Search className="h-6 w-6" strokeWidth={2} />
              </button>
              <Link
                to="/cart"
                className="relative flex h-11 w-11 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" strokeWidth={2} />
                {cartCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                aria-label="Wishlist"
                aria-expanded={wishlistOpen}
                onClick={() => {
                  setWishlistOpen((o) => !o)
                  setSearchOpen(false)
                  setCartOpen(false)
                }}
              >
                <Heart className="h-6 w-6" strokeWidth={2} />
                {wishlistCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                    {wishlistCount}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                aria-expanded={mobileTopOpen}
                aria-controls="mobile-top-bar"
                aria-label={
                  mobileTopOpen
                    ? 'Hide contact and social links'
                    : 'Show contact and social links'
                }
                onClick={() => setMobileTopOpen((o) => !o)}
              >
                {mobileTopOpen ? (
                  <X className="h-6 w-6" strokeWidth={2} aria-hidden />
                ) : (
                  <MenuBarsRightIcon className="h-6 w-6 shrink-0" />
                )}
              </button>
            </div>
          </div>
          {searchOpen ? (
            <form
              onSubmit={onSubmitSearch}
              className="mt-3 flex w-full flex-col gap-2 px-1 sm:flex-row sm:items-center"
            >
              <label htmlFor="header-search-mobile" className="sr-only">
                Search products
              </label>
              <input
                id="header-search-mobile"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="min-h-[44px] w-full flex-1 rounded-md border border-neutral-300 px-3 text-sm font-semibold text-neutral-900 outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-md bg-brand px-4 text-sm font-bold text-white"
              >
                Search
              </button>
            </form>
          ) : null}
          {wishlistOpen ? (
            <div className="mt-3 max-h-[280px] overflow-auto rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-brand-dark">Wishlist</p>
              {wishlistCount === 0 ? (
                <p className="mt-3 text-sm font-semibold text-muted">
                  No saved products yet.
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-3">
                  {wishlistItems.map((p) => {
                    const to =
                      productRoute({
                        category: categoryById.get(String(p.category_id)),
                        product: p,
                      }) || `/product/${encodeURIComponent(p.id)}`
                    return (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0"
                      >
                        <Link
                          to={to}
                          className="flex min-w-0 flex-1 items-center gap-3"
                          onClick={() => setWishlistOpen(false)}
                        >
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
                            <img
                              src={p.images?.[0]?.url || ''}
                              alt={p.name || ''}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-brand-dark">
                              {p.name}
                            </p>
                            <p className="text-xs font-semibold text-muted">
                              ${Number(p.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="shrink-0 text-xs font-semibold text-muted hover:text-brand"
                          onClick={() => dispatch(removeFromWishlist(p.id))}
                        >
                          Remove
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ) : null}
          <div
            id="mobile-top-bar"
            aria-hidden={!mobileTopOpen}
            className={`overflow-hidden transition-[max-height] duration-300 ease-out ${mobileTopOpen ? 'max-h-[360px]' : 'max-h-0 pointer-events-none'}`}
          >
            <MobileTopBarPanel />
          </div>
        </div>

        <div className="hidden w-full flex-col gap-4 lg:flex">
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex w-full items-center justify-between lg:w-auto lg:shrink-0">
              <Link
                to="/"
                className="text-2xl font-medium tracking-tight text-neutral-900 lg:font-bold"
              >
                Bandage
              </Link>
            </div>

            <nav className="hidden w-full flex-col gap-4 lg:flex lg:w-auto lg:flex-none lg:flex-row lg:items-center lg:justify-start lg:gap-[15px]">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <div className="relative group">
                <NavLink to="/shop" className={navLinkClass}>
                  <span className="inline-flex items-center gap-1">
                    Shop
                    <ChevronDown className="h-4 w-4" aria-hidden />
                  </span>
                </NavLink>

                <div className="absolute left-1/2 top-full z-50 hidden w-[560px] -translate-x-1/2 pt-3 group-hover:block">
                  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg">
                    <div className="flex gap-8">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-brand-dark">Kadin</p>
                        <div className="mt-4 flex flex-col gap-3">
                          {groupedCategories.kadin.map((c) => (
                            <Link
                              key={c.id}
                              to={categoryRoute(c)}
                              className="text-sm font-semibold text-muted hover:text-brand"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-brand-dark">Erkek</p>
                        <div className="mt-4 flex flex-col gap-3">
                          {groupedCategories.erkek.map((c) => (
                            <Link
                              key={c.id}
                              to={categoryRoute(c)}
                              className="text-sm font-semibold text-muted hover:text-brand"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between text-xs font-semibold text-muted">
                      <span>
                        Total: {groupedCategories.kadin.length + groupedCategories.erkek.length}
                      </span>
                      <span>
                        Routes: {genderPath('k')}/... , {genderPath('e')}/...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
              <div className="relative group">
                <span
                  className={`inline-flex cursor-default items-center gap-1 text-sm font-semibold transition-colors ${
                    pagesMenuActive
                      ? 'text-brand'
                      : 'text-brand-dark group-hover:text-brand'
                  }`}
                >
                  Pages
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </span>
                <div className="absolute left-1/2 top-full z-50 hidden w-[280px] -translate-x-1/2 pt-3 group-hover:block">
                  <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg">
                    <nav aria-label="Pages" className="flex flex-col gap-3">
                      {PAGES_NAV_LINKS.map(({ to, label }) => (
                        <Link
                          key={to}
                          to={to}
                          className="text-sm font-semibold text-muted transition-colors hover:text-brand"
                        >
                          {label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </nav>

            <div className="relative hidden shrink-0 items-center gap-4 text-brand lg:ml-auto lg:flex">
              {isLoggedIn ? (
                <div className="relative z-[60]" ref={userMenuRef}>
                  <button
                    type="button"
                    className="flex max-w-[220px] items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-neutral-50"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="menu"
                    onClick={() => setUserMenuOpen((o) => !o)}
                  >
                    <Gravatar email={user?.email} size={28} className="h-7 w-7 shrink-0" />
                    <span className="min-w-0 truncate">Hi, {user?.name || user?.email}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  {userMenuOpen ? (
                    <div
                      className="absolute right-0 top-full mt-2 min-w-[220px] rounded-xl border border-neutral-200 bg-white py-2 shadow-lg"
                      role="menu"
                    >
                      <Link
                        to="/orders"
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-neutral-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Previous orders
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-brand transition-colors hover:bg-neutral-50"
                        onClick={() => {
                          setUserMenuOpen(false)
                          onLogout()
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Link
                    to="/login"
                    state={{ from }}
                    className="inline-flex items-center gap-2"
                  >
                    <User className="h-5 w-5" strokeWidth={2} aria-hidden />
                    Login
                  </Link>
                  <span aria-hidden className="text-brand/60">
                    /
                  </span>
                  <Link to="/signup">Register</Link>
                </div>
              )}
              <div className="relative">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md"
                  aria-label="Search"
                  aria-expanded={searchOpen}
                  onClick={() => {
                    setSearchOpen((o) => !o)
                    setCartOpen(false)
                    setWishlistOpen(false)
                  }}
                >
                  <Search className="h-5 w-5" />
                </button>
                {searchOpen ? (
                  <div className="absolute right-0 top-full z-[60] mt-2 w-[min(100vw-2rem,320px)] rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
                    <form onSubmit={onSubmitSearch} className="flex flex-col gap-3">
                      <label htmlFor="header-search-desktop" className="sr-only">
                        Search products
                      </label>
                      <input
                        id="header-search-desktop"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="min-h-[44px] w-full rounded-md border border-neutral-300 px-3 text-sm font-semibold text-neutral-900 outline-none focus:border-brand"
                      />
                      <button
                        type="submit"
                        className="min-h-[44px] rounded-md bg-brand text-sm font-bold text-white transition-opacity hover:opacity-90"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md"
                aria-label="Cart"
                aria-expanded={cartOpen}
                onClick={() => {
                  setCartOpen((o) => !o)
                  setWishlistOpen(false)
                  setSearchOpen(false)
                }}
              >
                <span className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 ? (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
              </button>
              {cartOpen ? (
                <div className="absolute right-0 top-full z-[55] mt-3 w-[320px] rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
                  <p className="text-sm font-bold text-brand-dark">Cart</p>
                  {cartCount === 0 ? (
                    <p className="mt-3 text-sm font-semibold text-muted">
                      Your cart is empty.
                    </p>
                  ) : (
                    <div className="mt-3 flex max-h-[280px] flex-col gap-3 overflow-auto">
                      {cart.map((ci) => (
                        <div
                          key={ci.product?.id}
                          className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="h-12 w-12 overflow-hidden rounded bg-neutral-100">
                            <img
                              src={ci.product?.images?.[0]?.url || ''}
                              alt={ci.product?.name || ''}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-brand-dark">
                              {ci.product?.name}
                            </p>
                            <p className="text-xs font-semibold text-muted">
                              Qty: {ci.count}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-brand-dark">
                            ${Number(ci.product?.price || 0).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartCount > 0 ? (
                    <Link
                      to="/cart"
                      className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-brand px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                      onClick={() => setCartOpen(false)}
                    >
                      Go to cart
                    </Link>
                  ) : null}
                </div>
              ) : null}
              <div className="relative">
                <button
                  type="button"
                  className="relative flex h-10 w-10 items-center justify-center rounded-md"
                  aria-label="Wishlist"
                  aria-expanded={wishlistOpen}
                  onClick={() => {
                    setWishlistOpen((o) => !o)
                    setCartOpen(false)
                    setSearchOpen(false)
                  }}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                      {wishlistCount}
                    </span>
                  ) : null}
                </button>
                {wishlistOpen ? (
                  <div className="absolute right-0 top-full z-[60] mt-2 w-[min(100vw-2rem,320px)] rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
                    <p className="text-sm font-bold text-brand-dark">Wishlist</p>
                    {wishlistCount === 0 ? (
                      <p className="mt-3 text-sm font-semibold text-muted">
                        No saved products yet.
                      </p>
                    ) : (
                      <div className="mt-3 flex max-h-[280px] flex-col gap-3 overflow-auto">
                        {wishlistItems.map((p) => {
                          const to =
                            productRoute({
                              category: categoryById.get(String(p.category_id)),
                              product: p,
                            }) || `/product/${encodeURIComponent(p.id)}`
                          return (
                            <div
                              key={p.id}
                              className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0"
                            >
                              <Link
                                to={to}
                                className="flex min-w-0 flex-1 items-center gap-3"
                                onClick={() => setWishlistOpen(false)}
                              >
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
                                  <img
                                    src={p.images?.[0]?.url || ''}
                                    alt={p.name || ''}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-bold text-brand-dark">
                                    {p.name}
                                  </p>
                                  <p className="text-xs font-semibold text-muted">
                                    ${Number(p.price || 0).toFixed(2)}
                                  </p>
                                </div>
                              </Link>
                              <button
                                type="button"
                                className="shrink-0 text-xs font-semibold text-muted hover:text-brand"
                                onClick={() => dispatch(removeFromWishlist(p.id))}
                              >
                                Remove
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

