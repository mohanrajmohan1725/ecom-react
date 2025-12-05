import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "cod", // cod | online
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // ----------- CART EMPTY CHECK -----------
  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
    }
  }, [cart, navigate]);

  // ----------- AUTO-FILL ADDRESS FROM PROFILE -----------
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setForm((prev) => ({
          ...prev,
          name: savedUser.name || "",
          email: savedUser.email || "",
          phone: savedUser.phone || "",
          address: savedUser.address || "",
        }));
      }
    } catch (err) {
      console.error("User parse error:", err);
    }
  }, []);

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ----------- SAVE ORDER FUNCTION -----------
  const saveOrder = () => {
    const order = {
      orderId: Math.floor(Math.random() * 900000 + 100000),
      date: new Date().toLocaleString(),
      items: cart,
      customer: form,
      total: totalPrice.toFixed(2),
      paymentMethod: form.payment,
      status: form.payment === "cod" ? "Pending - COD" : "Paid",
    };

    let previousOrders = [];
    try {
      const raw = localStorage.getItem("orders_v1");
      previousOrders = raw ? JSON.parse(raw) : [];
    } catch {}

    localStorage.setItem("orders_v1", JSON.stringify([...previousOrders, order]));
    localStorage.setItem("last_order_v1", JSON.stringify(order));
    localStorage.removeItem("cart_v1");
  };

  // ----------- COD ORDER -----------
  const handleCOD = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill all fields!");
      return;
    }

    saveOrder();
    toast.success("Order placed with Cash on Delivery!");
    navigate("/order-success");
  };

  // ----------- RAZORPAY PAYMENT -----------
  const handleOnlinePayment = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxx",
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "Mohan-Shop",
      description: "Order Payment",
      handler: function (response) {
        console.log("Razorpay Success:", response);
        saveOrder();
        toast.success("Payment Successful!");
        navigate("/order-success");
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#2563EB",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = () => {
    form.payment === "cod" ? handleCOD() : handleOnlinePayment();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* ---------- BILLING DETAILS ---------- */}
        <div className="p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow">
          <h2 className="text-xl font-bold mb-4">Billing Details</h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
            />

            <textarea
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
              className="w-full border p-2 h-24 rounded dark:bg-gray-700 dark:border-gray-600"
            ></textarea>

            {/* PAYMENT METHOD */}
            <div>
              <label className="font-semibold">Payment Method</label>

              <select
                value={form.payment}
                onChange={(e) => onChange("payment", e.target.value)}
                className="w-full border p-2 rounded mt-1 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="cod">Cash on Delivery (COD)</option>
                <option value="online">Online Payment (Razorpay)</option>
              </select>
            </div>

          </div>
        </div>

        {/* ---------- ORDER SUMMARY ---------- */}
        <div className="p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <p className="w-2/3">
                  {item.title}
                  <span className="text-gray-500"> × {item.qty}</span>
                </p>
                <p>₹{(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <h2 className="text-2xl font-bold">
            Total: ₹{totalPrice.toFixed(2)}
          </h2>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {form.payment === "cod"
              ? "Place Order (COD)"
              : "Pay Now with Razorpay"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;
