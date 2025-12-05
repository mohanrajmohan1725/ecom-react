import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaMinus, FaPlus, FaTrash, FaArrowLeft, FaTicketAlt } from "react-icons/fa";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const discount = 0; // You can add logic later
  const finalTotal = totalPrice - discount;

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-xl dark:text-gray-200">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 dark:text-gray-100">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaShoppingCart /> Your Cart
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 shadow"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="p-2 bg-gray-300 dark:bg-gray-600 rounded"
              >
                <FaMinus />
              </button>

              <span className="font-bold">{item.qty}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="p-2 bg-gray-300 dark:bg-gray-600 rounded"
              >
                <FaPlus />
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-400 text-xl"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* ---------------- COUPON SECTION ---------------- */}
      <div className="mt-8 p-4 border dark:border-gray-700 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FaTicketAlt className="text-yellow-500" /> Apply Coupon
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Apply
          </button>
        </div>
      </div>

      {/* -------------- TOTAL & CHECKOUT SECTION -------------- */}
      <div className="flex justify-between items-center mt-10">

        {/* Continue Shopping */}
        <Link
          to="/products"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft /> Continue Shopping
        </Link>

        {/* Totals + Checkout Button */}
        <div className="text-right">
          <h2 className="text-xl font-semibold">Subtotal: ₹{totalPrice.toFixed(2)}</h2>
          <h2 className="text-lg text-green-600 dark:text-green-400 font-semibold">
            Discount: ₹{discount.toFixed(2)}
          </h2>
          <h2 className="text-2xl font-bold mt-2">Total: ₹{finalTotal.toFixed(2)}</h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4 inline-block"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
