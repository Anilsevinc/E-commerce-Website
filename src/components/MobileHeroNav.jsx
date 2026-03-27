import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  [
    'block w-full text-center font-sans text-[30px] font-semibold leading-[45px] tracking-[0.2px] transition-colors',
    isActive ? 'text-neutral-900' : 'text-[#737373]',
  ].join(' ')

export default function MobileHeroNav() {
  return (
    <nav
      className="mx-auto flex w-full max-w-[123px] flex-col items-center justify-center gap-6 pt-6 pb-8 lg:hidden"
      aria-label="Primary"
    >
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/shop" className={linkClass}>
        Product
      </NavLink>
      <NavLink to="/pricing" className={linkClass}>
        Pricing
      </NavLink>
      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>
    </nav>
  )
}
