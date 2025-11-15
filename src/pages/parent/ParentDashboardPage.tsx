import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getChildren,
  addChild,
  removeChild,
  type Child,
} from "../../api/auth";

export function ParentDashboardPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [newChildEmail, setNewChildEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 자녀 목록 불러오기
  const loadChildren = async () => {
    try {
      setLoading(true);
      const childrenData = await getChildren();
      setChildren(childrenData);
    } catch (error) {
      console.error("Failed to load children:", error);
      alert("자녀 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChildren();
  }, []);

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newChildEmail.trim()) {
      try {
        const newChild = await addChild(newChildEmail);
        setChildren([...children, newChild]);
        setNewChildEmail("");
        setShowAddForm(false);
        alert("자녀가 추가되었습니다!");
      } catch (error) {
        console.error("Failed to add child:", error);
        alert("자녀 추가에 실패했습니다. 이메일을 확인해주세요.");
      }
    }
  };

  const handleRemoveChild = async (id: number) => {
    if (window.confirm("정말로 이 자녀를 제거하시겠습니까?")) {
      try {
        await removeChild(id);
        setChildren(children.filter((child) => child.id !== id));
        alert("자녀가 제거되었습니다.");
      } catch (error) {
        console.error("Failed to remove child:", error);
        alert("자녀 제거에 실패했습니다.");
      }
    }
  };

  const handleShareLink = () => {
    const link = `${window.location.origin}/register`;
    navigator.clipboard.writeText(link);
    alert("링크가 클립보드에 복사되었습니다!\n자녀에게 공유해주세요.");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
            </Link>
            <p className="text-lg text-gray-600">
              자녀의 학습 현황을 확인하고 관리하세요
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleShareLink}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
            >
              📤 문제 푸는 링크 공유
            </button>
            <button
              onClick={() => navigate("/parent/mentoring/apply")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
            >
              ✨ 멘토링 신청하기
            </button>
          </div>
        </div>

        {/* 내 자녀 리스트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">내 자녀 리스트</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              ➕ 자녀 추가
            </button>
          </div>

          {/* 자녀 추가 폼 */}
          {showAddForm && (
            <form
              onSubmit={handleAddChild}
              className="mb-6 p-4 bg-green-50 rounded-lg border-2 border-green-200"
            >
              <div className="flex gap-3">
                <input
                  type="email"
                  value={newChildEmail}
                  onChange={(e) => setNewChildEmail(e.target.value)}
                  placeholder="자녀 이메일 입력"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          )}

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">로딩 중...</p>
            </div>
          )}

          {/* 자녀 목록 */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
              <div
                key={child.id}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">👦</span>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {child.name || child.email}
                      </h3>
                      <p className="text-sm text-gray-600">{child.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveChild(child.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                    title="자녀 제거"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                  <span className="text-3xl">🍬</span>
                  <div>
                    <p className="text-sm text-gray-600">획득한 캔디</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {child.candy}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          {!loading && children.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                아직 등록된 자녀가 없습니다.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                "자녀 추가" 버튼을 눌러 자녀를 등록해주세요.
              </p>
            </div>
          )}
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">👶</span>
              <h3 className="text-xl font-bold text-gray-900">총 자녀 수</h3>
            </div>
            <p className="text-4xl font-bold text-indigo-600">
              {children.length}명
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🍬</span>
              <h3 className="text-xl font-bold text-gray-900">총 캔디 획득</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-600">
              {children.reduce((sum, child) => sum + child.candy, 0)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📊</span>
              <h3 className="text-xl font-bold text-gray-900">평균 캔디</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">
              {children.length > 0
                ? Math.round(
                    children.reduce((sum, child) => sum + child.candy, 0) /
                      children.length
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
