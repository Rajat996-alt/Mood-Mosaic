import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#faf6ef] border-b border-[#e6dccd] px-10 py-4 flex justify-between items-center">

      <h1 className="font-semibold text-lg">
        MoodMosaic
      </h1>

      <div className="flex gap-6 text-sm">

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/journal/new">Create Journal</Link>
        <Link to="/journals">My Journals</Link>
        <Link to="/canvas">Canvas Gallery</Link>
        <Link to="/games">Mini Games</Link>

        <button
          onClick={logout}
          className="text-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}