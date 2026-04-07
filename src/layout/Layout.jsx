import MobileHeroNav from '../components/MobileHeroNav'
import NavigationWarningToast from '../components/NavigationWarningToast'
import Header from './Header'
import PageContent from './PageContent'
import Footer from './Footer'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { verifyTokenOnLoad } from '../store/client/client.thunks'

export default function Layout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyTokenOnLoad())
  }, [dispatch])

  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <ToastContainer position="top-right" />
      <NavigationWarningToast />
      <Header />
      <MobileHeroNav />
      <PageContent />
      <Footer />
    </div>
  )
}
