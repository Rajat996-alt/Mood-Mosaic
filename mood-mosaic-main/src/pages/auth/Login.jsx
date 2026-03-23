import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      const token = response.data.data.token;
      const role = response.data.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-[#f6f0e6] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-8 shadow-sm">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
          />

          <button
            type="submit"
            className="bg-[#6b7a3a] text-white py-2 rounded-lg hover:bg-[#55622e] transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-[#6b6257]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#6b7a3a] hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}