import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Normalize ID comparison
  const idEq = (a, b) => String(a) === String(b);

  // ➕ Add to cart
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.warn("Invalid product:", product);
      return;
    }

    setCart((prev) => {
      const exists = prev.find((item) => idEq(item.id, product.id));

      if (exists) {
        toast.success("Increased quantity");
        return prev.map((item) =>
          idEq(item.id, product.id)
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      toast.success("Added to cart");
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
  };

  // ➕ Increase
  const increaseQty = (id) => {
    toast.success("Quantity +1");
    setCart((prev) =>
      prev.map((item) =>
        idEq(item.id, id)
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  // ➖ Decrease
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          idEq(item.id, id)
            ? { ...item, qty: Math.max((item.qty || 1) - 1, 0) }
            : item
        )
        .filter((i) => i.qty > 0)
    );

    toast.error("Quantity decreased");
  };

  // ❌ Remove
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => !idEq(item.id, id)));
    toast.error("Removed from cart");
  };

  // Debug helper
  const debug = () => console.log("CART:", cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        debug,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
