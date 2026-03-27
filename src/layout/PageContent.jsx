import { Outlet } from 'react-router-dom'

export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col items-center">
      <Outlet />
    </main>
  )
}
