import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getChildren, addChild, removeChild, type Child } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";

export function ParentDashboardPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [newChildEmail, setNewChildEmail] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

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
      // 사전 검증
      if(user?.email === newChildEmail.trim()){
        alert("본인의 이메일은 자녀로 추가할 수 없습니다.");
        return;
      }

      try {
        const newChild = await addChild(newChildEmail);

        // 중복 체크 (API 성공 후)
        if(children.find((child) => child.id === newChild.id)){
          alert("이미 추가된 자녀입니다.");
          return;
        }

        // API 성공 시에만 상태 업데이트
        setChildren([...children, newChild]);
        setNewChildEmail("");
        setShowAddForm(false);
        alert("자녀가 추가되었습니다!");
      } catch (error) {
        console.error("Failed to add child:", error);
        // 에러 시 상태 업데이트 없음
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

  // const handleShareLink = () => {
  //   const link = `${window.location.origin}/register`;
  //   navigator.clipboard.writeText(link);
  //   alert("링크가 클립보드에 복사되었습니다!\n자녀에게 공유해주세요.");
  // };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              onClick={() => navigate("/parent/mentoring/apply")}
              className="px-6 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700"
            >
              ✨ 고려대 정보대 학생 멘토링 신청하기
            </button>
          </div>
        </div>

        {/* 내 자녀 리스트 */}
        <div className="p-6 mb-6 bg-white shadow-lg rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">내 자녀 리스트</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
              ➕ 자녀 추가
            </button>
          </div>

          {/* 자녀 추가 폼 */}
          {showAddForm && (
            <form
              onSubmit={handleAddChild}
              className="p-4 mb-6 border-2 border-green-200 rounded-lg bg-green-50"
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
                  className="px-6 py-2 font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewChildEmail("");
                  }}
                  className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
            </form>
          )}

          {/* 로딩 상태 */}
          {loading && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">로딩 중...</p>
            </div>
          )}

          {/* 자녀 목록 */}
          {!loading && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="p-6 transition-shadow border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">👦</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {child.name || child.email}
                        </h3>
                        <p className="text-sm text-gray-600">{child.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveChild(child.id)}
                      className="text-xl font-bold text-red-500 hover:text-red-700"
                      title="자녀 제거"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
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
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                아직 등록된 자녀가 없습니다.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                "자녀 추가" 버튼을 눌러 자녀를 등록해주세요.
              </p>
            </div>
          )}
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">👶</span>
              <h3 className="text-xl font-bold text-gray-900">총 자녀 수</h3>
            </div>
            <p className="text-4xl font-bold text-indigo-600">
              {children.length}명
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🍬</span>
              <h3 className="text-xl font-bold text-gray-900">총 캔디 획득</h3>
            </div>
            <p className="text-4xl font-bold text-yellow-600">
              {children.reduce((sum, child) => sum + child.candy, 0)}
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl">
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

        {/* 학습 리포트 카드 */}
        <div className="p-8 mt-8 text-white shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-2xl font-bold">📊 학습 리포트</h3>
              <p className="text-purple-100">
                AI가 분석한 자녀의 학습 현황과 약점을 확인하세요
              </p>
            </div>
            <button
              onClick={() => navigate("/parent/learning-report")}
              className="px-8 py-4 text-lg font-bold text-purple-600 transition-colors bg-white shadow-lg rounded-xl hover:bg-purple-50"
            >
              리포트 보기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
