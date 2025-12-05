import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products";

import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search") || "";

  const [search, setSearch] = useState(query);

  // Filters
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState(""); // low-high or high-low

  const [filtered, setFiltered] = useState(productsData);

  // Available categories
  const categories = ["all", "fashion", "electronics", "furniture"];

  const applyFilters = () => {
    let result = [...productsData];

    // 🔍 Search filter
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷 Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // 💰 Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // 🔽 Sorting
    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  };

  // Run filters when values change
  useEffect(() => {
    applyFilters();
  }, [search, category, priceRange, sortOrder]);

  // Run when search query changes from Navbar
  useEffect(() => {
    setSearch(query);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 dark:text-gray-100 grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* ========== SIDEBAR FILTERS ========== */}
      <div className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-fit">

        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* 🔍 Search */}
        <div className="mb-4">
          <label className="font-semibold">Search</label>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* 🏷 Category Filter */}
        <div className="mb-4">
          <label className="font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* 💰 Price Filter */}
        <div className="mb-4">
          <label className="font-semibold">
            Price: ₹0 - ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
        </div>

        {/* 🔽 Sort */}
        <div className="mb-4">
          <label className="font-semibold">Sort By</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Default</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* ========== PRODUCT LIST ========== */}
      <div className="md:col-span-3">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        {filtered.length === 0 ? (
          <p className="text-center text-xl text-gray-500 dark:text-gray-300">
            No products found 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
