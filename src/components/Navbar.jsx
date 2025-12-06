import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaUserCircle, FaSignInAlt, FaSearch, FaHeart } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;
  const isLoggedIn = localStorage.getItem("auth") === "true";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900  sticky top-0 z-50">
      {/* DESKTOP NAV */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-4 py-3">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Mohan-Shop
        </Link>

        {/* CENTER SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 ml-10 flex-1 max-w-xl"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-700 dark:text-gray-200 text-sm outline-none"
          />
          <button type="submit" className="ml-3">
            <FaSearch className="text-blue-600 text-lg" />
          </button>
        </form>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-6 text-xl">
          {/* WISHLIST */}
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link to="/cart" className="relative">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          {!isLoggedIn ? (
            <Link to="/login">
              <FaSignInAlt />
            </Link>
          ) : (
            <div className="relative group">
              <FaUserCircle className="cursor-pointer" />

              {/* DROPDOWN */}
              <div className="dropdown">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/orders" className="dropdown-item">
                  Orders
                </Link>
                <button
                  className="dropdown-item text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* HAMBURGER */}
          {/* <button onClick={() => setOpen(!open)} className="text-2xl">
            ☰
          </button> */}
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          Mohan-Shop
        </Link>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-4 text-xl">
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-red-500" />
          </Link>
          <Link to="/cart" className="relative">
            🛒
          </Link>
          <button onClick={() => setOpen(!open)} className="text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          <button>
            <FaSearch />
          </button>
        </form>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-item">
            Home
          </Link>
          <Link to="/products" className="mobile-item">
            Products
          </Link>
          <Link to="/wishlist" className="mobile-item">
            Wishlist
          </Link>
          <Link to="/cart" className="mobile-item">
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
