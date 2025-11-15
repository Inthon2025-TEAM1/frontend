import { Link } from "react-router-dom";

export function ParentHeader() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white">EduPlay</h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/parent/dashboard"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              자녀 관리
            </Link>

            <Link
              to="/parent/learning-report"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              학습 리포트
            </Link>

            <Link
              to="/parent/mentoring/list"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              멘토링 목록
            </Link>

            <Link
              to="/parent/payment"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              이용권
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              프로필
            </Link>
            <button className="px-6 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors shadow-sm">
              로그아웃
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
