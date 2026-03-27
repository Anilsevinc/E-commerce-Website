export default function ProductCard({
  image,
  title,
  subtitle,
  oldPrice,
  newPrice,
}) {
  return (
    <article className="flex w-full flex-col items-center gap-4 lg:min-h-0">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-base font-bold text-neutral-900">{title}</h3>
        <p className="text-sm font-semibold text-muted">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-semibold text-muted line-through">
            {oldPrice}
          </span>
          <span className="text-base font-bold text-price-new">{newPrice}</span>
        </div>
      </div>
    </article>
  )
}
