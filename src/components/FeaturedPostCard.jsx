import { Link } from 'react-router-dom'
import {
  BarChart3,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Heart,
  Layers,
  ShoppingCart,
  Star,
} from 'lucide-react'

const MOBILE_TITLE = "Loudest à la Madison #1 (L'integral)"

export default function FeaturedPostCard({
  image,
  mobileImage,
  badge = 'NEW',
  mobileTitle = MOBILE_TITLE,
  mobileExcerpt = "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
}) {
  const mobileSrc = mobileImage ?? image

  return (
    <article className="h-[606px] w-[328px] max-w-full overflow-hidden bg-white sm:h-auto sm:w-full sm:max-w-[508px]">
      <div className="flex flex-col sm:hidden">
        <div className="relative h-[300px] w-full max-w-full shrink-0 overflow-hidden">
          <img
            src={mobileSrc}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase leading-none text-white">
            {badge}
          </span>
        </div>

        <div className="flex h-[306px] w-full max-w-full flex-col gap-[10px] px-[25px] pb-[35px] pt-[25px]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-brand">Google</span>
            <span className="text-muted">Trending</span>
            <span className="text-muted">New</span>
          </div>

          <h3 className="whitespace-pre-line text-left text-xl font-bold leading-snug text-[#252B42]">
            {mobileTitle}
          </h3>

          <p className="whitespace-pre-line text-left text-sm font-medium leading-relaxed text-muted">
            {mobileExcerpt}
          </p>

          <div className="flex h-[46px] w-[280px] max-w-full items-center justify-between py-[15px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted">
              <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>22 April 2021</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted">
              <BarChart3 className="h-4 w-4 shrink-0 text-price-new" aria-hidden />
              <span>10 comments</span>
            </div>
          </div>

          <Link
            to="/blog"
            className="inline-flex w-fit items-center gap-1 font-bold text-muted"
          >
            Learn More
            <ChevronRight className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex sm:h-[404px] sm:flex-row sm:overflow-hidden">
        <div className="relative h-[280px] w-full shrink-0 sm:h-[404px] sm:w-[209px]">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute left-4 top-4 rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase leading-none text-white">
            {badge}
          </span>
          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-[10px] sm:bottom-auto sm:left-[35px] sm:top-[340px] sm:translate-x-0"
            aria-label="Quick actions"
          >
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#252B42] transition-opacity hover:opacity-90"
              aria-label="Like"
            >
              <Heart className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#252B42] transition-opacity hover:opacity-90"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#252B42] transition-opacity hover:opacity-90"
              aria-label="View"
            >
              <Eye className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex h-auto w-full flex-col gap-[10px] bg-white px-[25px] pb-[35px] pt-[25px] sm:h-[404px] sm:w-[292px] sm:min-h-0 sm:shrink-0 sm:overflow-y-auto">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-brand">
              English Department
            </span>
            <div className="flex h-[26px] w-[50px] shrink-0 items-center justify-center gap-[5px] rounded-[20px] bg-[#252B42] px-[5px] py-[5px]">
              <Star
                className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400"
                aria-hidden
              />
              <span className="text-xs font-bold leading-none text-white">
                4.9
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold leading-tight text-[#252B42]">
            Graphic Design
          </h3>

          <p className="text-xs font-medium leading-relaxed text-muted">
            We focus on ergonomics and meeting you where you work. It&apos;s only
            a keystroke away.
          </p>

          <div className="flex items-center gap-2 text-sm font-bold text-muted">
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            <span>15 Sales</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-muted line-through">
              $16.48
            </span>
            <span className="text-base font-bold text-price-new">$6.48</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full border border-neutral-200 bg-sky-400"
              aria-hidden
            />
            <span
              className="h-4 w-4 rounded-full border border-neutral-200 bg-teal-500"
              aria-hidden
            />
            <span
              className="h-4 w-4 rounded-full border border-neutral-200 bg-orange-500"
              aria-hidden
            />
            <span
              className="h-4 w-4 rounded-full border border-neutral-200 bg-[#252B42]"
              aria-hidden
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
            <span className="inline-flex items-center gap-1 text-brand">
              <Clock className="h-4 w-4" aria-hidden />
              22h...
            </span>
            <span className="inline-flex items-center gap-1 text-orange-500">
              <Layers className="h-4 w-4" aria-hidden />
              64 Lessons
            </span>
            <span className="inline-flex items-center gap-1 text-teal-600">
              <BarChart3 className="h-4 w-4" aria-hidden />
              Progress
            </span>
          </div>

          <Link
            to="/blog"
            className="mt-auto inline-flex h-[44px] w-[141px] shrink-0 items-center justify-center gap-[10px] whitespace-nowrap rounded-[37px] border border-[#23A6F0] bg-white px-5 py-[10px] text-sm font-bold text-brand transition-colors hover:bg-brand/5"
          >
            Learn More
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
