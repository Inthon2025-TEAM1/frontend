import { Link } from "react-router-dom";

export function Header() {
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
            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium">
              서비스
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 font-medium">
              사용자 이야기
            </a>
            <a href="#support" className="text-gray-700 hover:text-indigo-600 font-medium">
              지원
            </a>
            <Link to="/rewards" className="text-gray-700 hover:text-indigo-600 font-medium">
              보상
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
