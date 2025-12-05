import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist ❤️</h1>

      {/* If empty */}
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-xl text-center">
          No items in wishlist 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mb-3"
              />

              <h2 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                {product.title}
              </h2>

              <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;
