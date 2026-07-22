import { Link } from 'react-router-dom'

import blogImage from '../assets/blog-image.jpg'
import blog2Image from '../assets/blog-2-img.jpg'

function BlogPostCardOne() {
  return (
    <article className="h-[205px] w-full min-w-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 md:flex-1">
      <Link
        to="/blog"
        className="relative flex h-full w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <div className="absolute inset-0" aria-hidden>
          <img
            src={blogImage}
            alt=""
            className="h-full w-full object-cover object-[center_40%]"
          />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,#00000026_15%,#383838D6_84%)]"
          aria-hidden
        />
        <div className="relative mt-auto flex min-h-0 flex-col justify-end gap-2 p-4 text-left font-sans text-white">
          <h2 className="text-2xl font-bold leading-8 tracking-[0.1px]">
            Life Tips From Top Ten Adventure Travelers
          </h2>
          <p className="text-sm font-normal leading-5 tracking-[0.2px]">
            Slate helps you see how many more days you need to work to
            <br />
            reach.
          </p>
          <h6 className="mt-1 text-sm font-bold leading-5 tracking-[0.1px]">
            Google Trending New
          </h6>
        </div>
      </Link>
    </article>
  )
}

function BlogPostCardTwo() {
  return (
    <article className="h-[205px] w-full min-w-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 md:flex-1">
      <div className="relative flex h-full w-full flex-col">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={blog2Image}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,#00000026_15%,#383838D6_84%)]"
          aria-hidden
        />
        <div className="relative mt-auto flex min-h-0 flex-col justify-end gap-2 p-4 text-left font-sans text-white">
          <p className="text-sm font-bold leading-6 tracking-[0.2px]">
            Tax Management
          </p>
          <p className="text-xl font-normal leading-[30px] tracking-[0.2px]">
            Life Tips From Top Ten
            <br />
            Adventure Travelers
          </p>
          <Link
            to="/blog"
            className="mt-1 inline-flex h-[42px] min-w-[168px] max-w-fit items-center justify-center gap-[10px] rounded-[37px] bg-brand px-9 py-[10px] text-center text-sm font-bold leading-[22px] tracking-[0.2px] text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
          >
            View project
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <section className="w-full px-3 py-10 md:px-8 lg:px-[clamp(1rem,13.54vw,195px)] lg:py-14">
        <div className="mx-auto w-full max-w-[1440px]">
          <h1 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl">
            Blog
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-6">
            <BlogPostCardOne />
            <BlogPostCardTwo />
          </div>
        </div>
      </section>
    </div>
  )
}
