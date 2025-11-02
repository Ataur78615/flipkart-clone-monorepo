import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import BecomeASellerScreen from './screens/BecomeASellerScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import CustomerCareScreen from './screens/CustomerCareScreen';
import DownloadAppScreen from './screens/DownloadAppScreen';
import TrackOrderScreen from './screens/TrackOrderScreen';
import ReturnPolicyScreen from './screens/ReturnPolicyScreen';
import FAQScreen from './screens/FAQScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/seller" element={<BecomeASellerScreen />} />
            <Route path="/notifications" element={<NotificationScreen />} />
            <Route path="/customercare" element={<CustomerCareScreen />} />
            <Route path="/downloadapp" element={<DownloadAppScreen />} />
            <Route path="/trackorder" element={<TrackOrderScreen />} />
            <Route path="/returnpolicy" element={<ReturnPolicyScreen />} />
            <Route path="/faq" element={<FAQScreen />} />
            <Route path="/helpcenter" element={<HelpCenterScreen />} />
            <Route path="" element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Route>

            {/* ---  ADMIN ROUTES  --- */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/productlist" element={<ProductListScreen />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            </Route>
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;