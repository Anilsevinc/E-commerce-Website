import { Link, useLocation } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  const location = useLocation()
  const order = location.state?.order

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-16 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle className="h-10 w-10" strokeWidth={2} aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-brand-dark">Thank you for your order!</h1>
          <p className="mt-3 text-base font-semibold text-muted">
            Your order has been placed successfully. We appreciate your business and will process it
            shortly.
          </p>
          {order?.id != null ? (
            <p className="mt-4 text-sm font-bold text-brand-dark">
              Order reference: <span className="text-brand">{String(order.id)}</span>
            </p>
          ) : null}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/shop"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Continue shopping
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-neutral-200 bg-white px-8 text-sm font-bold text-brand-dark transition-colors hover:bg-neutral-50"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
