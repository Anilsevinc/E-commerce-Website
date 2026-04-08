import FeaturedPostCard from '../components/FeaturedPostCard'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import TopProductWeekCard from '../components/TopProductWeekCard'

import hooli from '../assets/hooli-brands.png'
import lyft from '../assets/lyft-brands.png'
import brand3 from '../assets/brand-3.png'
import stripe from '../assets/stripe-brands.png'
import aws from '../assets/aws-brands.png'
import reddit from '../assets/reddit-brands.png'
import hooliMobileLogo from '../assets/hooli-logo.png'
import lyftMobileLogo from '../assets/lyft-logo.png'
import brand3MobileLogo from '../assets/3-logo.png'
import stripeMobileLogo from '../assets/stripe-logo.png'
import awsMobileLogo from '../assets/aws-logo.png'
import redditMobileLogo from '../assets/reddit-logo.png'

import leftBanner from '../assets/left-banner-product.png'
import rightTopBanner from '../assets/right-top-banner-product.png'
import rightBottomBanner from '../assets/right-bottom-banner-product.png'

import mobilTopProducts1 from '../assets/mobil-top-products1.jpg'
import mobilTopProducts2 from '../assets/mobil-top-products2.jpg'
import mobilTopProducts3 from '../assets/mobil-top-products3.jpg'

import imgProduct1_6 from '../assets/product-1-6.jpg'
import imgProduct2 from '../assets/product-2.jpg'
import imgProduct3_10 from '../assets/product-3-10.jpg'
import imgProduct4 from '../assets/product-4.jpg'
import imgProduct5 from '../assets/product-5.jpg'
import imgProduct7 from '../assets/product-7.jpg'
import imgProduct8 from '../assets/product-8.jpg'
import imgProduct9 from '../assets/product-9.jpg'

import weLove1 from '../assets/featured-products-1.jpg'
import weLove2 from '../assets/featured-products-2.jpg'

import service1 from '../assets/best-services-1.svg'
import service2 from '../assets/best-services-2.png'
import service3 from '../assets/best-services-3.png'

import post1 from '../assets/featured-posts-1.jpg'
import post2 from '../assets/featured-posts-2.jpg'
import mobileFeaturePost1 from '../assets/mobile-feature-post-1.jpg'
import mobileFeaturePost2 from '../assets/mobile-feature-post-2.jpg'

const products = [
  {
    id: 1,
    image: imgProduct1_6,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 2,
    image: imgProduct2,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 3,
    image: imgProduct3_10,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 4,
    image: imgProduct4,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 5,
    image: imgProduct5,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 6,
    image: imgProduct1_6,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 7,
    image: imgProduct7,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 8,
    image: imgProduct8,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 9,
    image: imgProduct9,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
  {
    id: 10,
    image: imgProduct3_10,
    title: 'Graphic Design',
    subtitle: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
  },
]

const brands = [
  { id: 'hooli', src: hooli, mobileSrc: hooliMobileLogo, alt: 'Hooli' },
  { id: 'lyft', src: lyft, mobileSrc: lyftMobileLogo, alt: 'Lyft' },
  { id: 'leaf', src: brand3, mobileSrc: brand3MobileLogo, alt: 'Brand' },
  { id: 'stripe', src: stripe, mobileSrc: stripeMobileLogo, alt: 'Stripe' },
  { id: 'aws', src: aws, mobileSrc: awsMobileLogo, alt: 'AWS' },
  { id: 'reddit', src: reddit, mobileSrc: redditMobileLogo, alt: 'Reddit' },
]

const featuredPosts = [
  {
    id: 'post-1',
    image: post1,
    mobileImage: mobileFeaturePost1,
    badge: 'NEW',
    mobileTitle: "Loudest à la Madison #1 \n(L'integral)",
    mobileExcerpt:
      "We focus on ergonomics and meeting \nyou where you work. It's only a \nkeystroke away.",
  },
  {
    id: 'post-2',
    image: post2,
    mobileImage: mobileFeaturePost2,
    badge: 'NEW',
  },
]

export default function HomePage() {
  return (
    <div className="flex w-full max-w-[1920px] flex-col items-center gap-y-[80px] md:gap-y-0">
      <HeroSection />

      <section className="flex min-h-[820px] w-full flex-col items-center justify-start gap-0 px-3 py-0 mt-0 md:h-auto md:max-w-none md:min-h-0 md:gap-12 md:px-8 md:py-6 lg:min-h-0 lg:gap-8 lg:px-[11%] lg:py-12">
        <div className="flex h-full w-full max-w-[414px] flex-col items-center justify-start gap-y-12 opacity-100 grayscale md:h-auto md:max-w-[1440px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-12 lg:max-w-[1440px] lg:gap-10">
          {brands.map((b) => (
            <picture key={b.id} className="block">
              <source media="(min-width: 768px)" srcSet={b.src} />
              <img
                src={b.mobileSrc}
                alt={b.alt}
                className="h-auto w-auto max-h-[110px] max-w-[151px] shrink-0 object-contain md:h-14 md:w-[120px] lg:h-14 lg:w-[120px]"
              />
            </picture>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full flex-col gap-4 px-3 pb-8 pt-0 md:gap-4 md:px-6 lg:flex-row lg:items-stretch lg:gap-4 lg:px-[11%] lg:py-12">
        <TopProductWeekCard
          to="/shop"
          mobileImage={mobilTopProducts1}
          desktopImage={leftBanner}
          cardClassName="group relative mx-auto w-full overflow-hidden rounded-none lg:mx-0 lg:flex lg:min-h-[572px] lg:flex-[1.4] lg:flex-col lg:justify-end"
          desktopVariant="left"
        />

        <div className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap lg:flex-1 lg:min-w-0 lg:flex-col lg:flex-nowrap">
          <TopProductWeekCard
            to="/shop"
            mobileImage={mobilTopProducts2}
            desktopImage={rightTopBanner}
            cardClassName="group relative mx-auto w-full overflow-hidden rounded-none md:w-[calc(50%-8px)] lg:mx-0 lg:flex lg:min-h-[289px] lg:w-full lg:flex-1 lg:flex-col lg:justify-end"
            desktopVariant="right"
            desktopTitleOneLine="Top Product Of the Week"
          />

          <TopProductWeekCard
            to="/shop"
            mobileImage={mobilTopProducts3}
            desktopImage={rightBottomBanner}
            cardClassName="group relative mx-auto w-full overflow-hidden rounded-none md:w-[calc(50%-8px)] lg:mx-0 lg:flex lg:min-h-[289px] lg:w-full lg:flex-1 lg:flex-col lg:justify-end"
            desktopVariant="right"
            desktopTitleOneLine="Top Product Of the Week"
          />
        </div>
      </section>

      <section className="mx-auto flex w-full flex-col items-center gap-10 px-3 py-12 md:max-w-none md:px-8 lg:max-w-none lg:px-[11%] lg:py-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="w-full text-center text-[24px] font-bold leading-[32px] tracking-[0.1px] text-neutral-900 uppercase sm:text-3xl md:text-3xl lg:text-[40px] lg:leading-tight">
            <span className="sm:hidden">
              BESTSELLER
              <br />
              PRODUCTS
            </span>
            <span className="hidden sm:inline">BESTSELLER PRODUCTS</span>
          </h2>
          <p className="max-w-xl text-center text-[14px] font-normal leading-[20px] tracking-[0.2px] text-muted sm:text-sm sm:font-medium sm:leading-relaxed sm:tracking-normal md:text-base">
            <span className="sm:hidden">
              Problems trying to resolve the
              <br />
              conflict between
            </span>
            <span className="hidden sm:block">
              Problems trying to resolve the conflict between the two major realms
              of Classical physics: Newtonian mechanics
            </span>
          </p>
        </div>

        <div className="flex w-full flex-wrap gap-6 lg:gap-8">
          {products.map((p, i) => (
            <div
              key={p.id}
              className={
                i >= 5
                  ? 'hidden w-full min-w-0 sm:flex sm:w-[calc(50%-12px)] sm:flex-col lg:w-[calc(20%-26px)]'
                  : 'flex w-full min-w-0 flex-col sm:w-[calc(50%-12px)] lg:w-[calc(20%-26px)]'
              }
            >
              <ProductCard
                to={`/product/${p.id}`}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                oldPrice={p.oldPrice}
                newPrice={p.newPrice}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-8 inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-md border-2 border-brand px-10 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:bg-brand hover:text-white md:mt-0"
        >
          LOAD MORE PRODUCTS
        </button>
      </section>

      <section className="mx-auto flex w-full min-h-0 flex-col gap-10 px-3 py-12 md:min-h-0 md:max-w-none md:px-8 lg:max-w-none lg:min-h-0 lg:flex-row-reverse lg:items-center lg:gap-16 lg:px-[11%] lg:py-20">
        <div className="flex w-[252px] max-w-full shrink-0 flex-col items-start gap-4 self-center text-left min-h-[336px] lg:w-auto lg:max-w-[50%] lg:min-h-0 lg:gap-6 lg:self-auto">
          <p className="w-full text-sm font-bold text-brand">
            Featured Products
          </p>
          <h2 className="w-full text-left text-[22px] font-bold leading-[1.25] tracking-wide text-neutral-900 normal-case sm:text-2xl md:text-3xl lg:text-[40px] lg:leading-tight">
            We love
            <br />
            what we do
          </h2>
          <p className="w-full text-left text-sm font-normal leading-relaxed text-muted md:text-base">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
          <p className="w-full text-left text-sm font-normal leading-relaxed text-muted md:text-base">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="flex w-full gap-3 self-center lg:max-w-[50%] lg:flex-1">
          <div className="flex min-h-0 flex-1 overflow-hidden lg:min-h-[420px]">
            <img
              src={weLove1}
              alt=""
              className="h-[363.55px] w-full object-cover object-center lg:h-full lg:min-h-[360px]"
            />
          </div>
          <div className="flex min-h-0 flex-1 overflow-hidden lg:min-h-[420px]">
            <img
              src={weLove2}
              alt=""
              className="h-[363.55px] w-full object-cover object-center lg:h-full lg:min-h-[360px]"
            />
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-12 bg-white px-3 py-12 md:px-8 lg:px-[11%] lg:py-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-[20px] font-medium leading-[30px] tracking-[0.2px] text-muted sm:text-sm sm:font-semibold sm:leading-none sm:tracking-normal">
            Featured Products
          </p>
          <h2 className="section-heading">THE BEST SERVICES</h2>
          <p className="max-w-xl text-center text-[14px] font-normal leading-[20px] tracking-[0.2px] text-muted sm:text-sm sm:font-medium sm:leading-relaxed sm:tracking-normal md:text-base">
            <span className="sm:hidden">
              Problems trying to resolve
              <br />
              the conflict between:
            </span>
            <span className="hidden sm:block">
              Problems trying to resolve the conflict between the two major realms
              of Classical physics: Newtonian mechanics
            </span>
          </p>
        </div>

        <div className="flex h-[842px] w-[329px] flex-col items-center gap-[30px] md:w-full md:h-auto md:max-w-[1200px] md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex h-[254px] w-[315px] flex-col items-center gap-[20px] px-[40px] py-[35px] text-center md:h-auto md:w-auto md:flex-1 md:px-0 md:py-0 md:gap-4">
            <div className="flex h-20 w-20 items-center justify-center">
              <img src={service1} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Easy Wins</h3>
            <p className="max-w-xs text-[14px] font-normal leading-[20px] tracking-[0.2px] text-muted sm:text-sm sm:font-medium sm:leading-relaxed">
              Get your best looking smile now!
            </p>
          </div>
          <div className="flex h-[254px] w-[315px] flex-col items-center gap-[20px] px-[40px] py-[35px] text-center md:h-auto md:w-auto md:flex-1 md:px-0 md:py-0 md:gap-4">
            <div className="flex h-20 w-20 items-center justify-center">
              <img src={service2} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Concrete</h3>
            <p className="max-w-xs text-[14px] font-normal leading-[20px] tracking-[0.2px] text-muted sm:text-sm sm:font-medium sm:leading-relaxed">
              Defalcate is most focused in
              <br />
              helping you discover your most
              <br />
              beautiful smile
            </p>
          </div>
          <div className="flex h-[254px] w-[315px] flex-col items-center gap-[20px] px-[40px] py-[35px] text-center md:h-auto md:w-auto md:flex-1 md:px-0 md:py-0 md:gap-4">
            <div className="flex h-20 w-20 items-center justify-center">
              <img src={service3} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Hack Growth</h3>
            <p className="max-w-xs text-[14px] font-normal leading-[20px] tracking-[0.2px] text-muted sm:text-sm sm:font-medium sm:leading-relaxed">
              Overcame any hurdle or any other
              <br />
              problem.
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-10 px-3 py-12 md:px-8 lg:px-[11%] lg:py-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="section-eyebrow">Practice Advice</p>
          <h2 className="section-heading normal-case">Featured Posts</h2>
        </div>

        <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-6">
          {featuredPosts.map((post) => (
            <FeaturedPostCard
              key={post.id}
              image={post.image}
              mobileImage={post.mobileImage}
              badge={post.badge}
              mobileTitle={post.mobileTitle}
              mobileExcerpt={post.mobileExcerpt}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
