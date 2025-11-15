import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MentoringApplication {
  id: number;
  title: string;
  childName: string;
  childAge: number;
  status: "pending" | "matched" | "rejected";
  createdAt: string;
  mentorName?: string;
}

export function ParentMentoringListPage() {
  const navigate = useNavigate();
  const [applications] = useState<MentoringApplication[]>([
    {
      id: 1,
      title: "수학 기초 학습 멘토링",
      childName: "김민준",
      childAge: 10,
      status: "matched",
      createdAt: "2025-01-10",
      mentorName: "박멘토",
    },
    {
      id: 2,
      title: "영어 회화 집중 과정",
      childName: "이서연",
      childAge: 12,
      status: "pending",
      createdAt: "2025-01-13",
    },
    {
      id: 3,
      title: "과학 탐구 멘토링",
      childName: "김민준",
      childAge: 10,
      status: "rejected",
      createdAt: "2025-01-08",
    },
  ]);

  const statusInfo = {
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
  };

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
                        <span>🎂 {app.childAge}세</span>
                        <span>📅 {app.createdAt}</span>
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

                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                      상세보기
                    </button>
                    {app.status === "pending" && (
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
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
    </div>
  );
}
