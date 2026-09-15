import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/me");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    return data.user;
  };

  const register = async ({ fullName, email, phoneNumber, password }) => {
    // No session is created by the backend on register anymore — the
    // account must be verified and then logged in separately. Deliberately
    // NOT calling setUser here; doing so would make the app think someone
    // is logged in when no session cookie actually exists.
    const { data } = await api.post("/auth/register", {
      fullName,
      email,
      phoneNumber,
      password,
    });
    return data;
  };

  const resendVerification = async ({ email }) => {
    const { data } = await api.post("/auth/resend-verification", { email });
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // Neither of these logs the user in — forgot-password only ever
  // triggers an email; reset-password requires a fresh login afterward
  // since the backend deliberately kills all sessions on a successful
  // reset (see resetPassword in auth.controller.js).
  const forgotPassword = async ({ email }) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  };

  const resetPassword = async ({ token, password }) => {
    const { data } = await api.post("/auth/reset-password", { token, password });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, resendVerification, logout, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};