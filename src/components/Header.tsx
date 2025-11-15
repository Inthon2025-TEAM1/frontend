import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService";
import { useEffect, useState } from "react";
import axios from "axios";
import { authFetch } from "../api/auth";

export function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const getRole = async () => {
      console.log('aslfkjl')
      const res = await authFetch("/api/user/role", {method:"GET"})
      console.log(res, 'role');
    }
    if (user) {
      getRole();
    } 

  },[user]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
          </Link>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/dashboard"
              className="font-medium text-gray-700 hover:text-indigo-600"
            >
              홈
            </Link>


            <Link
              to="/rewards"
              className="font-medium text-gray-700 hover:text-indigo-600"
            >
              리워드
            </Link>
            <Link
              to="/store"
              className="font-medium text-gray-700 hover:text-indigo-600"
            >
              상점
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">

          {user ? (
            <>
              <span className="text-gray-700">안녕하세요, {user.displayName}님</span>
              <button
                className="font-medium text-gray-700 hover:text-indigo-600"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>

          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                로그인
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 font-semibold text-white transition-colors bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700"
              >
                회원가입
              </Link>
            </>

            )}
            
          </div>
        </div>
      </nav>
    </header>
  );
}
