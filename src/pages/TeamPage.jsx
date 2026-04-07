import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

import team1 from '../assets/team-1-image.jpg'
import team2 from '../assets/team-2-image.jpg'
import team3 from '../assets/team-3-image.jpg'
import team4 from '../assets/team-4-image.jpg'
import team5 from '../assets/team-5-image.jpg'
import meetOurTeamImage from '../assets/meet-our-team-image.jpg'

const memberSocials = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
]

const trialSocials = [
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
]

function TeamMemberCard({ imageSrc }) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="w-full overflow-hidden bg-neutral-100">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-contain md:object-cover"
        />
      </div>
      <p className="mt-5 text-sm font-bold text-neutral-900">Username</p>
      <p className="mt-1 text-xs font-normal text-muted">Profession</p>
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

export default function TeamPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full pt-6 pb-10 lg:pt-12 lg:pb-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2px] text-muted">
              WHAT WE DO
            </p>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.2] text-brand-dark md:text-5xl">
              Innovation tailored for you
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
              <span>Team</span>
            </nav>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 lg:grid-cols-2 lg:gap-6">
            <div className="col-span-2 overflow-hidden bg-neutral-100 lg:col-span-1">
              <img
                src={team1}
                alt=""
                className="h-full w-full object-cover"
                style={{ aspectRatio: '1 / 1' }}
              />
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-3 lg:col-span-1 lg:gap-6">
              {[team2, team3, team4, team5].map((src) => (
                <div key={src} className="overflow-hidden bg-neutral-100">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: '1 / 1' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <h2 className="text-center text-2xl font-bold text-brand-dark md:text-3xl">
            Meet Our Team
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14">
            {Array.from({ length: 9 }).map((_, idx) => (
              <TeamMemberCard key={idx} imageSrc={meetOurTeamImage} />
            ))}
          </div>
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

