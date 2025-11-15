import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMentoringApplications,
  cancelMentoringApplication,
  type MentoringApplication,
} from "../../api/auth";

export function ParentMentoringListPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<MentoringApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<MentoringApplication | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getMentoringApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError("멘토링 신청 내역을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("정말 이 신청을 취소하시겠습니까?")) {
      return;
    }

    try {
      await cancelMentoringApplication(id);
      await loadApplications(); // Reload list
      alert("신청이 취소되었습니다.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "취소에 실패했습니다.");
    }
  };

  const statusInfo: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    pending: {
      label: "대기중",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      icon: "⏳",
    },
    matched: {
      label: "매칭완료",
      color: "bg-green-100 text-green-700 border-green-300",
      icon: "✅",
    },
    rejected: {
      label: "거절됨",
      color: "bg-red-100 text-red-700 border-red-300",
      icon: "❌",
    },
    cancelled: {
      label: "취소됨",
      color: "bg-gray-100 text-gray-700 border-gray-300",
      icon: "🚫",
    },
    completed: {
      label: "완료됨",
      color: "bg-blue-100 text-blue-700 border-blue-300",
      icon: "🎓",
    },
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={loadApplications}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              멘토링 신청 현황
            </h1>
            <p className="text-lg text-gray-600">
              신청한 멘토링의 상태를 확인하세요
            </p>
          </div>
          <button
            onClick={() => navigate("/parent/mentoring/apply")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
          >
            ➕ 새 멘토링 신청
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📝</span>
              <h3 className="text-lg font-bold text-gray-900">총 신청</h3>
            </div>
            <p className="text-3xl font-bold text-indigo-600">
              {applications.length}건
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">✅</span>
              <h3 className="text-lg font-bold text-gray-900">매칭완료</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {applications.filter((a) => a.status === "matched").length}건
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⏳</span>
              <h3 className="text-lg font-bold text-gray-900">대기중</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {applications.filter((a) => a.status === "pending").length}건
            </p>
          </div>
        </div>

        {/* 신청 리스트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">신청 내역</h2>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                아직 신청한 멘토링이 없습니다.
              </p>
              <button
                onClick={() => navigate("/parent/mentoring/apply")}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                멘토링 신청하기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {app.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${
                            statusInfo[app.status].color
                          }`}
                        >
                          {statusInfo[app.status].icon}{" "}
                          {statusInfo[app.status].label}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>👦 {app.childName}</span>
                        <span>🎂 {app.childAge}</span>
                        <span>
                          📅{" "}
                          {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {app.status === "matched" && app.mentorName && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👨‍🏫</span>
                        <div>
                          <p className="text-sm text-gray-600">담당 멘토</p>
                          <p className="font-bold text-green-700">
                            {app.mentorName} 멘토님
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {app.status === "pending" && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        관리자가 적합한 멘토를 매칭하고 있습니다. 조금만
                        기다려주세요!
                      </p>
                    </div>
                  )}

                  {app.status === "rejected" && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                      <p className="text-sm text-red-700">
                        죄송합니다. 현재 적합한 멘토를 찾지 못했습니다. 다시
                        신청해주세요.
                      </p>
                    </div>
                  )}

                  {app.status === "cancelled" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <p className="text-sm text-gray-700">
                        이 신청은 취소되었습니다.
                      </p>
                    </div>
                  )}

                  {app.status === "completed" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <p className="text-sm text-blue-700">
                        멘토링이 성공적으로 완료되었습니다!
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors"
                    >
                      상세보기
                    </button>
                    {app.status === "pending" && (
                      <button
                        onClick={() => handleCancel(app.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                      >
                        신청 취소
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 상세보기 Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedApplication.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span>👦 {selectedApplication.childName}</span>
                    <span>🎂 {selectedApplication.childAge}</span>
                    <span>
                      📅{" "}
                      {new Date(
                        selectedApplication.createdAt
                      ).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-white hover:text-gray-200 text-3xl font-bold leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <span
                  className={`px-6 py-3 rounded-full text-lg font-bold border-2 ${
                    statusInfo[selectedApplication.status].color
                  }`}
                >
                  {statusInfo[selectedApplication.status].icon}{" "}
                  {statusInfo[selectedApplication.status].label}
                </span>
              </div>

              {/* Mentor Info (if matched) */}
              {selectedApplication.status === "matched" &&
                selectedApplication.mentorName && (
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">👨‍🏫</span>
                      <div>
                        <p className="text-sm text-gray-600">담당 멘토</p>
                        <p className="text-xl font-bold text-green-700">
                          {selectedApplication.mentorName} 멘토님
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Requirement Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  멘토링 요구사항
                </h3>
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedApplication.requirement}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {selectedApplication.status === "pending" && (
                  <button
                    onClick={() => {
                      setSelectedApplication(null);
                      handleCancel(selectedApplication.id);
                    }}
                    className="flex-1 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                  >
                    신청 취소
                  </button>
                )}
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
