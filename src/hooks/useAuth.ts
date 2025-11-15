// src/hooks/useAuth.ts
import { useState } from "react";
import { useAuth as useAuthContext } from "../contexts/AuthContext";
import * as authService from "../services/authService";

/**
 * Custom hook for authentication operations
 * Wraps AuthContext and authService for convenient usage in components
 */
export function useAuth() {
  const { user, loading, error } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const googleLogin = async () => {
    setIsSubmitting(true);
    try {
      const user = await authService.loginWithGoogle();
      const token = await user.getIdToken();
      return { user, token };
    } catch (err) {
      console.error("Google 로그인 실패:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const user = await authService.loginWithEmail(email, password);
      return user;
    } catch (err) {
      console.error("이메일 로그인 실패:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const user = await authService.registerWithEmail(email, password);
      return user;
    } catch (err) {
      console.error("회원가입 실패:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    setIsSubmitting(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error("로그아웃 실패:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    loading,
    error,
    isSubmitting,
    googleLogin,
    loginWithEmail,
    register,
    logout,
  };
}
