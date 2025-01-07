import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
  logout as apiLogout,
  linkedInLogin as apiLinkedInLogIn,
} from "../services/api/api";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const userData = await getCurrentUser();
        console.log("userData=====");
        console.log(userData);
        
        if (userData.data.user) {
          setUser(userData.data.user);
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, []);

  const refresh = async () => {
    try {
      const userData = await getCurrentUser();
      console.log("userData=====");
      console.log(userData);
      
      if (userData.data.user) {
        setUser(userData.data.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const response = await apiLogin(userData);
      if (response.data.user) {
        setUser(response.data.user);
      }
      return;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const linkedInLogin = async () => {
    try {
      const response = await apiLinkedInLogIn();
      const { user } = response.data;
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
      const { user } = response.data;
      setUser(user);
      return user;
    } catch (error) {
      console.log(error)
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    const userRole = user.role;
    setUser(null);
    apiLogout(userRole);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
    linkedInLogin,
    refresh
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
