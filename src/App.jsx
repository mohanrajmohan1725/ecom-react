import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import { useEffect } from "react";
import { loadTheme } from "./utils/theme";
import "./index.css";

function App() {

  // Load dark/light theme on startup
  useEffect(() => {
    loadTheme();
  }, []);

  // ❗ Hide category bar on pages where it is NOT needed
  const hideCategoryBarPages = ["/login", "/signup", "/profile", "/checkout", "/order-success"];
  const currentPath = window.location.pathname;
  const showCategoryBar = !hideCategoryBarPages.includes(currentPath);

  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Category Bar (Flipkart style) */}
      {showCategoryBar && <CategoryBar />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
