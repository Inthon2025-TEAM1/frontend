import { Link } from "react-router-dom";

export function ParentHeader() {
  return (
    <header className="shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white">EduPlay</h1>
          </Link>

          {/* Navigation Links */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/parent/dashboard"
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              자녀 관리
            </Link>

            <Link
              to="/parent/learning-report"
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              학습 리포트
            </Link>

            <Link
              to="/parent/mentoring/list"
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              멘토링 목록
            </Link>

            <Link
              to="/parent/payment"
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              이용권
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="font-medium transition-colors text-white/90 hover:text-white"
            >
              프로필
            </Link>
            <button className="px-6 py-2 font-semibold text-purple-600 transition-colors bg-white rounded-full shadow-sm hover:bg-purple-50">
              로그아웃
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
