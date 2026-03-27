import MobileHeroNav from '../components/MobileHeroNav'
import Header from './Header'
import PageContent from './PageContent'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans">
      <Header />
      <MobileHeroNav />
      <PageContent />
      <Footer />
    </div>
  )
}
