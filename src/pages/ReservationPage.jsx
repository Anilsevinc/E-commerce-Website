import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const serviceOptions = [
  { value: 'consultation', label: 'Consultation' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'other', label: 'Other' },
]

const timeOptions = [
  { value: '16:00', label: '4:00 Available' },
  { value: '09:00', label: '9:00 Available' },
  { value: '10:00', label: '10:00 Available' },
  { value: '14:00', label: '2:00 PM Available' },
]

export default function ReservationPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [time, setTime] = useState('16:00')
  const [message, setMessage] = useState('')

  function onSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-3 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)]">
          <div className="mx-auto flex max-w-[634px] flex-col items-center text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2px] text-brand-dark">
              Contact Us
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-brand-dark md:text-4xl lg:text-[40px] lg:leading-[1.2]">
              Make an Appointment
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
              <span>Reservation</span>
            </nav>
          </div>

          <form
            className="mx-auto mt-12 w-full max-w-[634px]"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-4">
              <label className="flex w-full min-w-0 flex-col gap-1.5 text-left md:w-[calc(50%-8px)]">
                <span className="sr-only">Full name</span>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name *"
                  required
                  className="min-h-[50px] w-full rounded-md border border-neutral-200 bg-[#F9F9F9] px-4 py-3 text-sm font-semibold text-neutral-900 outline-none placeholder:text-muted focus:border-brand"
                />
              </label>
              <label className="flex w-full min-w-0 flex-col gap-1.5 text-left md:w-[calc(50%-8px)]">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email *"
                  required
                  className="min-h-[50px] w-full rounded-md border border-neutral-200 bg-[#F9F9F9] px-4 py-3 text-sm font-semibold text-neutral-900 outline-none placeholder:text-muted focus:border-brand"
                />
              </label>
              <div className="relative w-full min-w-0 md:w-[calc(50%-8px)]">
                <label htmlFor="reservation-service" className="sr-only">
                  Service
                </label>
                <select
                  id="reservation-service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  className="min-h-[50px] w-full appearance-none rounded-md border border-neutral-200 bg-[#F9F9F9] px-4 py-3 pr-10 text-sm font-semibold text-neutral-900 outline-none focus:border-brand"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div className="relative w-full min-w-0 md:w-[calc(50%-8px)]">
                <label htmlFor="reservation-time" className="sr-only">
                  Time
                </label>
                <select
                  id="reservation-time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="min-h-[50px] w-full appearance-none rounded-md border border-neutral-200 bg-[#F9F9F9] px-4 py-3 pr-10 text-sm font-semibold text-neutral-900 outline-none focus:border-brand"
                >
                  {timeOptions.map((o) => (
                    <option key={o.value || 'placeholder'} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-left">
              <span className="sr-only">Message</span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={6}
                className="w-full resize-y rounded-md border border-neutral-200 bg-[#F9F9F9] px-4 py-3 text-sm font-semibold text-neutral-900 outline-none placeholder:text-muted focus:border-brand"
              />
            </label>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-md bg-brand px-10 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
