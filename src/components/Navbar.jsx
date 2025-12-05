import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { FaUserCircle, FaSignInAlt, FaSearch } from "react-icons/fa";

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
    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Mohan-Shop
        </Link>

        {/* Search — center */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mx-auto w-1/3"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full outline-none text-gray-100 dark:text-gray-200"
          />
          <button type="submit" className="text-gray-600 dark:text-gray-300">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu — RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/products" className="nav-link">
            Products
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative nav-link">
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative nav-link">
            Cart
            <span className="badge">{totalItems}</span>
          </Link>

          {/* Profile / Login */}
          <div className="relative">
            {!isLoggedIn ? (
              <Link to="/login" className="nav-link text-2xl">
                <FaSignInAlt />
              </Link>
            ) : (
              <div className="relative group">
                <button className="text-3xl text-gray-700 dark:text-gray-300 ml-1">
                  <FaUserCircle />
                </button>

                {/* Dropdown */}
                <div className="dropdown">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-red-600 dark:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 dark:text-gray-300 text-2xl ml-auto"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-2 mb-4 w-full"
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500"
            />

            <button
              type="submit"
              className="text-gray-600 dark:text-gray-300 text-xl pl-2"
            >
              <FaSearch />
            </button>
          </form>

          <Link to="/" className="mobile-item" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link
            to="/products"
            className="mobile-item"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="mobile-item relative"
            onClick={() => setOpen(false)}
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="mobile-badge bg-red-500">{wishlistCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className="mobile-item relative"
            onClick={() => setOpen(false)}
          >
            Cart
            <span className="mobile-badge">{totalItems}</span>
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="mobile-item"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="mobile-item"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="mobile-item"
                onClick={() => setOpen(false)}
              >
                Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="mobile-logout"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
