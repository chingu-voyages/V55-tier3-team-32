import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(null);

  const base64UrlDecode = useCallback((input: string): string => {
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  }, []);

  const decodeToken = useCallback((token: string | null) => {
    if (!token) return null;
    try {
      const payloadBase64Url = token.split(".")[1];
      const payloadJson = base64UrlDecode(payloadBase64Url);
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }, [base64UrlDecode]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/");
  }, [navigate]);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem("token");
    const payload = decodeToken(token);
    if (payload && payload.exp) {
      const expirationTime = payload.exp * 1000;
      if (Date.now() >= expirationTime) {
        logout();
      }
    }
  }, [decodeToken, logout]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.username) {
        setUsername(payload.username || "User");
      } else {
        logout();
      }
    }
  }, [decodeToken, logout]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(interval);
  }, [checkTokenExpiration]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsLoggedIn(true);

    const payload = decodeToken(token);
    if (payload && payload.username) {
      setUsername(payload.username || "User");
    } else {
      logout();
    }
    navigate("/");
  }, [decodeToken, logout, navigate]);

  return { isLoggedIn, username, login, logout };
};