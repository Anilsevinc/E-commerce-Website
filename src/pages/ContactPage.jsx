import {
  Facebook,
  Instagram,
  Linkedin,
  MoveDown,
  Twitter,
} from 'lucide-react'

import heroCover from '../assets/hero-cover.png'
import phoneIconAsset from '../assets/Phone.png'
import locationIconAsset from '../assets/location.png'
import mailIconAsset from '../assets/mail.png'

const socialLinks = [
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
]

function OfficeCard({ icon, variant }) {
  const isDark = variant === 'dark'

  return (
    <div
      className={`flex flex-col items-center rounded-none px-6 py-10 text-center shadow-none md:px-8 ${
        isDark
          ? 'bg-brand-dark text-white md:min-h-[420px] md:justify-between md:py-14'
          : 'bg-white'
      }`}
    >
      <img
        src={icon}
        alt=""
        className="mb-8 h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
      />
      <div
        className={`flex flex-col gap-2 text-sm font-semibold leading-relaxed ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}
      >
        <span>georgia.young@example.com</span>
        <span>georgia.young@ple.com</span>
      </div>
      <p
        className={`mt-8 text-base font-bold ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}
      >
        Get Support
      </p>
      <button
        type="button"
        className="mt-8 inline-flex min-h-[48px] w-full max-w-[200px] items-center justify-center rounded-md border-2 border-brand bg-transparent px-6 text-sm font-bold text-brand transition-colors hover:bg-brand/5"
      >
        Submit Request
      </button>
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full pt-0 pb-12 lg:pb-16">
        {/*
          Header ile aynı yatay çerçeve: max-w-[1440px] + clamp padding (sabit 1050 yok)
        */}
        <div
          className="relative mx-auto flex w-full max-w-[1440px] min-h-[min(100svh,882px)] flex-col items-start justify-center bg-cover bg-center bg-no-repeat px-3 py-16 md:px-8 lg:min-h-[882px] lg:px-[clamp(1rem,13.54vw,195px)] lg:py-12"
          style={{ backgroundImage: `url(${heroCover})` }}
        >
          <div className="relative z-10 flex w-full max-w-[599px] flex-col gap-[35px] text-left">
            <p className="text-sm font-bold uppercase tracking-[0.2px] text-muted">
              CONTACT US
            </p>
            <h1 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl lg:text-[40px] lg:leading-[1.2]">
              Get in touch
              <br />
              today!
            </h1>
            <p className="text-base font-medium leading-relaxed text-muted">
              We know how large objects will act,
              <br />
              but things on a small scale
            </p>
            <div className="flex flex-col gap-3 text-base font-bold text-neutral-900">
              <p>
                <span className="font-bold">Phone : </span>
                +451 215 215
              </p>
              <p>
                <span className="font-bold">Fax : </span>
                +451 215 215
              </p>
            </div>
            <div className="flex items-center justify-start gap-5">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-700 transition-opacity hover:opacity-70"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-3 text-center md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <p className="text-sm font-bold uppercase tracking-[0.2px] text-muted">
            VISIT OUR OFFICE
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-bold leading-snug text-brand-dark md:text-3xl lg:text-[40px] lg:leading-tight">
            We help small businesses with big ideas
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-8">
            <OfficeCard icon={phoneIconAsset} variant="light" />
            <OfficeCard icon={locationIconAsset} variant="dark" />
            <OfficeCard icon={mailIconAsset} variant="light" />
          </div>
        </div>
      </section>

      <section className="w-full py-16 text-center lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <MoveDown
            className="mx-auto mb-8 h-12 w-12 text-brand"
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="text-sm font-bold uppercase tracking-[0.2px] text-brand-dark">
            WE Can&apos;t WAIT TO MEET YOU
          </p>
          <h2 className="mt-4 text-4xl font-bold text-neutral-900 md:text-5xl lg:text-[58px] lg:leading-tight">
            Let&apos;s Talk
          </h2>
          <button
            type="button"
            className="mt-10 inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-md bg-brand px-10 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Try it free now
          </button>
        </div>
      </section>
    </div>
  )
}
