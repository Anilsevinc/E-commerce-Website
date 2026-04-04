import { Link, useLocation } from 'react-router-dom'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const { pathname } = useLocation()
  const isContactPage = pathname === '/contact'
  const footerLgInset = isContactPage
    ? 'lg:px-[clamp(1rem,13.54vw,195px)]'
    : 'lg:px-[11%]'

  return (
    <footer className="mt-auto flex w-full flex-col bg-white">
      <div
        className={`flex flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8 ${footerLgInset} ${
          isContactPage ? 'bg-white' : 'bg-[#FAFAFA]'
        }`}
      >
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

      {isContactPage && (
        <div className={`bg-white px-4 md:px-8 ${footerLgInset}`}>
          <div className="h-px w-full bg-neutral-200" aria-hidden />
        </div>
      )}

      <div
        className={`flex flex-col gap-10 px-4 py-12 md:px-8 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-12 ${footerLgInset}`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h3 className="text-base font-bold text-neutral-900">Company Info</h3>
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

        <div className="flex min-w-0 flex-1 flex-col gap-4">
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

        <div className="flex min-w-0 flex-1 flex-col gap-4">
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

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h3 className="text-base font-bold text-neutral-900">Resources</h3>
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

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h3 className="text-base font-bold text-neutral-900">Get In Touch</h3>
          <form
            className="flex w-full max-w-sm flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your Email"
                className="min-h-[48px] flex-1 rounded-md border border-neutral-300 bg-neutral-50 px-4 text-sm text-neutral-900 outline-none placeholder:text-muted focus:border-brand"
              />
              <button
                type="submit"
                className="min-h-[48px] shrink-0 rounded-md bg-brand px-6 text-sm font-semibold text-white"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted">Lore imp sum dolor Amit</p>
          </form>
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
