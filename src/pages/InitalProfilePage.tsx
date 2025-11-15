import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postWithAuth } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

type UserRole = "parent" | "child" | "mentor" | null;

export function InitUserPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  // get Profile api 호출해야함.


  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleRoleSubmit = async () => {
    if (!selectedRole) {
      alert("역할을 선택해주세요.");
      return;
    }
    // console.log(await axios.post("api/auth/register", {role:selectedRole}))
    const response = await postWithAuth("api/auth/register", {
      role: selectedRole,
    });
    if (response.role === "child") {
      navigate("/dashboard");
    } else if (response.role === "parent") {
      navigate("/parent/dashboard");
    } else {
      alert("역할 설정에 실패했습니다.");
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "parent":
        return "학부모";
      case "child":
        return "자녀";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="p-6 space-y-6 bg-white rounded-lg shadow">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

            {/* 역할 선택 UI */}
            <div className="pt-6 border-t">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                역할 설정
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                EduPlay를 사용하실 역할을 선택해주세요.
              </p>

              <div className="grid gap-4 mb-6 md:grid-cols-3">
                {/* 학부모 카드 */}
                <button
                  onClick={() => handleRoleSelect("parent")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedRole === "parent"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="mb-3 text-5xl">👨‍👩‍👧‍👦</div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">
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
                  <div className="mb-3 text-5xl">🧒</div>
                  <h4 className="mb-2 text-lg font-bold text-gray-900">자녀</h4>
                  <p className="text-sm text-gray-600">
                    재미있게 문제를 풀고 학습합니다.
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
                  className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  역할 설정 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
