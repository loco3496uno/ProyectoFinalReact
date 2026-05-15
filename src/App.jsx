import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import Shop      from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart      from './pages/Cart'
import Checkout  from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Wishlist  from './pages/Wishlist'
import Profile   from './pages/Profile'
import './App.css'

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/shop"          element={<Shop />} />
              <Route path="/product/:id"   element={<ProductDetail />} />
              <Route path="/cart"          element={<Cart />} />
              <Route path="/checkout"      element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/wishlist"      element={<Wishlist />} />
              <Route path="/profile"       element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  )
}
