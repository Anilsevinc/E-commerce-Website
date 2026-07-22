import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Heart } from 'lucide-react'
import { toggleWishlist } from '../store/wishlist/wishlist.actions'

export default function ProductCard({
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
  showSwatches = false,
  listLayout = false,
  to,
  wishlistProduct,
}) {
  const dispatch = useDispatch()
  const inWishlist = useSelector((s) =>
    wishlistProduct?.id != null
      ? (Array.isArray(s.wishlist?.items) ? s.wishlist.items : []).some(
          (p) => String(p?.id) === String(wishlistProduct.id)
        )
      : false
  )

  function onWishlistClick(e) {
    e.preventDefault()
    e.stopPropagation()
    if (wishlistProduct) dispatch(toggleWishlist(wishlistProduct))
  }

  const imageBlock = (
    <div
      className={
        listLayout
          ? 'aspect-[3/4] w-full max-w-[140px] shrink-0 overflow-hidden sm:max-w-[180px] lg:max-w-[220px]'
          : 'aspect-[3/4] w-full overflow-hidden'
      }
    >
      <img
        key={image || 'no-image'}
        src={image}
        alt=""
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    </div>
  )

  const imageWithWishlist = wishlistProduct ? (
    <div
      className={
        listLayout
          ? 'relative max-w-[140px] shrink-0 sm:max-w-[180px] lg:max-w-[220px]'
          : 'relative w-full'
      }
    >
      <div
        className={
          listLayout
            ? 'aspect-[3/4] w-full overflow-hidden'
            : 'aspect-[3/4] w-full overflow-hidden'
        }
      >
        <img
          key={image || 'no-image'}
          src={image}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm transition-colors hover:bg-white hover:text-brand"
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={inWishlist}
        onClick={onWishlistClick}
      >
        <Heart
          className={`h-5 w-5 ${inWishlist ? 'fill-brand text-brand' : ''}`}
          strokeWidth={2}
        />
      </button>
    </div>
  ) : (
    imageBlock
  )

  const textBlock = (
    <div
      className={
        listLayout
          ? 'flex min-w-0 flex-1 flex-col items-start gap-2 text-left'
          : 'flex flex-col items-center gap-2 text-center'
      }
    >
      <h3 className="text-base font-bold text-neutral-900">{title}</h3>
      <p className="text-sm font-semibold text-muted">{subtitle}</p>
      <div
        className={
          listLayout
            ? 'flex flex-wrap items-center gap-2'
            : 'flex flex-wrap items-center justify-center gap-2'
        }
      >
        <span className="text-sm font-semibold text-muted line-through">
          {oldPrice}
        </span>
        <span className="text-base font-bold text-price-new">{newPrice}</span>
      </div>
      {showSwatches ? (
        <div
          className={
            listLayout
              ? 'flex items-center gap-2 pt-1'
              : 'flex items-center justify-center gap-2 pt-1'
          }
        >
          <span
            className="h-4 w-4 rounded-full border border-neutral-200 bg-sky-400"
            aria-hidden
          />
          <span
            className="h-4 w-4 rounded-full border border-neutral-200 bg-orange-500"
            aria-hidden
          />
          <span
            className="h-4 w-4 rounded-full border border-neutral-200 bg-teal-500"
            aria-hidden
          />
          <span
            className="h-4 w-4 rounded-full border border-neutral-200 bg-[#252B42]"
            aria-hidden
          />
        </div>
      ) : null}
    </div>
  )

  const article = listLayout ? (
    <article className="flex w-full flex-row items-center gap-4 lg:min-h-0">
      {imageWithWishlist}
      {textBlock}
    </article>
  ) : (
    <article className="flex w-full flex-col items-center gap-4 lg:min-h-0">
      {imageWithWishlist}
      {textBlock}
    </article>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="block cursor-pointer text-inherit no-underline outline-none transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {article}
      </Link>
    )
  }

  return article
}
