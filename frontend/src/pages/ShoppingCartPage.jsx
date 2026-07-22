import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'

import {
  decCartItem,
  incCartItem,
  removeFromCart,
  toggleCartItem,
} from '../store/shoppingCart/shoppingCart.actions'

/** Header + row: flex so columns stay aligned (fixed widths + flex-1 product). */
const CART_TABLE_ROW =
  'flex flex-col gap-4 px-4 py-4 md:flex-row md:flex-nowrap md:items-center md:gap-3'
const CART_TABLE_HEADER =
  'hidden flex-col gap-4 px-4 py-3 md:flex md:flex-row md:flex-nowrap md:items-center md:gap-3'

export default function ShoppingCartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((s) => s.shoppingCart.cart)

  const productsTotal = useMemo(() => {
    if (!Array.isArray(cart)) return 0
    return cart.reduce((sum, ci) => {
      if (!ci?.checked) return sum
      const price = Number(ci?.product?.price || 0)
      const count = Number(ci?.count || 0)
      return sum + price * count
    }, 0)
  }, [cart])

  const shipping = productsTotal > 0 ? 29.99 : 0
  const discount = 0
  const grandTotal = Math.max(0, productsTotal + shipping - discount)

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <h1 className="text-3xl font-bold text-brand-dark">Shopping Cart</h1>
          <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Breadcrumb">
            <Link to="/" className="text-muted transition-colors hover:text-brand">
              Home
            </Link>
            <span className="text-muted" aria-hidden>
              {' '}
              &gt;{' '}
            </span>
            <span className="text-muted">Cart</span>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-neutral-200">
            <div className="overflow-x-auto">
              <div className="w-full min-w-0">
                <div
                  className={`${CART_TABLE_HEADER} bg-neutral-50 text-xs font-bold uppercase tracking-wide text-muted`}
                >
                  <span className="w-12 shrink-0 md:w-12">Select</span>
                  <span className="min-w-0 flex-1">Product</span>
                  <span className="w-[100px] shrink-0 text-right">Price</span>
                  <span className="w-[152px] shrink-0 text-center">Quantity</span>
                  <span className="w-[100px] shrink-0 text-right">Subtotal</span>
                  <span className="w-[52px] shrink-0 text-right">Remove</span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {Array.isArray(cart) && cart.length > 0 ? (
                cart.map((ci) => {
                  const p = ci.product || {}
                  const price = Number(p.price || 0)
                  const count = Number(ci.count || 0)
                  const subtotal = price * count

                  return (
                    <div key={p.id} className={CART_TABLE_ROW}>
                      <div className="flex w-12 shrink-0 items-center md:w-12">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-neutral-300 accent-brand"
                          checked={Boolean(ci.checked)}
                          onChange={() => dispatch(toggleCartItem(p.id))}
                          aria-label="Select product"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          <img
                            src={p.images?.[0]?.url || ''}
                            alt={p.name || ''}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-brand-dark">{p.name}</p>
                          <p className="mt-1 line-clamp-2 text-xs font-semibold text-muted">
                            {p.description}
                          </p>
                        </div>
                      </div>

                      <div className="w-[100px] shrink-0 whitespace-nowrap text-right text-sm font-bold text-brand-dark tabular-nums">
                        ${price.toFixed(2)}
                      </div>

                      <div className="flex w-[152px] shrink-0 items-center justify-start gap-2 md:justify-center">
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-900 transition-colors hover:border-brand hover:text-brand"
                          aria-label="Decrease quantity"
                          onClick={() => dispatch(decCartItem(p.id))}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-10 text-center text-sm font-bold text-neutral-900">
                          {count}
                        </span>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-neutral-900 transition-colors hover:border-brand hover:text-brand"
                          aria-label="Increase quantity"
                          onClick={() => dispatch(incCartItem(p.id))}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="w-[100px] shrink-0 whitespace-nowrap text-right text-sm font-bold text-brand-dark tabular-nums">
                        ${subtotal.toFixed(2)}
                      </div>

                      <div className="flex w-[52px] shrink-0 justify-end">
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                          aria-label="Remove from cart"
                          onClick={() => dispatch(removeFromCart(p.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )
                })
                  ) : (
                    <div className="px-4 py-12 text-center">
                      <p className="text-sm font-semibold text-muted">Your cart is empty.</p>
                      <Link
                        to="/shop"
                        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
                      >
                        Go to Shop
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-4">
              <p className="text-sm font-semibold text-muted">Total (selected items)</p>
              <p className="shrink-0 text-lg font-bold text-brand-dark tabular-nums">
                ${productsTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <aside className="w-full shrink-0 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:w-[360px] lg:sticky lg:top-24">
            <p className="text-base font-bold text-brand-dark">Order Summary</p>
            <div className="mt-4 space-y-3 text-sm font-semibold">
              <div className="flex items-center justify-between text-muted">
                <span>Products</span>
                <span className="text-brand-dark">${productsTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Shipping</span>
                <span className="text-brand-dark">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Discount</span>
                <span className="text-brand-dark">-${discount.toFixed(2)}</span>
              </div>
              <div className="h-px w-full bg-neutral-200" aria-hidden />
              <div className="flex items-center justify-between">
                <span className="text-brand-dark">Grand Total</span>
                <span className="text-lg font-bold text-brand-dark">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={productsTotal <= 0}
              onClick={() => navigate('/order')}
            >
              Create Order
            </button>
          </aside>
        </div>
      </section>
    </div>
  )
}

