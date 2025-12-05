import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let savedOrders = [];

    try {
      const raw = localStorage.getItem("orders_v1");
      savedOrders = raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Order JSON Error:", err);
      savedOrders = [];
    }

    setOrders(savedOrders);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">My Orders</h1>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No orders found 🛒
            </p>
            <Link
              to="/products"
              className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border dark:border-gray-700 p-4 rounded-lg"
              >
                {/* Order Info */}
                <h2 className="text-lg font-bold dark:text-gray-200">
                  Order #{order.orderId}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Date: {order.date}
                </p>

                {/* ORDER PRODUCTS */}
                <div className="mt-4 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-3 dark:border-gray-700"
                    >
                      <img
                        src={item.image}
                        className="w-16 h-16 object-contain"
                        alt=""
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold dark:text-gray-200">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <p className="font-bold dark:text-gray-100">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ORDER TOTAL */}
                <p className="text-right mt-3 font-bold text-xl dark:text-gray-100">
                  Total: ₹{order.total}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
