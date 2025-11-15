import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMentoringApplication,
  getChildren,
  type Child,
} from "../../api/auth";

export function ParentMentoringApplyPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    childId: "",
    childName: "",
    title: "",
    childAge: "",
    requirement: "",
  });

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data);
    } catch (err) {
      console.error("Failed to load children:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill child name when child is selected
    if (name === "childId") {
      const selectedChild = children.find((c) => c.id === parseInt(value));
      if (selectedChild) {
        setFormData((prev) => ({ ...prev, childName: selectedChild.name }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.childId) {
      alert("자녀를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      await createMentoringApplication({
        childId: parseInt(formData.childId),
        childName: formData.childName,
        title: formData.title,
        childAge: formData.childAge,
        requirement: formData.requirement,
      });
      alert("멘토링 신청이 완료되었습니다!\n관리자가 검토 후 매칭해드립니다.");
      navigate("/parent/mentoring/list");
    } catch (err) {
      alert(err instanceof Error ? err.message : "신청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
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
          {/* 자녀 선택 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              자녀 선택 <span className="text-red-500">*</span>
            </label>
            <select
              name="childId"
              value={formData.childId}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">자녀를 선택하세요</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

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

          {/* 자녀 학년 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              자녀 학년 <span className="text-red-500">*</span>
            </label>
            <select
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">학년을 선택하세요</option>
              <option value="중1">중학교 1학년</option>
              <option value="중2">중학교 2학년</option>
              <option value="중3">중학교 3학년</option>
            </select>
          </div>

          {/* 멘토링 요구사항 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              멘토링 요구사항
            </h2>
            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              placeholder="자녀의 현재 학습 수준, 목표, 원하는 멘토링 스타일 등을 자세히 작성해주세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={8}
              required
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/parent/mentoring/list")}
              className="flex-1 py-4 bg-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "신청 중..." : "신청하기"}
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
