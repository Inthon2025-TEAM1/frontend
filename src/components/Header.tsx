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
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
          </Link>



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
