import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaTicketAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Global Coupons List
const coupons = [
  { code: "MOHAN10", type: "percentage", value: 10, minPurchase: 500 },
  { code: "GET100", type: "flat", value: 100, minPurchase: 800 },
  { code: "FREESHIP", type: "free_shipping", value: 50, minPurchase: 0 },
];

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Cart Total
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Load saved coupon from Offer page
  useEffect(() => {
    try {
      const saved = localStorage.getItem("selected_coupon");
      if (saved) {
        const coupon = JSON.parse(saved);
        setAppliedCoupon(coupon);
        setCouponCode(coupon.code);
      }
    } catch (err) {
      console.error("Coupon load error", err);
    }
  }, []);

  // Calculate Discount
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? (totalPrice * appliedCoupon.value) / 100
      : appliedCoupon.type === "flat"
      ? appliedCoupon.value
      : appliedCoupon.type === "free_shipping"
      ? appliedCoupon.value
      : 0
    : 0;

  const finalTotal = Math.max(totalPrice - discount, 0);

  // Apply Coupon
  const applyCoupon = () => {
    const found = coupons.find(
      (c) =>
        c.code === couponCode.toUpperCase() &&
        totalPrice >= c.minPurchase
    );

    if (!found) {
      toast.error("Invalid Coupon OR Minimum Amount Not Met!");
      return;
    }

    setAppliedCoupon(found);
    localStorage.setItem("selected_coupon", JSON.stringify(found));

    toast.success(`Coupon Applied: ${found.code}`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    localStorage.removeItem("selected_coupon");
    toast("Coupon removed!");
  };

  // Empty Cart UI
  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-xl dark:text-gray-200">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 dark:text-gray-100">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaShoppingCart /> Your Cart
      </h1>

      {/* ===================== CART ITEMS LIST ===================== */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border-gray-700 shadow"
          >
            {/* PRODUCT INFO */}
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

            {/* Quantity Buttons */}
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

      {/* ===================== COUPON SECTION ===================== */}
      <div className="mt-8 p-4 border dark:border-gray-700 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <FaTicketAlt className="text-yellow-500" /> Apply Coupon
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
          />

          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Apply
          </button>
        </div>

        {appliedCoupon && (
          <div className="mt-3 flex justify-between items-center bg-green-100 dark:bg-green-700 p-2 rounded">
            <p className="font-bold text-green-700 dark:text-white">
              {appliedCoupon.code} Applied ✓
            </p>
            <button
              onClick={removeCoupon}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* ===================== TOTAL & CHECKOUT ===================== */}
      <div className="flex justify-between items-center mt-10">

        {/* Continue Shopping */}
        <Link
          to="/products"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft /> Continue Shopping
        </Link>

        {/* TOTAL */}
        <div className="text-right">
          <h2 className="text-xl font-semibold">
            Subtotal: ₹{totalPrice.toFixed(2)}
          </h2>

          {appliedCoupon && (
            <h2 className="text-lg text-green-600 dark:text-green-400 font-semibold">
              Discount: -₹{discount.toFixed(2)}
            </h2>
          )}

          <h2 className="text-2xl font-bold mt-2">
            Total: ₹{finalTotal.toFixed(2)}
          </h2>

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
