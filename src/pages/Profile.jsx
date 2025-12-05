import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaUserCircle,
  FaUser,
  FaBox,
  FaHome,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    photo: "",
  });

  const [orders, setOrders] = useState([]);

  // -------------------------
  // Load User + Orders
  // -------------------------
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) setUser(savedUser);

      const savedOrders = JSON.parse(localStorage.getItem("orders_v1")) || [];
      setOrders(savedOrders);
    } catch (err) {
      console.error("Profile parse error:", err);
    }
  }, [navigate]);

  // -------------------------
  // Update user fields
  // -------------------------
  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // -------------------------
  // Upload Photo
  // -------------------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, photo: reader.result };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  };

  // -------------------------
  // Save Profile
  // -------------------------
  const handleUpdate = () => {
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Profile updated!");
  };

  // -------------------------
  // Logout
  // -------------------------
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="pt-28 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 px-4 pb-10">
      <div className="max-w-6xl mx-auto flex gap-6">

        {/* =============================
             LEFT SIDEBAR
        ============================== */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">

          <div className="text-center">
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-500 shadow-md"
              />
            ) : (
              <FaUserCircle className="text-6xl mx-auto text-gray-400 dark:text-gray-300" />
            )}

            <label className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer text-sm">
              Change Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            <h2 className="text-xl font-semibold mt-3">{user.name || "User"}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
          </div>

          {/* SIDEBAR MENU */}
          <div className="space-y-2 pt-4 border-t dark:border-gray-700">

            {[
              { id: "overview", icon: <FaUser size={18} />, label: "Overview" },
              { id: "address", icon: <FaHome size={18} />, label: "Address" },
              { id: "orders", icon: <FaBox size={18} />, label: "Orders" },
              { id: "settings", icon: <FaCog size={18} />, label: "Settings" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded text-left transition
                  ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon} {item.label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded text-left text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <FaSignOutAlt size={18} /> Logout
            </button>
          </div>

        </aside>

        {/* =============================
             RIGHT CONTENT AREA
        ============================== */}
        <main className="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6">

          {/* ----------------- OVERVIEW ----------------- */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdate}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ----------------- ADDRESS TAB ----------------- */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Address Details</h2>

              <textarea
                value={user.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border p-3 h-32 rounded dark:bg-gray-700 dark:border-gray-600"
              />

              <button
                onClick={handleUpdate}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Save Address
              </button>
            </div>
          )}

          {/* ----------------- ORDERS TAB ----------------- */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

              {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  You have no orders yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="p-4 border rounded dark:border-gray-700 dark:bg-gray-700"
                    >
                      <h3 className="font-bold text-lg">
                        Order #{order.orderId}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {order.date}
                      </p>

                      <p className="mt-2 font-semibold">
                        Total: ₹{order.total}
                      </p>

                      <p className="text-sm text-gray-400">
                        Payment: {order.paymentMethod}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----------------- SETTINGS TAB ----------------- */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
                Delete Account
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Profile;
