import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaUserCircle,
  FaSignInAlt,
  FaSearch,
  FaHeart,
  FaStore,
} from "react-icons/fa";

function Navbar() {
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;
  const isLoggedIn = localStorage.getItem("auth") === "true";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">

      {/* ---------------- DESKTOP NAV ---------------- */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-4 py-3">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Mohan-Shop
        </Link>

        {/* DESKTOP SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 
          dark:border-gray-600 rounded-md px-4 py-2 mx-10 flex-1 max-w-xl"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-700 dark:text-gray-200 text-sm outline-none"
          />
          <button><FaSearch className="text-blue-600 text-lg" /></button>
        </form>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-8">

          {/* PRODUCTS */}
          <Link to="/products" className="flex flex-col items-center w-14">
            <FaStore className="text-blue-600 text-2xl" />
            <span className="text-[11px]">Products</span>
          </Link>

          {/* WISHLIST */}
          <Link to="/wishlist" className="relative flex flex-col items-center w-14">
            <FaHeart className="text-blue-600 text-2xl" />
            <span className="text-[11px]">Wishlist</span>

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px]
              w-5 h-5 flex justify-center items-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link to="/cart" className="relative flex flex-col items-center w-14">
            <span className="text-blue-600 text-2xl">🛒</span>
            <span className="text-[11px]">Cart</span>

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px]
              w-5 h-5 flex justify-center items-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          {!isLoggedIn ? (
            <Link to="/login" className="flex flex-col items-center w-14">
              <FaSignInAlt className="text-blue-600 text-2xl" />
              <span className="text-[11px]">Login</span>
            </Link>
          ) : (
            <div className="relative group flex flex-col items-center w-14">
              <FaUserCircle className="text-blue-600 text-2xl" />
              <span className="text-[11px]">Account</span>

              <div className="dropdown">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/orders" className="dropdown-item">Orders</Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("auth");
                    navigate("/login");
                  }}
                  className="dropdown-item text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- MOBILE TOP NAV (Logo + Search only) ---------------- */}
      <div className="md:hidden px-4 py-3">

        {/* MOBILE LOGO */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Mohan-Shop
        </Link>

        {/* MOBILE SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="mt-3 flex items-center bg-gray-200 dark:bg-gray-800 rounded-full 
          px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          <button>
            <FaSearch className="text-blue-600" />
          </button>
        </form>

      </div>
    </nav>
  );
}

export default Navbar;
