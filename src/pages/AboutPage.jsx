import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

import heroBg from '../assets/hero-2-bg-shape-cover.png'
import aboutMobileHero from '../assets/about-mobile.png'
import videoCardImage from '../assets/videocard-image.jpg'
import aboutUsWorkImage from '../assets/aboutus-work.jpg'

import meetOurTeamImage from '../assets/meet-our-team-image.jpg'
import gokhanImage from '../assets/gokhan.jpg'
import anilImage from '../assets/anil.jpg'

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

import team3Image from '../assets/team-3-image.jpg'

const brands = [
  { id: 'hooli', src: hooli, mobileSrc: hooliMobileLogo, alt: 'Hooli' },
  { id: 'lyft', src: lyft, mobileSrc: lyftMobileLogo, alt: 'Lyft' },
  { id: 'leaf', src: brand3, mobileSrc: brand3MobileLogo, alt: 'Brand' },
  { id: 'stripe', src: stripe, mobileSrc: stripeMobileLogo, alt: 'Stripe' },
  { id: 'aws', src: aws, mobileSrc: awsMobileLogo, alt: 'AWS' },
  { id: 'reddit', src: reddit, mobileSrc: redditMobileLogo, alt: 'Reddit' },
]

const memberSocials = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
]

function TeamMemberCard({ imageSrc, name, role }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="w-full overflow-hidden bg-neutral-100">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-contain md:object-cover"
        />
      </div>
      <p className="mt-5 text-sm font-bold text-neutral-900">{name}</p>
      <p className="mt-1 text-xs font-normal text-muted">{role}</p>
      <div className="mt-3 flex items-center justify-center gap-3 text-brand">
        {memberSocials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label={label}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </a>
        ))}
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-4xl font-bold text-brand-dark">{value}</p>
      <p className="text-sm font-bold text-muted">{label}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full pt-0 pb-6 lg:pb-8">
        {/* Mobile hero: content + image at bottom (like design) */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-3 pt-12 pb-0 text-center md:hidden">
          <div className="flex w-full max-w-[599px] flex-col items-center gap-6">
            <p className="text-sm font-bold uppercase tracking-[0.2px] text-muted">
              ABOUT COMPANY
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-dark">
              ABOUT US
            </h1>
            <p className="text-base font-medium leading-relaxed text-muted">
              We know how large
              <br />
              objects will act, but things
              <br />
              on a small scale
            </p>
            <button
              type="button"
              className="mt-2 inline-flex min-h-[52px] w-full max-w-[260px] items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Get Quote Now
            </button>
          </div>
          <div className="mt-10 w-full max-w-[520px]">
            <img
              src={aboutMobileHero}
              alt=""
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Desktop/tablet hero: background image */}
        <div
          className="relative mx-auto hidden aspect-[2/1] w-full max-w-[1440px] flex-col items-start justify-center bg-cover bg-center bg-no-repeat px-3 py-10 text-left md:flex md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-12"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'contain',
          }}
        >
          <div className="relative z-10 flex w-full max-w-[599px] flex-col gap-[35px] text-left">
            <p className="text-sm font-bold uppercase tracking-[0.2px] text-muted">
              ABOUT COMPANY
            </p>
            <h1 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl lg:text-[40px] lg:leading-[1.2]">
              ABOUT US
            </h1>
            <p className="text-base font-medium leading-relaxed text-muted">
              We know how large objects will act,
              <br />
              but things on a small scale
            </p>
            <button
              type="button"
              className="inline-flex min-h-[44px] w-fit items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </section>

      <section className="w-full pt-2 pb-12 lg:pt-6 lg:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="mt-8 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:gap-x-16">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2px] text-[#E74040]">
                PROBLEMS TRYING
              </p>

              <h2 className="max-w-md text-2xl font-bold leading-snug text-brand-dark">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </h2>
            </div>

            <p className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-muted lg:pt-10">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-y-10 lg:mt-16">
            <div className="w-1/2 min-w-0 lg:w-1/4">
              <Stat value="15K" label="Happy Customers" />
            </div>
            <div className="w-1/2 min-w-0 lg:w-1/4">
              <Stat value="150K" label="Monthly Visitors" />
            </div>
            <div className="w-1/2 min-w-0 lg:w-1/4">
              <Stat value="15" label="Countries Worldwide" />
            </div>
            <div className="w-1/2 min-w-0 lg:w-1/4">
              <Stat value="100+" label="Top Partners" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="relative overflow-hidden rounded-[10px] bg-neutral-100">
            <img
              src={videoCardImage}
              alt=""
              className="h-full w-full object-cover"
              style={{ aspectRatio: '16 / 6' }}
            />
            <button
              type="button"
              className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-md transition-opacity hover:opacity-90"
              aria-label="Play video"
            >
              <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
            </button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
              Problems trying to resolve the conflict between
              <br className="hidden md:block" />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-10 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-14">
            <div className="w-full min-w-0 md:w-[calc((100%-4rem)/3)]">
              <TeamMemberCard
                imageSrc={meetOurTeamImage}
                name="Username"
                role="Profession"
              />
            </div>
            <div className="w-full min-w-0 md:w-[calc((100%-4rem)/3)]">
              <TeamMemberCard imageSrc={anilImage} name="Anıl" role="Full Stack Developer" />
            </div>
            <div className="w-full min-w-0 md:w-[calc((100%-4rem)/3)]">
              <TeamMemberCard
                imageSrc={gokhanImage}
                name="Gökhan Özdemir"
                role="Project Manager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
            Big Companies Are Here
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm font-medium leading-relaxed text-muted">
            Problems trying to resolve the conflict between
            <br className="hidden md:block" />
            the two major realms of Classical physics: Newtonian mechanics
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

      <section className="w-full">
        <div className="w-full">
          <div className="flex w-full flex-col lg:h-[640px] lg:flex-row">
            <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center bg-[#2A7CC7] px-6 py-12 text-center text-white md:px-10 lg:items-start lg:px-16 lg:py-0 lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2px] text-white/90">
                WORK WITH US
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:mt-3">
                Now Let&apos;s grow Yours
              </h2>
              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/90 lg:mt-3">
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th
              </p>
              <Link
                to="/reservation"
                className="mt-8 inline-flex min-h-[44px] w-fit items-center justify-center rounded-md border border-white/60 bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-white/10 lg:mt-6"
              >
                Book Appointment
              </Link>
            </div>
            <div className="hidden min-w-0 flex-1 overflow-hidden bg-neutral-100 lg:block lg:h-full">
              <img
                src={aboutUsWorkImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

