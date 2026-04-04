import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ShopPagination from '../components/ShopPagination'

import shop1 from '../assets/shop-1.png'
import shop2 from '../assets/shop-2.png'
import shop3 from '../assets/shop-3.png'
import shop4 from '../assets/shop-4.png'
import shop5 from '../assets/shop-5.png'

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

const categoryImages = [shop1, shop2, shop3, shop4, shop5]

const brands = [
  { id: 'hooli', src: hooli, mobileSrc: hooliMobileLogo, alt: 'Hooli' },
  { id: 'lyft', src: lyft, mobileSrc: lyftMobileLogo, alt: 'Lyft' },
  { id: 'leaf', src: brand3, mobileSrc: brand3MobileLogo, alt: 'Brand' },
  { id: 'stripe', src: stripe, mobileSrc: stripeMobileLogo, alt: 'Stripe' },
  { id: 'aws', src: aws, mobileSrc: awsMobileLogo, alt: 'AWS' },
  { id: 'reddit', src: reddit, mobileSrc: redditMobileLogo, alt: 'Reddit' },
]

const productImages = [shop1, shop2, shop3, shop4, shop5]

const shopProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `shop-p-${i + 1}`,
  image: productImages[i % 5],
  title: 'Graphic Design',
  subtitle: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
}))

export default function ShopPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex w-full max-w-[1920px] flex-col">
      <section className="w-full bg-neutral-100">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-4 px-3 py-8 md:flex-row md:items-center md:justify-between md:px-8 lg:px-[11%] lg:py-10">
          <h1 className="text-center text-2xl font-bold text-neutral-900 md:text-left md:text-3xl lg:text-4xl">
            Shop
          </h1>
          <nav
            className="flex items-center justify-center gap-1 text-sm font-semibold md:justify-end"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="text-muted transition-colors hover:text-brand"
            >
              Home
            </Link>
            <span className="text-muted" aria-hidden>
              {' '}
              &gt;{' '}
            </span>
            <span className="text-muted">Shop</span>
          </nav>
        </div>
      </section>

      <section className="w-full px-3 py-8 md:px-8 lg:px-[11%] lg:py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {categoryImages.map((src, idx) => (
            <Link
              key={`shop-cat-${idx}`}
              to="/shop"
              className="group relative block aspect-[4/5] w-full max-w-full overflow-hidden sm:aspect-[3/4]"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-2 text-center text-white">
                <span className="text-base font-bold uppercase tracking-wide lg:text-lg">
                  CLOTHS
                </span>
                <span className="mt-1 text-sm font-semibold">5 Items</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full border-y border-neutral-200 bg-white px-3 py-6 md:px-8 lg:px-[11%]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 lg:max-w-none lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="text-center text-sm font-semibold text-muted lg:text-left">
            Showing all 12 results
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted">Views:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                  className={`flex h-10 w-10 items-center justify-center rounded border transition-colors ${
                    viewMode === 'grid'
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-neutral-300 text-muted hover:border-brand/50'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                  className={`flex h-10 w-10 items-center justify-center rounded border transition-colors ${
                    viewMode === 'list'
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-neutral-300 text-muted hover:border-brand/50'
                  }`}
                >
                  <List className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <label htmlFor="shop-sort" className="sr-only">
                Sort by
              </label>
              <select
                id="shop-sort"
                defaultValue="popularity"
                className="min-h-[44px] w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 outline-none focus:border-brand sm:w-auto"
              >
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[120px] items-center justify-center rounded-md bg-brand px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-3 pb-4 pt-2 md:px-8 lg:px-[11%] lg:pb-8 lg:pt-4">
        {viewMode === 'grid' ? (
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {shopProducts.map((p) => (
              <ProductCard
                key={p.id}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                oldPrice={p.oldPrice}
                newPrice={p.newPrice}
                showSwatches
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-8">
            {shopProducts.map((p) => (
              <ProductCard
                key={p.id}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                oldPrice={p.oldPrice}
                newPrice={p.newPrice}
                showSwatches
                listLayout
              />
            ))}
          </div>
        )}
      </section>

      <div className="w-full px-3 md:px-8 lg:px-[11%]">
        <ShopPagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>

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
