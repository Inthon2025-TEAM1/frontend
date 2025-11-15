import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      {/* Header Navigation */}

      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
          어떻게 학습하고 싶으세요?
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-xl text-gray-600">
          재미있는 문제풀이와 보상 시스템으로 학습하는 모든 내용을 마스터하세요.
          초등학생부터 학부모까지 함께하는 게이미피케이션 학습 플랫폼입니다.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="px-8 py-4 text-lg font-semibold text-white transition-colors bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700"
          >
            무료 회원 가입
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="p-8 text-center shadow-sm bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl">
            <div className="mb-4 text-6xl">🎮</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              게임처럼 재미있게
            </h3>
            <p className="text-gray-700">
              문제를 풀 때마다 포인트를 획득하고, 레벨을 올리며 성취감을
              느껴보세요.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 text-center shadow-sm bg-linear-to-br from-purple-50 to-purple-100 rounded-3xl">
            <div className="mb-4 text-6xl">🏆</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              보상 시스템
            </h3>
            <p className="text-gray-700">
              학습 목표를 달성하면 다양한 배지와 보상을 받을 수 있어요.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 text-center shadow-sm bg-linear-to-br from-green-50 to-green-100 rounded-3xl">
            <div className="mb-4 text-6xl">👨‍👩‍👧‍👦</div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              함께하는 학습
            </h3>
            <p className="text-gray-700">
              자녀의 학습 진도를 확인하고 가족과 함께 성장해요.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
          사용자들의 이야기
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Testimonial 1 - Teacher */}
          <div className="p-8 shadow-sm bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl">
            <div className="mb-4 text-4xl text-blue-600">"</div>
            <p className="mb-6 leading-relaxed text-gray-800">
              EduPlay 도입 후 학생들의 학습 참여도가 5배나 상승하고 학생들에게도
              좋은 동기 부여가 되었습니다.
            </p>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-3 text-3xl bg-indigo-200 rounded-full">
                👩‍🏫
              </div>
              <p className="font-semibold text-gray-900">C 초등학교 교사</p>
            </div>
          </div>

          {/* Testimonial 2 - Parent */}
          <div className="p-8 shadow-sm bg-linear-to-br from-pink-50 to-pink-100 rounded-3xl">
            <div className="mb-4 text-4xl text-pink-600">"</div>
            <p className="mb-6 leading-relaxed text-gray-800">
              아이가 스스로 공부하게 되었고, 게임하듯 재미있게 학습하는 모습이
              너무 기특합니다.
            </p>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-3 text-3xl bg-pink-200 rounded-full">
                👨‍💻
              </div>
              <p className="font-semibold text-gray-900">K씨 학부모</p>
            </div>
          </div>

          {/* Testimonial 3 - Student */}
          <div className="p-8 shadow-sm bg-linear-to-br from-green-50 to-green-100 rounded-3xl">
            <div className="mb-4 text-4xl text-green-600">"</div>
            <p className="mb-6 leading-relaxed text-gray-800">
              문제를 풀 때마다 포인트를 모으고 친구들과 경쟁하는 게 정말
              재미있어요!
            </p>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 mb-3 text-3xl bg-green-200 rounded-full">
                🧒
              </div>
              <p className="font-semibold text-gray-900">H 초등학생</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <div className="p-12 text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl">
          <h2 className="mb-4 text-4xl font-bold">지금 바로 시작해보세요!</h2>
          <p className="mb-8 text-xl text-indigo-100">
            무료로 가입하고 재미있는 학습을 경험해보세요.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 text-lg font-semibold text-indigo-600 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-gray-300 bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">EduPlay</h3>
              <p className="text-sm">
                게이미피케이션으로 더 재미있는 학습을 만듭니다.
              </p>
            </div>
            
          </div>
          <div className="pt-8 mt-8 text-sm text-center border-t border-gray-800">
            <p>&copy; 2025 EduPlay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
