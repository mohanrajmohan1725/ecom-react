import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("last_order_v1");

    if (!saved) {
      // No order → redirect
      navigate("/");
      return;
    }

    try {
      setOrder(JSON.parse(saved));
    } catch (err) {
      console.error("Order parse error:", err);
      navigate("/");
    }
  }, [navigate]);

  if (!order) {
    return (
      <div className="text-center py-32 text-xl dark:text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center dark:text-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Successful!
      </h1>

      <p className="text-lg mb-6">
        Thank you for your order. Your payment was successfully processed.
      </p>

      <div className="border rounded-lg p-6 shadow dark:bg-gray-800 dark:border-gray-700 text-left">
        <h2 className="text-xl font-bold mb-3">Order Details</h2>

        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li className="flex justify-between border-b pb-2" key={item.id}>
              <span>{item.title} × {item.qty}</span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mt-6">
          Total: ₹{order.total}
        </h2>
      </div>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderSuccess;
