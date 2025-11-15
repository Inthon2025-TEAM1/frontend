import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ParentMentoringApplyPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    childAge: "",
    childPersonality: "",
    childGoal: "",
    currentLevel: "",
    mentoringType: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    console.log("멘토링 신청 데이터:", formData);
    alert("멘토링 신청이 완료되었습니다!\n관리자가 검토 후 매칭해드립니다.");
    navigate("/parent/mentoring/list");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            멘토링 신청하기
          </h1>
          <p className="text-lg text-gray-600">
            자녀에게 맞는 멘토를 매칭해드립니다
          </p>
        </div>

        {/* 신청 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              멘토링 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 수학 기초 학습 멘토링"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* 자녀 정보 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">👦</span>
              자녀 정보
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  자녀 나이 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  placeholder="나이를 입력하세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                  min="1"
                  max="20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  자녀 성향 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="childPersonality"
                  value={formData.childPersonality}
                  onChange={handleChange}
                  placeholder="자녀의 성격, 관심사, 학습 스타일 등을 자유롭게 작성해주세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  학습 목표 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="childGoal"
                  value={formData.childGoal}
                  onChange={handleChange}
                  placeholder="멘토링을 통해 달성하고 싶은 목표를 작성해주세요"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* 현재 학습 수준 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              현재 학습 수준
            </h2>
            <textarea
              name="currentLevel"
              value={formData.currentLevel}
              onChange={handleChange}
              placeholder="자녀의 현재 학습 수준, 강점과 약점, 어려움을 겪는 부분 등을 자세히 작성해주세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={5}
              required
            />
          </div>

          {/* 원하는 멘토링 유형 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              원하는 멘토링 유형
            </h2>
            <textarea
              name="mentoringType"
              value={formData.mentoringType}
              onChange={handleChange}
              placeholder="예: 주 2회 1시간씩 화상 수업, 과제 검토 및 피드백, 시험 대비 집중 수업 등"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={5}
              required
            />
          </div>

          {/* 추가 정보 (선택사항) */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              추가 정보 (선택사항)
            </h2>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="멘토에게 전달하고 싶은 추가 정보가 있다면 작성해주세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/parent/mentoring/list")}
              className="flex-1 py-4 bg-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              신청하기
            </button>
          </div>
        </form>

        {/* 안내 문구 */}
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💡 안내사항:</span>
            <br />- 신청 후 관리자가 검토하여 적합한 멘토를 매칭해드립니다.
            <br />- 매칭은 보통 1-3일 정도 소요됩니다.
            <br />- 매칭 결과는 "멘토링 신청 현황" 페이지에서 확인하실 수
            있습니다.
          </p>
        </div>
      </div>

      {/* Floating Button to Mentoring List */}
      <button
        onClick={() => navigate("/parent/mentoring/list")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center text-2xl"
        title="신청 현황 보기"
      >
        📋
      </button>
    </div>
  );
}
