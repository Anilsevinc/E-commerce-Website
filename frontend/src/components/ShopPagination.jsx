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
    'relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-3 text-sm font-semibold transition-colors focus:z-10'

  const variant = (kind, isDisabled) => {
    if (isDisabled) {
      return `${btnBase} cursor-not-allowed border border-brand bg-white text-brand opacity-40`
    }
    if (kind === 'active') {
      return `${btnBase} border border-brand bg-brand text-white hover:opacity-95`
    }
    return `${btnBase} border border-brand bg-white text-brand hover:bg-brand/5`
  }

  const controls = [
    {
      key: 'first',
      label: 'First',
      kind: 'inactive',
      disabled: currentPage === 1,
      onClick: () => go(1),
    },
    {
      key: 'prev',
      label: 'Prev',
      kind: 'inactive',
      disabled: currentPage === 1,
      onClick: () => go(currentPage - 1),
    },
    ...pages.map((p) => ({
      key: `page-${p}`,
      label: String(p),
      kind: p === currentPage ? 'active' : 'inactive',
      disabled: false,
      onClick: () => go(p),
      ariaCurrent: p === currentPage ? 'page' : undefined,
    })),
    {
      key: 'next',
      label: 'Next',
      kind: 'inactive',
      disabled: currentPage === totalPages,
      onClick: () => go(currentPage + 1),
    },
    {
      key: 'last',
      label: 'Last',
      kind: 'inactive',
      disabled: currentPage === totalPages,
      onClick: () => go(totalPages),
    },
  ]

  return (
    <nav
      className="flex w-full flex-wrap items-center justify-center gap-2 py-10"
      aria-label="Pagination"
    >
      <div className="inline-flex items-stretch">
        {controls.map((c, idx) => {
          const isFirst = idx === 0
          const isLast = idx === controls.length - 1

          return (
            <button
              key={c.key}
              type="button"
              className={`${variant(c.kind, c.disabled)} ${isFirst ? 'rounded-l-md' : '-ml-px'} ${
                isLast ? 'rounded-r-md' : ''
              }`}
              disabled={c.disabled}
              onClick={c.onClick}
              aria-current={c.ariaCurrent}
            >
              {c.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
