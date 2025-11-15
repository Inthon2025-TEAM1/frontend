import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/auth";

export function FloatingRoleButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<"parent" | "child" | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentRole();
  }, []);

  const loadCurrentRole = async () => {
    try {
      const response = await authFetch("/api/user/role", { method: "GET" });
      const data = await response.json();
      setCurrentRole(data.role);
    } catch (error) {
      console.error("Failed to load role:", error);
    }
  };

  const handleRoleChange = async (newRole: "parent" | "child") => {
    if (loading || newRole === currentRole) return;

    if (
      !confirm(
        `정말 역할을 ${newRole === "parent" ? "부모" : "자식"}(으)로 변경하시겠습니까?\n현재 페이지를 벗어나게 됩니다.`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await authFetch("/api/user/set-role", {
        method: "POST",
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("역할 변경에 실패했습니다.");
      }

      setCurrentRole(newRole);
      setIsOpen(false);

      // 역할에 맞는 페이지로 리다이렉트
      if (newRole === "parent") {
        navigate("/parent/dashboard");
      } else {
        navigate("/dashboard");
      }

      alert("역할이 변경되었습니다.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "역할 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center text-2xl z-40"
        title="역할 변경"
      >
        👤
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">역할 변경</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700 text-center mb-6">
                현재 역할:{" "}
                <span className="font-bold text-purple-600">
                  {currentRole === "parent" ? "부모" : "자식"}
                </span>
              </p>

              <div className="space-y-3">
                {/* Parent Role Button */}
                <button
                  onClick={() => handleRoleChange("parent")}
                  disabled={loading || currentRole === "parent"}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    currentRole === "parent"
                      ? "border-purple-600 bg-purple-50 cursor-not-allowed"
                      : "border-gray-200 bg-white hover:border-purple-600 hover:bg-purple-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">👨‍👩‍👧‍👦</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-gray-900 text-lg">부모</h3>
                      <p className="text-sm text-gray-600">
                        자녀 관리 및 멘토링 신청
                      </p>
                    </div>
                    {currentRole === "parent" && (
                      <div className="text-purple-600 text-2xl">✓</div>
                    )}
                  </div>
                </button>

                {/* Child Role Button */}
                <button
                  onClick={() => handleRoleChange("child")}
                  disabled={loading || currentRole === "child"}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    currentRole === "child"
                      ? "border-indigo-600 bg-indigo-50 cursor-not-allowed"
                      : "border-gray-200 bg-white hover:border-indigo-600 hover:bg-indigo-50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">👦</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-gray-900 text-lg">자식</h3>
                      <p className="text-sm text-gray-600">
                        퀴즈 풀기 및 학습하기
                      </p>
                    </div>
                    {currentRole === "child" && (
                      <div className="text-indigo-600 text-2xl">✓</div>
                    )}
                  </div>
                </button>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="w-full mt-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
