import { Link } from 'react-router-dom'

export default function TopProductWeekCard({
  to = '/shop',
  mobileImage,
  desktopImage,
  cardClassName = '',
  desktopVariant = 'left',
  desktopTitleOneLine = 'Top Product Of the Week',
}) {
  const geom =
    desktopVariant === 'right'
      ? {
          overlayW: 'w-[62.3%]',
          titleFont: 'font-normal text-[20px] leading-[30px] tracking-[0.2px]',
        }
      : {
          overlayW: 'w-[68.6%]',
          overlayH: 'h-[41.6%]',
          titleFont: 'font-bold text-[24px] leading-[32px] tracking-[0.1px]',
          btnFont: 'font-bold text-[14px] leading-[22px] tracking-[0.2px]',
        }

  const exploreBtnClass =
    'inline-flex min-h-[52px] w-[198px] max-w-full items-center justify-center rounded-[5px] border border-[#FFFFFF] px-4 text-center text-[14px] font-bold uppercase leading-[22px] tracking-[0.2px]'

  return (
    <Link to={to} className={cardClassName}>
      <div className="relative w-full lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:justify-end">
        <picture className="block w-full lg:absolute lg:inset-0 lg:block lg:h-full">
          <source media="(min-width: 1024px)" srcSet={desktopImage} />
          <img
            src={mobileImage}
            alt=""
            className="block h-auto w-full max-w-full transition-transform duration-300 lg:h-full lg:w-full lg:object-cover lg:group-hover:scale-105"
          />
        </picture>

        <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-[10px] bg-[#2D8BC0BF] px-[40px] py-[15px] text-white lg:hidden">
          <p className="text-left text-[24px] font-bold leading-[32px] tracking-[0.1px]">
            Top Product Of
            <br />
            the Week
          </p>
          <span className={exploreBtnClass}>
            EXPLORE ITEMS
          </span>
        </div>

        {desktopVariant === 'right' ? (
          <div
            className={`hidden lg:flex absolute bottom-0 left-0 z-[1] flex-col gap-4 bg-[#2D8BC0BF] px-9 py-6 text-white ${geom.overlayW}`}
          >
            <p className={`text-left ${geom.titleFont} max-w-full xl:whitespace-nowrap`}>
              {desktopTitleOneLine}
            </p>
            <span className={exploreBtnClass}>
              EXPLORE ITEMS
            </span>
          </div>
        ) : (
          <div
            className={`hidden lg:flex absolute bottom-0 left-0 z-[1] flex-col gap-6 bg-[#2D8BC0BF] px-10 py-6 text-white ${geom.overlayW} ${geom.overlayH}`}
          >
            <p className={`text-left ${geom.titleFont}`}>
              Top Product Of
              <br />
              the Week
            </p>

            <span className={exploreBtnClass}>
              EXPLORE ITEMS
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
