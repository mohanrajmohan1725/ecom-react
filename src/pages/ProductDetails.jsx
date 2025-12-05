import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  const isWishlisted = wishlist.some((item) => item.id === Number(id));

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-xl text-gray-500 mt-10">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-xl text-red-500 mt-10">
        Product not found!
      </p>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 dark:text-gray-100">

      {/* Image Section */}
      <div className="relative">
        {/* Wishlist Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 left-4 text-3xl"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain bg-white rounded-lg shadow"
        />
      </div>

      {/* Details Section */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-2xl text-blue-600 font-semibold mt-3">
          ₹{product.price}
        </p>

        <p className="text-yellow-600 font-semibold mt-2">
          ⭐ {product.rating?.rate} / 5 ({product.rating?.count} reviews)
        </p>

        <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6 flex gap-4">
          {/* Add to Cart Button (Animated) */}
          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded text-white transition-all duration-300 
            ${added ? "bg-green-600 scale-110" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {added ? "✔ Added to Cart" : "Add to Cart"}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="px-6 py-3 rounded border border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
          >
            {isWishlisted ? "Remove ❤️" : "Add to Wishlist ❤️"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
