import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'

import mainProductImage from '../assets/main-product-image.jpg'
import carouselImage from '../assets/carousel-image.jpg'
import carouselSecondImage from '../assets/carousel-second-image.jpg'
import productsImage from '../assets/products-image.jpg'

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

const galleryImages = [carouselImage, carouselSecondImage]

const brands = [
  { id: 'hooli', src: hooli, mobileSrc: hooliMobileLogo, alt: 'Hooli' },
  { id: 'lyft', src: lyft, mobileSrc: lyftMobileLogo, alt: 'Lyft' },
  { id: 'leaf', src: brand3, mobileSrc: brand3MobileLogo, alt: 'Brand' },
  { id: 'stripe', src: stripe, mobileSrc: stripeMobileLogo, alt: 'Stripe' },
  { id: 'aws', src: aws, mobileSrc: awsMobileLogo, alt: 'AWS' },
  { id: 'reddit', src: reddit, mobileSrc: redditMobileLogo, alt: 'Reddit' },
]

const bestsellerItems = Array.from({ length: 8 }, (_, i) => ({
  id: `bestseller-${i + 1}`,
  image: productsImage,
  title: 'Graphic Design',
  subtitle: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
}))

export default function ProductDetailPage() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  const nextImage = () =>
    setActiveImage((i) => (i + 1) % galleryImages.length)
  const prevImage = () =>
    setActiveImage((i) => (i - 1 + galleryImages.length) % galleryImages.length)

  return (
    <div className="flex w-full max-w-[1920px] flex-col bg-neutral-100">
      <div className="w-full px-3 py-4 md:px-8 lg:px-[11%] lg:py-6">
        <nav
          className="flex w-full flex-wrap items-center justify-center gap-1 text-sm font-semibold lg:justify-start"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-muted transition-colors hover:text-brand">
            Home
          </Link>
          <span className="text-muted" aria-hidden>
            {' '}
            &gt;{' '}
          </span>
          <Link
            to="/shop"
            className="text-muted transition-colors hover:text-brand"
          >
            Shop
          </Link>
        </nav>
      </div>

      <section className="w-full px-3 pb-10 md:px-8 lg:px-[11%] lg:pb-16">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:max-w-none lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <div className="w-full shrink-0 lg:max-w-[50%] lg:flex-1">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <img
                src={galleryImages[activeImage]}
                alt=""
                className="h-full w-full object-cover object-center"
              />
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow transition hover:bg-white lg:left-4"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow transition hover:bg-white lg:right-4"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>
            <div className="mt-4 flex justify-start gap-3">
              {galleryImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`h-20 w-20 shrink-0 overflow-hidden border-2 bg-white transition lg:h-24 lg:w-24 ${
                    idx === activeImage
                      ? 'border-brand'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 lg:max-w-[50%] lg:flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 lg:text-3xl">
              Floating Phone
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    aria-hidden
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-muted">10 Reviews</span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">$1,139.33</p>
            <p className="text-sm font-semibold">
              <span className="text-muted">Availability : </span>
              <span className="text-brand">In Stock</span>
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              RELIT official consequent door ENIM RELIT Mollie. Excitation venial
              consequent sent nostrum met.
            </p>
            <hr className="border-neutral-200 lg:hidden" />
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="h-8 w-8 rounded-full border border-neutral-200 bg-sky-400"
                aria-hidden
              />
              <span
                className="h-8 w-8 rounded-full border border-neutral-200 bg-teal-500"
                aria-hidden
              />
              <span
                className="h-8 w-8 rounded-full border border-neutral-200 bg-orange-500"
                aria-hidden
              />
              <span
                className="h-8 w-8 rounded-full border border-neutral-200 bg-[#252B42]"
                aria-hidden
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                className="inline-flex min-h-[48px] min-w-[160px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
              >
                Select Options
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Quick view"
                >
                  <Eye className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>
            {id ? (
              <p className="sr-only">Product id: {id}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-neutral-200 bg-white px-3 py-10 md:px-8 lg:px-[11%] lg:py-14">
        <div
          className="mb-8 flex gap-6 overflow-x-auto border-b border-neutral-200 pb-0 lg:justify-center lg:overflow-visible"
          role="tablist"
          aria-label="Product information"
        >
          {[
            { id: 'description', label: 'Description' },
            { id: 'additional', label: 'Additional Information' },
            { id: 'reviews', label: 'Reviews (0)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 pb-4 text-sm font-semibold transition-colors lg:text-base ${
                activeTab === tab.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-muted hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'description' ? (
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="w-full shrink-0 overflow-hidden lg:max-w-[48%]">
              <img
                src={mainProductImage}
                alt=""
                className="h-auto w-full object-cover object-center"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <h2 className="text-2xl font-bold leading-tight text-neutral-900">
                the quick fox jumps over
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial
                consequent sent nostrum met.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial
                consequent sent nostrum met.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                RELIT official consequent door ENIM RELIT Mollie. Excitation venial
                consequent sent nostrum met.
              </p>
              <div className="grid gap-8 sm:grid-cols-2">
                {[1, 2].map((col) => (
                  <div key={col}>
                    <h3 className="mb-4 text-base font-bold text-neutral-900">
                      the quick fox jumps over
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {['the quick fox jumps', 'the quick fox jumps', 'the quick fox jumps'].map(
                        (line) => (
                          <li
                            key={`${col}-${line}`}
                            className="flex items-start gap-2 text-sm font-semibold text-muted"
                          >
                            <ChevronRight
                              className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                              aria-hidden
                            />
                            <span>{line}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'additional' ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Additional product information, dimensions, materials, and care
            instructions will appear here.
          </p>
        ) : null}

        {activeTab === 'reviews' ? (
          <p className="text-sm text-muted">No reviews yet.</p>
        ) : null}
      </section>

      <section className="w-full bg-neutral-100 px-3 py-12 md:px-8 lg:px-[11%] lg:py-16">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center lg:max-w-none">
          <div className="h-px w-full max-w-md bg-neutral-300 lg:max-w-lg" aria-hidden />
          <h2 className="text-xl font-bold uppercase tracking-wide text-neutral-900 sm:text-2xl lg:text-[40px] lg:leading-tight">
            BESTSELLER PRODUCTS
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {bestsellerItems.map((p) => (
            <ProductCard
              key={p.id}
              to={`/product/${p.id}`}
              image={p.image}
              title={p.title}
              subtitle={p.subtitle}
              oldPrice={p.oldPrice}
              newPrice={p.newPrice}
            />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-center bg-neutral-50 px-3 py-10 md:px-8 lg:px-[11%] lg:py-12">
        <div className="flex w-full max-w-[414px] flex-col items-center justify-start gap-y-10 opacity-100 grayscale md:h-auto md:max-w-[1440px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-10 lg:max-w-[1440px]">
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
      </section>
    </div>
  )
}
