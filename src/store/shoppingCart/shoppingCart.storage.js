const KEY = 'shoppingCart'

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return []
  return items.filter((ci) => ci?.product?.id != null).map((ci) => ({
    count: Math.max(1, Number(ci?.count) || 1),
    checked: ci?.checked !== false,
    product: ci.product,
  }))
}

export function loadShoppingCartState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return undefined
    return {
      cart: normalizeCartItems(parsed.cart),
      payment: parsed.payment && typeof parsed.payment === 'object' ? parsed.payment : {},
      address: parsed.address && typeof parsed.address === 'object' ? parsed.address : {},
    }
  } catch {
    return undefined
  }
}

export function saveShoppingCartState(shoppingCartSlice) {
  try {
    if (!shoppingCartSlice || typeof shoppingCartSlice !== 'object') return
    localStorage.setItem(
      KEY,
      JSON.stringify({
        cart: normalizeCartItems(shoppingCartSlice.cart),
        payment:
          shoppingCartSlice.payment && typeof shoppingCartSlice.payment === 'object'
            ? shoppingCartSlice.payment
            : {},
        address:
          shoppingCartSlice.address && typeof shoppingCartSlice.address === 'object'
            ? shoppingCartSlice.address
            : {},
      })
    )
  } catch {
    // ignore
  }
}
