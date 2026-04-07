import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-right.png'
import heroImageMobile from '../assets/hero-image-mobile.png'

const heroSlides = [
  {
    id: 'slide-1',
    eyebrow: 'SUMMER 2020',
    titleLine1: 'NEW',
    titleLine2: 'COLLECTION',
    description:
      'We know how large objects will act, but things on a small scale.',
  },
  {
    id: 'slide-2',
    eyebrow: 'SUMMER 2020',
    titleLine1: 'NEW',
    titleLine2: 'COLLECTION',
    description:
      'We know how large objects will act, but things on a small scale.',
  },
]

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentSlide = heroSlides[activeSlide]
  const descriptionParts = currentSlide.description.split(',')
  const desktopDescLine1 =
    descriptionParts.length > 0 ? `${descriptionParts[0]},` : ''
  const desktopDescLine2 =
    descriptionParts.length > 1
      ? descriptionParts.slice(1).join(',').trim()
      : ''

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 200)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  function goToSlide(nextIdx) {
    if (nextIdx === activeSlide) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSlide(nextIdx)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section className="flex w-full justify-center px-4 pb-6 pt-0 sm:px-6 sm:pt-5 lg:px-8 lg:pb-8 lg:pt-6">
      <div className="flex h-[816px] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] lg:hidden">
        <div
          className={[
            'flex flex-1 flex-col items-center justify-center gap-7 px-4 pb-4 pt-10 text-center transition-opacity duration-300',
            isTransitioning ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <p className="text-[16px] font-bold uppercase leading-[24px] tracking-[0.1px] text-[#2A7CC7]">
            {currentSlide.eyebrow}
          </p>
          <h1 className="flex h-[100px] w-[268px] max-w-full flex-col justify-center text-[40px] font-bold uppercase leading-[50px] tracking-[0.2px] text-[#252B42]">
            {currentSlide.titleLine1}
            <br />
            {currentSlide.titleLine2}
          </h1>
          <h4 className="min-h-[90px] w-[291px] max-w-full text-[20px] font-medium leading-[30px] tracking-[0.2px] text-[#737373]">
            {currentSlide.description}
          </h4>
          <Link to="/shop" className="hero-shop-btn-mobile">
            SHOP NOW
          </Link>
        </div>

        <div className="relative -mt-[44px] h-[453px] w-full max-w-[400px] shrink-0 overflow-hidden">
          <img
            src={heroImageMobile}
            alt=""
            className="h-full w-full max-w-[400px] object-contain object-bottom"
            width={400}
            height={453}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pb-4">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to hero slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${idx === activeSlide ? 'bg-[#2A7CC7]' : 'bg-white/80'}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden w-full max-w-[1292px] min-h-0 flex-col overflow-hidden rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] lg:flex lg:h-[622px] lg:flex-row lg:items-stretch">
        <div
          className={[
            'flex flex-1 flex-col items-start justify-center gap-5 px-12 py-12 text-left transition-opacity duration-300',
            isTransitioning ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          <p className="text-base font-bold uppercase tracking-wide text-brand">
            {currentSlide.eyebrow}
          </p>
          <h1 className="text-[58px] font-bold uppercase leading-[1.1] tracking-wide text-[#252B42]">
            {currentSlide.titleLine1} {currentSlide.titleLine2}
          </h1>
          <h4 className="max-w-md text-base font-semibold leading-relaxed text-muted">
            {desktopDescLine2 ? (
              <>
                {desktopDescLine1}
                <br />
                {desktopDescLine2}
              </>
            ) : (
              currentSlide.description
            )}
          </h4>
          <div className="flex w-full justify-start">
            <Link to="/shop" className="hero-shop-btn">
              SHOP NOW
            </Link>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to hero slide ${idx + 1}`}
                onClick={() => goToSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${idx === activeSlide ? 'bg-brand' : 'bg-brand/30'}`}
              />
            ))}
          </div>
        </div>

        <div className="relative flex w-[697px] shrink-0 flex-col justify-center overflow-visible">
          <div
            className="pointer-events-none absolute left-[6%] top-[12%] h-20 w-20 rounded-full bg-white/50"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[22%] right-[20%] h-3 w-3 rounded-full bg-[#C4B5FD]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[16%] right-[32%] h-14 w-14 rounded-full bg-white/35"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-[8%] top-[16%] h-10 w-10 rounded-full bg-white/80"
            aria-hidden
          />

          <div className="relative mx-auto flex h-[619px] w-[619px] max-w-[619px] items-end justify-center">
            <div
              className="absolute inset-0 rounded-full bg-white"
              aria-hidden
            />
            <img
              src={heroImage}
              alt=""
              className="relative z-[1] h-auto w-full max-w-[697px] object-contain object-bottom lg:max-h-[619px]"
              width={697}
              height={619}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
