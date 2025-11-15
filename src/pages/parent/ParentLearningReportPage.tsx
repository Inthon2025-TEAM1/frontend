import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWeaknessAnalysis,
  getChildren,
  type WeaknessAnalysisResponse,
  type Weakness,
  type Child,
} from "../../api/auth";

export function ParentLearningReportPage() {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<WeaknessAnalysisResponse | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load children list on mount
  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      setLoading(true);
      const childrenData = await getChildren();
      setChildren(childrenData);
      setError(null);
    } catch (err) {
      console.error("Failed to load children:", err);
      setError(err instanceof Error ? err.message : "자녀 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadAnalysis = async (childId: number) => {
    try {
      setLoading(true);
      const data = await getWeaknessAnalysis(childId);
      setAnalysisData(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load weakness analysis:", err);
      setError(err instanceof Error ? err.message : "분석 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChildSelect = (child: Child) => {
    setSelectedChild(child);
    loadAnalysis(child.id);
  };

  // Show loading spinner during initial children load
  if (loading && children.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-b-2 border-purple-600 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">자녀 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && children.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <p className="mb-4 text-xl text-red-600">{error}</p>
          <button
            onClick={() => navigate("/parent/dashboard")}
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // Show child selection screen if no child is selected yet
  if (!selectedChild) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate("/parent/dashboard")}
              className="flex items-center gap-2 mb-4 font-semibold text-purple-600 hover:text-purple-700"
            >
              ← 대시보드로 돌아가기
            </button>
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              📊 학습 리포트
            </h1>
            <p className="text-lg text-gray-600">
              분석을 볼 자녀를 선택해주세요
            </p>
          </div>

          {children.length === 0 ? (
            <div className="p-12 text-center bg-white shadow-lg rounded-2xl">
              <div className="mb-4 text-6xl">👶</div>
              <p className="mb-6 text-xl text-gray-600">등록된 자녀가 없습니다.</p>
              <button
                onClick={() => navigate("/parent/dashboard")}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                대시보드로 돌아가기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleChildSelect(child)}
                  className="p-6 text-left transition-all bg-white shadow-lg rounded-2xl hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-gradient-to-br from-purple-400 to-indigo-500">
                      {child.name ? child.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{child.name || "이름 없음"}</h3>
                      <p className="text-gray-600">{child.email || "이메일 없음"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-gray-600">캔디</span>
                    <span className="text-2xl font-bold text-purple-600">🍬 {child.candy ?? 0}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show loading during analysis
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-b-2 border-purple-600 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">{selectedChild.name}님의 분석 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <p className="mb-4 text-xl text-red-600">{error}</p>
          <button
            onClick={() => setSelectedChild(null)}
            className="px-6 py-3 mr-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            자녀 선택으로 돌아가기
          </button>
          <button
            onClick={() => navigate("/parent/dashboard")}
            className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl">📊</div>
          <p className="mb-4 text-xl text-gray-600">분석 데이터가 없습니다.</p>
          <button
            onClick={() => setSelectedChild(null)}
            className="px-6 py-3 mr-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            자녀 선택으로 돌아가기
          </button>
          <button
            onClick={() => navigate("/parent/dashboard")}
            className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getErrorRateColor = (rate: number) => {
    if (rate >= 50) return "text-red-600 bg-red-50";
    if (rate >= 30) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedChild(null)}
            className="flex items-center gap-2 mb-4 font-semibold text-purple-600 hover:text-purple-700"
          >
            ← 자녀 선택으로 돌아가기
          </button>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            📊 학습 리포트 - {selectedChild.name}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedChild.name}님의 학습 현황과 약점을 분석한 결과입니다
          </p>
        </div>

        {/* Overall Score */}
        <div className={`mb-8 p-8 rounded-2xl shadow-lg border-2 ${getScoreBg(analysisData.overallScore)}`}>
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">종합 점수</h2>
            <div className={`text-6xl font-bold ${getScoreColor(analysisData.overallScore)} mb-2`}>
              {analysisData.overallScore}점
            </div>
            <p className="text-gray-600">
              {analysisData.overallScore >= 80 && "우수한 성적입니다! 👏"}
              {analysisData.overallScore >= 60 && analysisData.overallScore < 80 && "양호한 성적입니다. 조금만 더 힘내세요! 💪"}
              {analysisData.overallScore < 60 && "개선이 필요합니다. 약점 부분을 집중적으로 학습해보세요. 📚"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weaknesses */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
              <span className="text-3xl">🎯</span>
              약점 분석
            </h2>

            {analysisData.weaknesses.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">🎉</div>
                <p className="text-gray-600">약점이 발견되지 않았습니다!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analysisData.weaknesses.map((weakness: Weakness, index: number) => (
                  <div
                    key={index}
                    className="p-4 transition-colors border-2 border-gray-200 rounded-xl hover:border-purple-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {weakness.chapterName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getErrorRateColor(100 - weakness.accuracyRate)}`}>
                        오답률 {(100 - weakness.accuracyRate).toFixed(1)}%
                      </span>
                    </div>

                    {weakness.commonMistakes.length > 0 && (
                      <div className="mt-3">
                        <p className="mb-2 text-sm font-semibold text-gray-700">
                          자주 틀리는 유형:
                        </p>
                        <ul className="space-y-1">
                          {weakness.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-red-500">•</span>
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Improvement Areas */}
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
              <span className="text-3xl">📈</span>
              개선이 필요한 영역
            </h2>

            {analysisData.improvementAreas.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-6xl">✅</div>
                <p className="text-gray-600">모든 영역에서 우수합니다!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analysisData.improvementAreas.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-blue-200 bg-blue-50 rounded-xl"
                  >
                    <p className="flex items-start gap-2 text-gray-800">
                      <span className="font-bold text-blue-600">{index + 1}.</span>
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 mt-6 bg-white shadow-lg rounded-2xl">
          <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-900">
            <span className="text-3xl">💡</span>
            학습 추천사항
          </h2>

          {analysisData.recommendations.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">👍</div>
              <p className="text-gray-600">현재 학습 상태가 양호합니다!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {analysisData.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl"
                >
                  <p className="flex items-start gap-2 text-gray-800">
                    <span className="text-xl font-bold text-purple-600">✓</span>
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => loadAnalysis(selectedChild.id)}
            className="px-8 py-4 text-lg font-bold text-white transition-all shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
          >
            🔄 다시 분석하기
          </button>
          <button
            onClick={() => setSelectedChild(null)}
            className="px-8 py-4 text-lg font-bold text-purple-700 transition-colors bg-purple-100 rounded-xl hover:bg-purple-200"
          >
            다른 자녀 선택
          </button>
          <button
            onClick={() => navigate("/parent/dashboard")}
            className="px-8 py-4 text-lg font-bold text-gray-700 transition-colors bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            대시보드로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
