export function genderPath(genderCode) {
  return String(genderCode || '').toLowerCase() === 'k' ? 'kadin' : 'erkek'
}

// Minimal TR-friendly slug (examples: "Gömlek"->"gomlek", "Ayakkabı"->"ayakkabi")
export function slugifyTR(input) {
  const s = String(input || '')
    .trim()
    .toLowerCase()
    .replaceAll('ç', 'c')
    .replaceAll('ğ', 'g')
    .replaceAll('ı', 'i')
    .replaceAll('ö', 'o')
    .replaceAll('ş', 's')
    .replaceAll('ü', 'u')

  return s
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/(^-|-$)/g, '')
}

export function categoryRoute({ gender, title, id }) {
  const genderSeg = genderPath(gender)
  const nameSeg = slugifyTR(title)
  return `/shop/${genderSeg}/${nameSeg}/${encodeURIComponent(String(id))}`
}

export function productRoute({ category, product }) {
  if (!category || !product) return ''
  const genderSeg = genderPath(category.gender)
  const categoryNameSeg = slugifyTR(category.title)
  const productNameSeg = slugifyTR(product.name)
  return `/shop/${genderSeg}/${categoryNameSeg}/${encodeURIComponent(
    String(category.id)
  )}/${productNameSeg}/${encodeURIComponent(String(product.id))}`
}

