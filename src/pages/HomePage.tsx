import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Header Navigation */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          어떻게 학습하고 싶으세요?
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          재미있는 문제풀이와 보상 시스템으로 학습하는 모든 내용을 마스터하세요.
          초등학생부터 학부모까지 함께하는 게이미피케이션 학습 플랫폼입니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            무료 회원 가입
          </Link>
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-lg"
          >
            선생님이신가요?
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">게임처럼 재미있게</h3>
            <p className="text-gray-700">
              문제를 풀 때마다 포인트를 획득하고,
              레벨을 올리며 성취감을 느껴보세요.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">보상 시스템</h3>
            <p className="text-gray-700">
              학습 목표를 달성하면 다양한 배지와
              보상을 받을 수 있어요.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">함께하는 학습</h3>
            <p className="text-gray-700">
              자녀의 학습 진도를 확인하고
              가족과 함께 성장해요.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          사용자들의 이야기
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 - Teacher */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-sm">
            <div className="text-4xl text-blue-600 mb-4">"</div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              EduPlay 도입 후 학생들의 학습 참여도가 5배나 상승하고
              학생들에게도 좋은 동기 부여가 되었습니다.
            </p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-indigo-200 mb-3 flex items-center justify-center text-3xl">
                👩‍🏫
              </div>
              <p className="font-semibold text-gray-900">C 초등학교 교사</p>
            </div>
          </div>

          {/* Testimonial 2 - Parent */}
          <div className="bg-linear-to-br from-pink-50 to-pink-100 rounded-3xl p-8 shadow-sm">
            <div className="text-4xl text-pink-600 mb-4">"</div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              아이가 스스로 공부하게 되었고,
              게임하듯 재미있게 학습하는 모습이 너무 기특합니다.
            </p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-pink-200 mb-3 flex items-center justify-center text-3xl">
                👨‍💻
              </div>
              <p className="font-semibold text-gray-900">K씨 학부모</p>
            </div>
          </div>

          {/* Testimonial 3 - Student */}
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-3xl p-8 shadow-sm">
            <div className="text-4xl text-green-600 mb-4">"</div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              문제를 풀 때마다 포인트를 모으고
              친구들과 경쟁하는 게 정말 재미있어요!
            </p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-green-200 mb-3 flex items-center justify-center text-3xl">
                🧒
              </div>
              <p className="font-semibold text-gray-900">H 초등학생</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            무료로 가입하고 재미있는 학습을 경험해보세요.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">EduPlay</h3>
              <p className="text-sm">
                게이미피케이션으로 더 재미있는 학습을 만듭니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">문제 풀이</a></li>
                <li><a href="#" className="hover:text-white">보상 시스템</a></li>
                <li><a href="#" className="hover:text-white">학습 진도</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">고객센터</a></li>
                <li><a href="#" className="hover:text-white">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">소개</a></li>
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2025 EduPlay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

