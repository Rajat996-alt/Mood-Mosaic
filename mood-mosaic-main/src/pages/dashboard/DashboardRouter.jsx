import { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardRouter() {

  const [role, setRole] = useState(null);

  useEffect(() => {

    const storedRole = localStorage.getItem("role");

    setRole(storedRole);

  }, []);

  if (!role) return <div>Loading...</div>;

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;

}