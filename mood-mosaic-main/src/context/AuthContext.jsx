import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token) {
      setUser({ token });
      setRole(savedRole);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const data = response.data.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("organizationId", data.organizationId);

    setUser({ token: data.token });
    setRole(data.role);

    return data;
  };

  const register = async (payload) => {
    const response = await api.post("/api/auth/register", payload);

    const data = response.data.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("organizationId", data.organizationId);

    setUser({ token: data.token });
    setRole(data.role);

    return data;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};