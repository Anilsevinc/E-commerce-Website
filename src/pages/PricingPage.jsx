import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react'

import hooli from '../assets/hooli-brands.png'
import lyft from '../assets/lyft-brands.png'
import brand3 from '../assets/brand-3.png'
import stripe from '../assets/stripe-brands.png'
import aws from '../assets/aws-brands.png'
import reddit from '../assets/reddit-brands.png'

import hooliMobileLogo from '../assets/hooli-logo.png'
import lyftMobileLogo from '../assets/lyft-logo.png'
import brand3MobileLogo from '../assets/3-logo.png'
import stripeMobileLogo from '../assets/stripe-logo.png'
import awsMobileLogo from '../assets/aws-logo.png'
import redditMobileLogo from '../assets/reddit-logo.png'

const brands = [
  { id: 'hooli', src: hooli, mobileSrc: hooliMobileLogo, alt: 'Hooli' },
  { id: 'lyft', src: lyft, mobileSrc: lyftMobileLogo, alt: 'Lyft' },
  { id: 'leaf', src: brand3, mobileSrc: brand3MobileLogo, alt: 'Brand' },
  { id: 'stripe', src: stripe, mobileSrc: stripeMobileLogo, alt: 'Stripe' },
  { id: 'aws', src: aws, mobileSrc: awsMobileLogo, alt: 'AWS' },
  { id: 'reddit', src: reddit, mobileSrc: redditMobileLogo, alt: 'Reddit' },
]

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={[
        'relative inline-flex h-6 w-11 items-center rounded-full border transition-colors',
        enabled ? 'border-brand bg-brand' : 'border-neutral-200 bg-white',
      ].join(' ')}
      aria-pressed={enabled}
    >
      <span
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
          enabled ? 'translate-x-5' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  )
}

function Feature({ children, active = true, inverted = false }) {
  const iconColor = active
    ? inverted
      ? 'text-white'
      : 'text-emerald-600'
    : 'text-neutral-300'
  const bgColor = active
    ? inverted
      ? 'bg-white/10'
      : 'bg-emerald-50'
    : 'bg-neutral-100'
  const textColor = inverted ? 'text-white' : 'text-neutral-900'

  return (
    <li className="flex items-start gap-3">
      <span
        className={[
          'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          bgColor,
        ].join(' ')}
        aria-hidden
      >
        <Check className={['h-4 w-4', iconColor].join(' ')} strokeWidth={3} />
      </span>
      <span className={['text-sm font-bold leading-relaxed', textColor].join(' ')}>
        {children}
      </span>
    </li>
  )
}

function PricingCard({
  title,
  subtitle,
  price,
  currency = '$',
  period = 'Per Month',
  emphasized = false,
}) {
  const frame = emphasized
    ? 'bg-brand-dark text-white border-brand-dark'
    : 'bg-white text-neutral-900 border-neutral-200'
  const titleColor = emphasized ? 'text-white' : 'text-brand-dark'
  const subtitleColor = emphasized ? 'text-white/70' : 'text-muted'
  const priceColor = emphasized ? 'text-brand' : 'text-brand'
  const periodColor = emphasized ? 'text-white/70' : 'text-muted'
  const buttonClass = emphasized
    ? 'bg-brand text-white hover:opacity-90'
    : 'bg-brand text-white hover:opacity-90'

  return (
    <div
      className={[
        'flex w-full flex-col items-center rounded-[10px] border px-7 py-10 text-center',
        frame,
      ].join(' ')}
    >
      <h3 className={['text-2xl font-bold', titleColor].join(' ')}>{title}</h3>
      <p className={['mt-4 text-sm font-bold', subtitleColor].join(' ')}>
        {subtitle}
      </p>

      <div className="mt-7 flex items-end justify-center gap-2">
        <span className={['text-[40px] font-bold leading-none', priceColor].join(' ')}>
          {price}
        </span>
        <div className="pb-1 text-left">
          <p className="text-xs font-bold text-brand">{currency}</p>
          <p className={['text-xs font-bold', periodColor].join(' ')}>{period}</p>
        </div>
      </div>

      <ul className="mt-8 flex w-full flex-col gap-4 text-left">
        <Feature inverted={emphasized}>Unlimited product updates</Feature>
        <Feature inverted={emphasized}>Unlimited product updates</Feature>
        <Feature inverted={emphasized}>Unlimited product updates</Feature>
        <Feature active={false} inverted={emphasized}>
          1GB Cloud storage
        </Feature>
        <Feature active={false} inverted={emphasized}>
          Email and community support
        </Feature>
      </ul>

      <button
        type="button"
        className={[
          'mt-10 inline-flex min-h-[52px] w-full items-center justify-center rounded-md px-6 text-sm font-bold transition-opacity',
          buttonClass,
        ].join(' ')}
      >
        Try for free
      </button>
    </div>
  )
}

const faqItems = [
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
  {
    q: 'the quick fox jumps over the lazy dog',
    a: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  },
]

const trialSocials = [
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const prices = useMemo(
    () => ({
      free: yearly ? '0' : '0',
      standard: yearly ? '7.49' : '9.99',
      premium: yearly ? '14.99' : '19.99',
      period: yearly ? 'Per Year' : 'Per Month',
    }),
    [yearly]
  )

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full pt-6 pb-10 lg:pt-12 lg:pb-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2px] text-muted">
              PRICING
            </p>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.2] text-brand-dark md:text-5xl">
              Simple Pricing
            </h1>

            <nav
              className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-muted"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="text-neutral-900 hover:opacity-80">
                Home
              </Link>
              <span aria-hidden className="text-muted">
                &gt;
              </span>
              <span>Pricing</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="w-full py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              Pricing
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
              Problems trying to resolve the conflict between
              <br className="hidden md:block" />
              the two major realms of Classical physics: Newtonian mechanics
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm font-bold text-brand-dark">Monthly</span>
              <Toggle enabled={yearly} onChange={setYearly} />
              <span className="text-sm font-bold text-brand-dark">Yearly</span>
              <span className="rounded-full bg-brand/10 px-4 py-1 text-xs font-bold text-brand">
                Save 25%
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            <div className="md:pr-0">
              <PricingCard
                title="FREE"
                subtitle="Organize across all apps by hand"
                price={prices.free}
                period={prices.period}
              />
            </div>
            <div className="md:-mt-4 md:px-0">
              <PricingCard
                title="STANDARD"
                subtitle="Organize across all apps by hand"
                price={prices.standard}
                period={prices.period}
                emphasized
              />
            </div>
            <div className="md:pl-0">
              <PricingCard
                title="PREMIUM"
                subtitle="Organize across all apps by hand"
                price={prices.premium}
                period={prices.period}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <p className="text-center text-sm font-bold text-muted">
            Trusted By Over 4000 Big Companies
          </p>
          <div className="mt-10 flex h-full w-full max-w-[414px] flex-col items-center justify-start gap-y-12 opacity-100 grayscale md:max-w-[1440px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-12 lg:max-w-[1440px] lg:gap-10">
            {brands.map((b) => (
              <picture key={b.id} className="block">
                <source media="(min-width: 768px)" srcSet={b.src} />
                <img
                  src={b.mobileSrc}
                  alt={b.alt}
                  className="h-auto w-auto max-h-[110px] max-w-[151px] shrink-0 object-contain md:h-14 md:w-[120px] lg:h-14 lg:w-[120px]"
                />
              </picture>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              Pricing FAQs
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
              Problems trying to resolve the conflict between
              <br className="hidden md:block" />
              the two major realms of Classical physics
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
            {faqItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <ChevronRight
                  className="mt-0.5 h-7 w-7 shrink-0 text-brand"
                  strokeWidth={2.5}
                />
                <div>
                  <h3 className="text-sm font-bold text-brand-dark">{item.q}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 text-center text-sm font-medium text-muted">
            Haven&apos;t got your answer? Contact our support
          </p>
        </div>
      </section>

      <section className="w-full py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-3 text-center md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
            Start your 14 days free trial
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-medium text-muted">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Try it free now
          </button>

          <div className="mt-10 flex items-center justify-center gap-6 text-neutral-900">
            {trialSocials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label={label}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

