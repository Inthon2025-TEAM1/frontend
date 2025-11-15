import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService";
import { useEffect } from "react";
import { authFetch } from "../api/auth";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              홈
            </Link>
            <Link
              to="#testimonials"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              사용자 이야기
            </Link>

            <Link
              to="/rewards"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              리워드
            </Link>
            <Link
              to="/store"
              className="text-gray-700 hover:text-indigo-600 font-medium"
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
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>

          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                로그인
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
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
