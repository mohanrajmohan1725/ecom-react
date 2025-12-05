import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "react-hot-toast"; // Toast provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <WishlistProvider>
    <CartProvider>
      <App />

      {/* Toast Notification Provider */}
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider>
  </WishlistProvider>
);
