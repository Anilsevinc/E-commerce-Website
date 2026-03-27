export default function PagePlaceholder({ title }) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center px-4 py-16">
      <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-neutral-900 md:text-3xl">
        {title}
      </h1>
      <p className="mt-4 text-center text-sm font-medium text-muted">
        This section will be implemented in a later milestone.
      </p>
    </div>
  )
}
