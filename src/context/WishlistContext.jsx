import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wishlist_v1", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  // Normalize ID comparison
  const idEq = (a, b) => String(a) === String(b);

  // ➕ Add to wishlist
  const addToWishlist = (product) => {
    if (!product || !product.id) return;

    const exists = wishlist.find((i) => idEq(i.id, product.id));
    if (exists) {
      toast("Already in wishlist ❤️");
      return;
    }

    setWishlist((prev) => [
      ...prev,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    ]);

    toast.success("Added to wishlist ❤️");
  };

  // ❌ Remove item
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => !idEq(item.id, id)));
    toast.error("Removed from wishlist 💔");
  };

  // Debug helper
  const debug = () => console.log("WISHLIST:", wishlist);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        debug,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
