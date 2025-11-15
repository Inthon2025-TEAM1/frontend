import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch, getWeaknessAnalysis, type WeaknessAnalysisResponse, type Weakness } from "../api/auth";
import { getMockRewards } from "../mocks/rewardsMock";

// Mock mode toggle - set to false when backend API is ready
const USE_MOCK_DATA = false;

interface QuizAttempt {
  id: string;
  quizId: string;
  questionTitle: string;
  selectedChoice: string;
  isCorrect: boolean;
  rewardCandy: number;
  createdAt: string;
}

interface MonthlyStats {
  totalSolved: number;
  totalRewards: number;
  correctRate: number;
}

type TabType = 'quiz' | 'rewards' | 'analysis';

export function RewardsPage() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalSolved: 0,
    totalRewards: 0,
    correctRate: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('rewards');
  const [analysisData, setAnalysisData] = useState<WeaknessAnalysisResponse | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const loadAnalysis = useCallback(async () => {
    try {
      setAnalysisLoading(true);
      setAnalysisError(null);
      const data = await getWeaknessAnalysis(selectedMonth);
      setAnalysisData(data);
    } catch (err) {
      console.error("Failed to load weakness analysis:", err);
      setAnalysisError(err instanceof Error ? err.message : "분석 데이터를 불러오는데 실패했습니다.");
    } finally {
      setAnalysisLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);

        if (USE_MOCK_DATA) {
          // Mock data 사용
          const mockData = getMockRewards(selectedMonth);
          setAttempts(mockData.attempts);
          setMonthlyStats(mockData.stats);
        } else {
          // 실제 API 호출
          const response = await authFetch(
            `/api/child/rewards?month=${selectedMonth}`
          );
          const data = await response.json();

          setAttempts(data.attempts || []);
          setMonthlyStats(data.stats || { totalSolved: 0, totalRewards: 0, correctRate: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch rewards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [selectedMonth]);

  useEffect(() => {
    if (activeTab === 'analysis') {
      // 월이 변경되거나 탭이 활성화될 때 분석 데이터 다시 로드
      setAnalysisData(null);
      loadAnalysis();
    }
  }, [activeTab, selectedMonth, loadAnalysis]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  // Generate last 6 months for filter
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = date.toISOString().slice(0, 7);
      const label = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      });
      options.push({ value, label });
    }
    return options;
  };

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
    <div className="bg-white box-border flex flex-col gap-8 items-start pb-[400px] pt-8 px-8 relative min-h-[calc(100vh+400px)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold leading-[57.6px] text-[#101828] text-5xl">
            보상 내역
          </h1>
          <p className="font-normal leading-[27px] text-[#475467] text-lg">
            문제를 풀고 받은 캔디 보상을 확인하세요
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          문제 풀러 가기
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 border border-purple-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-purple-600">이번 달 풀이 수</p>
            <p className="text-4xl font-bold text-purple-900">
              {monthlyStats.totalSolved}
              <span className="ml-2 text-xl">문제</span>
            </p>
          </div>
        </div>

        <div className="p-6 border border-green-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-green-600">이번 달 보상</p>
            <p className="text-4xl font-bold text-green-900">
              {monthlyStats.totalRewards}
              <span className="ml-2 text-xl">🍬</span>
            </p>
          </div>
        </div>

        <div className="p-6 border border-blue-200 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-blue-600">정답률</p>
            <p className="text-4xl font-bold text-blue-900">
              {monthlyStats.correctRate.toFixed(1)}
              <span className="ml-2 text-xl">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Month Filter */}
      <div className="flex items-center w-full gap-4">
        <label
          htmlFor="month-select"
          className="text-lg font-medium text-gray-700"
        >
          기간 선택
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {getMonthOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex w-full gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
            activeTab === 'rewards'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          보상 내역
          {activeTab === 'rewards' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
            activeTab === 'quiz'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          풀이 내역
          {activeTab === 'quiz' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-6 py-3 font-semibold text-lg transition-colors relative ${
            activeTab === 'analysis'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          AI 학습 분석
          {activeTab === 'analysis' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
      </div>

      {/* Quiz Attempts History */}
      {activeTab === 'quiz' && (
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-bold text-gray-900">풀이 내역</h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : attempts.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 rounded-xl">
            <p className="text-lg text-gray-500">
              이 기간에 풀이한 문제가 없습니다
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 mt-4 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              문제 풀러 가기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className={`bg-white border rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
                  attempt.isCorrect
                    ? "border-green-200 hover:border-green-300"
                    : "border-red-200 hover:border-red-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          attempt.isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {attempt.isCorrect ? "정답 ✓" : "오답 ✗"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(attempt.createdAt).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {attempt.questionTitle}
                    </h3>
                    <p className="text-gray-600">
                      선택한 답: <span className="font-medium">{attempt.selectedChoice}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 px-4 py-2 border border-yellow-200 rounded-lg bg-yellow-50">
                      <span className="text-2xl">🍬</span>
                      <span className="text-xl font-bold text-yellow-700">
                        +{attempt.rewardCandy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      )}

      {/* Rewards History (Candy-focused view) */}
      {activeTab === 'rewards' && (
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-bold text-gray-900">보상 내역</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : attempts.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-xl">
              <p className="text-lg text-gray-500">
                이 기간에 받은 보상이 없습니다
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 mt-4 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                문제 풀러 가기
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {(() => {
                // Group attempts by date
                const groupedByDate = attempts.reduce((acc, attempt) => {
                  const date = new Date(attempt.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(attempt);
                  return acc;
                }, {} as Record<string, typeof attempts>);

                return Object.entries(groupedByDate).map(([date, dateAttempts]) => {
                  const totalCandyForDay = dateAttempts.reduce(
                    (sum, attempt) => sum + attempt.rewardCandy,
                    0
                  );
                  const problemCount = dateAttempts.length;

                  return (
                    <div
                      key={date}
                      className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        {/* Left: Date and problem count */}
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-bold text-gray-900">{date}</h3>
                          <p className="text-sm text-gray-500">
                            {problemCount}개 문제 풀이
                          </p>
                        </div>

                        {/* Right: Total candy earned */}
                        <div className="flex items-center gap-3 px-6 py-3 border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                          <span className="text-3xl">🍬</span>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-yellow-700">
                              +{totalCandyForDay}
                            </span>
                            <span className="text-xs text-yellow-600">캔디</span>
                          </div>
                        </div>
                      </div>

                      {/* Problem details (collapsed) */}
                      <div className="pt-4 mt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 gap-2">
                          {dateAttempts.map((attempt) => (
                            <div
                              key={attempt.id}
                              className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50"
                            >
                              <div className="flex items-center flex-1 gap-3">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    attempt.isCorrect ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></span>
                                <span className="text-sm text-gray-700 truncate">
                                  {attempt.questionTitle}
                                </span>
                              </div>
                              <span className="ml-2 text-sm font-semibold text-yellow-600">
                                +{attempt.rewardCandy} 🍬
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      )}

      {/* AI Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-bold text-gray-900">AI 학습 분석</h2>

          {analysisLoading ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">분석 중...</p>
              </div>
            </div>
          ) : analysisError ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <p className="mb-4 text-xl text-red-600">{analysisError}</p>
              <button
                onClick={loadAnalysis}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                다시 시도하기
              </button>
            </div>
          ) : analysisData ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className={`p-8 rounded-2xl shadow-lg border-2 ${getScoreBg(analysisData.overallScore)}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">종합 점수</h3>
                  <div className={`text-6xl font-bold ${getScoreColor(analysisData.overallScore)} mb-2`}>
                    {analysisData.overallScore}점
                  </div>
                  <p className="text-gray-600 text-lg">
                    {analysisData.overallScore >= 80 && "우수한 성적입니다! 👏"}
                    {analysisData.overallScore >= 60 && analysisData.overallScore < 80 && "양호한 성적입니다. 조금만 더 힘내세요! 💪"}
                    {analysisData.overallScore < 60 && "개선이 필요합니다. 약점 부분을 집중적으로 학습해보세요. 📚"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weaknesses */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🎯</span>
                    약점 분석
                  </h3>

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
                            <h4 className="text-lg font-bold text-gray-900">
                              {weakness.chapterName}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getErrorRateColor(100 - weakness.accuracyRate)}`}>
                              오답률 {(100 - weakness.accuracyRate).toFixed(1)}%
                            </span>
                          </div>

                          {weakness.commonMistakes && weakness.commonMistakes.length > 0 && (
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">📈</span>
                    개선이 필요한 영역
                  </h3>

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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-3xl">💡</span>
                  학습 추천사항
                </h3>

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

              {/* Refresh Button */}
              <div className="flex justify-center">
                <button
                  onClick={loadAnalysis}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  🔄 분석 새로고침
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-4 text-6xl">📊</div>
              <p className="mb-4 text-xl text-gray-600">분석 데이터가 없습니다.</p>
              <button
                onClick={loadAnalysis}
                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                분석 시작하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
