import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService";
import { useEffect, useState } from "react";
import { authFetch, fetchCandyCount } from "../api/auth";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [candyCount, setCandyCount] = useState<number>(0);

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

  useEffect(() => {
    const loadCandyCount = async () => {
      if (user) {
        try {
          const data = await fetchCandyCount();
          setCandyCount(data.candy);
        } catch (error) {
          console.error("Failed to fetch candy count:", error);
        }
      }
    };
    loadCandyCount();
  }, [user]);
  
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
      <nav className="px-2 mx-auto max-w-full sm:px-10 lg:px-10 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">

          {user ? (
            <>
              <span className="hidden md:inline text-gray-700">안녕하세요, {user.displayName}님</span>
              <div className="bg-indigo-500 h-9 relative rounded-lg shadow-sm shrink-0 w-auto px-3 flex items-center gap-1.5">
                <div className="relative shrink-0 size-4">
                  <img alt="Candy" className="block max-w-none size-full" src="/images/candy-icon.png" />
                </div>
                <div className="h-5 relative shrink-0 w-auto">
                  <p className="font-semibold leading-5 text-sm text-white whitespace-pre">
                    {candyCount}
                  </p>
                </div>
              </div>
              <button
                className="font-medium text-gray-700 hover:text-indigo-600 h-9 relative rounded-lg border border-gray-300 shadow-sm shrink-0 w-auto px-3 flex items-center justify-center transition-all hover:border-indigo-500"
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
