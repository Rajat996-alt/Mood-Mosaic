import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {

  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState(null);
  const [registered, setRegistered] = useState(false);

  const copyInviteCode = () => {
  navigator.clipboard.writeText(inviteCode);
  alert("Invite code copied!");
};

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
    inviteCode: "",
    organizationName: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    email: formData.email,
    password: formData.password,
    role: formData.role
  };

  if (formData.role === "ADMIN") {
    payload.organizationName = formData.organizationName;
  }

  if (formData.role === "USER" && formData.inviteCode) {
    payload.inviteCode = formData.inviteCode;
  }

  try {

    const response = await axios.post(
  "http://localhost:8080/api/auth/register",
  payload
);

const code = response.data.data?.inviteCode;

if (code) {
  setInviteCode(code);
}

setRegistered(true);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );

  }
};

  return (
    <div className="min-h-screen bg-[#f6f0e6] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#faf6ef] border border-[#e6dccd] rounded-xl p-8 shadow-sm">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Invite Code for USER */}
          {formData.role === "USER" && (
            <input
              type="text"
              name="inviteCode"
              placeholder="Invite Code (optional)"
              value={formData.inviteCode}
              onChange={handleChange}
              className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
            />
          )}

          {/* Organization Name for ADMIN */}
          {formData.role === "ADMIN" && (
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              className="border border-[#e6dccd] rounded-lg px-4 py-2 bg-white"
            />
          )}

          <button
            type="submit"
            className="bg-[#6b7a3a] text-white py-2 rounded-lg hover:bg-[#55622e] transition"
          >
            Register
          </button>

        </form>

        {registered && (
  <div className="mt-6 text-center">

    {inviteCode && (
      <div className="bg-[#f1eadf] border border-[#e6dccd] rounded-lg p-4 mb-4">

        <p className="text-sm mb-2 text-[#6b6257]">
          Share this invite code with your users
        </p>

        <div className="flex justify-center gap-3 items-center">

          <span className="font-semibold text-lg">
            {inviteCode}
          </span>

          <button
            onClick={copyInviteCode}
            className="bg-[#6b7a3a] text-white px-3 py-1 rounded-md text-sm hover:bg-[#55622e]"
          >
            Copy
          </button>

        </div>

      </div>
    )}

    <Link
      to="/login"
      className="bg-[#6b7a3a] text-white px-6 py-2 rounded-lg hover:bg-[#55622e]"
    >
      Go to Login
    </Link>

  </div>
)}

        <p className="text-sm text-center mt-6 text-[#6b6257]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6b7a3a] hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}