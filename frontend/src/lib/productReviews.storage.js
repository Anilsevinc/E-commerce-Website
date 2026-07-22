const KEY = 'product_reviews_v1'

function parseAll() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function isValidReview(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.message === 'string' &&
    typeof item.name === 'string' &&
    typeof item.role === 'string' &&
    Number.isFinite(Number(item.rating))
  )
}

/**
 * @param {string | undefined} productId
 * @returns {Array<{ id: string, rating: number, message: string, name: string, role: string }> | null}
 */
export function loadProductReviews(productId) {
  if (productId == null || productId === '') return null
  try {
    const all = parseAll()
    const list = all[String(productId)]
    if (!Array.isArray(list)) return null
    const cleaned = list.filter(isValidReview)
    return cleaned.length ? cleaned : null
  } catch {
    return null
  }
}

/**
 * @param {string | undefined} productId
 * @param {Array<{ id: string, rating: number, message: string, name: string, role: string }>} reviews
 */
export function saveProductReviews(productId, reviews) {
  if (productId == null || productId === '') return
  try {
    const all = parseAll()
    all[String(productId)] = Array.isArray(reviews) ? reviews.filter(isValidReview) : []
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // ignore quota / private mode
  }
}
