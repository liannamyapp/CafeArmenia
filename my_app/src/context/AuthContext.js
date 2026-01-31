import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    return JSON.parse(localStorage.getItem("dark")) ?? false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const email = localStorage.getItem("adminEmail");
    const role = localStorage.getItem("adminRole");
    if (token && email) setAdmin({ email, token, role });
  }, []);

  const login = ({ token, email, role }) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminRole", role);
    setAdmin({ token, email, role });
  };

  const logout = () => {
    localStorage.clear();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, login, logout, open, setOpen, dark, setDark, isMenuOpen, setIsMenuOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
};
