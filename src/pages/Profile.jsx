import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle, FaUser, FaBox, FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";

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

  // Load user
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, [navigate]);

  // Update form field
  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Upload photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const handleUpdate = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated Successfully!");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900 dark:text-gray-100 px-4 pb-24 pt-16 md:pt-28">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

        {/* ---------- LEFT SIDEBAR ---------- */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">

          {/* Photo */}
          <div className="text-center">
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-500"
              />
            ) : (
              <FaUserCircle className="text-6xl mx-auto text-gray-400 dark:text-gray-300" />
            )}

            {/* Upload button */}
            <label className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer text-sm">
              Change Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            <h2 className="text-xl font-semibold mt-3">{user.name || "User"}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
          </div>

          {/* Menu */}
          <div className="space-y-2 pt-4 border-t dark:border-gray-700">

            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded text-left 
                ${activeTab === "overview" ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              <FaUser size={18} /> Overview
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded text-left 
                ${activeTab === "address" ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              <FaHome size={18} /> Address
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded text-left 
                ${activeTab === "orders" ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              <FaBox size={18} /> Orders
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded text-left 
                ${activeTab === "settings" ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              <FaCog size={18} /> Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded text-left text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <FaSignOutAlt size={18} /> Logout
            </button>
          </div>

        </aside>

        {/* ---------- RIGHT CONTENT ---------- */}
        <main className="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6">

          {/* OVERVIEW */}
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

          {/* ADDRESS */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Address Details</h2>

              <textarea
                value={user.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border p-3 h-32 rounded dark:bg-gray-700 dark:border-gray-600"
              ></textarea>

              <button
                onClick={handleUpdate}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Save Address
              </button>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
              <p className="text-gray-500 dark:text-gray-400">You have no orders yet.</p>
            </div>
          )}

          {/* SETTINGS */}
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
