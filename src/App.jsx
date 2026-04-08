import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import ReservationPage from './pages/ReservationPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import CreateOrderPage from './pages/CreateOrderPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import PreviousOrdersPage from './pages/PreviousOrdersPage'
import BlogPage from './pages/BlogPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
          <Route
            path="shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="pages" element={<Navigate to="/" replace />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route
            path="order"
            element={
              <ProtectedRoute>
                <CreateOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <PreviousOrdersPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
