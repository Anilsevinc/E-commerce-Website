import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'
import { toast } from 'react-toastify'

import { fetchOrders } from '../store/client/client.thunks'

function formatOrderDate(order) {
  const raw = order?.order_date ?? order?.created_at ?? order?.createdAt
  if (raw == null || raw === '') return '—'
  try {
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return String(raw)
    return d.toLocaleString()
  } catch {
    return String(raw)
  }
}

function getOrderProducts(order) {
  if (Array.isArray(order?.products)) return order.products
  if (Array.isArray(order?.order_items)) return order.order_items
  if (Array.isArray(order?.lines)) return order.lines
  return []
}

function orderRowKey(order, index) {
  return order?.id ?? order?.order_id ?? `order-${index}`
}

function productRowKey(line, index) {
  return line?.product_id ?? line?.id ?? `line-${index}`
}

export default function PreviousOrdersPage() {
  const dispatch = useDispatch()
  const orders = useSelector((s) => s.client.orders)
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    dispatch(fetchOrders())
      .catch(() => {
        toast.error('Could not load your orders.', { autoClose: 4000 })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [dispatch])

  function toggleRow(id) {
    setExpandedId((cur) => (cur === id ? null : id))
  }

  const list = Array.isArray(orders) ? orders : []

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2px] text-muted">Account</p>
            <h1 className="mt-1 text-3xl font-bold text-brand-dark">Previous orders</h1>
            <p className="mt-2 text-sm font-semibold text-muted">
              View your order history and line items.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-neutral-200 bg-white px-6 text-sm font-bold text-brand-dark transition-colors hover:bg-neutral-50"
          >
            Continue shopping
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center py-16">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
          </div>
        ) : list.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50/80 px-6 py-14 text-center">
            <Package className="mx-auto h-12 w-12 text-muted" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 text-base font-bold text-brand-dark">No orders yet</p>
            <p className="mt-2 text-sm font-semibold text-muted">
              When you place an order, it will show up here.
            </p>
            <Link
              to="/cart"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Go to cart
            </Link>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted">
                    Order
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted">
                    Total
                  </th>
                  <th className="w-12 px-2 py-3" aria-label="Expand details" />
                </tr>
              </thead>
              <tbody>
                {list.map((order, index) => {
                  const rowId = orderRowKey(order, index)
                  const products = getOrderProducts(order)
                  const price = order?.price ?? order?.total ?? order?.grand_total
                  const expanded = expandedId === rowId

                  return (
                    <Fragment key={String(rowId)}>
                      <tr className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/80">
                        <td className="px-4 py-4 font-bold text-brand-dark">#{order?.id ?? rowId}</td>
                        <td className="px-4 py-4 font-semibold text-muted">
                          {formatOrderDate(order)}
                        </td>
                        <td className="px-4 py-4 font-bold text-brand-dark">
                          {price != null && price !== ''
                            ? `$${Number(price).toFixed(2)}`
                            : '—'}
                        </td>
                        <td className="px-2 py-4 text-center">
                          <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-dark transition-colors hover:bg-neutral-100"
                            aria-expanded={expanded}
                            aria-controls={`order-details-${String(rowId)}`}
                            onClick={() => toggleRow(rowId)}
                          >
                            {expanded ? (
                              <ChevronUp className="h-5 w-5" aria-hidden />
                            ) : (
                              <ChevronDown className="h-5 w-5" aria-hidden />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expanded ? (
                        <tr className="border-b border-neutral-200 bg-neutral-50/60">
                          <td colSpan={4} className="px-4 pb-6 pt-2">
                            <div
                              id={`order-details-${String(rowId)}`}
                              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
                            >
                              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                                Order details
                              </p>
                              {order?.address_id != null ? (
                                <p className="mt-2 text-sm font-semibold text-muted">
                                  Address ID:{' '}
                                  <span className="font-bold text-brand-dark">{order.address_id}</span>
                                </p>
                              ) : null}
                              {products.length === 0 ? (
                                <p className="mt-3 text-sm font-semibold text-muted">
                                  No line items in the response.
                                </p>
                              ) : (
                                <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-100">
                                  <table className="w-full min-w-[480px] text-sm">
                                    <thead>
                                      <tr className="bg-neutral-50 text-left text-xs font-bold uppercase tracking-wide text-muted">
                                        <th className="px-3 py-2">Product ID</th>
                                        <th className="px-3 py-2">Qty</th>
                                        <th className="px-3 py-2">Detail</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {products.map((line, i) => (
                                        <tr
                                          key={String(productRowKey(line, i))}
                                          className="border-t border-neutral-100"
                                        >
                                          <td className="px-3 py-2 font-semibold text-brand-dark">
                                            {line?.product_id ?? line?.productId ?? '—'}
                                          </td>
                                          <td className="px-3 py-2 font-semibold text-muted">
                                            {line?.count ?? line?.quantity ?? '—'}
                                          </td>
                                          <td className="px-3 py-2 font-semibold text-muted">
                                            {line?.detail ?? line?.description ?? '—'}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
