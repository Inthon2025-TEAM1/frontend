import { useNavigate } from "react-router-dom";

export function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900">개인정보처리방침</h1>
          <p className="mt-2 text-gray-600">최종 수정일: 2025년 1월 1일</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              EduPlay(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
              이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>회원 가입 및 관리</li>
              <li>서비스 제공 및 학습 진도 관리</li>
              <li>본인 확인 및 부정 이용 방지</li>
              <li>문의사항 처리 및 고객 지원</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 수집하는 개인정보 항목</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">필수 항목</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>이메일 주소</li>
                  <li>이름</li>
                  <li>프로필 이미지 (선택적)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">자동 수집 항목</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>서비스 이용 기록</li>
                  <li>접속 로그</li>
                  <li>쿠키 정보</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>회원 탈퇴 시까지 (단, 관련 법령에 따라 보존 필요 시 해당 기간까지 보관)</li>
              <li>서비스 이용 기록: 3개월</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만
              개인정보를 제3자에게 제공합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 개인정보의 파기</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>전자적 파일 형태: 복원이 불가능한 방법으로 영구 삭제</li>
              <li>기록물, 인쇄물, 서면 등: 분쇄 또는 소각</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 개인정보 보호책임자</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">담당부서:</span> 개인정보보호팀
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">이메일:</span>{" "}
                <a href="mailto:test@naver.com" className="text-indigo-600 hover:text-indigo-700">
                  test@naver.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. 개인정보 처리방침 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가,
              삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
