export default function ShopPagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const go = (p) => {
    if (p < 1 || p > totalPages) return
    onPageChange?.(p)
  }

  const btnBase =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-3 text-sm font-semibold transition-colors'

  const inactive = `${btnBase} border border-brand bg-white text-brand hover:bg-brand/5`
  const active = `${btnBase} bg-brand text-white`

  return (
    <nav
      className="flex w-full flex-wrap items-center justify-center gap-2 py-10"
      aria-label="Pagination"
    >
      <button
        type="button"
        className={currentPage === 1 ? `${btnBase} cursor-not-allowed opacity-40` : inactive}
        disabled={currentPage === 1}
        onClick={() => go(1)}
      >
        First
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={p === currentPage ? active : inactive}
          onClick={() => go(p)}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={
          currentPage === totalPages
            ? `${btnBase} cursor-not-allowed opacity-40`
            : inactive
        }
        disabled={currentPage === totalPages}
        onClick={() => go(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
}
