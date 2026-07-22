import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  createAddress,
  createCard,
  createOrder,
  deleteAddress,
  deleteCard,
  fetchAddressList,
  fetchCreditCards,
  updateAddress,
  updateCard,
} from '../store/client/client.thunks'
import { setCart } from '../store/shoppingCart/shoppingCart.actions'

const CITIES_TR = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Amasya',
  'Ankara',
  'Antalya',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkari',
  'Hatay',
  'Isparta',
  'Mersin',
  'İstanbul',
  'İzmir',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırklareli',
  'Kırşehir',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Kahramanmaraş',
  'Mardin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Şanlıurfa',
  'Uşak',
  'Van',
  'Yozgat',
  'Zonguldak',
  'Aksaray',
  'Bayburt',
  'Karaman',
  'Kırıkkale',
  'Batman',
  'Şırnak',
  'Bartın',
  'Ardahan',
  'Iğdır',
  'Yalova',
  'Karabük',
  'Kilis',
  'Osmaniye',
  'Düzce',
]

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm font-medium text-red-600">{message}</p>
}

function maskCardNo(cardNo) {
  const digits = String(cardNo ?? '').replace(/\D/g, '')
  if (digits.length < 4) return '•••• •••• •••• ••••'
  return `•••• •••• •••• ${digits.slice(-4)}`
}

function normalizeExpiryYear(y) {
  const n = Number(String(y).trim())
  if (!Number.isFinite(n)) return null
  if (n >= 0 && n < 100) return 2000 + n
  return n
}

function yearForOrder(card) {
  const y = Number(card?.expire_year)
  if (!Number.isFinite(y)) return null
  if (y >= 0 && y < 100) return 2000 + y
  return y
}

function formatOrderDate(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function CreateOrderPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const addressList = useSelector((s) => s.client.addressList)
  const creditCards = useSelector((s) => s.client.creditCards)
  const cart = useSelector((s) => s.shoppingCart.cart)
  const [step, setStep] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [shippingId, setShippingId] = useState(null)
  const [receiptId, setReceiptId] = useState(null)
  const [showCardForm, setShowCardForm] = useState(false)
  const [editingCardId, setEditingCardId] = useState(null)
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [cardCcv, setCardCcv] = useState('')
  const [orderSubmitting, setOrderSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: '',
    },
    mode: 'onTouched',
  })

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    formState: { errors: cardErrors, isSubmitting: isCardSubmitting },
  } = useForm({
    defaultValues: {
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    dispatch(fetchAddressList()).catch(() =>
      toast.error('Failed to load addresses.', { autoClose: 4000 })
    )
  }, [dispatch])

  useEffect(() => {
    if (step !== 2) return
    dispatch(fetchCreditCards()).catch(() =>
      toast.error('Failed to load payment methods.', { autoClose: 4000 })
    )
  }, [dispatch, step])

  useEffect(() => {
    if (Array.isArray(addressList) && addressList.length > 0) {
      if (!shippingId) setShippingId(addressList[0].id)
      if (!receiptId) setReceiptId(addressList[0].id)
    }
  }, [addressList, shippingId, receiptId])

  useEffect(() => {
    if (!Array.isArray(creditCards) || creditCards.length === 0) {
      if (selectedCardId != null) setSelectedCardId(null)
      return
    }
    if (selectedCardId == null || !creditCards.some((c) => c.id === selectedCardId)) {
      setSelectedCardId(creditCards[0].id)
    }
  }, [creditCards, selectedCardId])

  const selectedShipping = useMemo(
    () => (Array.isArray(addressList) ? addressList.find((a) => a.id === shippingId) : null),
    [addressList, shippingId]
  )
  const selectedReceipt = useMemo(
    () => (Array.isArray(addressList) ? addressList.find((a) => a.id === receiptId) : null),
    [addressList, receiptId]
  )

  const { orderProducts, grandTotal, productsTotal } = useMemo(() => {
    if (!Array.isArray(cart)) {
      return { orderProducts: [], grandTotal: 0, productsTotal: 0 }
    }
    let productsTotal = 0
    const orderProducts = []
    for (const ci of cart) {
      if (!ci?.checked || ci?.product?.id == null) continue
      const price = Number(ci?.product?.price || 0)
      const count = Number(ci?.count || 0)
      productsTotal += price * count
      const p = ci.product
      const detail =
        String(p.description || '').trim() || String(p.name || '').trim() || '-'
      orderProducts.push({
        product_id: Number(p.id),
        count,
        detail: detail.slice(0, 500),
      })
    }
    const shipping = productsTotal > 0 ? 29.99 : 0
    const discount = 0
    const grandTotal = Math.max(0, productsTotal + shipping - discount)
    return { orderProducts, grandTotal, productsTotal }
  }, [cart])

  const selectedCard = useMemo(
    () => (Array.isArray(creditCards) ? creditCards.find((c) => c.id === selectedCardId) : null),
    [creditCards, selectedCardId]
  )

  function startAdd() {
    setEditingId(null)
    reset({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: '',
    })
    setShowForm(true)
  }

  function startEdit(addr) {
    setEditingId(addr.id)
    reset({
      title: addr.title || '',
      name: addr.name || '',
      surname: addr.surname || '',
      phone: addr.phone || '',
      city: addr.city || '',
      district: addr.district || '',
      neighborhood: addr.neighborhood || '',
      address: addr.address || '',
    })
    setShowForm(true)
  }

  async function onSubmit(values) {
    const payload = {
      title: values.title,
      name: values.name,
      surname: values.surname,
      phone: values.phone,
      city: values.city,
      district: values.district,
      neighborhood: values.neighborhood,
      address: values.address,
    }

    try {
      if (editingId) {
        await dispatch(updateAddress({ id: editingId, ...payload }))
        toast.success('Address updated.', { autoClose: 2000 })
      } else {
        await dispatch(createAddress(payload))
        toast.success('Address added.', { autoClose: 2000 })
      }
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Address save failed.'
      toast.error(String(msg), { autoClose: 5000 })
    }
  }

  async function onDelete(id) {
    try {
      await dispatch(deleteAddress(id))
      toast.success('Address deleted.', { autoClose: 2000 })
      if (shippingId === id) setShippingId(null)
      if (receiptId === id) setReceiptId(null)
    } catch {
      toast.error('Delete failed.', { autoClose: 4000 })
    }
  }

  function startAddCard() {
    setEditingCardId(null)
    resetCard({
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: '',
    })
    setShowCardForm(true)
  }

  function startEditCard(card) {
    setEditingCardId(card.id)
    const y = card.expire_year
    const yearStr =
      y == null
        ? ''
        : Number(y) >= 0 && Number(y) < 100
          ? String(2000 + Number(y))
          : String(y)
    resetCard({
      card_no: String(card.card_no ?? '').replace(/\D/g, ''),
      expire_month: card.expire_month != null ? String(card.expire_month) : '',
      expire_year: yearStr,
      name_on_card: card.name_on_card ?? '',
    })
    setShowCardForm(true)
  }

  async function onSubmitCard(values) {
    const card_no = String(values.card_no ?? '').replace(/\s/g, '')
    const expire_month = Number(values.expire_month)
    let expire_year = normalizeExpiryYear(values.expire_year)
    const name_on_card = String(values.name_on_card ?? '').trim()

    if (!card_no || card_no.length < 13) {
      toast.error('Enter a valid card number.', { autoClose: 4000 })
      return
    }
    if (!Number.isFinite(expire_month) || expire_month < 1 || expire_month > 12) {
      toast.error('Enter a valid expiry month (1–12).', { autoClose: 4000 })
      return
    }
    if (expire_year == null || expire_year < 2000) {
      toast.error('Enter a valid expiry year.', { autoClose: 4000 })
      return
    }

    const payload = {
      card_no,
      expire_month,
      expire_year,
      name_on_card,
    }

    try {
      if (editingCardId) {
        await dispatch(
          updateCard({
            id: String(editingCardId),
            ...payload,
          })
        )
        toast.success('Card updated.', { autoClose: 2000 })
      } else {
        await dispatch(createCard(payload))
        toast.success('Card saved.', { autoClose: 2000 })
      }
      setShowCardForm(false)
      setEditingCardId(null)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Card save failed.'
      toast.error(String(msg), { autoClose: 5000 })
    }
  }

  async function onDeleteCard(id) {
    try {
      await dispatch(deleteCard(id))
      toast.success('Card removed.', { autoClose: 2000 })
      if (selectedCardId === id) setSelectedCardId(null)
    } catch {
      toast.error('Could not remove card.', { autoClose: 4000 })
    }
  }

  async function onPlaceOrder() {
    if (!selectedCard || shippingId == null) {
      toast.error('Select a shipping address and a payment card.', { autoClose: 4000 })
      return
    }
    const cvv = String(cardCcv).replace(/\D/g, '')
    if (cvv.length < 3 || cvv.length > 4) {
      toast.error('Enter a valid CVV (3–4 digits).', { autoClose: 4000 })
      return
    }
    if (orderProducts.length === 0) {
      toast.error('Your cart has no items selected for checkout.', { autoClose: 4000 })
      return
    }

    const cardDigits = String(selectedCard.card_no ?? '').replace(/\D/g, '')
    const expireYear = yearForOrder(selectedCard)
    const expireMonth = Number(selectedCard.expire_month)
    if (!Number.isFinite(expireMonth) || expireMonth < 1 || expireMonth > 12) {
      toast.error('Invalid card expiry.', { autoClose: 4000 })
      return
    }
    if (expireYear == null || expireYear < 2000) {
      toast.error('Invalid card expiry year.', { autoClose: 4000 })
      return
    }

    const payload = {
      address_id: Number(shippingId),
      order_date: formatOrderDate(new Date()),
      card_no: Number(cardDigits),
      card_name: String(selectedCard.name_on_card ?? '').trim(),
      card_expire_month: expireMonth,
      card_expire_year: expireYear,
      card_ccv: Number(cvv),
      price: Number(grandTotal.toFixed(2)),
      products: orderProducts,
    }

    setOrderSubmitting(true)
    try {
      const data = await dispatch(createOrder(payload))
      dispatch(setCart([]))
      toast.success('Order placed successfully!', { autoClose: 2500 })
      navigate('/order/success', { state: { order: data } })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Could not place order.'
      toast.error(String(msg), { autoClose: 5000 })
    } finally {
      setOrderSubmitting(false)
    }
  }

  const canContinueToPayment =
    Boolean(shippingId && receiptId) &&
    Array.isArray(addressList) &&
    addressList.length > 0 &&
    orderProducts.length > 0

  return (
    <div className="w-full bg-white">
      <section className="mx-auto w-full max-w-[1440px] px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2px] text-muted">Checkout</p>
            <h1 className="mt-1 text-3xl font-bold text-brand-dark">Create Order</h1>
            <p className="mt-2 text-sm font-semibold text-muted">
              {step === 1 ? 'Step 1 of 2: Address' : 'Step 2 of 2: Payment'}
            </p>
          </div>
          {step === 1 ? (
            <button
              type="button"
              onClick={startAdd}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Add Address
            </button>
          ) : (
            <button
              type="button"
              onClick={startAddCard}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Add new card
            </button>
          )}
        </div>

        {orderProducts.length === 0 ? (
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-amber-900">
              Your cart has no items selected for checkout. Add products and tick them in the cart.
            </p>
            <Link
              to="/cart"
              className="inline-flex shrink-0 min-h-[40px] items-center justify-center rounded-md bg-amber-900 px-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Go to cart
            </Link>
          </div>
        ) : null}

        {step === 1 ? (
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1 rounded-2xl border border-neutral-200 p-5">
            <p className="text-base font-bold text-brand-dark">Shipping Address</p>
            <div className="mt-4 space-y-3">
              {(Array.isArray(addressList) ? addressList : []).map((a) => (
                <label
                  key={a.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-brand/40"
                >
                  <input
                    type="radio"
                    name="shipping"
                    className="mt-1 h-4 w-4 accent-brand"
                    checked={shippingId === a.id}
                    onChange={() => setShippingId(a.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold text-brand-dark">{a.title}</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="text-xs font-bold text-brand hover:opacity-80"
                          onClick={(e) => {
                            e.preventDefault()
                            startEdit(a)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-xs font-bold text-red-600 hover:opacity-80"
                          onClick={(e) => {
                            e.preventDefault()
                            onDelete(a.id)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-muted">
                      {a.name} {a.surname} • {a.phone}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-muted">
                      {a.neighborhood}, {a.district}, {a.city}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-muted">{a.address}</p>
                  </div>
                </label>
              ))}

              {selectedShipping ? null : (
                <p className="text-sm font-semibold text-muted">
                  No shipping address selected.
                </p>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1 rounded-2xl border border-neutral-200 p-5">
            <p className="text-base font-bold text-brand-dark">Receipt Address</p>
            <div className="mt-4 space-y-3">
              {(Array.isArray(addressList) ? addressList : []).map((a) => (
                <label
                  key={a.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-brand/40"
                >
                  <input
                    type="radio"
                    name="receipt"
                    className="mt-1 h-4 w-4 accent-brand"
                    checked={receiptId === a.id}
                    onChange={() => setReceiptId(a.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brand-dark">{a.title}</p>
                    <p className="mt-1 text-xs font-semibold text-muted">
                      {a.name} {a.surname} • {a.phone}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-muted">
                      {a.neighborhood}, {a.district}, {a.city}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-muted">{a.address}</p>
                  </div>
                </label>
              ))}

              {selectedReceipt ? null : (
                <p className="text-sm font-semibold text-muted">
                  No receipt address selected.
                </p>
              )}
            </div>
          </div>
        </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-base font-bold text-brand-dark">Order summary</p>
              <p className="mt-1 text-sm font-semibold text-muted">
                {orderProducts.length} line item(s) • Shipping ${productsTotal > 0 ? '29.99' : '0.00'}
              </p>
              <p className="mt-3 text-lg font-bold text-brand-dark">
                Total ${grandTotal.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-base font-bold text-brand-dark">Payment method</p>
              <p className="mt-1 text-sm font-semibold text-muted">
                Choose a saved card for this order.
              </p>
              <div className="mt-4 space-y-3">
                {(Array.isArray(creditCards) ? creditCards : []).map((c) => (
                  <label
                    key={c.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-brand/40"
                  >
                    <input
                      type="radio"
                      name="paymentCard"
                      className="mt-1 h-4 w-4 accent-brand"
                      checked={selectedCardId === c.id}
                      onChange={() => setSelectedCardId(c.id)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-brand-dark">
                          {maskCardNo(c.card_no)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-xs font-bold text-brand hover:opacity-80"
                            onClick={(e) => {
                              e.preventDefault()
                              startEditCard(c)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-xs font-bold text-red-600 hover:opacity-80"
                            onClick={(e) => {
                              e.preventDefault()
                              onDeleteCard(c.id)
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-muted">
                        {c.name_on_card}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-muted">
                        Expires{' '}
                        {String(c.expire_month).padStart(2, '0')}/
                        {Number(c.expire_year) >= 0 && Number(c.expire_year) < 100
                          ? String(2000 + Number(c.expire_year))
                          : c.expire_year}
                      </p>
                    </div>
                  </label>
                ))}

                {Array.isArray(creditCards) && creditCards.length === 0 ? (
                  <p className="text-sm font-semibold text-muted">
                    No saved cards yet. Add a card to continue.
                  </p>
                ) : null}
              </div>
            </div>

            {showCardForm ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
                <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                  <p className="text-lg font-bold text-brand-dark">
                    {editingCardId ? 'Update card' : 'Add new card'}
                  </p>
                  <button
                    type="button"
                    className="text-sm font-bold text-muted hover:text-brand"
                    onClick={() => {
                      setShowCardForm(false)
                      setEditingCardId(null)
                    }}
                  >
                    Close
                  </button>
                </div>

                <form
                  className="mt-6 flex flex-col gap-5 md:flex-row md:flex-wrap"
                  onSubmit={handleSubmitCard(onSubmitCard)}
                >
                  <div className="w-full">
                    <label className="text-sm font-semibold text-brand-dark" htmlFor="card_no">
                      Card number
                    </label>
                    <input
                      id="card_no"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="1234 1234 1234 1234"
                      {...registerCard('card_no', { required: 'Card number is required.' })}
                    />
                    <FieldError message={cardErrors.card_no?.message} />
                  </div>

                  <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                    <label className="text-sm font-semibold text-brand-dark" htmlFor="expire_month">
                      Expiry month
                    </label>
                    <input
                      id="expire_month"
                      inputMode="numeric"
                      className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="12"
                      {...registerCard('expire_month', { required: 'Month is required.' })}
                    />
                    <FieldError message={cardErrors.expire_month?.message} />
                  </div>

                  <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                    <label className="text-sm font-semibold text-brand-dark" htmlFor="expire_year">
                      Expiry year
                    </label>
                    <input
                      id="expire_year"
                      inputMode="numeric"
                      autoComplete="cc-exp-year"
                      className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      placeholder="2030"
                      {...registerCard('expire_year', { required: 'Year is required.' })}
                    />
                    <FieldError message={cardErrors.expire_year?.message} />
                  </div>

                  <div className="w-full">
                    <label className="text-sm font-semibold text-brand-dark" htmlFor="name_on_card">
                      Name on card
                    </label>
                    <input
                      id="name_on_card"
                      autoComplete="cc-name"
                      className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                      {...registerCard('name_on_card', { required: 'Name is required.' })}
                    />
                    <FieldError message={cardErrors.name_on_card?.message} />
                  </div>

                  <div className="w-full">
                    <button
                      type="submit"
                      disabled={isCardSubmitting}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isCardSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Saving...
                        </>
                      ) : editingCardId ? (
                        'Update card'
                      ) : (
                        'Save card'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            <div className="rounded-2xl border border-neutral-200 p-5">
              <label className="text-base font-bold text-brand-dark" htmlFor="card_ccv">
                CVV
              </label>
              <p className="mt-1 text-xs font-semibold text-muted">
                Required to complete payment. Not stored on our servers.
              </p>
              <input
                id="card_ccv"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                value={cardCcv}
                onChange={(e) => setCardCcv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                className="mt-3 w-full max-w-[200px] rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium tracking-widest text-neutral-900 outline-none transition-colors focus:border-brand"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-neutral-200 bg-white px-6 text-sm font-bold text-brand-dark transition-colors hover:bg-neutral-50"
              >
                Back to address
              </button>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                <p className="text-sm font-semibold text-muted sm:text-right">
                  {selectedCardId
                    ? 'Card selected for payment.'
                    : 'Select or add a card to pay.'}
                </p>
                <button
                  type="button"
                  disabled={
                    orderSubmitting ||
                    orderProducts.length === 0 ||
                    !selectedCardId ||
                    !creditCards?.length
                  }
                  onClick={onPlaceOrder}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {orderSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Placing order...
                    </>
                  ) : (
                    'Place order'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 1 && showForm ? (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <p className="text-lg font-bold text-brand-dark">
                {editingId ? 'Update Address' : 'Add Address'}
              </p>
              <button
                type="button"
                className="text-sm font-bold text-muted hover:text-brand"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
              >
                Close
              </button>
            </div>

            <form
              className="mt-6 flex flex-col gap-5 md:flex-row md:flex-wrap"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="title">
                  Address Title
                </label>
                <input
                  id="title"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('title', { required: 'Title is required.' })}
                />
                <FieldError message={errors.title?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('name', { required: 'Name is required.' })}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="surname">
                  Surname
                </label>
                <input
                  id="surname"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('surname', { required: 'Surname is required.' })}
                />
                <FieldError message={errors.surname?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('phone', { required: 'Phone is required.' })}
                />
                <FieldError message={errors.phone?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="city">
                  City (İl)
                </label>
                <select
                  id="city"
                  className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('city', { required: 'City is required.' })}
                >
                  <option value="">Select city</option>
                  {CITIES_TR.map((c) => (
                    <option key={c} value={c.toLowerCase()}>
                      {c}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.city?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="district">
                  District (İlçe)
                </label>
                <input
                  id="district"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('district', { required: 'District is required.' })}
                />
                <FieldError message={errors.district?.message} />
              </div>

              <div className="w-full min-w-0 md:w-[calc(50%-10px)]">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="neighborhood">
                  Neighborhood (Mahalle)
                </label>
                <input
                  id="neighborhood"
                  className="mt-2 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('neighborhood', { required: 'Neighborhood is required.' })}
                />
                <FieldError message={errors.neighborhood?.message} />
              </div>

              <div className="w-full">
                <label className="text-sm font-semibold text-brand-dark" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  className="mt-2 w-full resize-y rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors focus:border-brand"
                  {...register('address', { required: 'Address is required.' })}
                />
                <FieldError message={errors.address?.message} />
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : editingId ? (
                    'Update Address'
                  ) : (
                    'Save Address'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              disabled={!canContinueToPayment}
              onClick={() => setStep(2)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-8 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to payment
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}

