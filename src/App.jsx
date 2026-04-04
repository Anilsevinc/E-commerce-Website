import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ContactPage from './pages/ContactPage'
import PagePlaceholder from './pages/PagePlaceholder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<PagePlaceholder title="About" />} />
          <Route path="blog" element={<PagePlaceholder title="Blog" />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pages" element={<PagePlaceholder title="Pages" />} />
          <Route path="pricing" element={<PagePlaceholder title="Pricing" />} />
          <Route path="login" element={<PagePlaceholder title="Login / Register" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
