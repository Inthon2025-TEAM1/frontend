import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { fetchUserProfile } from "../api/auth";

type UserRole = "parent" | "child" | "mentor" | null;

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleFetchProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchUserProfile();
      console.log(data)
      setProfile(data);

      // 프로필 정보가 없거나 역할이 설정되지 않은 경우 역할 선택 UI 표시
      if (!data || !data.role) {
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      // API 에러 시에도 역할 선택 UI 표시
      setShowRoleSelection(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleRoleSubmit = () => {
    if (!selectedRole) {
      alert("역할을 선택해주세요.");
      return;
    }

    // TODO: API 연결 시 여기서 서버로 역할 정보 전송
    console.log("선택된 역할:", selectedRole);

    // 임시로 로컬 상태에만 저장
    setProfile({ ...profile, role: selectedRole });
    setShowRoleSelection(false);
    alert(`역할이 ${getRoleLabel(selectedRole)}(으)로 설정되었습니다.`);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "학부모";
      case "child":
        return "자녀";
      case "mentor":
        return "멘토";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">대시보드</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/quiz-selection")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                퀴즈 선택
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                프로필
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                환영합니다! 🎉
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">이메일:</span> {user?.email}
                </p>
                <p>
                  <span className="font-medium">사용자 ID:</span> {user?.uid}
                </p>
                <p>
                  <span className="font-medium">이메일 인증:</span>{" "}
                  {user?.emailVerified ? "✅ 인증됨" : "❌ 미인증"}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                백엔드 API 테스트
              </h3>
              <button
                onClick={handleFetchProfile}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "불러오는 중..." : "프로필 불러오기"}
              </button>

              {profile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-mono text-gray-700">
                    {JSON.stringify(profile, null, 2)}
                  </p>
                </div>
              )}
            </div>

            {/* 역할 선택 UI */}
            {showRoleSelection && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  역할 설정
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  EduPlay를 사용하실 역할을 선택해주세요.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* 학부모 카드 */}
                  <button
                    onClick={() => handleRoleSelect("parent")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedRole === "parent"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-5xl mb-3">👨‍👩‍👧‍👦</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      학부모
                    </h4>
                    <p className="text-sm text-gray-600">
                      자녀의 학습 진도를 확인하고 관리합니다.
                    </p>
                  </button>

                  {/* 자녀 카드 */}
                  <button
                    onClick={() => handleRoleSelect("child")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedRole === "child"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-5xl mb-3">🧒</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      자녀
                    </h4>
                    <p className="text-sm text-gray-600">
                      재미있게 문제를 풀고 학습합니다.
                    </p>
                  </button>

                  {/* 멘토 카드 */}
                  <button
                    onClick={() => handleRoleSelect("mentor")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedRole === "mentor"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-5xl mb-3">👩‍🏫</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      멘토
                    </h4>
                    <p className="text-sm text-gray-600">
                      학생들을 가르치고 학습을 지도합니다.
                    </p>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {selectedRole && (
                      <span className="font-medium text-indigo-600">
                        선택됨: {getRoleLabel(selectedRole)}
                      </span>
                    )}
                  </p>
                  <button
                    onClick={handleRoleSubmit}
                    disabled={!selectedRole}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    역할 설정 완료
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
