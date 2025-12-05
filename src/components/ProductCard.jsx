import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-lg transition relative">

      {/* ❤️ Wishlist Button */}
      <button
        onClick={() =>
          isWishlisted
            ? removeFromWishlist(product.id)
            : addToWishlist(product)
        }
        className="absolute top-3 right-3 text-xl"
      >
        <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} />
      </button>

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain mb-4"
      />

      {/* Title */}
      <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
        {product.title}
      </h2>

      {/* Price */}
      <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
        ₹{product.price}
      </p>

      {/* Rating */}
      <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold mt-1">
        ⭐ {product.rating?.rate} / 5
      </p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Link
          to={`/product/${product.id}`}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 text-gray-800 dark:text-gray-200"
        >
          View
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
