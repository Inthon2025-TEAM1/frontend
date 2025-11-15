import { useNavigate } from "react-router-dom";

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            ← 홈으로 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-900">소개</h1>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">EduPlay란?</h2>
            <p className="text-gray-700 leading-relaxed">
              EduPlay는 게이미피케이션을 활용하여 학습을 더욱 재미있고 효과적으로 만드는 교육 플랫폼입니다.
              학생들이 퀴즈를 풀며 보상을 받고, 캐릭터를 수집하며 즐겁게 학습할 수 있도록 설계되었습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">주요 기능</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>다양한 난이도의 퀴즈 문제 제공</li>
              <li>정답 시 캔디 보상 시스템</li>
              <li>캐릭터 가챠 시스템</li>
              <li>학습 진도 및 성과 추적</li>
              <li>부모님을 위한 자녀 학습 모니터링</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제작팀</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              신준혁, 이현민, 정단우, 최병주
            </p>
            <p className="text-gray-600 text-sm">
              더 나은 교육 경험을 위해 노력하는 팀입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">문의</h2>
            <p className="text-gray-700">
              이메일: <a href="mailto:test@naver.com" className="text-indigo-600 hover:text-indigo-700">test@naver.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
