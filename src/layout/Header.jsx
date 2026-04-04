import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  X,
  Youtube,
} from 'lucide-react'
import MenuBarsRightIcon from '../components/icons/MenuBarsRightIcon'

/** Inner pages: 1050px content @ 1440 — same horizontal inset as Contact hero (logo aligns with copy) */
const SIMPLE_HEADER_PATHS = ['/contact', '/pricing']

function matchesSimpleHeader(pathname) {
  if (SIMPLE_HEADER_PATHS.includes(pathname)) return true
  if (pathname.startsWith('/team')) return true
  return false
}

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

export default function Header() {
  const [mobileTopOpen, setMobileTopOpen] = useState(false)
  const [mobileContactNavOpen, setMobileContactNavOpen] = useState(false)
  const { pathname } = useLocation()
  const isSimpleHeader = matchesSimpleHeader(pathname)
  const headerElevation = isSimpleHeader ? 'shadow-none' : 'shadow-sm'

  const contactNavLinkClass = ({ isActive }) =>
    [
      'text-sm font-semibold transition-colors',
      isActive ? 'text-brand' : 'text-brand-dark hover:text-brand',
    ].join(' ')

  useEffect(() => {
    if (!isSimpleHeader) setMobileContactNavOpen(false)
  }, [isSimpleHeader])

  return (
    <header
      className={`sticky top-0 z-50 flex w-full flex-col bg-white ${headerElevation}`}
    >
      <div
        className={
          isSimpleHeader
            ? 'hidden'
            : 'hidden flex-col gap-3 bg-brand-dark px-4 py-3 text-sm text-white md:px-8 lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-[11%]'
        }
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-sm font-semibold leading-none">
              (225) 555-0118
            </span>
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

      <div
        className={`flex flex-col px-4 py-4 md:px-8 ${isSimpleHeader ? 'lg:px-0 lg:py-2' : 'lg:px-[11%]'}`}
      >
        {isSimpleHeader ? (
          <>
            <div className="flex flex-col lg:hidden">
              <div className="flex w-full items-center justify-between gap-2">
                <Link
                  to="/"
                  className="text-2xl font-bold tracking-tight text-neutral-900"
                >
                  Bandage
                </Link>
                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-neutral-900 transition-colors hover:text-neutral-700"
                  aria-expanded={mobileContactNavOpen}
                  aria-controls="mobile-contact-nav"
                  aria-label={
                    mobileContactNavOpen ? 'Close menu' : 'Open menu'
                  }
                  onClick={() => setMobileContactNavOpen((o) => !o)}
                >
                  {mobileContactNavOpen ? (
                    <X className="h-6 w-6" strokeWidth={2} aria-hidden />
                  ) : (
                    <MenuBarsRightIcon className="h-6 w-6 shrink-0" />
                  )}
                </button>
              </div>
              <div
                id="mobile-contact-nav"
                aria-hidden={!mobileContactNavOpen}
                className={`overflow-hidden transition-[max-height] duration-300 ease-out ${mobileContactNavOpen ? 'max-h-[480px]' : 'max-h-0 pointer-events-none'}`}
              >
                <nav className="flex flex-col gap-4 border-t border-neutral-200 py-4">
                  <NavLink
                    to="/"
                    end
                    className={contactNavLinkClass}
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/shop"
                    className={contactNavLinkClass}
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Product
                  </NavLink>
                  <NavLink
                    to="/pricing"
                    className={contactNavLinkClass}
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={contactNavLinkClass}
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Contact
                  </NavLink>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-brand"
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white"
                    onClick={() => setMobileContactNavOpen(false)}
                  >
                    Become a member
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </nav>
              </div>
            </div>

            <div className="mx-auto hidden w-full max-w-[1440px] items-center lg:flex lg:min-h-[58px] lg:px-[clamp(1rem,13.54vw,195px)] lg:pb-1 lg:pt-2">
              <div className="flex w-full items-center justify-between gap-4 lg:gap-6">
                <Link
                  to="/"
                  className="flex h-[58px] shrink-0 items-center text-2xl font-bold tracking-tight text-neutral-900"
                >
                  Bandage
                </Link>
                <nav className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-[21px] gap-y-2 px-2">
                  <NavLink to="/" end className={contactNavLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/shop" className={contactNavLinkClass}>
                    Product
                  </NavLink>
                  <NavLink to="/pricing" className={contactNavLinkClass}>
                    Pricing
                  </NavLink>
                  <NavLink to="/contact" className={contactNavLinkClass}>
                    Contact
                  </NavLink>
                </nav>
                <div className="flex shrink-0 items-center gap-[45px]">
                  <Link
                    to="/login"
                    className="whitespace-nowrap text-sm font-semibold text-brand"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex h-[52px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-5"
                  >
                    Become a member
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
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
                  <Link to="/login" className="text-sm font-semibold">
                    Login / Register
                  </Link>
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
          </>
        )}
      </div>
    </header>
  )
}
