import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Your fixed login credentials
    const correctEmail = "mohanrajmohan1725@gmail.com";
    const correctPassword = "123456";

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem("auth", "true"); // Store login session
      alert("Login successful!");
      navigate("/"); // Go to home page
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded outline-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Login
        </button>

        {/* Signup Redirect */}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
