import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import MenuPage from './pages/Menu.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CartPage from './pages/Cart.jsx';
import Admin from './components/Admin.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/track" element={<OrderTracking />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
