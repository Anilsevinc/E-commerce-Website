import MobileHeroNav from '../components/MobileHeroNav'
import NavigationWarningToast from '../components/NavigationWarningToast'
import Header from './Header'
import PageContent from './PageContent'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <ToastContainer position="top-center" />
      <NavigationWarningToast />
      <Header />
      <MobileHeroNav />
      <PageContent />
      <Footer />
    </div>
  )
}
