import { useNavigate } from "react-router-dom";

export function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900">이용약관</h1>
          <p className="mt-2 text-gray-600">최종 수정일: 2025년 1월 1일</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 EduPlay(이하 "회사")가 제공하는 교육 서비스의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제2조 (정의)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"서비스"란 회사가 제공하는 온라인 학습 플랫폼을 의미합니다.</li>
              <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제3조 (약관의 효력 및 변경)</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며,
              변경된 약관은 공지사항을 통해 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제4조 (서비스의 제공)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>퀴즈 문제 제공 및 학습 콘텐츠 서비스</li>
              <li>학습 진도 관리 및 성과 분석 서비스</li>
              <li>보상 시스템 및 캐릭터 수집 서비스</li>
              <li>기타 회사가 정하는 부가 서비스</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제5조 (회원가입)</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후
              본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              회사는 본 약관에 동의하고 회원가입을 신청한 이용자 중
              다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제6조 (이용자의 의무)</h2>
            <p className="text-gray-700 leading-relaxed mb-2">이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>서비스 운영을 고의로 방해하는 행위</li>
              <li>기타 관련 법령 및 약관을 위반하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제7조 (면책조항)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 인하여
              서비스를 제공할 수 없는 경우 책임이 면제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제8조 (분쟁 해결)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
