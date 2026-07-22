import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getStoredToken } from '../store/client/client.auth'

export default function ProtectedRoute({ children }) {
  const user = useSelector((s) => s.client.user)
  const isLoggedIn = Boolean(user?.token || user?.email)
  const location = useLocation()

  // If a token exists (remember-me), wait for /verify on app load
  // instead of redirecting immediately.
  const hasStoredToken = Boolean(getStoredToken())
  if (!isLoggedIn && hasStoredToken) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <div className="flex items-center gap-3 text-sm font-semibold text-muted">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
          Checking session...
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    const from = location.pathname + location.search
    return <Navigate to="/login" replace state={{ from }} />
  }

  return children
}

