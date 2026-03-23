import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ adminOnly }) => {

  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;