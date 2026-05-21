/* eslint-disable react-hooks/exhaustive-deps */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  authAPI,
} from "../api/api";

// ============================================================
// CONTEXT
// ============================================================
const AuthContext =
  createContext();

// ============================================================
// PROVIDER
// ============================================================
export function AuthProvider({

  children,

}) {

  // ==========================================================
  // STATE
  // ==========================================================
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // FETCH PROFILE
  // ==========================================================
  const fetchProfile =
    async () => {

      try {

        const response =
          await authAPI.getProfile();

        setUser(
          response.data
        );

      } catch (error) {

        console.error(
          "Profile fetch failed:",
          error
        );

        localStorage.removeItem(
          "token"
        );

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      fetchProfile();

    } else {

      setLoading(false);
    }

  }, []);

  // ==========================================================
  // SIGNUP
  // ==========================================================
  const signup =
    async (formData) => {

      try {

        const response =
          await authAPI.signup(
            formData
          );

        localStorage.setItem(
          "token",
          response.token
        );

        setUser(
          response.user
        );

        return {
          success: true,
        };

      } catch (error) {

        console.error(error);

        return {

          success: false,

          error:
            error.response?.data
              ?.error ||

            "Signup failed",
        };
      }
    };

  // ==========================================================
  // LOGIN
  // ==========================================================
  const login =
    async (formData) => {

      try {

        const response =
          await authAPI.login(
            formData
          );

        localStorage.setItem(
          "token",
          response.token
        );

        setUser(
          response.user
        );

        return {
          success: true,
        };

      } catch (error) {

        console.error(error);

        return {

          success: false,

          error:
            error.response?.data
              ?.error ||

            "Login failed",
        };
      }
    };

  // ==========================================================
  // LOGOUT
  // ==========================================================
  const logout =
    () => {

      localStorage.removeItem(
        "token"
      );

      setUser(null);
    };

  // ==========================================================
  // VALUES
  // ==========================================================
  const value = {

    user,

    loading,

    signup,

    login,

    logout,

    isAuthenticated:
      !!user,
  };

  // ==========================================================
  // PROVIDER
  // ==========================================================
  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================
export function useAuth() {

  return useContext(
    AuthContext
  );
}