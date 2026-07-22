import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'

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

import { fetchProductById } from '../store/product/product.thunks'
import { addToCart } from '../store/shoppingCart/shoppingCart.actions'
import { toggleWishlist } from '../store/wishlist/wishlist.actions'
import {
  loadProductReviews,
  saveProductReviews,
} from '../lib/productReviews.storage'

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

const DESCRIPTION_PLACEHOLDER = `Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, 'cause she's got that one international smile. There's a stranger in my bed, there's a pounding in my head. Oh, no. In another life I would make you stay. 'Cause I, I'm capable of anything. Suiting up for my crowning battle. Used to steal your parents' liquor and climb to the roof. Tone, tan fit and ready, turn it up cause its gettin' heavy. Her love is like a drug. I guess that I forgot I had a choice.`

const SAMPLE_REVIEWS = [
  {
    id: 'sample-1',
    rating: 4,
    message:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away. We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    name: 'Regina Miles',
    role: 'Designer',
  },
]

const ADDITIONAL_INFO_LINES = [
  '3 Play Styles: TV Mode, Tabletop Mode, Handheld Mode',
  '6.2-inch, multi-touch capacitive touch screen',
  "4.5-9+ Hours of Battery Life will vary depending on software usage conditions",
  'Connects over Wi-Fi for multiplayer gaming; Up to 8 consoles can be connected for local wireless multiplayer',
  'Model number: HAC-001(-01)',
]

export default function ProductDetailPage() {
  const { id, productId } = useParams()
  const effectiveProductId = productId || id
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((s) => s.client.user)
  const isLoggedIn = Boolean(user?.token || user?.email)
  const product = useSelector((s) => s.product.selectedProduct)
  const fetchState = useSelector((s) => s.product.selectedProductFetchState)
  const inWishlist = useSelector((s) => {
    const pid = s.product.selectedProduct?.id
    if (pid == null) return false
    return (Array.isArray(s.wishlist?.items) ? s.wishlist.items : []).some(
      (p) => String(p?.id) === String(pid)
    )
  })
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS)
  const [reviewForm, setReviewForm] = useState({
    rating: 4,
    message: '',
    name: '',
    email: '',
    saveInfo: false,
  })

  function onAddToCart() {
    if (!product) return
    dispatch(addToCart(product))
  }

  function onToggleWishlist() {
    if (!product) return
    dispatch(toggleWishlist(product))
  }

  useEffect(() => {
    if (!effectiveProductId) return
    dispatch(fetchProductById(effectiveProductId))
  }, [dispatch, effectiveProductId])

  const galleryImages = useMemo(() => {
    const imgs = Array.isArray(product?.images) ? product.images : []
    return imgs
      .slice()
      .sort((a, b) => Number(a?.index || 0) - Number(b?.index || 0))
      .map((x) => x.url)
      .filter(Boolean)
  }, [product])

  const nextImage = () =>
    setActiveImage((i) => (galleryImages.length ? (i + 1) % galleryImages.length : 0))
  const prevImage = () =>
    setActiveImage((i) =>
      galleryImages.length ? (i - 1 + galleryImages.length) % galleryImages.length : 0
    )

  useEffect(() => {
    setActiveImage(0)
  }, [effectiveProductId])

  useLayoutEffect(() => {
    if (!effectiveProductId) return
    const stored = loadProductReviews(effectiveProductId)
    setReviews(stored ?? SAMPLE_REVIEWS)
  }, [effectiveProductId])

  const heroProductImage = galleryImages[0] || productsImage

  function onSubmitReview(e) {
    e.preventDefault()
    if (!isLoggedIn) return
    if (!effectiveProductId) return
    if (!reviewForm.message.trim() || !reviewForm.name.trim() || !reviewForm.email.trim()) {
      return
    }
    setReviews((prev) => {
      const next = [
        ...prev,
        {
          id: `r-${Date.now()}`,
          rating: reviewForm.rating,
          message: reviewForm.message.trim(),
          name: reviewForm.name.trim(),
          role: 'Customer',
        },
      ]
      saveProductReviews(effectiveProductId, next)
      return next
    })
    setReviewForm((f) => ({
      rating: 4,
      message: '',
      name: f.saveInfo ? f.name : '',
      email: f.saveInfo ? f.email : '',
      saveInfo: f.saveInfo,
    }))
  }

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
        <div className="mt-4 flex justify-center lg:justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-brand hover:text-brand"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        </div>
      </div>

      <section className="w-full px-3 pb-10 md:px-8 lg:px-[11%] lg:pb-16">
        {fetchState === 'FETCHING' ? (
          <div className="flex w-full items-center justify-center py-20">
            <div className="flex items-center gap-3 text-sm font-semibold text-muted">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
              Loading product...
            </div>
          </div>
        ) : fetchState === 'FAILED' ? (
          <div className="mx-auto w-full max-w-[1200px] rounded-xl border border-neutral-200 bg-white p-8 text-center text-sm font-semibold text-muted">
            Product not found.
          </div>
        ) : (
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:max-w-none lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <div className="w-full shrink-0 lg:max-w-[50%] lg:flex-1">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <img
                src={galleryImages[activeImage] || galleryImages[0] || productsImage}
                alt={product?.name || ''}
                className="h-full w-full object-cover object-center"
              />
              {galleryImages.length > 1 ? (
                <>
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
                </>
              ) : null}
            </div>
            <div className="mt-4 flex justify-start gap-3">
              {(galleryImages.length ? galleryImages : [productsImage]).map((src, idx) => (
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
                    alt={product?.name || ''}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 lg:max-w-[50%] lg:flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 lg:text-3xl">
              {product?.name || 'Product'}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-0.5" aria-label="Rating">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => {
                  const filled = Number(product?.rating || 0) >= s
                  return (
                    <Star
                      key={s}
                      className={
                        filled
                          ? 'h-5 w-5 fill-yellow-400 text-yellow-400'
                          : 'h-5 w-5 text-neutral-300'
                      }
                      aria-hidden
                    />
                  )
                })}
              </div>
              <span className="text-sm font-semibold text-muted">
                {Number(product?.rating || 0).toFixed(2)}
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">
              ${Number(product?.price || 0).toFixed(2)}
            </p>
            <p className="text-sm font-semibold">
              <span className="text-muted">Availability : </span>
              <span className="text-brand">
                {Number(product?.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {product?.description || ''}
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
                  className={`flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:border-brand hover:text-brand ${
                    inWishlist ? 'border-brand text-brand' : 'text-neutral-700'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={inWishlist}
                  onClick={onToggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 ${inWishlist ? 'fill-brand text-brand' : ''}`}
                    strokeWidth={2}
                  />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Add to cart"
                  onClick={onAddToCart}
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
            {effectiveProductId ? (
              <p className="sr-only">Product id: {effectiveProductId}</p>
            ) : null}
          </div>
        </div>
        )}
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
            { id: 'reviews', label: `Reviews (${reviews.length})` },
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
          <div className="rounded-lg bg-[#FAFAFA] px-4 py-8 md:px-10 md:py-10">
            <h2 className="text-lg font-bold text-[#8B9DC3] md:text-xl">Description :</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-600">
              {product?.description?.trim()
                ? product.description
                : DESCRIPTION_PLACEHOLDER}
            </p>
            <div className="mt-5 flex w-full flex-col gap-2 md:mt-6 md:h-[260px] md:flex-row md:items-stretch md:gap-x-3">
              <div className="min-h-[140px] overflow-hidden md:h-full md:min-h-0 md:w-[40%] md:max-w-[40%] md:shrink-0">
                <img
                  src={heroProductImage}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-2 md:h-full md:min-h-0">
                <div className="min-h-[96px] flex-1 overflow-hidden md:min-h-0 md:max-h-[126px] md:flex-none">
                  <img
                    src={heroProductImage}
                    alt=""
                    className="h-full w-full min-h-[96px] object-cover object-center md:min-h-0"
                  />
                </div>
                <div className="min-h-[96px] flex-1 overflow-hidden md:min-h-0 md:max-h-[126px] md:flex-none">
                  <img
                    src={heroProductImage}
                    alt=""
                    className="h-full w-full min-h-[96px] object-cover object-center md:min-h-0"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'additional' ? (
          <div className="rounded-lg bg-[#FAFAFA] px-4 py-8 md:px-10 md:py-10">
            <h2 className="text-lg font-bold text-[#7EB8E0] md:text-xl">
              Additional Information :
            </h2>
            <ul className="mt-6 flex flex-col gap-4 text-sm font-medium leading-relaxed text-neutral-600">
              {ADDITIONAL_INFO_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {activeTab === 'reviews' ? (
          <div className="flex flex-col gap-10">
            {reviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                  <article
                    key={r.id}
                    className="flex w-full max-w-[504px] flex-col overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-neutral-200/80 sm:h-[252px] sm:max-h-[252px] sm:flex-row"
                  >
                    <div className="aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-full sm:w-1/2 sm:max-w-[252px]">
                      <img
                        src={heroProductImage}
                        alt=""
                        className="h-full w-full object-cover object-center sm:min-h-0"
                      />
                    </div>
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4 text-left sm:py-3 sm:pr-4">
                      <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => (
                          <Star
                            key={s}
                            className={
                              r.rating >= s
                                ? 'h-4 w-4 fill-amber-400 text-amber-400 sm:h-[15px] sm:w-[15px]'
                                : 'h-4 w-4 text-neutral-300 sm:h-[15px] sm:w-[15px]'
                            }
                            strokeWidth={0}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <p className="line-clamp-4 text-xs font-medium leading-relaxed text-neutral-600 sm:text-[13px]">
                        {r.message}
                      </p>
                      <p className="text-sm font-bold text-brand-dark">{r.name}</p>
                      <p className="text-xs font-semibold text-brand">{r.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            <div className="rounded-lg bg-[#FAFAFA] px-4 py-8 md:px-10 md:py-10">
              <h3 className="text-lg font-bold text-[#8B9DC3]">Reviews :</h3>
              {reviews.length === 0 ? (
                <>
                  <p className="mt-2 text-sm text-neutral-600">There are no reviews yet.</p>
                  <p className="mt-4 text-base font-bold text-[#8B9DC3]">
                    Be the first to review &quot;{product?.name || 'Product'}&quot;
                  </p>
                </>
              ) : (
                <p className="mt-4 text-base font-bold text-[#8B9DC3]">
                  Add your review for &quot;{product?.name || 'Product'}&quot;
                </p>
              )}

              <form className="mt-8 space-y-6" onSubmit={onSubmitReview}>
                <fieldset
                  disabled={!isLoggedIn}
                  className={`min-w-0 space-y-6 border-0 p-0 ${!isLoggedIn ? 'opacity-60' : ''}`}
                >
                <div>
                  <p className="text-sm font-medium text-neutral-600">Your Rating</p>
                  <div className="mt-2 flex gap-1" role="group" aria-label="Rating">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="rounded p-0.5 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:hover:opacity-100"
                        aria-label={`${s} stars`}
                        aria-pressed={reviewForm.rating === s}
                        onClick={() =>
                          setReviewForm((f) => ({ ...f, rating: s }))
                        }
                      >
                        <Star
                          className={
                            reviewForm.rating >= s
                              ? 'h-8 w-8 fill-teal-500 text-teal-500'
                              : 'h-8 w-8 text-neutral-500'
                          }
                          strokeWidth={reviewForm.rating >= s ? 0 : 1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review-message"
                    className="text-sm font-medium text-neutral-600"
                  >
                    Your Review *
                  </label>
                  <textarea
                    id="review-message"
                    required
                    rows={5}
                    value={reviewForm.message}
                    onChange={(e) =>
                      setReviewForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Message"
                    className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-brand"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="review-name"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Name *
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) =>
                        setReviewForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="name *"
                      autoComplete="name"
                      className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-brand"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="review-email"
                      className="text-sm font-medium text-neutral-600"
                    >
                      Email *
                    </label>
                    <input
                      id="review-email"
                      type="email"
                      required
                      value={reviewForm.email}
                      onChange={(e) =>
                        setReviewForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="Email *"
                      autoComplete="email"
                      className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-brand"
                    />
                    <p className="mt-1 text-xs text-neutral-500">
                      We&apos;ll never share your email with anyone else.
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={reviewForm.saveInfo}
                    onChange={(e) =>
                      setReviewForm((f) => ({ ...f, saveInfo: e.target.checked }))
                    }
                    className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-500 bg-white text-brand focus:ring-brand"
                  />
                  <span>
                    Save my name, email, and website in this browser for the next time I
                    comment.
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] min-w-[120px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </button>
                </fieldset>
              </form>

              {!isLoggedIn ? (
                <div
                  className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
                  role="status"
                >
                  <p className="font-semibold text-amber-900">
                    Sign in required to leave a review
                  </p>
                  <p className="mt-1 text-amber-900/90">
                    We need to know who you are before your review can be published. Please sign in
                    to your account first.
                  </p>
                  <Link
                    to="/login"
                    state={{ from: `${location.pathname}${location.search}` }}
                    className="mt-3 inline-block text-sm font-bold text-brand underline-offset-2 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      <section className="w-full bg-[#FAFAFA] px-3 py-12 md:px-8 lg:px-[11%] lg:py-16">
        <div className="mx-auto mb-10 w-full max-w-[1200px] lg:max-w-none">
          <h3 className="text-left text-xl font-bold uppercase tracking-wide text-neutral-900 sm:text-2xl lg:text-[40px] lg:leading-tight">
            BESTSELLER PRODUCTS
          </h3>
          <div className="mt-4 h-px w-full bg-neutral-300" aria-hidden />
        </div>
        <div className="flex w-full flex-wrap gap-8 lg:gap-6">
          {bestsellerItems.map((p) => (
            <div
              key={p.id}
              className="w-full min-w-0 sm:w-[calc(50%-16px)] lg:w-[calc(25%-18px)]"
            >
              <ProductCard
                to={`/product/${p.id}`}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                oldPrice={p.oldPrice}
                newPrice={p.newPrice}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-center bg-[#FAFAFA] px-3 py-10 md:px-8 lg:px-[11%] lg:py-12">
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
