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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate("/parent/dashboard")}
              className="mb-4 text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
            >
              ← 대시보드로 돌아가기
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📊 학습 리포트
            </h1>
            <p className="text-lg text-gray-600">
              분석을 볼 자녀를 선택해주세요
            </p>
          </div>

          {children.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">👶</div>
              <p className="text-xl text-gray-600 mb-6">등록된 자녀가 없습니다.</p>
              <button
                onClick={() => navigate("/parent/dashboard")}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                대시보드로 돌아가기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleChildSelect(child)}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
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
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 mr-4"
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
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 mr-4"
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
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedChild(null)}
            className="mb-4 text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
          >
            ← 자녀 선택으로 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 학습 리포트 - {selectedChild.name}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedChild.name}님의 학습 현황과 약점을 분석한 결과입니다
          </p>
        </div>

        {/* Overall Score */}
        <div className={`mb-8 p-8 rounded-2xl shadow-lg border-2 ${getScoreBg(analysisData.overallScore)}`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">종합 점수</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weaknesses */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              약점 분석
            </h2>

            {analysisData.weaknesses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-gray-600">약점이 발견되지 않았습니다!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {analysisData.weaknesses.map((weakness: Weakness, index: number) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {weakness.chapterName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getErrorRateColor(100 - weakness.accuracyRate)}`}>
                        오답률 {(100 - weakness.accuracyRate).toFixed(1)}%
                      </span>
                    </div>

                    {weakness.commonMistakes.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          자주 틀리는 유형:
                        </p>
                        <ul className="space-y-1">
                          {weakness.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
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
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📈</span>
              개선이 필요한 영역
            </h2>

            {analysisData.improvementAreas.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-gray-600">모든 영역에서 우수합니다!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analysisData.improvementAreas.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
                  >
                    <p className="text-gray-800 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">{index + 1}.</span>
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">💡</span>
            학습 추천사항
          </h2>

          {analysisData.recommendations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👍</div>
              <p className="text-gray-600">현재 학습 상태가 양호합니다!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisData.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl"
                >
                  <p className="text-gray-800 flex items-start gap-2">
                    <span className="text-purple-600 font-bold text-xl">✓</span>
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => loadAnalysis(selectedChild.id)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            🔄 다시 분석하기
          </button>
          <button
            onClick={() => setSelectedChild(null)}
            className="px-8 py-4 bg-purple-100 text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-200 transition-colors"
          >
            다른 자녀 선택
          </button>
          <button
            onClick={() => navigate("/parent/dashboard")}
            className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-colors"
          >
            대시보드로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
