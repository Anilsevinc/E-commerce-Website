import { useState } from 'react'
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
  const user = useSelector((s) => s.client.user)
  const isLoggedIn = Boolean(user?.token || user?.email)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.pathname + location.search

  async function onLogout() {
    await dispatch(logoutUser())
    navigate('/')
  }

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
              >
                <Search className="h-6 w-6" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" strokeWidth={2} />
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
              <NavLink to="/shop" className={navLinkClass}>
                <span className="inline-flex items-center gap-1">
                  Shop
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </span>
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
              <NavLink to="/pages" className={navLinkClass}>
                Pages
              </NavLink>
            </nav>

            <div className="hidden shrink-0 items-center gap-4 text-brand lg:ml-auto lg:flex">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
                  <Gravatar email={user?.email} size={28} className="h-7 w-7" />
                  <span>Hi, {user?.name || user?.email}</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="ml-2 text-sm font-semibold text-brand hover:opacity-80"
                  >
                    Logout
                  </button>
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
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

