import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

import MenuBarsRightIcon from '../components/icons/MenuBarsRightIcon'

const contactNavLinkClass = ({ isActive }) =>
  [
    'text-sm font-semibold transition-colors',
    isActive ? 'text-brand' : 'text-brand-dark hover:text-brand',
  ].join(' ')

export default function InnerPagesHeader() {
  const [mobileContactNavOpen, setMobileContactNavOpen] = useState(false)

  useEffect(() => {
    // Close on unmount (route change)
    return () => setMobileContactNavOpen(false)
  }, [])

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col bg-white shadow-none">
      <div className="flex flex-col px-4 py-4 md:px-8 lg:px-0 lg:py-2">
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
              aria-label={mobileContactNavOpen ? 'Close menu' : 'Open menu'}
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
                to="/signup"
                className="text-sm font-semibold text-brand"
                onClick={() => setMobileContactNavOpen(false)}
              >
                Sign Up
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
              <Link to="/login" className="whitespace-nowrap text-sm font-semibold text-brand">
                Login
              </Link>
              <Link to="/signup" className="whitespace-nowrap text-sm font-semibold text-brand">
                Sign Up
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
      </div>
    </header>
  )
}

