import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaHome,
  FaStore,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

function BottomNav() {
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  // Pages where BottomNav should hide
  const hideOnPages = ["/login", "/signup", "/checkout", "/order-success"];
  if (hideOnPages.includes(location.pathname)) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t 
    dark:border-gray-700 shadow-lg flex justify-between px-6 py-2 z-50">

      {/* HOME */}
      <Link
        to="/"
        className="flex flex-col items-center text-gray-600 dark:text-gray-300"
      >
        <FaHome className="text-xl" />
        <span className="text-xs">Home</span>
      </Link>

      {/* PRODUCTS */}
      <Link
        to="/products"
        className="flex flex-col items-center text-gray-600 dark:text-gray-300"
      >
        <FaStore className="text-xl" />
        <span className="text-xs">Products</span>
      </Link>

      {/* WISHLIST */}
      <div className="relative">
        <Link
          to="/wishlist"
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <FaHeart className="text-xl" />
          <span className="text-xs">Wishlist</span>
        </Link>

        {/* WISHLIST BADGE */}
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px]
          w-4 h-4 flex justify-center items-center rounded-full">
            {wishlistCount}
          </span>
        )}
      </div>

      {/* CART */}
      <div className="relative">
        <Link
          to="/cart"
          className="flex flex-col items-center text-gray-600 dark:text-gray-300"
        >
          <FaShoppingCart className="text-xl" />
          <span className="text-xs">Cart</span>
        </Link>

        {/* CART BADGE */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px]
          w-4 h-4 flex justify-center items-center rounded-full">
            {totalItems}
          </span>
        )}
      </div>

      {/* PROFILE */}
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-600 dark:text-gray-300"
      >
        <FaUser className="text-xl" />
        <span className="text-xs">Account</span>
      </Link>
    </div>
  );
}

export default BottomNav;
