import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Same coupons used in Cart
const coupons = [
  { code: "MOHAN10", type: "percentage", value: 10, minPurchase: 500 },
  { code: "GET100", type: "flat", value: 100, minPurchase: 800 },
  { code: "FREESHIP", type: "free_shipping", value: 50, minPurchase: 0 },
];

function Offers() {
  const navigate = useNavigate();

  const applyCoupon = (coupon) => {
    localStorage.setItem("selected_coupon", JSON.stringify(coupon));
    toast.success(`Coupon ${coupon.code} applied!`);
    navigate("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaTicketAlt className="text-yellow-500" /> Available Offers
      </h1>

      <div className="space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="border p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{coupon.code}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {coupon.type === "percentage" &&
                  `${coupon.value}% off on minimum ₹${coupon.minPurchase}`}
                {coupon.type === "flat" &&
                  `Flat ₹${coupon.value} off on minimum ₹${coupon.minPurchase}`}
                {coupon.type === "free_shipping" &&
                  `Free Shipping worth ₹${coupon.value}`}
              </p>
            </div>

            <button
              onClick={() => applyCoupon(coupon)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
