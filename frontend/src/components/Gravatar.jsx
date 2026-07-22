import md5 from 'md5'

export default function Gravatar({ email, size = 32, className = '' }) {
  const normalized = String(email || '').trim().toLowerCase()
  const hash = normalized ? md5(normalized) : ''
  const src = hash
    ? `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
    : `https://www.gravatar.com/avatar/?s=${size}&d=identicon`

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={['rounded-full', className].join(' ')}
      loading="lazy"
    />
  )
}

