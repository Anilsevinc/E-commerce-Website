const KEY = 'wishlist'

export function loadWishlistState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return undefined
    return { items: parsed.items }
  } catch {
    return undefined
  }
}

export function saveWishlistState(wishlistSlice) {
  try {
    if (!wishlistSlice?.items) return
    localStorage.setItem(KEY, JSON.stringify({ items: wishlistSlice.items }))
  } catch {
    // ignore
  }
}
