import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function NavigationWarningToast() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const warning = location.state?.warning
    if (!warning) return

    toast.warning(String(warning), { autoClose: 6000 })

    // Clear navigation state so it doesn't re-toast on refresh/back
    navigate(location.pathname + location.search, { replace: true, state: null })
  }, [location, navigate])

  return null
}

