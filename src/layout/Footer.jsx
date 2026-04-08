import { Link, useLocation } from 'react-router-dom'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const { pathname } = useLocation()
  const isContactFooterVariant =
    pathname === '/contact' ||
    pathname === '/blog' ||
    pathname === '/about' ||
    pathname === '/reservation' ||
    pathname === '/team' ||
    pathname === '/pricing' ||
    pathname.startsWith('/shop') ||
    pathname.startsWith('/product')
  const footerLgInset = isContactFooterVariant
    ? 'lg:px-[clamp(1rem,13.54vw,195px)]'
    : 'lg:px-[11%]'

  return (
    <footer className="mt-auto flex w-full flex-col bg-white">
      <div
        className={`px-4 py-8 md:px-8 ${footerLgInset} ${
          isContactFooterVariant ? 'bg-white' : 'bg-[#FAFAFA]'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-neutral-900"
          >
            Bandage
          </Link>
          <div className="flex items-center gap-4 text-brand">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`bg-white px-4 py-12 md:px-8 ${footerLgInset} ${
          isContactFooterVariant ? 'pt-0' : ''
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px]">
          {isContactFooterVariant ? (
            <div className="h-px w-full bg-neutral-200" aria-hidden />
          ) : null}
          <div
            className={`flex flex-wrap gap-10 sm:gap-x-8 sm:gap-y-10 lg:flex-nowrap lg:gap-8 xl:gap-10 ${
              isContactFooterVariant ? 'pt-12' : ''
            }`}
          >
            <div className="flex min-w-[200px] flex-[1_1_200px] flex-col gap-4 lg:min-w-0 lg:flex-1">
              <h3 className="text-base font-bold text-neutral-900">
                Company Info
              </h3>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/about"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  About Us
                </Link>
                <Link
                  to="/careers"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  Carrier
                </Link>
                <Link
                  to="/hiring"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  We are hiring
                </Link>
                <Link
                  to="/blog"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  Blog
                </Link>
              </nav>
            </div>

            <div className="flex min-w-[200px] flex-[1_1_200px] flex-col gap-4 lg:min-w-0 lg:flex-1">
              <h3 className="text-base font-bold text-neutral-900">Legal</h3>
              <nav className="flex flex-col gap-3">
                <Link
                  to="/about"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  About Us
                </Link>
                <Link
                  to="/careers"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  Carrier
                </Link>
                <Link
                  to="/hiring"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  We are hiring
                </Link>
                <Link
                  to="/blog"
                  className="text-sm font-semibold text-muted hover:text-brand"
                >
                  Blog
                </Link>
              </nav>
            </div>

            <div className="flex min-w-[200px] flex-[1_1_200px] flex-col gap-4 lg:min-w-0 lg:flex-1">
              <h3 className="text-base font-bold text-neutral-900">Features</h3>
              <nav className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted">
                  Business Marketing
                </span>
                <span className="text-sm font-semibold text-muted">
                  User Analytic
                </span>
                <span className="text-sm font-semibold text-muted">
                  Live Chat
                </span>
                <span className="text-sm font-semibold text-muted">
                  Unlimited Support
                </span>
              </nav>
            </div>

            <div className="flex min-w-[200px] flex-[1_1_200px] flex-col gap-4 lg:min-w-0 lg:flex-1">
              <h3 className="text-base font-bold text-neutral-900">
                Resources
              </h3>
              <nav className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted">
                  IOS &amp; Android
                </span>
                <span className="text-sm font-semibold text-muted">
                  Watch a Demo
                </span>
                <span className="text-sm font-semibold text-muted">
                  Customers
                </span>
                <span className="text-sm font-semibold text-muted">API</span>
              </nav>
            </div>

            <div className="flex min-w-[240px] flex-[1.45_1_240px] flex-col gap-4 lg:min-w-0 lg:max-w-md lg:flex-[1.45]">
              <h3 className="text-base font-bold text-neutral-900">
                Get In Touch
              </h3>
              <form
                className="flex w-full min-w-0 max-w-full flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-stretch">
                  <label htmlFor="footer-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Your Email"
                    className="min-h-[48px] min-w-0 flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none placeholder:text-muted focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="min-h-[48px] w-full shrink-0 rounded-md bg-brand px-4 text-sm font-semibold text-white sm:w-auto lg:w-auto lg:px-6"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-muted">Lore imp sum dolor Amit</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`bg-neutral-100 px-4 py-6 text-center md:px-8 lg:text-left ${footerLgInset}`}
      >
        <p className="text-sm font-semibold text-muted">
          <span className="lg:hidden">
            Made With Love By
            <br />
            Finland All Right Reserved
          </span>
          <span className="hidden lg:inline">
            Made With Love By Finland All Right Reserved
          </span>
        </p>
      </div>
    </footer>
  )
}
